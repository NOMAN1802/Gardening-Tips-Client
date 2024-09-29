"use client"

import loginValidationSchema from "@/src/schemas/logoin.schema";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineAttachEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { motion } from "framer-motion";
import Loading from "@/src/components/Loading/Loading";
import PLInput from "@/src/components/Form/PLInput";
import PLForm from "@/src/components/Form/PLForm";
import Container from "@/src/components/Container/Container";
import PageTitle from "@/src/components/PageTitle/PageTitle";


const LoginPage = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  // const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get("redirect");

  // const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // handleUserLogin(data);
    // userLoading(true);
  };

  // useEffect(() => {
  //   if (!isPending && isSuccess) {
  //     if (redirect) {
  //       router.push(redirect);
  //     } else {
  //       router.push("/");
  //     }
  //   }
  // }, [isPending, isSuccess]);
 
  
  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };
    return (
        <Container>
        {/* {isPending && <Loading />} */}
        <PageTitle subHeading="Welcome Back! Let&lsquo;s Get Started" heading="Login with Planto"/>
        <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
          className="w-full md:w-[45%]"
        >
          
          <PLForm onSubmit={onSubmit} resolver={zodResolver(loginValidationSchema)}>
            <div className="p-4">
              <PLInput
                size="lg"
                name="email"
                label="Email"
                type="email"
                startIcon={<MdOutlineAttachEmail />}
              />
            </div>
            <div className="p-4">
              <PLInput
                size="lg"
                name="password"
                label="Password"
                type={viewPassword ? "text" : "password"}
                startIcon={<AiOutlineLock />}
                endIcon={
                  <div onClick={handleViewPassword} className="cursor-pointer">
                    {viewPassword ? <BsEyeSlash /> : <BsEye />}
                  </div>
                }
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

            
          </PLForm>
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
        </motion.div>
      </div>
    </Container>
    );
};

export default LoginPage;