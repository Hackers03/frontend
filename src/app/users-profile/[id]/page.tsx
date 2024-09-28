"use client";
import { useState, useEffect, useCallback } from "react";
import type { ProfileType, postType } from "@/utils/type";
import { api } from "@/utils/api";
import Image from "next/image";
import Post from "@/components/Post"; // Assurez-vous que ce composant existe pour afficher les posts

const ProfileDetail = ({ params }: { params: { id: string } }) => {
    const [profile, setProfile] = useState<ProfileType | null>(null);
    const [posts, setPosts] = useState<postType[]>([]);
    const [comments, setComments] = useState<postType[]>([]);
    const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
    const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
    const [loadingComments, setLoadingComments] = useState<boolean>(true);

    const getProfile = useCallback(async () => {
        setLoadingProfile(true);
        try {
            const profileData = await api.get(`profiles/${params.id}/`).json<ProfileType>();
            setProfile(profileData);
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        } finally {
            setLoadingProfile(false);
        }
    }, [params.id]);

    const getPosts = useCallback(async () => {
        setLoadingPosts(true);
        try {
            const postsData = await api.get(`user-posts/${params.id}/`).json<postType[]>();
            setPosts(postsData);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoadingPosts(false);
        }
    }, [params.id]);
    
    useEffect(() => {
        getProfile();
        getPosts();
    }, [getProfile, getPosts]);

    if (loadingProfile || loadingPosts || loadingComments) return <div>Loading...</div>;
    if (!profile) return <div>Profile not found.</div>;

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="flex items-center space-x-6">
                    <Image
                        src={profile.photo || '/moi.png'}
                        alt="profile"
                        width={150}
                        height={150}
                        className={`rounded-full shadow-lg ${profile.confirmed ? 'border border-blue-500' : ''}`}
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {profile.user.nickname}
                        </h1>
                        <p className="text-gray-600">{profile.bio}</p>
                        <p className="text-gray-500">Reputation: {profile.reputation}</p>
                    </div>
                </div>

                {/* Contact and location */}
                <div className="flex justify-between mt-6">
                    <div>
                        <h2 className="text-xl font-semibold">Contact Information</h2>
                        <p className="text-gray-600">{profile.user.email}</p>
                    </div>
                </div>

                <hr className="my-6" />

                {/* Experience Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Experience</h2>
                    <div className="space-y-4">
                        {/* Add real experience data here */}
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold">Software Developer at XYZ Corp</h3>
                            <p className="text-gray-600">June 2020 - Present</p>
                            <p className="text-gray-500">Developed web applications and managed backend services.</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold">Intern at ABC Inc.</h3>
                            <p className="text-gray-600">Jan 2019 - May 2020</p>
                            <p className="text-gray-500">Assisted in software development projects and learned new technologies.</p>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {/* Add real skills data here */}
                        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">JavaScript</span>
                        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">React</span>
                        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">Node.js</span>
                        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">Django</span>
                    </div>
                </div>

                {/* Education Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Education</h2>
                    <div className="space-y-4">
                        {/* Add real education data here */}
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold">Bachelor&apos;s in Computer Science</h3>
                            <p className="text-gray-600">University of Example - Graduated 2020</p>
                        </div>
                    </div>
                </div>

                {/* Posts Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Posts</h2>
                    <div className="space-y-4">
                        {loadingPosts ? (
                            <p className="text-gray-600">Loading posts...</p>
                        ) : posts.length === 0 ? (
                            <p className="text-gray-600">No posts found.</p>
                        ) : (
                            posts.map((post) => (
                                <Post key={post.id} post={post} />
                            ))
                        )}
                    </div>
                </div>

                {/* Comments Section 
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Comments</h2>
                    <div className="space-y-4">
                        {loadingComments ? (
                            <p className="text-gray-600">Loading comments...</p>
                        ) : comments.length === 0 ? (
                            <p className="text-gray-600">No comments found.</p>
                        ) : (
                            comments.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))
                        )}
                    </div>
                </div>*/}
            </div>
        </div>
    );
};

export default ProfileDetail;
