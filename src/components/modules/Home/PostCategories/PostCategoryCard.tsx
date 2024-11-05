import React from "react";
import { motion } from "framer-motion";

interface PostCategoryCardProps {
  label: string;
  image: string;
  selected: boolean;
  onClick: () => void;
}

const PostCategoryCard: React.FC<PostCategoryCardProps> = ({
  label,
  image,
  selected,
  onClick,
}) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={` bg-default-100 flex flex-col items-center justify-center p-4 border rounded-lg transition cursor-pointer
        ${selected ? "border-blue-500 text-blue-500" : "border-gray-300 "}
        hover:shadow-lg`}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div
        className="w-24 h-24 sm:w-20 sm:h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden mb-3"
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
      >
        <img alt={label} className="w-full h-full object-cover" src={image} />
      </motion.div>
      <div className="text-sm font-medium text-center">{label}</div>
    </motion.div>
  );
};

export default PostCategoryCard;
