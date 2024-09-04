"use client";
import { useState } from "react";
import HeartFilledIcon from "./icons/HeartFilledIcon";
import HeartIcon from "./icons/HeartIcon";
import Link from "next/link";

const BlogCard = ({
  cover,
  title,
  author,
  createdAt,
  description,
  category,
  id,
}) => {
  const [isFav, setIsFav] = useState(false);
  return (
    <div className="w-[400px] flex flex-col gap-2">
      <img src={cover} alt={title} className="w-full h-[260px] object-cover" />
      <p className="text-[#808080] font-semibold text-sm mt-3">
        {author} • {createdAt} • {category}
      </p>
      <div className="flex justify-between items-center">
        <Link href={`/blogs/${id}`}>
          <h3 className="text-2xl font-semibold hover:underline">{title}</h3>
        </Link>
        <button className="btn btn-circle" onClick={() => setIsFav(!isFav)}>
          {isFav ? (
            <HeartFilledIcon className="w-6 h-6 text-primary" />
          ) : (
            <HeartIcon className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>
      <p className="text-[#808080] line-clamp-3">{description}</p>
    </div>
  );
};

export default BlogCard;
