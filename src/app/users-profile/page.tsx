"use client";
import { useState, useEffect } from "react";
import type { ProfileType } from "@/utils/type";
import { api } from "@/utils/api";
import Profile from "@/components/Profile";

const UserProfilePage = () => {
    const [profiles, setProfiles] = useState<ProfileType[]>([]);

    const getProfiles = async () => {
        await api.get("profiles/")
            .json<ProfileType[]>()
            .then((res) => setProfiles(res))
            .catch((error) => console.error(error));
    };


    useEffect(() => {
        getProfiles();
    }, []);

    return (
        <div className="flex ">
            {profiles.map((profile) => (
                <Profile 
                    key={profile.user.id} 
                    profile={profile}
                />
            ))}
        </div>
    );
};

export default UserProfilePage;
