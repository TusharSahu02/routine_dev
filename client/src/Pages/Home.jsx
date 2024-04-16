import FeedPost from "@/components/post/FeedPost";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [data, setData] = useState([]);
  const getFeedPosts = async () => {
    try {
      const res = await fetch("/api/posts/feed", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setData(data);
      console.log(data);
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    getFeedPosts();
  }, []);

  return (
    // <RoutineLayout>
    <div className="text-white p-6 lg:p-10">
      <div className="grid grid-cols-1 2xl:grid-cols-5  xl:grid-cols-4  md:grid-cols-2 gap-6 mb-[80px]">
        {/* {Array.from({ length: 8 }).map((_, index) => (
          <FeedPost key={index} />
        ))} */}
        {data.map((post) => (
          <FeedPost key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
