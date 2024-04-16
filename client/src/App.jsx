import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import AllRoutes from "./Pages/AllRoutes";
import "./index.css";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <div className="dark bg-[#101219] text-white" suppressHydrationWarning>
        <Router>
          <RecoilRoot>
            <AllRoutes />
          </RecoilRoot>
        </Router>
        <Toaster richColors />
      </div>
    </>
  );
}

export default App;
