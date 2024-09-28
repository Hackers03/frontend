"use client";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { UserIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";
interface UserProviderProps {
  onPostAdded?: () => void; // Ajouter la prop onPostAdded ici
}
export const UserProvider: React.FC<UserProviderProps> = () => {
  const { data: user, isLoading } = useRetrieveUserQuery();

  return (
    <Link
      href={`/users-profile/${user?.id}`}
      className="flex items-center text-gray-600 hover:text-blue-600"
    >
      <UserIcon className="w-6 h-6 mr-2 text-gray-500" />
      Profile
    </Link>
  );
};
