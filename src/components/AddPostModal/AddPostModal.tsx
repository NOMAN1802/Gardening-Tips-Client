import React, { useRef } from 'react';
import { BsUpload } from "react-icons/bs";
import dynamic from 'next/dynamic';
import { useForm, Controller } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from '@nextui-org/button';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { useUser } from '@/src/context/user.provider';

interface PostFormValues {
  title: string;
  postDetails: string;
  category: string;
  image: File | null;
}

interface AddPostModalProps {
  buttonText: string;
  title: string;
  onSubmit: (postData: PostFormValues) => void;
  buttonVariant?: "light" | "solid" | "bordered" | "flat" | "faded" | "shadow" | "ghost" | undefined;
  buttonClassName?: string;
}
const user = useUser();
const categoryOptions = ["Vegetables", "Flowers", "Landscaping", "Herb", "Indoor", "Fruits"];

const AddPostModal: React.FC<AddPostModalProps> = ({
  buttonText,
  title,
  onSubmit,
  buttonVariant = "light",
  buttonClassName,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, register, formState: { errors }, reset } = useForm<PostFormValues>({
    defaultValues: {
      title: "",
      postDetails: "",
      category: "",
      image: null,
    }
  });

  const onSubmitForm = (data: PostFormValues) => {
    onSubmit(data);
    reset();
    onOpenChange();
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
        onOpenChange={onOpenChange}
        className="max-w-lg mx-auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">{title}</h3>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                  <div>
                    <Input
                      {...register("title", { required: "Title is required" })}
                      label="Title"
                      placeholder="Enter post title"
                      className="w-full"
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Post Details</label>
                    <Controller
                      name="postDetails"
                      control={control}
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
                    {errors.postDetails && <p className="text-red-500">{errors.postDetails.message}</p>}
                  </div>

                  <div>
                    <Controller
                      name="category"
                      control={control}
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
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                    <div className="flex items-center">
                      <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                        <BsUpload className="inline-block mr-2" />
                        Choose File
                        <input
                          type="file"
                          className="hidden"
                          {...register("image")}
                          accept="image/*"
                          ref={fileInputRef}
                        />
                      </label>
                      {fileInputRef.current?.files?.[0] && (
                        <span className="ml-3 text-sm text-gray-500">{fileInputRef.current.files[0].name}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" type="submit">
                      Create Post
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPostModal;