import { Skeleton } from "../ui/skeleton";

const SkeletonPost = () => {
  return (
    <div className="flex flex-col space-y-2 ">
      <div className="flex items-center space-x-3">
        <Skeleton className={"size-[50px] rounded-full"} />
        <div className=" w-[80%] space-y-1">
          <Skeleton className="h-3 w-4/6" />
          <Skeleton className="h-3 w-3/6" />
        </div>
      </div>
      <div className="space-y-1 flex flex-col">
        <Skeleton className="h-3 w-3/6" />
        <Skeleton className="h-3 w-5/6" />
      </div>
      <div>
        <Skeleton className="h-[200px] w-full" />
      </div>
    </div>
  );
};

export default SkeletonPost;
