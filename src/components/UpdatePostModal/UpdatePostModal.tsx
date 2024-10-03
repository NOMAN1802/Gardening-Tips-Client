"use client"
import React from 'react';
import { BsUpload } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import dynamic from 'next/dynamic';
import { useForm, FormProvider, SubmitHandler, FieldValues, Controller } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from '@nextui-org/button';
import { Switch } from '@nextui-org/switch';
import DOMPurify from 'dompurify';
import { TPost } from '@/src/types';
import { useUser } from '@/src/context/user.provider';

const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => (
    <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-default-500"></div>
    </div>
  )
});
import 'react-quill/dist/quill.snow.css';

interface UpdatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: TPost;
  onSubmit: (data: FieldValues, resetForm: () => void, closeModal: () => void) => void;
  isLoading: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreviews: string[];
  removeImage: (index: number) => void;
}

const categoryOptions = ["Vegetables", "Flowers", "Landscaping", "Herb", "Indoor", "Fruits"];

const UpdatePostModal: React.FC<UpdatePostModalProps> = ({
  isOpen,
  onClose,
  post,
  onSubmit,
  isLoading,
  handleImageChange,
  imagePreviews,
  removeImage,
}) => {
  const { user } = useUser();
  const methods = useForm({
    defaultValues: {
      title: post.title,
      postDetails: post.postDetails,
      category: post.category,
      isPremium: post.isPremium,
      author: user?._id,
    }
  });

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const sanitizedData = {
      ...data,
      postDetails: DOMPurify.sanitize(data.postDetails),
      isPremium: data.isPremium || false,
      author: user?._id,
    };
    onSubmit(sanitizedData, methods.reset, onClose);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      className="max-w-3xl mx-auto"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">Update Post</h3>
        </ModalHeader>
        <ModalBody>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
              <input type="hidden" {...methods.register("author")} />
              <Input
                {...methods.register("title", { required: "Title is required" })}
                label="Title"
                placeholder="Enter post title"
                className="w-full"
              />

              <div>
                <label className="block text-sm font-medium text-default-700 mb-2">Post Details</label>
                <Controller
                  name="postDetails"
                  control={methods.control}
                  rules={{ required: "Post details are required" }}
                  render={({ field }) => (
                    <ReactQuill 
                      theme="snow" 
                      value={field.value || ''}
                      onChange={field.onChange}
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
                <div className="flex items-center justify-between my-4">
                  <label className="text-sm font-medium text-default-700">Premium Post</label>
                  <Controller
                    name="isPremium"
                    control={methods.control}
                    render={({ field: { onChange, value } }) => (
                      <Switch 
                        checked={value}
                        onChange={onChange}
                        size="sm"
                      />
                    )}
                  />
                </div>
                <label className="cursor-pointer bg-default-500 text-white py-2 px-4 rounded-md hover:bg-default-600 transition duration-300">
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
                  {imagePreviews.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                    >
                      <img
                        alt="item"
                        className="h-full w-full object-cover object-center rounded-md"
                        src={imageUrl}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button 
                  color="primary" 
                  type="submit" 
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating Post...' : 'Update Post'}
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdatePostModal;