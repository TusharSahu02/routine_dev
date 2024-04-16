import userAtom from "@/atom/userAtom";
import Navbar from "./base/Navbar";
import Sidebar from "./base/Sidebar";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";

const RoutineLayout = ({ children }) => {
  const user = useRecoilValue(userAtom);
  return (
    <div className="h-screen overflow-y-hidden">
      {user && <Navbar />}
      <div className="flex h-full">
        {user && <Sidebar />}
        <main
          className="p-2 w-full overflow-y-scroll 
        "
        >
          {children}
        </main>
      </div>
    </div>
  );
};

RoutineLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RoutineLayout;
