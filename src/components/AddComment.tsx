import React, { useState } from 'react';
import { api } from '@/utils/api';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';

interface AddCommentProps {
    postId: number;
    onCommentAdded?: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ postId, onCommentAdded }) => {
    const { data: user } = useRetrieveUserQuery();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Envoyer une requête pour créer un commentaire avec la catégorie "comments"
            await api.post('posts/create/', {
                json: { 
                    author: user?.id, 
                    parent_post: postId, // Lien avec le post parent
                    category: 'Comment', // Catégorie par défaut pour les commentaires
                    details: content, // Contenu du commentaire
                }
            }).json();

            setContent(''); // Réinitialisation du champ de texte

            if (onCommentAdded) {
                onCommentAdded(); // Appeler la fonction onCommentAdded si elle est définie
            }
        } catch (err: any) {
            console.error("Erreur lors de l'ajout du commentaire :", err);
            setError(
                err.response?.data?.message || 
                "Une erreur est survenue lors de l'ajout du commentaire."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-4 p-4 bg-gray-50 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-12 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm"
                    placeholder="Ajoutez un commentaire..."
                    rows={2} // Hauteur réduite
                    required
                />
                {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
                <button
                    type="submit"
                    className={`mt-2 w-full py-2 px-4 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    disabled={loading}
                >
                    {loading ? 'Envoi en cours...' : 'Ajouter un commentaire'}
                </button>
            </form>
        </div>
    );
};

export default AddComment;
