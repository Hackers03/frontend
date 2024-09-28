"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Utilisez next/navigation au lieu de next/router
import { api } from '@/utils/api';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';

interface Category {
    name: string;
}

interface Tag {
    name: string;
}

interface AddPostFormProps {
    onPostAdded?: () => void; // Ajouter la prop onPostAdded ici
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onPostAdded }) => {
    const router = useRouter(); // Utilisez useRouter ici
    const { data: user, error: userRetrieveError, isLoading } = useRetrieveUserQuery();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<string | number>(''); 
    const [tags, setTags] = useState<string[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [availableTags, setAvailableTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategoriesAndTags = async () => {
            try {
                const categoriesResponse = await api.get('categories/');
                const categoriesData = await categoriesResponse.json() as Category[];
                setCategories(categoriesData);

                const tagsResponse = await api.get('tags/');
                const tagsData = await tagsResponse.json() as Tag[];
                setAvailableTags(tagsData);
            } catch (err) {
                console.error("Erreur lors de la récupération des catégories ou des tags :", err);
            }
        };

        fetchCategoriesAndTags();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log('---------------------', category)
            await api.post('posts/create/', {
                json: { 
                    author: user?.id, 
                    category, 
                    tags, 
                    title, 
                    details: content 
                }
            }).json(); 

            // Réinitialisation des champs
            setTitle('');
            setContent('');
            setCategory('');
            setTags([]);
            if (onPostAdded) {
                onPostAdded(); // Appeler la fonction onPostAdded si elle est définie
            }
            router.push('/'); // Redirection après la soumission
        } catch (err: any) {
            console.error("Erreur lors de l'ajout du post :", err);
            setError(
                err.response?.data?.message || 
                "Une erreur est survenue lors de l'ajout du post."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setTags(selectedOptions);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Poser une question publique</h2>

                {/* Guide sur comment bien poser une question */}
                <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400">
                    <h3 className="text-lg font-semibold text-blue-700">Écrire une bonne question</h3>
                    <p className="text-sm text-blue-600 mt-2">
                        Assurez-vous que votre question comprend :
                        <ul className="list-disc ml-6 mt-1">
                            <li>Un titre descriptif et concis</li>
                            <li>Une explication détaillée du problème</li>
                            <li>Tout exemple de code si applicable</li>
                        </ul>
                    </p>
                </div>

                {error && <p className="text-red-600 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Champ pour la sélection de la catégorie */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        >
                            <option value="">Sélectionnez une catégorie</option>
                            {categories.map(cat => (
                                <option key={cat.name} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Champ pour le titre de la question */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Quelle est votre question ?"
                            required
                        />
                    </div>

                    {/* Champ pour la description (contenu) */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Détails</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Expliquez en détail le problème que vous rencontrez..."
                            rows={8}
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Incluez toutes les informations pertinentes, telles que les extraits de code, les erreurs et ce que vous avez déjà essayé.</p>
                    </div>

                    {/* Champ pour les tags avec auto-complétion */}
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                        <select
                            id="tags"
                            multiple
                            value={tags}
                            onChange={handleTagChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {availableTags.map(tag => (
                                <option key={tag.name} value={tag.name}>{tag.name}</option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Ajoutez jusqu&apos; à 5 tags pour décrire de quoi parle votre question.</p>
                    </div>

                    {/* Affichage des tags sélectionnés */}
                    {tags.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-700">Tags sélectionnés :</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map(name => {
                                    const tag = availableTags.find(tag => tag.name === name);
                                    return tag ? (
                                        <span key={tag.name} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-md">
                                            {tag.name}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}

                    {/* Bouton de soumission */}
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition duration-150`}
                        disabled={loading}
                    >
                        {loading ? 'Envoi en cours...' : 'Publier votre question'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPostForm;
