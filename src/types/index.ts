export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  token: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  slug: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  liveLink?: string;
  features: string[];
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
}
