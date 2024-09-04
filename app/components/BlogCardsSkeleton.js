const BlogCardsSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-10 justify-between">
      {[...Array(6)].map((_, index) => {
        return (
          <div className="flex w-[400px] flex-col gap-4" key={index}>
            <div className="skeleton h-32 w-full rounded-none"></div>
            <div className="skeleton h-4 w-28 rounded-none"></div>
            <div className="skeleton h-4 w-full rounded-none"></div>
            <div className="skeleton h-4 w-full rounded-none"></div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogCardsSkeleton;
