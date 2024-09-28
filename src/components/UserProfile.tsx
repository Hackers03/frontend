import React, { useEffect, useState } from 'react';
import { api } from '@/utils/api';

interface ProfileType {
    id: number;
    photo: string | null;
    reputation: number;
    bio: string | null;
    confirmed: boolean;
    updated: string;
}

interface UserType {
    id: number;
    email: string;
    nickname: string;
    profile: ProfileType;
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true); // Ajout d'un état de chargement
    const userId = 1; // Remplace avec l'ID de l'utilisateur approprié

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get(`/users/${userId}/`);
                const data: UserType = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Erreur lors de la récupération du profil utilisateur', error);
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        fetchUserProfile();
    }, [userId]); // Ajout de userId comme dépendance pour déclencher la mise à jour

    if (loading) {
        return <div>Chargement...</div>; // Affiche un message pendant le chargement
    }

    if (!user) {
        return <div>Utilisateur non trouvé.</div>; // Affiche un message si l'utilisateur est null
    }

    return (
        <div>
            <h1>{user.nickname}</h1>
            <p>Email: {user.email}</p>
            <p>Bio: {user.profile.bio}</p>
            <p>Reputation: {user.profile.reputation}</p>
        </div>
    );
};

export default UserProfile;
