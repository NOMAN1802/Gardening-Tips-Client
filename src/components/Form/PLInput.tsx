"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface IProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  
}

const PLInput = ({
  variant = "flat",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  startIcon,
  endIcon,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col space-y-2">
     
      <label htmlFor={name} className="text-sm font-medium text-default-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input component */}
      <Input
        {...register(name)}
        errorMessage={errors[name] ? (errors[name].message as string) : ""}
        isInvalid={!!errors[name]}
        variant={variant}
        size={size}
        required={required}
        type={type}
        startContent={startIcon}
        id={name} 
        endContent={endIcon}
      />

      {/* Error message display */}
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default PLInput;
