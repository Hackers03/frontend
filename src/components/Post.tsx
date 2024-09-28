// Post.tsx
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaSpinner, FaRegComment } from "react-icons/fa";
import Tag from "./Tag";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { api } from "@/utils/api";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import type { postType, voteType } from "@/utils/type";

interface Props {
    post: postType;
}

const Post: React.FC<Props> = ({ post }) => {
    const { data: user } = useRetrieveUserQuery();
    const [userVote, setUserVote] = useState<voteType | null>(null);
    const [comments, setComments] = useState<postType[]>([]);
    const [commentsNbr, setCommentsNbr] = useState<number>(0);
    const [voteStatus, setVoteStatus] = useState<string>("");
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchUserVote = useCallback(async () => {
        try {
            const userVoteData = await api
                .get(`posts/${post.id}/user/${user?.id}/vote/`)
                .json<voteType>();
            setUserVote(userVoteData);
            setVoteStatus(userVoteData.type);
        } catch (error) {
            console.error("Failed to fetch user vote:", error);
        }
    }, [post.id, user?.id]);

    const fetchComments = useCallback(async () => {
        try {
            const commentsData = await api
                .get(`posts/${post.id}/comments/`)
                .json<postType[]>();
            setComments(commentsData.slice(0, 2)); // Limite à deux commentaires
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        }
    }, [post.id]);

    const fetchCommentsNbr = useCallback(async () => {
        try {
            const commentsData = await api
                .get(`posts/${post.id}/comments_number/`)
                .json<{ totalComments: number }>();
            setCommentsNbr(commentsData.totalComments);
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        }
    }, [post.id]);

    const fetchVotes = useCallback(async () => {
        try {
            const { upvotes, downvotes } = await api
                .get(`posts/${post.id}/votes/all/`)
                .json<{ upvotes: number; downvotes: number }>();
            setUpvotes(upvotes);
            setDownvotes(downvotes);
        } catch (error) {
            console.error("Failed to fetch votes:", error);
        }
    }, [post.id]);

    const handleVote = async (voteType: string) => {
        setLoading(true);
        try {
            if (!userVote) {
                await api.post(`vote/`, {
                    json: { author: user?.id, post: post.id, type: voteType },
                });
            } else if (userVote.type === voteType) {
                await api.delete(`unvote/${userVote.id}/`);
                setUserVote(null);
                setVoteStatus("");
            } else {
                await api.put(`update-vote/${userVote.id}/`, {
                    json: { ...userVote, type: voteType },
                });
                setVoteStatus(voteType);
            }
            await fetchUserVote();
            await fetchVotes();
        } catch (error) {
            console.error("Failed to handle vote:", error);
        }
        setLoading(false);
    };

    const handleCommentAdded = () => {
        fetchComments();
        fetchCommentsNbr();
    };

    useEffect(() => {
        fetchComments();
        fetchCommentsNbr();
        fetchUserVote();
        fetchVotes();
    }, [fetchComments, fetchCommentsNbr, fetchUserVote, fetchVotes]);

    return (
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 my-4">
            {/* Header */}
            <div className="flex items-center p-4 bg-gray-50 border-b border-gray-200">
                <Link
                    href={`/users-profile/${post.author.user.id}`}
                    className="flex items-center"
                >
                    <div
                        className={`w-[50px] h-[50px] rounded-full overflow-hidden border ${
                            post.author.confirmed ? "border-blue-500" : ""
                        }`}
                    >
                        <Image
                            src={post.author.photo || `/moi.png`}
                            alt="profile"
                            width={50}
                            height={50}
                            priority
                            className="object-cover"
                        />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-bold text-gray-800">
                            {post.author.user.nickname}
                        </p>
                        <p className="text-xs text-gray-500">
                            Posté le{" "}
                            {new Date(post.created).toLocaleDateString()}
                        </p>
                    </div>
                </Link>
            </div>

            {/* Post Content */}
            <div className="p-6">
                <Link
                    href={`/post/${post.id}`}
                    className="block text-2xl font-semibold text-gray-900 mb-4 leading-relaxed"
                    style={{ 
                        minHeight: '150px', 
                        display: '-webkit-box', 
                        WebkitBoxOrient: 'vertical', 
                        overflow: 'hidden', 
                        WebkitLineClamp: 6 
                    }} // Limite à 6 lignes
                >
                    {post.title}
                </Link>

                <p className="">{post.details}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-4">
                    {post.tags.map((tag) => (
                        <Tag
                            key={tag.name}
                            name={tag.name}
                            description={tag.description}
                        />
                    ))}
                </div>

                {/* Reactions and Comments */}
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                    <div className="flex-grow">
                        <AddComment postId={post.id} onCommentAdded={handleCommentAdded} />
                    </div>
                    <div className="flex items-center space-x-4 ml-4">
                        <button
                            onClick={() => handleVote("upvote")}
                            className={`text-blue-500 hover:text-blue-600 transition duration-150 ${
                                voteStatus === "upvote" && "text-blue-800"
                            }`}
                        >
                            {loading && voteStatus === "upvote" ? (
                                <FaSpinner className="animate-spin" size={20} />
                            ) : (
                                <AiOutlineLike size={20} />
                            )}
                        </button>
                        <span className="text-sm">{upvotes}</span>
                        <button
                            onClick={() => handleVote("downvote")}
                            className={`text-red-500 hover:text-red-600 transition duration-150 ${
                                voteStatus === "downvote" && "text-red-800"
                            }`}
                        >
                            {loading && voteStatus === "downvote" ? (
                                <FaSpinner className="animate-spin" size={20} />
                            ) : (
                                <AiOutlineDislike size={20} />
                            )}
                        </button>
                        <span className="text-sm">{downvotes}</span>
                        <Link
                            href={`/post/${post.id}`}
                            className="text-gray-500 hover:text-gray-700 flex items-center space-x-2"
                        >
                            <FaRegComment size={20} />
                            <span className="text-sm">{commentsNbr}</span>
                        </Link>
                    </div>
                </div>

                {/* Display Comments */}
                <div className="mt-6">
                    {comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </div>

                {/* Display Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag.name}
                            className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
                        >
                            #{tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Post;
