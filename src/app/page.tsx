"use client";

import React, { useState, useEffect } from "react";
import Post from "@/components/Post";
import AskQuestion from "@/components/AskQuestion";
import AddPostForm from "@/components/AddPostForm";
import { api } from "@/utils/api";
import type { postType } from "@/utils/type";
import RequireAuth from "@/components/utils/RequireAuth";

const Home = () => {
  const [posts, setPosts] = useState<postType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddPostForm, setShowAddPostForm] = useState<boolean>(false);

  const getPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const posts = await api.get("posts/").json<postType[]>();
      setPosts(posts);
    } catch (err) {
      setError("An error occurred while fetching posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const handlePostAdded = () => {
    getPost(); // Recharger les posts après l'ajout
    setShowAddPostForm(false); // Revenir à AskQuestion après l'ajout
  };

  const handleClickAskQuestion = () => {
    setShowAddPostForm(true); // Afficher AddPostForm
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-red-500 text-lg">Error: {error}</p>
        <button
          onClick={getPost}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Top Questions</h1>
        {!showAddPostForm && <AskQuestion onClick={handleClickAskQuestion} />}
      </div>

      {/* Show AddPostForm if ask question is clicked */}
      {showAddPostForm && (
        <div className="mb-6">
          <AddPostForm onPostAdded={handlePostAdded} />
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </RequireAuth>
  );
};

export default Home;
