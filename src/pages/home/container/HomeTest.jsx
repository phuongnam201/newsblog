import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import { images } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";
import ArticleCard from "../../../components/ArticleCard";
import { FaArrowRight } from "react-icons/fa";

let isFirstRun = true;

const HomeTest = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const {
    data: postsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => getAllPosts(searchKeyword),
    queryKey: ["posts", searchKeyword], // Include searchKeyword as a dependency
  });

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [refetch, searchKeyword]); // Add searchKeyword as a dependency

  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    refetch();
  };
  return (
    <section>
      <div className="w-10/12 m-auto container mx-auto flex flex-col px-5 py-3 lg:flex-row">
        <div className="mt-10 lg:w-1/2">
          <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
            Read the most interesting articles
          </h1>
          <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>

          <form className="relative" onSubmit={submitSearchKeywordHandler}>
            <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative border-2 border-transparent rounded-lg">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
                <input
                  className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
                  type="text"
                  placeholder="Search article"
                  value={searchKeyword}
                  onChange={searchKeywordHandler}
                />
              </div>
              <button className="w-full bg-primary text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2 hover:bg-[#CCEEFF] hover:text-primary">
                Search
              </button>
            </div>
          </form>

          <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
            <span className="text-dark-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
              Popular Tags:
            </span>
            <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
              <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
                Design
              </li>
              <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
                User Experience
              </li>
              <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
                User Interfaces
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden lg:block lg:1/2">
          <img
            className="w-full"
            src={images.HeroImage}
            alt="users are reading articles"
          />
        </div>
      </div>
      <div>
        <span className="w-10/12 m-auto container mx-auto flex flex-col px-5 py-3 lg:flex-row font-semibold text-2xl">
          {searchKeyword ? `Results for "${searchKeyword}": ` : "New Articles"}
        </span>
      </div>
      <div className="flex flex-col w-10/12 container mx-auto px-5 py-5">
        <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {isLoading ? (
            [...Array(3)].map((item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.3333%-20px)]"
              />
            ))
          ) : isError ? (
            <ErrorMessage message="Couldn't fetch the search results" />
          ) : (
            postsData?.data.map((post) => (
              <ArticleCard
                key={post._id}
                post={post}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          )}
        </div>
        <button className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white">
          <span>More articles</span>
          <FaArrowRight className="w-3 h-3" />
        </button>
      </div>
    </section>
  );
};

export default HomeTest;
