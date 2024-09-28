"use client"
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import LoginForm from "@/components/form/LoginForm";
import RegisterForm from "@/components/form/RegisterForm";
import {useLogin, useRegister } from "@/hooks/";
import { useAppSelector } from "@/redux/hooks";

const Page = () => {

  const {isAuthenticated} = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const { loginSubmit } = useLogin()
  const { registerSubmit, isLoading_register } = useRegister()


  return (
    <div className="flex w-full h-full justify-center items-center">
      {isLogin ? (
        <LoginForm submitHandler={loginSubmit} NotSigned={() => setIsLogin(false)} />
      ) : (
        <RegisterForm submitHandler={registerSubmit} AlreadySigned={() => setIsLogin(true)}/>
      )}
    </div>
  );
};

export default Page;
