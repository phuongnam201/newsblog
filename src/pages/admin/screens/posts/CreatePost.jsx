import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { createPost2 } from "../../../../services/index/posts";
import { HiOutlineCamera } from "react-icons/hi";
import { toast } from "react-hot-toast";
import Editor from "../../../../components/editor/Editor";
import MultiSelectTagDropdown from "../../components/select-dropdown/MultiSelectTagDropdown";
import { getPostAllCategories } from "../../../../services/index/postCategories";
import { filterCategories } from "../../../../utils/multiSelectTagUtils";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { images, stables } from "../../../../constants";
import { useNavigate } from "react-router-dom";

const promiseOptions = async (inputValue) => {
  const categoriesData = await getPostAllCategories();
  return filterCategories(inputValue, categoriesData);
};

const CreatePost = () => {
  const userState = useSelector((state) => state.user);
  const [photo, setPhoto] = useState(null);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [body, setBody] = useState("");
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [postSlug, setPostSlug] = useState("");
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const {
    mutate: mutateCreatePostDetail,
    isLoading: isLoadingCreatePostDetail,
  } = useMutation({
    mutationFn: ({ createData, token }) => {
      //console.log(createData);
      return createPost2({
        createData,
        token,
      });
    },
    onSuccess: (data) => {
      toast.success("Post is updated");
      navigate("/admin/posts/manage/");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleCreatePost = async () => {
    try {
      let createData = new FormData();

      // Handle file upload
      if (!initialPhoto && photo) {
        createData.append("postPicture", photo);
      } else if (initialPhoto && !photo) {
        const urlToObject = async (url) => {
          let response = await fetch(url);
          let blob = await response.blob();
          const file = new File([blob], initialPhoto, { type: blob.type });
          return file;
        };
        const picture = await urlToObject(
          stables.UPLOAD_FOLDER_BASE_URL + photo
        );

        createData.append("postPicture", picture);
      }

      // Handle document data
      const documentData = {
        title,
        caption,
        body,
        postSlug,
        tags,
        categories,
      };

      createData.append("document", JSON.stringify(documentData));

      // debugging
      //console.log("FormData:", createData);

      // Perform the mutation
      mutateCreatePostDetail({
        createData,
        token: userState.userInfo.token,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error);
    }
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your Post picture?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };

  return (
    <div>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <label htmlFor="postPicture" className="w-full cursor-pointer">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="postPicture"
                className="rounded-xl w-full"
              />
            ) : initialPhoto ? (
              <img
                src={images.samplePostImage}
                alt="postPicture"
                className="rounded-xl w-full"
              />
            ) : (
              <div className="w-full min-h-[200px] bg-blue-50/50 flex justify-center items-center">
                <HiOutlineCamera className="w-7 h-auto text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="postPicture"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={handleDeleteImage}
            className="absolute bg-red-500 text-sm mt-5 text-white font-semibold rounded-lg px-2 py-1 "
          >
            Delete Image
          </button>
          <div className="mb-5 mt-12">
            <label className="d-label">
              <span className="d-label-text">Categories</span>
            </label>
            <MultiSelectTagDropdown
              loadOptions={promiseOptions}
              onChange={(newValue) =>
                setCategories(newValue.map((item) => item.value))
              }
            />
          </div>
          <div className="mb-5 mt-2">
            <label className="d-label">
              <span className="d-label-text">Tags</span>
            </label>
            <CreatableSelect
              isMulti
              onChange={(newValue) =>
                setTags(newValue.map((item) => item.value))
              }
              className="relative z-19"
            />
          </div>
          <div className="d-form-control w-full">
            <label className="d-label" htmlFor="title">
              <span className="d-label-text">Title</span>
            </label>
            <input
              id="title"
              value={title}
              className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
              required
            />
          </div>
          <div className="d-form-control w-full">
            <label className="d-label" htmlFor="caption">
              <span className="d-label-text">Caption</span>
            </label>
            <input
              id="caption"
              value={caption}
              className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
              onChange={(e) => setCaption(e.target.value)}
              placeholder="caption"
              required
            />
          </div>
          <div className="d-form-control w-full">
            <label className="d-label" htmlFor="slug">
              <span className="d-label-text">Slug</span>
            </label>
            <input
              id="slug"
              value={postSlug}
              className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
              onChange={(e) =>
                setPostSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())
              }
              placeholder="post slug"
            />
          </div>
          <div className="w-full">
            <label className="d-label" htmlFor="title">
              <span className="d-label-text">Content</span>
            </label>
            <Editor
              content={body}
              editable={true}
              onDataChange={(data) => setBody(data)}
              className={`mb-5`}
              className2={`rounded-sm border my-3 w-full`}
            />
          </div>
          <button
            type="button"
            onClick={handleCreatePost}
            disabled={isLoadingCreatePostDetail}
            className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoadingCreatePostDetail ? "Creating..." : "Create Post"}
          </button>
        </article>
      </section>
    </div>
  );
};

export default CreatePost;
