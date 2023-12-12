import User from "../models/User";
import { uploadPicture } from "../middleware/uploadPictureMiddleware";
import { fileRemover } from "../utils/fileRemover";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //check email exist

    let user = await User.findOne({ email });
    if (user) {
      //return res.status(400).json({ message: "Email has already existed!" });
      throw new Error("Email has already existed!");
    }

    user = await User.create({
      name,
      email,
      password,
    });

    return res.status(200).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email not found");
    }

    if (await user.comparePassword(password)) {
      return res.status(200).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

//get profile
const handlerGetUserProfile = async (id) => {
  try {
    let user = await User.findById(id);
    if (user) {
      return {
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
      };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
};

const userProfile = async (req, res, next) => {
  try {
    const userProfileData = await handlerGetUserProfile(req.user._id);
    res.status(200).json(userProfileData);
  } catch (error) {
    next(error);
  }
};

const getAnUser = async (req, res, next) => {
  try {
    const userProfileData = await handlerGetUserProfile(req.params.id);
    res.status(200).json(userProfileData);
  } catch (error) {
    next(error);
  }
};

//update profile

const handlerUpdateProfile = async (userId, updateData) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.name = updateData.name || user.name;
    user.email = updateData.email || user.email;

    if (updateData.password && updateData.password.length < 6) {
      throw new Error("Password length must be at least 6 characters");
    } else if (updateData.password) {
      user.password = updateData.password;
    }

    const updateUserProfile = await user.save();

    return {
      _id: updateUserProfile._id,
      avatar: updateUserProfile.avatar,
      name: updateUserProfile.name,
      email: updateUserProfile.email,
      verified: updateUserProfile.verified,
      admin: updateUserProfile.admin,
      token: await updateUserProfile.generateJWT(),
    };
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const updateData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const updateUserProfile = await handlerUpdateProfile(
      req.user._id,
      updateData
    );

    res.status(200).json(updateUserProfile);
  } catch (error) {
    next(error);
  }
};

const updateAnUser = async (req, res, next) => {
  try {
    const updateData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const updateUserProfile = await handlerUpdateProfile(
      req.params.id,
      updateData
    );

    res.status(200).json(updateUserProfile);
  } catch (error) {
    next(error);
  }
};

//update profile picture

const handleUpdateProfilePicture = async (user, file) => {
  let filename;

  if (file) {
    if (user.avatar) {
      filename = user.avatar;
      fileRemover(filename);
    }
    user.avatar = file.filename;
  } else {
    if (user.avatar) {
      filename = user.avatar;
      user.avatar = "";
      fileRemover(filename);
    }
  }

  await user.save();

  return {
    _id: user._id,
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    verified: user.verified,
    admin: user.admin,
    token: await user.generateJWT(),
  };
};

const updateProfilePicture = (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");
    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occurred when uploading " + err.message
        );
        throw error;
      } else {
        const updateUser = await User.findById(req.user._id);
        const updatedUserProfile = await handleUpdateProfilePicture(
          updateUser,
          req.file
        );

        res.json(updatedUserProfile);
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateProfilePictureForAnUser = (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");
    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occurred when uploading " + err.message
        );
        throw error;
      } else {
        const updateUser = await User.findById(req.params.id);
        const updatedUserProfile = await handleUpdateProfilePicture(
          updateUser,
          req.file
        );

        res.json(updatedUserProfile);
      }
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword;

    let where = {};
    if (filter) {
      where.$or = [
        { name: { $regex: filter, $options: "i" } },
        { email: { $regex: filter, $options: "i" } },
      ];
    }
    let query = User.find(where).select("-password");
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await User.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .sort({ createAt: "desc" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  //console.log(req.params.id);
  try {
    const userId = req.params.id;
    //console.log(userId);

    const userToDelete = await User.findByIdAndDelete(userId);

    if (!userToDelete) {
      const error = new Error("User was not found");
      return next(error);
    }

    // delete avatar
    if (userToDelete.avatar) {
      fileRemover(userToDelete.avatar);
    }

    return res.json({
      message: "User is successfully deleted",
      deletedUser: userToDelete,
    });
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
  getAllUsers,
  deleteUser,
  getAnUser,
  updateProfilePictureForAnUser,
  updateAnUser,
};
