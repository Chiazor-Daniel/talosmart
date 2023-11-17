"use client";
// @ts-nocheck
import { useRouter } from "next/router"; // Changed to "next/router" for useRouter
import Link from "next/link";
import React, { useEffect, useState } from "react";
import bg from "../../public/login.jpeg";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../redux/authApi";
import { useAppDispatch } from "../hooks";
import { setUser } from "../redux/authSlice";
import Spinner from "../components/spinner";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const [user, setuser] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string>("");
  const router = useRouter();

  const [registerUser] = useRegisterUserMutation();
  const [errorPresent, setErrorPresent] = useState(false);

  const handleRegisterAuth = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (user.username && user.password) {
        const resultRegister = await registerUser(user);

        if (resultRegister.data) {
          setAuthError(resultRegister.data.message);
          setErrorPresent(true);
          console.log("API Response:", resultRegister.data);
        } else {
          console.log("Unexpected API Response:", resultRegister);
        }
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
      dispatch(setUser({ name: user.username }));
    }
  };

  useEffect(() => {
    authError === "Register Successful" && setTimeout(() => router.push("/"), 500);
  }, [authError, router]);

  return (
    <div
      className={`h-screen grid items-center`}
      style={{
        background: `url(${bg.src})`,
        backgroundRepeat: "no-repeat",
        objectFit: "cover",
        backgroundSize: "100% 100%",
      }}
    >
      <form className="bg-white rounded-xl w-[70%] md:w-1/3 m-auto p-4 grid gap-4 py-6">
        <h1 className="text-2xl text-center font-bold text-red-500">Register</h1>
        {authError && (
          <p
            className={`${authError === "Incrorrect Login Details" ? "bg-red-300" : "bg-green-300"} rounded-xl text-white text-sm w-fit m-auto p-2 ${
              errorPresent && authError === "Incrorrect Login Details" ? "shake-animation" : ""
            }`}
          >
            {authError}
          </p>
        )}

        <div className="grid gap-4 px-6">
          <input
            onChange={(e) => setuser({ ...user, username: e.target.value })}
            value={user.username}
            type="text"
            placeholder="Username"
            className="bg-gray-200 text-gray-500 w-full rounded-full px-4 py-2 focus:outline-none"
            required
          />
          <input
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            value={user.password}
            type="password"
            placeholder="Password"
            className="bg-gray-200 text-gray-500 w-full rounded-full px-4 py-2 focus:outline-none"
            required
          />
        </div>
        <button
          onClick={handleRegisterAuth}
          className="bg-red-500 w-1/2 m-auto text-white py-2 rounded-full "
        >
          {loading ? <Spinner /> : "Register"}
        </button>
        <div className="flex gap-2 m-auto">
          <p className="text-gray-600">Already have an account ?</p>
          <Link href={`/`}>
            <p className="text-center text-blue-500 underline">Login</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
