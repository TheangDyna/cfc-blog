"use client";

import { productCategories } from "@/app/constants/product";
import { db } from "@/app/services/firebase";
import { formatDate } from "@/app/utils/formatDate";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BlogEditPage = ({ params }) => {
  const { blogId } = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [blogInput, setBlogInput] = useState({
    cover: "",
    category: "",
    author: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogInput((cv) => {
      return {
        ...cv,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    const now = new Date();
    const updatedAt = formatDate(now);

    const newBlog = {
      ...blogInput,
      updatedAt,
    };

    try {
      await updateDoc(doc(db, "blogs", blogId), newBlog);
      setIsUpdateLoading(false);
      router.back();
    } catch (error) {
      setIsUpdateLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const getDataById = async () => {
      const docRef = doc(db, "blogs", blogId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBlogInput(docSnap.data());
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    getDataById();
  }, [blogId]);

  if (isNotFound) notFound();

  return (
    <main>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <form
          className="max-w-[500px] mx-auto flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl text-center">Edit Blog</h1>
          <input
            type="text"
            placeholder="Cover url..."
            className="input input-bordered w-full"
            name="cover"
            required
            onChange={handleChange}
            value={blogInput.cover}
          />
          <select
            className="select input-bordered w-ful"
            required
            onChange={handleChange}
            name="category"
            value={blogInput.category}
          >
            {productCategories.map((category, index) => {
              return (
                <option key={index} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            placeholder="Author..."
            className="input input-bordered w-full"
            name="author"
            required
            onChange={handleChange}
            value={blogInput.author}
          />
          <input
            type="text"
            placeholder="Title..."
            className="input input-bordered w-full"
            name="title"
            required
            onChange={handleChange}
            value={blogInput.title}
          />
          <textarea
            className="textarea text-base textarea-bordered w-full"
            placeholder="description..."
            name="description"
            required
            onChange={handleChange}
            value={blogInput.description}
          />
          <button
            className="btn btn-primary text-white"
            type="submit"
            disabled={isUpdateLoading}
          >
            {isUpdateLoading && <span className="loading loading-spinner" />}
            Edit
          </button>
        </form>
      )}
    </main>
  );
};

export default BlogEditPage;
