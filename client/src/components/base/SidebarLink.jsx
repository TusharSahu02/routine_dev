import { ArrowBigUp, Flame, Bookmark, EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import UserAvatar from "../common/UserAvatar";
import AddPost from "../post/AddPost";

const SidebarLink = () => {
  return (
    <>
      <Link to="/" className="flex items-center space-x-4 py-4">
        <UserAvatar />
        <p>My Feed</p>
      </Link>
      <p className="my-2 font-bold text-muted-foreground">Discover</p>
      <ul>
        <li className="hover:bg-gray-700  py-2 px-2 transition-color duration-300 rounded-xl ">
          <Link to="/popular" className="flex  items-center justify-between">
            <div className="flex space-x-3">
              <Flame className="w-5 h-5" />
              <p>Popular</p>
            </div>
            <div className="size-2 rounded-full bg-gray-700"></div>
          </Link>
        </li>
        {/* <li className="hover:bg-gray-700 cursor-pointer  py-2 px-2 transition-color duration-300 rounded-xl ">
          <SearchDialog />
        </li> */}
        <li className="hover:bg-gray-700   py-2 px-2 transition-color duration-300 rounded-xl ">
          <Link to="/most-voted" className="flex space-x-3 items-center ">
            <ArrowBigUp className="w-5 h-5" />
            <p>Most Voted</p>
          </Link>
        </li>
      </ul>
      <p className="my-2 font-bold text-muted-foreground">Contribute</p>
      <ul>
        <li className=" cursor-pointer hover:bg-gray-700 py-2 px-2 transition-color duration-300 rounded-xl ">
          <AddPost />
        </li>
      </ul>
      <p className="my-2 font-bold text-muted-foreground">Manage</p>
      <ul>
        <li className="hover:bg-gray-700  py-2 px-2 transition-color duration-300 rounded-xl ">
          <Link to="/bookmarks" className="flex space-x-3 items-center ">
            <Bookmark className="w-5 h-5" />
            <p>Bookmarks</p>
          </Link>
        </li>
        <li className="hover:bg-gray-700  py-2 px-2 transition-color duration-300 rounded-xl ">
          <Link to="/history" className="flex space-x-3 items-center ">
            <EyeIcon className="w-5 h-5" />
            <p>History</p>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default SidebarLink;
