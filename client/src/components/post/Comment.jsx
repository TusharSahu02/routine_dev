import { Link } from "react-router-dom";
import UserAvatar from "../common/UserAvatar";
import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

const Comment = ({ post, user, formatDate, handleComment, text, setText }) => {
  return (
    <div className=" h-full overflow-y-scroll hideScrollbar">
      <div className="mt-6 rounded-xl overflow-hidden w-full">
        <img src={post?.image} alt="" className="size-full object-center" />
      </div>
      <div className="px-2 ">
        <h1 className="text-xl text-start font-bold leading-tight mt-2 mb-1 ">
          {post?.title}
        </h1>
        <h1 className="text-sm text-start  leading-tight mt-2 mb-4 ">
          {post?.description}
        </h1>
      </div>
      <div className="px-2">
        <p className="text-xs text-gray-400  mb-3">{formatDate}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="size-[50px] flex items-center justify-center rounded-full ">
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
          </div>
          <div className="flex flex-col items-start">
            <h1 className="text-sm font-semibold">{user?.name}</h1>
            <p className="text-xs ml-1 text-gray-400">{user?.username}</p>
          </div>
        </div>
        <Link
          to={post?.url}
          target="_blank"
          className="px-3 group-hover-custom-1 flex items-center gap-1   bg-white text-black text-lg font-semibold rounded-lg"
        >
          read <ExternalLink size={14} />
        </Link>
      </div>
      <div>
        {post?.replies &&
          post?.replies.map((reply) => (
            <div
              key={reply._id}
              className="mt-6 flex items-center gap-2 rounded-xl overflow-hidden w-full"
            >
              <div className="size-[45px] rounded-full bg-gray-400"></div>
              <div>
                <h1 className="text-sm">{reply?.username}</h1>
                <p>{reply?.text}</p>
              </div>
            </div>
          ))}
      </div>

      <div className="flex gap-3 mt-7 w-full items-center justify-between">
        <div>
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
        </div>
        <div className="w-full  mr-2">
          <Input
            className="w-full "
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-end mt-5">
        <Button onClick={handleComment} className="w-max">
          Reply
        </Button>
      </div>
    </div>
  );
};

export default Comment;
