"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/services/firebase";
import { formatDate } from "@/app/utils/formatDate";
import { productCategories } from "@/app/constants/product";

const CreateBlogPage = () => {
  const [blogInput, setBlogInput] = useState({
    cover: "",
    category: productCategories[0],
    author: "",
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    const now = new Date();
    const createdAt = formatDate(now);

    const newBlog = {
      ...blogInput,
      createdAt,
    };

    try {
      await addDoc(collection(db, "blogs"), newBlog);
      setBlogInput({
        cover: "",
        category: "",
        author: "",
        title: "",
        description: "",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <main>
      <form
        className="max-w-[500px] mx-auto flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-center">Create Blog</h1>
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
          disabled={isLoading}
        >
          {isLoading && <span className="loading loading-spinner" />}
          Create
        </button>
      </form>
    </main>
  );
};

export default CreateBlogPage;
