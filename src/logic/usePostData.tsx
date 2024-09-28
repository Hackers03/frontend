// logic/usePostData.tsx
"use client";
import { useState, useCallback, useEffect } from "react";
import { api } from "@/utils/api";
import type { postType as ImportedPostType } from "@/utils/type";

interface AuthorType {
  nickname: string;
}

export const usePostData = (post: ImportedPostType) => {
  const [author, setAuthor] = useState<AuthorType>({ nickname: "Anonymous" });
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [commentsNbr, setCommentsNbr] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Fetch the author's details
  const fetchAuthor = useCallback(async () => {
    try {
      const authorData = await api.get(`users/${post.author}/`).json<AuthorType>();
      setAuthor(authorData);
    } catch (error) {
      console.error("Error fetching author:", error);
    }
  }, [post.author]);

  const fetchVotes = useCallback(async () => {
    try {
      const { upvotes, downvotes } = await api.get(`posts/${post.id}/votes/all/`).json<{ upvotes: number; downvotes: number }>();
      setUpvotes(upvotes);
      setDownvotes(downvotes);
    } catch (error) {
      console.error("Failed to fetch votes:", error);
    }
  }, [post.id]);

  const handleVote = async (voteType: string) => {
    setLoading(true);
    try {
      // Example vote action (upvote/downvote)
      await api.post(`vote/`, {
        json: { author: author.nickname, post: post.id, type: voteType },
      });
      await fetchVotes();
    } catch (error) {
      console.error("Error handling vote:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAuthor();
    fetchVotes();
  }, [fetchAuthor, fetchVotes]);

  return {
    author,
    upvotes,
    downvotes,
    commentsNbr,
    loading,
    handleVote,
  };
};
