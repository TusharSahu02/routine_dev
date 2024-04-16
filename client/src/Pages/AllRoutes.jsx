import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";
import { useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
import RoutineLayout from "@/components/RoutineLayout";
import Popular from "./Popular";
import MostVoted from "./MostVoted";
import Bookmark from "./Bookmark";
import History from "./History";

const AllRoutes = () => {
  const user = useRecoilValue(userAtom);
  return (
    <div className="dark h-screen">
      <RoutineLayout>
        <Routes>
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/" />}
          />
          <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
          <Route
            path="/popular"
            element={user ? <Popular /> : <Navigate to="/auth" />}
          />
          <Route
            path="/most-voted"
            element={user ? <MostVoted /> : <Navigate to="/auth" />}
          />
          <Route
            path="/bookmarks"
            element={user ? <Bookmark /> : <Navigate to="/auth" />}
          />
          <Route
            path="/history"
            element={user ? <History /> : <Navigate to="/auth" />}
          />
        </Routes>
      </RoutineLayout>
    </div>
  );
};

export default AllRoutes;
