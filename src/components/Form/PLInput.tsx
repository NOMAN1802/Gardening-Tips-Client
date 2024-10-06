// @ts-nocheck
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
      <label className="text-sm font-medium text-default-700" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input component */}
      <Input
        {...register(name)}
        endContent={endIcon}
        errorMessage={errors[name] ? (errors[name].message as string) : ""}
        id={name}
        isInvalid={!!errors[name]}
        required={required}
        size={size}
        startContent={startIcon}
        type={type}
        variant={variant}
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
