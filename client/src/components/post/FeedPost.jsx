import {
  ArrowBigUp,
  Bookmark,
  ExternalLink,
  Link as LinkIcon,
  MessageSquareText,
} from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import UserAvatar from "../common/UserAvatar";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import postAtom from "@/atom/postAtom";
import updateAtom from "@/atom/updateAtom";
import Comment from "./Comment";

const FeedPost = ({ post }) => {
  const author = post?.author;
  const [user, setUser] = useState("");
  const [text, setText] = useState("");

  const sheetRef = useRef();

  // const loggedUser = useRecoilValue(userAtom);
  const setPosts = useSetRecoilState(postAtom);
  const updatePost = useSetRecoilState(updateAtom);
  const posts = useRecoilValue(postAtom);

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
  }, [author, post.authorId]);

  const formatDate = post?.createdAt
    ? new Date(post?.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const handleCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(post?.url);
      toast.success("Link copied to clipboard", {
        duration: 2000,
      });
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  const handleLikeDislike = async () => {
    if (!user || !posts) {
      toast.error("Please login first", {
        duration: 2000,
      });
      return;
    }
    try {
      const res = await fetch(`/api/posts/like-unlike/${post?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedPost = await res.json();

      if (updatedPost) {
        setPosts((currentPosts) =>
          currentPosts.map((p) => (p._id === post._id ? updatedPost : p))
        );
        updatePost((prev) => prev + 1);
      }
      toast.success(updatedPost.message, {
        duration: 2000,
      });
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  const handleBookmark = async () => {
    try {
      const res = await fetch(`/api/posts/bookmark/${post?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedPost = await res.json();

      if (updatedPost) {
        setPosts((currentPosts) =>
          currentPosts.map((p) => (p._id === post._id ? updatedPost : p))
        );
        updatePost((prev) => prev + 1);

        toast.success(updatedPost.message, {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  const handleComment = async () => {
    try {
      const res = await fetch(`/api/posts/reply/${post?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error, {
          duration: 2000,
        });
        return;
      }
      if (posts) {
        setPosts((currentPosts) =>
          currentPosts.map((p) => (p._id === post._id ? data : p))
        );

        updatePost((prev) => prev + 1);
        setText("");
        toast.success("Comment added", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
      console.log(error.message);
    }
  };

  return (
    <>
      <div className=" flex flex-col  justify-between bg-[#1c1e26] group-custom-1 border-[1px] border-gray-700 hover:border-gray-600 transition-colors duration-300 cursor-pointer px-3 py-3 rounded-xl">
        <Sheet className="w-full  ">
          <SheetTrigger>
            <div>
              <div className="flex items-start justify-between ">
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
                  <div className="flex flex-col items-start">
                    <h1 className="text-sm font-semibold">{user?.name}</h1>
                    <p className="text-xs ml-1 text-gray-400">
                      {user?.username}
                    </p>
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

              <div className="px-2 ">
                <h1 className="text-xl text-start font-bold leading-tight mt-2 mb-1 lg:line-clamp-2">
                  {post?.title}
                </h1>
                <h1 className="text-sm text-start  leading-tight mt-2 mb-7 line-clamp-2">
                  {post?.description}
                </h1>
              </div>
            </div>
          </SheetTrigger>
          <SheetContent className="dark  text-white ">
            <Comment
              post={post}
              user={user}
              formatDate={formatDate}
              handleComment={handleComment}
              text={text}
              setText={setText}
            />
          </SheetContent>
        </Sheet>

        <div>
          <Sheet>
            <SheetTrigger>
              <div className="px-2">
                <p className="text-xs text-gray-400  mb-3">{formatDate}</p>
              </div>
            </SheetTrigger>
            <SheetContent className="dark   text-white ">
              <Comment
                post={post}
                user={user}
                formatDate={formatDate}
                handleComment={handleComment}
                text={text}
                setText={setText}
              />
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger>
              <div className="w-full h-[150px] bg-gray-600 rounded-2xl">
                {post?.image && (
                  <img
                    src={post?.image}
                    alt="post"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
              </div>
            </SheetTrigger>
            <SheetContent className="dark  text-white ">
              <Comment
                post={post}
                user={user}
                formatDate={formatDate}
                handleComment={handleComment}
                text={text}
                setText={setText}
              />
            </SheetContent>
          </Sheet>

          <div className="flex items-center justify-between px-5 my-3">
            <div
              className="flex  cursor-pointer group gap-1"
              onClick={handleLikeDislike}
            >
              <ArrowBigUp className="group-hover:text-green-400  transition-colors duration-300 font-semibold" />
              <p className="group-hover:text-green-400 transition-colors duration-300 font-semibold">
                {post?.likes?.length === 0 ? "" : post?.likes?.length}
              </p>
            </div>

            <Dialog>
              <DialogTrigger>
                <div className="flex  cursor-pointer group gap-1">
                  <MessageSquareText className="group-hover:text-blue-400  transition-colors duration-300 font-semibold" />
                  <p className="group-hover:text-blue-400 transition-colors duration-300 font-semibold">
                    {post?.replies?.length === 0 ? "" : post?.replies?.length}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="dark text-white ">
                <div className=" mt-4">
                  <div className="w-full h-[180px] bg-gray-600 rounded-2xl">
                    {post?.image && (
                      <img
                        src={post?.image}
                        alt="post"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
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
                        <p className="text-xs text-gray-400">
                          {user?.username}
                        </p>
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
                    <h1 className="text-xl font-bold leading-tight mt-2 mb-1 ">
                      {post?.title}
                    </h1>
                    <h1 className="text-sm  leading-tight mt-2 mb-7 ">
                      {post?.description}
                    </h1>
                  </div>
                  <div className="flex gap-3 w-full items-center justify-between">
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
                    <div className="w-full">
                      <Input
                        className="w-full"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </div>
                    <div>
                      <Button onClick={handleComment} className="w-full">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div
              onClick={handleCopyClipboard}
              className="flex  cursor-pointer group gap-1"
            >
              <LinkIcon className="group-hover:text-purple-400  transition-colors duration-300 font-semibold" />
              <p className="group-hover:text-purple-400 transition-colors duration-300 font-semibold">
                {post?.share?.length === 0 ? "" : post?.share?.length}
              </p>
            </div>
            <div
              className="flex  cursor-pointer group gap-1"
              onClick={handleBookmark}
            >
              <Bookmark className="group-hover:text-orange-400 transition-colors duration-300 font-semibold" />
              <p className="group-hover:text-orange-400 transition-colors duration-300 font-semibold">
                {post?.bookmarks?.length === 0 ? "" : post?.bookmarks?.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedPost;
