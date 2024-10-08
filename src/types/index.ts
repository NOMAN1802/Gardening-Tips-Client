import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  isVerified?: boolean;
  upVoteCount?: number;
  isFollowed?: boolean;
  followers?: IUser[];
  favoritesPosts?: TPost[];
  following?: IUser[];
  createdAt?: string;
  updatedAt?: string;
  favoritePosts?: string[];
  __v?: number;
}

// Author Type
interface Author {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
  followers: string[];
  following: string[];
  favoritesPosts: string[];
  isVerified: boolean;
}

export interface Comment {
  _id: string;
  content: string;
  commentator: {
    _id: string;
    name: string;
  };
}
// Post Type
export interface TPost {
  _id: string;
  title: string;
  postDetails: string;
  author: Author;
  category: string;
  isPremium: boolean;
  isFavorited?: string;
  images: string[];
  upVotes: number;
  downVotes: number;
  upvotedBy: string[];
  downvotedBy: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostResponse {
  success: boolean;
  message: string;
  data: {
    posts: TPost[];
    total: number;
    page: number;
    limit: number;
  };
}
export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
