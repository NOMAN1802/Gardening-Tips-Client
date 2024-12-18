"use client";

// import { useUserRegistration } from "@/src/hooks/auth.hook";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { FaMobile, FaPersonBooth } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@/src/components/Container/Container";
import PLInput from "@/src/components/Form/PLInput";
import PLForm from "@/src/components/Form/PLForm";
import PageTitle from "@/src/components/PageTitle/PageTitle";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/Loading/Loading";
import registerValidationSchema from "@/src/schemas/register.schema";

const RegisterPage = () => {
  const router = useRouter();

  const [viewPassword, setViewPassword] = useState(false);
  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    console.log("Inside form user data: ", userData);

    handleUserRegistration(userData);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/login");
    }
  }, [isPending, isSuccess]);

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  return (
   <>

<PageTitle

        heading="SingUp in Planto"
        subHeading="Make the word ever green"/>

    <Container>
      {isPending && <Loading />}

      <div className="flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center">
        <div
          className="w-full md:w-[45%] bg-default-200 rounded-lg py-6" >
          <PLForm
            //! Only for development
            defaultValues={{
              name: "Noman",
              email: "noman@gmail.com",
              mobileNumber: "01980931802",
              password: "123456",
            }}
            resolver={zodResolver(registerValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="p-4">
              <PLInput
                label="Name"
                name="name"
                size="lg"
                startIcon={<FaPersonBooth />}
                type="text"
              />
            </div>

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
                label="Mobile Number"
                name="mobileNumber"
                size="lg"
                startIcon={<FaMobile />}
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
                Register
              </Button>
            </div>
          </PLForm>
          <div className="text-center">
            <p className="text-xl text-default-600 my-4">OR</p>
            <p>
              Already have an account ?{" "}
              <span className="text-default-400 hover:underline cursor-pointer">
                <Link href={"/login"}>Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </Container>
   </>
  );
};

export default RegisterPage;
