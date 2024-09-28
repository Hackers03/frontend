// components/PostDetail.tsx
"use client";
import React from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Tag from "./Tag"; // Assurez-vous que le composant Tag existe
import { usePostData } from "../logic/usePostData";
import type { postType as ImportedPostType } from "@/utils/type";

interface Props {
  post: ImportedPostType;
}

const PostDetail: React.FC<Props> = ({ post }) => {
  const { author, upvotes, downvotes, loading, handleVote } = usePostData(post);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Titre et auteur */}
      <h1 className="text-2xl font-bold mb-4">{post.details}</h1>
      <p className="text-sm text-gray-600 mb-2">Posted by: {author.nickname} on {new Date(post.created).toLocaleDateString()}</p>

      {/* Votes */}
      <div className="flex items-center mb-4">
        <button
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          onClick={() => handleVote("upvote")}
        >
          <AiOutlineLike size={20} />
          <span className="ml-2 text-base">{upvotes}</span>
        </button>
        <button
          className="flex items-center text-red-600 hover:text-red-800 transition-colors ml-4"
          onClick={() => handleVote("downvote")}
        >
          <AiOutlineDislike size={20} />
          <span className="ml-2 text-base">{downvotes}</span>
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map(tag => (
          <Tag key={tag.name} name={tag.name} description={tag.description || ""} />
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
