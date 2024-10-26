
"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineAttachEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { motion } from "framer-motion";

import loginValidationSchema from "@/src/schemas/logoin.schema";
import Loading from "@/src/components/Loading/Loading";
import PLInput from "@/src/components/Form/PLInput";
import PLForm from "@/src/components/Form/PLForm";
import Container from "@/src/components/Container/Container";
import PageTitle from "@/src/components/PageTitle/PageTitle";
import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth.hook";

const LoginPage = () => {
  const [viewPassword, setViewPassword] = useState(false);
  
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      
        router.push("/");
      }
    
  }, [isPending, isSuccess]);

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <Container>
      {isPending && <Loading />}
      <PageTitle
        heading="Login with Planto"
        subHeading="Welcome Back! Let&lsquo;s Get Started"
      />

<motion.div
  animate={{ y: [0, -10, 0] }}
  className="w-2/3 mx-auto md:w-[30%] bg-default-100 rounded-lg p-4 shadow-md"
  initial={{ y: 0 }}
  transition={{
    repeat: Infinity,
    duration: 2,
    ease: "easeInOut",
    delay: 0.5,
  }}
>
  <div className="mb-4 p-4 border border-default-300 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center">
  <p className="text-lg">Demo:</p>
    <div className="mx-auto px-4">
      <p className="text-sm">Email: noman@gmail.com</p>
      <p className="text-sm">Password: 123456</p>
    </div>
  </div>
</motion.div>

      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          className="w-full md:w-[45%]"
          initial={{ y: 0 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <PLForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="p-4">
              <PLInput
                label="Email"
                name="email"
                size="lg"
                startIcon={<MdOutlineAttachEmail />}
                type="email"
              />
            </div>
            <div className="p-4">
              <PLInput
                endIcon={
                  <div className="cursor-pointer" onClick={handleViewPassword}>
                    {viewPassword ? <BsEyeSlash /> : <BsEye />}
                  </div>
                }
                label="Password"
                name="password"
                size="lg"
                startIcon={<AiOutlineLock />}
                type={viewPassword ? "text" : "password"}
              />
            </div>

            <div className="flex justify-center p-4">
              <Button
                className="w-full  rounded-md bg-default-600 font-semibold text-default"
                size="md"
                type="submit"
              >
                Login
              </Button>
            </div>

            <div className="text-center">
              <button className="text-xs hover:underline hover:text-rose-500 text-default-400">
                Forgot password?
              </button>
              <p className="text-xl text-default-600 my-4">OR</p>
              <Link href="/register">
                <p className="mt-4 text-center">
                  Not registered?{" "}
                  <span className="text-default-400 hover:underline cursor-pointer">
                    Create an account
                  </span>
                </p>
              </Link>
            </div>
          </PLForm>
        </motion.div>
      </div>
    </Container>
  );
};

export default LoginPage;
