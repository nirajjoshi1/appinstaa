import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  // Handles input field changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://appinsta-t98u.onrender.com/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            {/* Add your logo icon here */}
            <h1 className="text-center font-bold text-2xl">LOGO</h1>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Sign up for Instagram
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={signupHandler}>
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="font-medium">Username</span>
                <Input
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-transparent my-2"
                  placeholder="Choose a username"
                  required
                />
              </div>
              <div className="space-y-2">
                <span className="font-medium">Email</span>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-transparent my-2"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <span className="font-medium">Password</span>
                <Input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-transparent my-2"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            {/* Show a loading spinner while submitting */}
            {loading ? (
              <Button>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-6">
                Signup
              </Button>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Sign up with Facebook
          </Button>
          <p className="text-xs text-center text-gray-600">
            By signing up, you agree to our Terms, Data Policy, and Cookies
            Policy.
          </p>
        </CardFooter>
      </Card>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
