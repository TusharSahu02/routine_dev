import postAtom from "@/atom/postAtom";
import SkeletonPost from "@/components/common/SkeletonPost";
import FeedPost from "@/components/post/FeedPost";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";

const Home = () => {
  // const [data, setData] = useState([]);
  const setPosts = useSetRecoilState(postAtom);
  const posts = useRecoilValue(postAtom);
  const [isLoading, setIsLoading] = useState(true);

  const getFeedPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/posts/feed", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
      setIsLoading(false);
    }
  }, [setPosts]);

  useEffect(() => {
    getFeedPosts();
  }, [getFeedPosts]);

  return (
    // <RoutineLayout>
    <div className="text-white p-6 lg:p-10">
      <div className="grid grid-cols-1 2xl:grid-cols-5  xl:grid-cols-4  md:grid-cols-2 gap-6 mb-[80px]">
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonPost key={index} />
            ))}
          </>
        ) : (
          <>
            {posts.map((post) => (
              <FeedPost key={post._id} post={post} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
