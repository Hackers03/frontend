"use client";
import { useState, useEffect, useCallback } from "react";
import type { postType } from "@/utils/type";
import { api } from "@/utils/api";
import Image from "next/image";
import Comment from "@/components/Comment";
import AddComment from "@/components/AddComment";
import { fetchUserProfile } from "@/utils/apiRequests";

interface PostPageProps {
    params: { id: string };
}

const PostPage: React.FC<PostPageProps> = ({ params }) => {
    const [post, setPost] = useState<postType | null>(null);
    const [comments, setComments] = useState<postType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPostAndComments = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch the post data
            const postData = await api.get(`post/${params.id}/`).json<postType>();
            setPost(postData);

            // Fetch the comments associated with the post
            const commentsData = await api.get(`posts/${params.id}/comments/`).json<postType[]>();
            setComments(commentsData);
        } catch (error) {
            console.error("Failed to fetch post or comments:", error);
        } finally {
            setLoading(false);
        }
    }, [params.id]);

    useEffect(() => {
        fetchPostAndComments();
    }, [fetchPostAndComments]);

    if (loading) return <div>Loading...</div>;
    if (!post) return <div>Post not found.</div>;

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
                {/* Post Header */}
                <div className="flex items-center space-x-6">
                    <Image
                        src={post.author.photo || '/moi.png'}
                        alt="profile"
                        width={50}
                        height={50}
                        className={`rounded-full shadow-lg ${post.author.confirmed ? 'border border-blue-500' : ''}`}
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{post.author.user.nickname}</h1>
                        <p className="text-gray-600">Posted on {new Date(post.created).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Post Content */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{post.title}</h2>
                    <p className="text-gray-700 mb-4">{post.details}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                            <span key={tag.name} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                                #{tag.name}
                            </span>
                        ))}
                    </div>

                    {/* Add Comment */}
                    <AddComment postId={post.id} onCommentAdded={fetchPostAndComments} />
                </div>

                {/* Comments */}
                <div className="mt-6">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <Comment key={comment.id} comment={comment} />
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostPage;
