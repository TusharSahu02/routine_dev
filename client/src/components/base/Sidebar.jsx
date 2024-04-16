import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  return (
    <div className="w-[260px] h-full hidden lg:block border-r px-3">
      <SidebarLink />
    </div>
  );
};

export default Sidebar;
