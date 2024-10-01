import React, { useState, useRef } from 'react';
import { BsUpload } from "react-icons/bs";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: any) => void;
}

const AddPostModal: React.FC<AddPostModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onSubmit({ postTitle, postContent, postCategory, selectedImage });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setPostTitle("");
    setPostContent("");
    setPostCategory("");
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className="max-w-3xl mx-auto"
      classNames={{
        wrapper: "flex items-center justify-center min-h-screen",
        base: "max-h-[90vh] overflow-y-auto",
      }}
    >
      <ModalHeader className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Create New Post</h3>
      </ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          <Input
            label="Title"
            placeholder="Enter post title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            className="w-full"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <ReactQuill 
              theme="snow" 
              value={postContent} 
              onChange={setPostContent}
              className="h-64 mb-12"
            />
          </div>
          <Input
            label="Category"
            placeholder="Enter post category"
            value={postCategory}
            onChange={(e) => setPostCategory(e.target.value)}
            className="w-full"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <div className="flex items-center">
              <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                <BsUpload className="inline-block mr-2" />
                Choose File
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                  ref={fileInputRef}
                />
              </label>
              {selectedImage && (
                <span className="ml-3 text-sm text-gray-500">{selectedImage.name}</span>
              )}
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Cancel
        </Button>
        <Button color="primary" onPress={handleSubmit}>
          Create Post
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddPostModal;