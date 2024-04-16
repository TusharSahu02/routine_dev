import {
  ArrowBigUp,
  ExternalLink,
  Link as LinkIcon,
  MessageSquareText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserAvatar from "../common/UserAvatar";

const FeedPost = ({ post }) => {
  const author = post?.author;
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUserById = async () => {
      try {
        const res = await fetch(`/api/users/profile/${author}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserById();
  }, [post?.authorId]);

  const formatDate = post?.createdAt
    ? new Date(post?.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <>
      <div className=" flex flex-col  justify-between bg-[#1c1e26] group-custom-1 border-[1px] border-gray-700 hover:border-gray-600 transition-colors duration-300 cursor-pointer px-3 py-3 rounded-xl">
        <div>
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-3 px-2">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  alt="profile"
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="size-[40px] bg-gray-600 rounded-full">
                  <UserAvatar />
                </div>
              )}
              <div>
                <h1 className="text-sm font-semibold">{user?.name}</h1>
                <p className="text-xs text-gray-400">{user?.username}</p>
              </div>
            </div>
            <Link
              to={post?.url}
              target="_blank"
              className="px-3 group-hover-custom-1 gap-1  hidden bg-white text-black text-lg font-semibold rounded-lg"
            >
              read <ExternalLink size={14} />
            </Link>
          </div>

          <div className="px-2">
            <h1 className="text-xl font-bold leading-tight mt-2 mb-1 lg:line-clamp-2">
              {post?.title}
            </h1>
            <h1 className="text-sm  leading-tight mt-2 mb-7 line-clamp-2">
              {post?.description}
            </h1>
          </div>
        </div>

        <div>
          <div className="px-2">
            <p className="text-xs text-gray-400  mb-3">{formatDate}</p>
          </div>
          <div className="w-full h-[150px] bg-gray-600 rounded-2xl">
            {post?.image && (
              <img
                src={post?.image}
                alt="post"
                className="w-full h-full object-cover rounded-2xl"
              />
            )}
          </div>
          <div className="flex items-center justify-between px-5 my-3">
            <div className="flex  cursor-pointer group gap-1">
              <ArrowBigUp className="group-hover:text-green-400  transition-colors duration-300 font-semibold" />
              <p className="group-hover:text-green-400 transition-colors duration-300 font-semibold">
                {post?.likes?.length === 0 ? "" : post?.likes?.length}
              </p>
            </div>
            <div className="flex  cursor-pointer group gap-1">
              <MessageSquareText className="group-hover:text-blue-400  transition-colors duration-300 font-semibold" />
              <p className="group-hover:text-blue-400 transition-colors duration-300 font-semibold">
                {post?.replies?.length === 0 ? "" : post?.replies?.length}
              </p>
            </div>
            <div className="flex  cursor-pointer group gap-1">
              <LinkIcon className="group-hover:text-purple-400  transition-colors duration-300 font-semibold" />
              <p className="group-hover:text-purple-400 transition-colors duration-300 font-semibold">
                {post?.share?.length === 0 ? "" : post?.share?.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedPost;
