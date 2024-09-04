"use client";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./services/firebase";
import { useEffect, useState } from "react";
import BlogCard from "./components/BlogCard";
import EmptyData from "./components/EmptyData";
import BlogCardsSkeleton from "./components/BlogCardsSkeleton";
import Link from "next/link";
import PlusIcon from "./components/icons/PlusIcon";
import ProductFilterTab from "./components/ProductFilterTab";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const q =
      filter == "All"
        ? query(collection(db, "blogs"))
        : query(collection(db, "blogs"), where("category", "==", filter));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setBlogs(arr);
      setIsloading(false);
    });

    return () => unsubscribe();
  }, [filter]);

  const handleFilter = (filter) => {
    setIsloading(true);
    setFilter(filter);
  };

  const isEmptyData = blogs.length === 0;

  return (
    <main className="flex flex-col gap-10">
      <ProductFilterTab active={filter} onFilter={handleFilter} />

      {isLoading && <BlogCardsSkeleton />}
      {!isLoading && isEmptyData && <EmptyData />}
      {!isLoading && !isEmptyData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, index) => {
            return (
              <div className="mx-auto" key={index}>
                <BlogCard
                  cover={blog.cover}
                  title={blog.title}
                  author={blog.author}
                  createdAt={blog.createdAt}
                  description={blog.description}
                  category={blog.category}
                  id={blog.id}
                />
              </div>
            );
          })}
        </div>
      )}
      <Link
        href="/blogs/create"
        className="btn btn-circle btn-primary fixed bottom-20 right-10"
      >
        <PlusIcon className="w-6 h-6 text-white" />
      </Link>
    </main>
  );
};

export default HomePage;
