import { Button } from "../ui/button";
import { BellIcon, Search } from "lucide-react";
import SearchInput from "./SearchInput";
import ProfileMenu from "./ProfileMenu";
import MobileSidebar from "./MobileSidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const Navbar = () => {
  // const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [searchResults, setSearchResults] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");

  // const handleSearch = async (q) => {
  //   setSearchQuery(q);
  //   try {
  //     const res = await fetch(`/api/search/?q=${q}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ q }),
  //     });
  //     const data = await res.json();
  //     setSearchResults(data);
  //     console.log(data, "data");
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (searchQuery) {
  //     handleSearch(searchQuery);
  //   }
  // }, [searchQuery]);

  // console.log(searchQuery, "searchQuery");

  // useEffect(() => {
  //   const down = (e) => {
  //     if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
  //       e.preventDefault();
  //       setOpen((open) => !open);
  //     }
  //   };
  //   document.addEventListener("keydown", down);
  //   return () => document.removeEventListener("keydown", down);
  // }, []);
  return (
    <>
      <nav className=" lg:px-[20px] flex justify-between items-center p-2 border-b">
        <div className="lg:hidden">
          <MobileSidebar />
        </div>
        <Link to="/">
          <img src="img/routine.svg" width={150} height={120} alt="logo" />
        </Link>
        <SearchInput />
        <div className="flex space-x-3 items-center">
          <Button size="icon" variant="secondary">
            <BellIcon className="h-6 w-6" />
          </Button>
          <ProfileMenu />
        </div>
      </nav>

      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div
            className="flex space-x-3 items-center cursor-pointer "
            onClick={() => setOpen(true)}
          >
            <Search className="w-5 h-5" />
            <p>Search</p>
          </div>
        </DialogTrigger>
        <DialogContent className="dark text-white overflow-y-scroll max-h-screen">
          <Command>
            <CommandInput
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CommandList>
              {searchResults.map((result) => (
                <CommandItem key={result.id}>{result.title}</CommandItem>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog> */}
    </>
  );
};

export default Navbar;
