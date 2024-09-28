"use client";
import { useState, useEffect, useCallback } from "react";
import { api } from "@/utils/api";
import Post from "./Post";
import type { postType } from "@/utils/type";

interface UserPostsProps {
    params: { id: string }; // ID de l'utilisateur dont les posts doivent être affichés
}

const UserPosts: React.FC<UserPostsProps> = ({ params }) => {
    const [posts, setPosts] = useState<postType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserPosts = useCallback(async () => {
        setLoading(true);
        try {
            const postsData = await api
                .get(`user-posts/${params.id}/`)
                .json<postType[]>();
            setPosts(postsData);
        } catch (error) {
            console.error("Failed to fetch user posts:", error);
        } finally {
            setLoading(false);
        }
    }, [params.id]);


    useEffect(() => {
        fetchUserPosts();
    }, [fetchUserPosts]);

    if (loading) return <div>Loading...</div>;
    if (posts.length === 0) return <div>No posts found.</div>;

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Posts by User</h1>

                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default UserPosts;
