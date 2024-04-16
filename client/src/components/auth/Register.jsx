import { useState } from "react";
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
import userAtom from "@/atom/userAtom";
import { toast } from "sonner";
import { useSetRecoilState } from "recoil";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const setUser = useSetRecoilState(userAtom);
  const [authState, setAuthState] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        authState.name === "" ||
        authState.username === "" ||
        authState.email === "" ||
        authState.password === "" ||
        authState.confirmPassword === ""
      ) {
        toast.message("All fields are required");
        setLoading(false);
        return;
      }

      if (authState.password.length < 6) {
        toast.message("Password must be at least 6 characters");
        setLoading(false);
      }

      if (authState.password !== authState.confirmPassword) {
        toast.message("Passwords do not match");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/users/signup", {
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
      setUser(data);

      setAuthState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toast.success("Account created successfully");
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Create an account for rountine.dev
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="john doe"
                  type="text"
                  value={authState.name}
                  onChange={(e) =>
                    setAuthState({ ...authState, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="johndoe"
                  type="text"
                  value={authState.username}
                  onChange={(e) =>
                    setAuthState({
                      ...authState,
                      username: e.target.value.toLowerCase(),
                    })
                  }
                  onKeyPress={(e) => {
                    if (e.key === e.key.toUpperCase() && e.key.length === 1) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
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
                  value={authState.password}
                  type="password"
                  onChange={(e) =>
                    setAuthState({ ...authState, password: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Confirm password</Label>
                <Input
                  id="cpassword"
                  placeholder="1234@abcd"
                  value={authState.confirmPassword}
                  type="password"
                  onChange={(e) =>
                    setAuthState({
                      ...authState,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mt-6">
                <Button disabled={loading} className="w-full" type="submit">
                  {loading ? "Signing up..." : "Signup"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
};

export default Register;
