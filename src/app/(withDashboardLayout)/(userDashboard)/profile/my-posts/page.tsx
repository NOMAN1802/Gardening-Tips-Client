import React from 'react'
import AddPostModal from "@/src/components/AddPostModal/AddPostModal";

const MyPostsPage = () => {
  return (
    <div>
      {/* Other components */}
      <AddPostModal
        buttonText="Add Post"
        title="Create New Post"
        buttonVariant="solid"
        buttonClassName="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
      />
    </div>
  )
}

export default MyPostsPage