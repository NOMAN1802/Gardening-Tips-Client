import React from 'react';
import { Avatar } from "@nextui-org/avatar";
import { BsCheckCircle } from 'react-icons/bs';

interface VerifiedAvatarProps {
  src: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

const VerifiedAvatar: React.FC<VerifiedAvatarProps> = ({ src, name, size = "md" }) => {
  return (
    <div className="relative inline-block">
      <Avatar
        src={src}
        name={name}
        size={size}
        className="rounded-full ring-2 ring-blue-800"  
      />
      
      <div className="absolute bottom-0 right-0 bg-default rounded-full p-0.5">
        <BsCheckCircle className="text-blue-500 w-3 h-3" />
      </div>
    </div>
  );
};

export default VerifiedAvatar;
