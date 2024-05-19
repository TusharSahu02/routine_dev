import postAtom from "@/atom/postAtom";
import FeedPost from "@/components/post/FeedPost";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Bookmark = () => {
  // const [data, setData] = useState([]);
  const setPosts = useSetRecoilState(postAtom);
  const posts = useRecoilValue(postAtom);

  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const res = await fetch("/api/posts/bookmarks", {});
        const data = await res.json();
        // console.log(data);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBookmarks();
  }, [setPosts]);
  return (
    <div className="text-white p-6 lg:p-10">
      <div className="grid grid-cols-1 2xl:grid-cols-5  xl:grid-cols-4  md:grid-cols-2 gap-6 mb-[80px]">
        {/* {Array.from({ length: 8 }).map((_, index) => (
      <FeedPost key={index} />
    ))} */}
        {posts.map((post) => (
          <FeedPost key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
