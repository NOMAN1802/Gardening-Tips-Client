import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

interface Package{
 name: string;
 expiryDate: Date,
 issuedDate: Date,
}

export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  isVerified?:boolean;
  upvoteCount?:number;
  package?:Package;
  postsCount:string;
  createdAt?: string;
  updatedAt?: string;
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

// Post Type
export interface TPost {
  _id: string;
  title: string;
  postDetails: string;
  author: Author;
  category: string;
  isPremium: boolean;
  images: string[];
  upVotes: number;
  downVotes: number;
  upvotedBy: string[];
  downvotedBy: string[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Pagination Type
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
