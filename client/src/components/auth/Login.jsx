import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authState),
      });
      const data = await res.json();

      if (data.error) {
        toast.error(data.error, {
          duration: 2000,
        });

        return;
      }

      localStorage.setItem("routine-dev", JSON.stringify(data));
      toast.success("User logged in successfully", {
        duration: 2000,
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Welcome to rountine.dev</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleLogin}>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="john@example.com"
                  type="email"
                  value={authState.email}
                  onChange={(e) =>
                    setAuthState({ ...authState, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">password</Label>
                <Input
                  id="password"
                  placeholder="1234@abcd"
                  // value={authState.password}
                  type="password"
                  onChange={(e) =>
                    setAuthState({ ...authState, password: e.target.value })
                  }
                />
              </div>
              <div className="mt-6">
                <Button disabled={loading} type="submit" className="w-full">
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
};

export default Login;
