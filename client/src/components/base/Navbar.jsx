import { Button } from "../ui/button";
import { BellIcon } from "lucide-react";
import SearchInput from "./SearchInput";
import ProfileMenu from "./ProfileMenu";
import MobileSidebar from "./MobileSidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dark text-white overflow-y-scroll max-h-screen">
          <Command open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>Profile</CommandItem>
                <CommandItem>Billing</CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
