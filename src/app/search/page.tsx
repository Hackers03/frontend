'use client';
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { api } from "@/utils/api";
import Profile from "@/components/Profile";
import Post from "@/components/Post";
import type { ProfileType, postType, tagType } from "@/utils/type";

type SearchResult = {
    profiles: ProfileType[];
    posts: postType[];
    tags: tagType[];
};

const SearchPageContent = () => {
    const searchParams = useSearchParams(); // Utiliser pour obtenir les paramètres de l'URL
    const query = searchParams.get('q'); // Extraire le paramètre query
    const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (query) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await api.get(`search/?q=${query}/`).json<SearchResult>();
                    setSearchResults(response);
                } catch (error) {
                    console.error("Erreur lors de la recherche :", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [query]); // Relancer l'effet quand query change

    if (loading) {
        return <p>Recherche en cours...</p>;
    }

    if (!searchResults || !query) {
        return <p>Aucun résultat trouvé pour la recherche &quot;{query}&quot;</p>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-6">Résultats de la recherche pour : &quot;{query}&quot;</h1>

            <section>
                <h2 className="text-xl font-semibold mb-4">Profils</h2>
                <div className="grid grid-cols-1 gap-4">
                    {searchResults.profiles.map(profile => (
                        <Profile key={profile.user.id} profile={profile} />
                    ))}
                </div>
            </section>

            <section className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Posts</h2>
                <div className="grid grid-cols-1 gap-4">
                    {searchResults.posts.map(post => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </section>

            <section className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Tags</h2>
                <div className="grid grid-cols-1 gap-4">
                    {searchResults.tags.map(tag => (
                        <div key={tag.name} className="p-2 border rounded-lg">
                            {tag.name}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

const SearchPage = () => {
    return (
        <Suspense fallback={<div>Chargement de la page...</div>}>
            <SearchPageContent />
        </Suspense>
    );
};

export default SearchPage;
