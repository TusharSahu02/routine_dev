import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const Auth = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="hidden lg:flex justify-center items-center h-screen">
        <img
          src="img/auth_img.svg"
          alt="login"
          width={500}
          height={500}
          className="object-contain w-full"
        />
      </div>
      <div className="flex flex-col justify-center items-center h-screen w-full  px-4">
        <div className="flex px-2 justify-start items-start mb-6 w-[400px] flex-col md:w-[400px] lg:w-[450px]">
          <img
            src={"img/routine.svg"}
            alt="logo"
            width={200}
            height={200}
            className="object-contain"
          />
          <h1 className="text-cabbage font-bold text-2xl md:text-3xl mt-2">
            Where developers grow together
          </h1>
        </div>
        <Tabs defaultValue="login" className="lg:w-[450px] w-[400px] p-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>

          <Login />

          <Register />
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
