// @ts-nocheck
"use client";
import React from "react";
import { BsUpload } from "react-icons/bs";
import dynamic from "next/dynamic";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  Controller,
} from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import DOMPurify from "dompurify";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-default-500" />
    </div>
  ),
});

import "react-quill/dist/quill.snow.css";
import { Switch } from "@nextui-org/switch";

interface AddPostModalProps {
  buttonText: string;
  title: string;
  buttonVariant?:
    | "light"
    | "solid"
    | "bordered"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  buttonClassName?: string;
  onSubmit: (
    data: FieldValues,
    resetForm: () => void,
    closeModal: () => void,
  ) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreviews: string[];
  isLoading: boolean;
}

const categoryOptions = [
  "Vegetables",
  "Flowers",
  "Landscaping",
  "Herb",
  "Indoor",
  "Fruits",
];

const AddPostModal: React.FC<AddPostModalProps> = ({
  buttonText,
  title,
  buttonVariant = "light",
  buttonClassName,
  onSubmit,
  handleImageChange,
  imagePreviews,
  isLoading,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const methods = useForm();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const sanitizedData = {
      ...data,
      postDetails: DOMPurify.sanitize(data.postDetails),
      isPremium: data.isPremium || false,
    };

    onSubmit(sanitizedData, methods.reset, () => onOpenChange());
  };

  const handleOpenChange = () => {
    if (isOpen) {
      const confirmClose = window.confirm(
        "Are you sure you want to close this form? All unsaved changes will be lost.",
      );

      if (confirmClose) {
        onOpenChange();
      }
    } else {
      onOpenChange();
    }
  };

  return (
    <>
      <Button
        className={buttonClassName}
        variant={buttonVariant}
        onPress={onOpen}
      >
        {buttonText}
      </Button>
      <Modal
        className="max-w-3xl mx-auto"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">{title}</h3>
              </ModalHeader>
              <ModalBody>
                <FormProvider {...methods}>
                  <form
                    className="space-y-4"
                    onSubmit={methods.handleSubmit(handleSubmit)}
                  >
                    <Input
                      {...methods.register("title", {
                        required: "Title is required",
                      })}
                      className="w-full"
                      label="Title"
                      placeholder="Enter post title"
                    />

                    <div>
                      <label className="block text-sm font-medium text-default-700 mb-2">
                        Post Details
                      </label>

                      <Controller
                        control={methods.control}
                        name="postDetails"
                        render={({ field }) => (
                          <ReactQuill
                            className="h-64 mb-12"
                            theme="snow"
                            value={field.value || ""}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                          />
                        )}
                        rules={{ required: "Post details are required" }}
                      />
                    </div>

                    <Controller
                      control={methods.control}
                      name="category"
                      render={({ field }) => (
                        <Select
                          className="w-full"
                          label="Category"
                          placeholder="Select a category"
                          {...field}
                        >
                          {categoryOptions.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                      rules={{ required: "Category is required" }}
                    />

                    <div>
                      {/* Add isPremium toggle switch */}
                      <div className="flex items-center justify-between my-4">
                        <label className="text-sm font-medium text-default-700">
                          Premium Post
                        </label>
                        <Controller
                          control={methods.control}
                          defaultValue={false}
                          name="isPremium"
                          render={({ field: { onChange, value } }) => (
                            <Switch
                              checked={value}
                              size="sm"
                              onChange={onChange}
                            />
                          )}
                        />
                      </div>
                      <label className="cursor-pointer bg-default-500 text-white py-2 px-4 rounded-md hover:bg-default-600 transition duration-300">
                        <BsUpload className="inline-block mr-2" />
                        Choose File
                        <input
                          multiple
                          accept="image/*"
                          className="hidden"
                          name="image"
                          type="file"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>

                    {imagePreviews.length > 0 && (
                      <div className="flex gap-5 my-5 flex-wrap">
                        {imagePreviews.map((imageDataUrl, index) => (
                          <div
                            key={index}
                            className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                          >
                            <img
                              alt="item"
                              className="h-full w-full object-cover object-center rounded-md"
                              src={imageDataUrl}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end space-x-2 mt-4">
                      <Button
                        color="default"
                        disabled={isLoading}
                        isLoading={isLoading}
                        type="submit"
                      >
                        {isLoading ? "Creating Post..." : "Create Post"}
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPostModal;
