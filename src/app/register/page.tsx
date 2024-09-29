"use client"

// import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schemas/register.schema";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/src/components/Loading/Loading";
import { motion } from "framer-motion";
import { FaMobile, FaPersonBooth } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import Container from "@/src/components/Container/Container";
import PLInput from "@/src/components/Form/PLInput";
import PLForm from "@/src/components/Form/PLForm";
import PageTitle from "@/src/components/PageTitle/PageTitle";
import { useUserRegistration } from "@/src/hooks/auth.hook";

const RegisterPage = () => {

  const [viewPassword, setViewPassword] = useState(false);
    const {mutate: handleUserRegistration,isPending  } = useUserRegistration()
   
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const userData = {
          ...data,
          profilePhoto:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        };
    
        console.log("Inside form user data: ", userData);

        handleUserRegistration(userData);
      };
    
     const handleViewPassword = () => {
    setViewPassword(!viewPassword);
     };
      
    return (
      <Container>
      {isPending && <Loading />}

      <PageTitle heading="Register with Planto" subHeading="Make the word ever green together"/>

      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
      <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
          className="w-full md:w-[45%]"
        >
        
        
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
                size="lg"
                label="Name"
                 name="name" 
                type="text"
                startIcon={<FaPersonBooth />}
              />
            </div>
            
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
                label="Mobile Number"
                 name="mobileNumber"
                startIcon={<FaMobile />}
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
                Register
              </Button>
            </div>
          </PLForm>
          <div className="text-center">

          <p className="text-xl text-default-600 my-4">OR</p>
            <p>
            Already have an account ? <span className="text-default-400 hover:underline cursor-pointer"><Link href={"/login"}>Login</Link></span>
            </p> 
          </div>
        </motion.div>
      </div>
      </Container>
       
    );
};

export default RegisterPage;