"use client"
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from '@nextui-org/button';
import { TPost } from '@/src/types';

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: TPost | null;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({
  isOpen,
  onClose,
  post,
  onConfirm,
  isLoading,
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      isDismissable={!isLoading}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Confirm Deletion</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete the post "{post?.title}"?</p>
          <p>This action cannot be undone.</p>
        </ModalBody>
        <ModalFooter>
          <Button   color="default" onPress={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button  color="danger" onPress={onConfirm} isLoading={isLoading}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeletePostModal;