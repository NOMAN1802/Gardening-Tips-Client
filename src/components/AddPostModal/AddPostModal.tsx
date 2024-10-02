"use client"
import React, { useState, ChangeEvent } from 'react';
import { BsUpload } from "react-icons/bs";
import dynamic from 'next/dynamic';
import { useForm, FormProvider, SubmitHandler, FieldValues, Controller } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from '@nextui-org/button';
import { useCreatePost } from '@/src/hooks/post.hook';
import { useUser } from '@/src/context/user.provider';
import { toast } from 'sonner';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface AddPostModalProps {
  buttonText: string;
  title: string;
  buttonVariant?: "light" | "solid" | "bordered" | "flat" | "faded" | "shadow" | "ghost" | undefined;
  buttonClassName?: string;
}

const categoryOptions = ["Vegetables", "Flowers", "Landscaping", "Herb", "Indoor", "Fruits"];

const AddPostModal: React.FC<AddPostModalProps> = ({
  buttonText,
  title,
  buttonVariant = "light",
  buttonClassName,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const methods = useForm();
  const { user } = useUser();
  const { mutate: createPost, isLoading } = useCreatePost();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImageFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newImageFiles]);

      newImageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const onSubmitForm: SubmitHandler<FieldValues> = (data) => {
    if (!user) {
      toast.error("You must be logged in to create a post");
      return;
    }

    const formData = new FormData();

    const postData = {
      ...data,
      author: user._id
    };

    formData.append('data', JSON.stringify(postData));

    imageFiles.forEach((file, index) => {
      formData.append(`image${index}`, file);
    });

    createPost(formData, {
      onSuccess: () => {
        toast.success('Post added successfully')
        methods.reset();
        setImageFiles([]);
        setImagePreviews([]);
        onOpenChange();
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  };

  const handleOpenChange = () => {
    if (isOpen) {
      // Modal is about to close
      const confirmClose = window.confirm("Are you sure you want to close this form? All unsaved changes will be lost.");
      if (confirmClose) {
        onOpenChange();
      }
    } else {
      // Modal is about to open
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
                  <form onSubmit={methods.handleSubmit(onSubmitForm)} className="space-y-4">
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
                            value={field.value}
                            onChange={field.onChange}
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
                      <Button color="danger" variant="light" onPress={() => handleOpenChange()}>
                        Cancel
                      </Button>
                      <Button color="primary" type="submit" isLoading={isLoading}>
                        Create Post
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