// AddPostModal.tsx
"use client"
import React from 'react';
import { BsUpload } from "react-icons/bs";
import dynamic from 'next/dynamic';
import { useForm, FormProvider, SubmitHandler, FieldValues, Controller } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from '@nextui-org/button';

import DOMPurify from 'dompurify';

const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <p>Loading editor...</p>
});
import 'react-quill/dist/quill.snow.css';

interface AddPostModalProps {
  buttonText: string;
  title: string;
  buttonVariant?: "light" | "solid" | "bordered" | "flat" | "faded" | "shadow" | "ghost" | undefined;
  buttonClassName?: string;
  onSubmit: (data: FieldValues, resetForm: () => void, closeModal: () => void) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreviews: string[];
  isLoading: boolean;
}

const categoryOptions = ["Vegetables", "Flowers", "Landscaping", "Herb", "Indoor", "Fruits"];

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
      postDetails: DOMPurify.sanitize(data.postDetails)
    };
    onSubmit(sanitizedData, methods.reset, () => onOpenChange());
  };

  const handleOpenChange = () => {
    if (isOpen) {
      const confirmClose = window.confirm("Are you sure you want to close this form? All unsaved changes will be lost.");
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
        isOpen={isOpen} 
        onOpenChange={handleOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className="max-w-3xl mx-auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">{title}</h3>
              </ModalHeader>
              <ModalBody>
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
                    <Input
                      {...methods.register("title", { required: "Title is required" })}
                      label="Title"
                      placeholder="Enter post title"
                      className="w-full"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Post Details</label>
                      <Controller
                        name="postDetails"
                        control={methods.control}
                        rules={{ required: "Post details are required" }}
                        render={({ field }) => (
                          <ReactQuill 
                            theme="snow" 
                            value={field.value || ''}
                            onChange={(content) => field.onChange(DOMPurify.sanitize(content))}
                            onBlur={field.onBlur}
                            className="h-64 mb-12"
                          />
                        )}
                      />
                    </div>

                    <Controller
                      name="category"
                      control={methods.control}
                      rules={{ required: "Category is required" }}
                      render={({ field }) => (
                        <Select
                          label="Category"
                          placeholder="Select a category"
                          className="w-full"
                          {...field}
                        >
                          {categoryOptions.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />

                    <div>
                      <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                        <BsUpload className="inline-block mr-2" />
                        Choose File
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleImageChange}
                          accept="image/*"
                          multiple
                          name="image"
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
                        color="primary" 
                        type="submit" 
                        isLoading={isLoading}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating Post...' : 'Create Post'}
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