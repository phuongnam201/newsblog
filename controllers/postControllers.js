import { uploadPicture } from "../middleware/uploadPictureMiddleware";
import Post from "../models/Post";
import Comment from "../models/Comment";
import { fileRemover } from "../utils/fileRemover";
import { v4 as uuidv4 } from "uuid";

const createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: "sample title",
      caption: "sample caption",
      slug: uuidv4(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      user: req.user._id,
    });

    const createdPost = await post.save();

    return res.json(createdPost);
  } catch (error) {
    next(error);
  }
};

const createPost2 = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("postPicture");

    const handleCreatePostData = async (data) => {
      //console.log("Raw data:", data);

      try {
        if (!data) {
          throw new Error("Data is undefined or null");
        }

        const { title, caption, body, slug, tags, categories } =
          JSON.parse(data);
        console.log("Parsed data:", {
          title,
          caption,
          body,
          slug,
          tags,
          categories,
        });

        const post = new Post({
          title: title || "sample title",
          caption: caption || "sample caption",
          slug: slug || uuidv4(),
          body: body || { type: "doc", content: [] },
          photo: req.file ? req.file.filename : "", // Use filename if file exists
          user: req.user._id,
          tags: tags || [],
          categories: categories || [],
        });

        const createdPost = await post.save();
        return createdPost;
      } catch (error) {
        console.error("Error parsing post data:", error);
        throw new Error("Error parsing post data");
      }
    };

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occurred when uploading " + err.message
        );
        next(error);
      } else {
        try {
          const createdPost = await handleCreatePostData(req.body.document);
          //console.log("this is clg req", req.body.document);
          res.json(createdPost);
        } catch (error) {
          next(error);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post was not found");
      next(error);
      return;
    }

    const upload = uploadPicture.single("postPicture");

    const handleUpdatePostData = async (data) => {
      const { title, caption, slug, body, tags, categories } = JSON.parse(data);
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;
      const updatedPost = await post.save();
      return res.json(updatedPost);
    };

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occurred when uploading " + err.message
        );
        next(error);
      } else {
        // Everything went well
        console.log("object");
        if (req.file) {
          let filename = post.photo;
          if (filename) {
            fileRemover(filename);
          }
          post.photo = req.file.filename;
        } else {
          // If no file is uploaded, set photo to an empty string
          console.log("test");
          let filename = post.photo;
          post.photo = "";
          if (filename) {
            fileRemover(filename);
          }
        }

        // Continue with updating post data
        handleUpdatePostData(req.body.document);
      }
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post aws not found");
      return next(error);
    }

    await Comment.deleteMany({ post: post._id });

    return res.json({
      message: "Post is successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      },
      {
        path: "categories",
        select: ["title"],
      },
      {
        path: "comments",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "name"],
          },

          {
            path: "replies",
            match: {
              check: true,
            },
            populate: [
              {
                path: "user",
                select: ["avatar", "name"],
              },
            ],
          },
        ],
      },
    ]);

    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    return res.json(post);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword;
    let where = {};
    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    }
    let query = Post.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Post.find(where).countDocuments();
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
      .populate([
        {
          path: "user",
          select: ["avatar", "name", "verified"],
        },
      ])
      .sort({ createdAt: "desc" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
  createPost2,
};
