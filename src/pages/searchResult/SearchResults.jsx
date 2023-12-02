import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import ArticleCard from "../../components/ArticleCard";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAllPosts } from "../../services/index/posts";
import { FiSearch } from "react-icons/fi";

let isFirstRun = true;

const SearchResults = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    data: postsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => getAllPosts(searchKeyword),
    queryKey: ["posts"],
  });

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [refetch]);

  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <MainLayout>
      <div className="mx-auto mt-10 lg:w-1/2">
        <form className="relative" onSubmit={submitSearchKeywordHandler}>
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
          <input
            className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
            type="text"
            placeholder="Search article"
            value={searchKeyword}
            onChange={searchKeywordHandler}
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2 hover:bg-[#CCEEFF] hover:text-primary"
          >
            Search
          </button>
        </form>
      </div>

      <section className="flex flex-col w-10/12 container mx-auto px-5 py-10">
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
      </section>
    </MainLayout>
  );
};

export default SearchResults;
