import FeedPost from "@/components/post/FeedPost";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MostVoted = () => {
  const [data, setData] = useState([]);
  const getMostVotedPosts = async () => {
    try {
      const res = await fetch("/api/posts/most-voted", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setData(data);
      // console.log(data);
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    getMostVotedPosts();
  }, []);
  return (
    <div className="text-white p-6 lg:p-10">
      <div className="grid grid-cols-1 2xl:grid-cols-5  xl:grid-cols-4  md:grid-cols-2 gap-6 mb-[80px]">
        {data?.map((post) => (
          <FeedPost key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MostVoted;
