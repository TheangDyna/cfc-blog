"use client";

import ArrowLongLeftIcon from "@/app/components/icons/ArrowLongLeftIcon";
import EllipsisVerticalIcon from "@/app/components/icons/EllipsisVerticalIcon";
import { db } from "@/app/services/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BlogDetailPage = ({ params }) => {
  const { blogId } = params;
  const router = useRouter();
  const [blog, setBlog] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getDataById = async () => {
      const docRef = doc(db, "blogs", blogId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBlog(docSnap.data());
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    getDataById();
  }, [blogId]);

  if (isNotFound) notFound();

  const handleDelete = async () => {
    await deleteDoc(doc(db, "blogs", blogId));
    router.back();
  };

  return (
    <div className="flex flex-col gap-5 max-w-[800px] mx-auto">
      {isLoading && (
        <>
          <div className="skeleton h-4 w-full rounded-none"></div>
          <div className="skeleton h-[300px] w-full rounded-none"></div>
          <div className="skeleton h-4 w-28 rounded-none"></div>
          <div className="skeleton h-4 w-32 rounded-none"></div>
          <div className="skeleton h-4 w-full rounded-none"></div>
          <div className="skeleton h-4 w-full rounded-none"></div>
          <div className="skeleton h-4 w-full rounded-none"></div>
        </>
      )}

      {!isLoading && (
        <>
          <div className="flex items-center gap-5">
            <button
              className="btn btn-circle btn-ghost btn-sm"
              onClick={() => router.back()}
            >
              <ArrowLongLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-semibold">Titlte: {blog.title}</h1>
            <div className="flex flex-1" />
            <div className="dropdown dropdown-bottom dropdown-end">
              <button className="btn btn-circle btn-ghost btn-sm">
                <EllipsisVerticalIcon className="w-6 h-6" />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <button onClick={() => router.push(`/blogs/edit/${blogId}`)}>
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    className="text-red-500"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <img src={blog.cover} className="" />
          <p>Author: {blog.author}</p>
          <p>Created At: {blog.createdAt}</p>
          <p>Description: {blog.description}</p>
        </>
      )}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete item</h3>
          <p className="py-4">Are you sure you want to delete this item?</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-5">
              <button className="btn">Cancel</button>
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BlogDetailPage;
