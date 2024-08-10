import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import UserAvatar from "../common/UserAvatar";

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import userAtom from "@/atom/userAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ProfileMenu = () => {
  const setUser = useSetRecoilState(userAtom);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  const user = useRecoilValue(userAtom);

  const [isHovered, setIsHovered] = useState(false);

  const fileRef = useRef(null);

  const profilePic = user?.profilePic ? user?.profilePic : "img/avatar.png";

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      localStorage.removeItem("routine-dev");
      setUser(null);

      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChlid>
          <UserAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dark mr-4 mt-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setProfileDialogOpen(true);
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setLogoutDialogOpen(true);
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logout Dialog  */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="dark text-white">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              You&apos;ll be logged out of your account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4">
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleLogout}>Yes, log me out</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="dark text-white">
          <form>
            <div className="mb-2 relative flex justify-center  items-center hover:opacity-50  transition-opacity duration-300">
              <img
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="size-[250px] cursor-pointer object-cover rounded-full"
                src={profilePic}
                alt=""
                onClick={() => fileRef.current.click()}
              />
              {isHovered && <p className="absolute">Edit</p>}
            </div>

            <input
              accept="image/*"
              hidden
              ref={fileRef}
              type="file"
              // onChange={handleImagChange}
            />

            <div>
              <Label>Name</Label>
              <Input disabled value={user?.name} />
            </div>

            <div>
              <Label>Username</Label>
              <Input disabled value={user?.username} />
            </div>
            <div>
              <Label>Email</Label>
              <Input disabled value={user?.email} />
            </div>

            <div>
              <Label>Bio</Label>
              <Input
                placeholder="Enter your name"
                disabled
                // value={name}
                // onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center mt-6">
              <button className="bg-white text-black px-5 py-2 rounded-full">
                Update Profile
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileMenu;
