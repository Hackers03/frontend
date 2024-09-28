import type { User } from "@/redux/features/authApiSlice";
import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import type { ProfileType } from "@/utils/type";
import Image from "next/image";

interface props {
    profile: ProfileType;
}

const Profile: React.FC<props> = ({ profile }) => {

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
            <div className="flex flex-col items-center space-y-4">
                    <Image
                        src={profile.photo || '/moi.png'}
                        alt="profile"
                        width={150}
                        height={150}
                        className={`rounded-lg shadow-lg ${profile.confirmed? 'border border-blue-500':''}`}
                    />
             

                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {profile.user.nickname}
                    </h2>
                    <p className="text-gray-600">{profile.user.email}</p>
                </div>

                <div className="w-full">
                    <div className="flex justify-between items-center text-gray-700">
                        <span className="font-medium">Bio:</span>
                        <span>{profile.bio}</span>
                    </div>

                    <div className="flex justify-between items-center text-gray-700 mt-2">
                        <span className="font-medium">Reputation:</span>
                        <span>{profile.reputation}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-700 mt-2">
                        <span className="font-medium">follower:</span>
                        <span>{}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
