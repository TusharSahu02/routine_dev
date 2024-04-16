import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Settings } from "lucide-react";
import SidebarLink from "./SidebarLink";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="lg:hidden cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="dark text-white w-[300px]" side="left">
        <div className="flex mt-3 items-center justify-between mr-2">
          <div className="size-[40px] rounded-lg bg-gray-400">
            {/* <UserAvatar /> */}
          </div>
          <Settings className=" cursor-pointer" />
        </div>
        <div className="mt-2">
          <h1 className=" font-bold text-[15px]">Tushar Sahu</h1>
          <p className=" text-gray-400 text-sm">@tusharsahu</p>
        </div>
        <SidebarLink />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
