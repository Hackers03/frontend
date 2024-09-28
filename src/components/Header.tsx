'use client';
import Link from "next/link";
import Logo from "@/components/Logo";
import { useAppSelector } from "@/redux/hooks";
import { api } from "@/utils/api";
import useLogout from "@/hooks/useLogout";
import Search from "@/components/Search"; // Assurez-vous que le chemin est correct
import { useRouter } from 'next/navigation'; // Utiliser useRouter pour la navigation

const Header = () => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const { onClickLogout, isLoading } = useLogout();
    const router = useRouter(); // Utiliser useRouter pour la navigation

    const handleSearch = (query: string) => {
        // Rediriger vers la page de recherche avec le paramètre de requête
        router.push(`/search?q=${query}`);
    };

    return (
        <header className="w-full flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 sticky top-0 z-50">
            {/* Logo à gauche */}
            <Link href="/" aria-label="Go to homepage" className="flex items-center">
                <Logo /> {/* Assurez-vous que la taille est correcte */}
            </Link>

            {/* Champ de recherche centré */}
            <div className="flex-grow flex justify-center">
                <div className="w-full max-w-lg">
                    <Search onSearch={handleSearch} />
                </div>
            </div>

            {/* Bouton de déconnexion à droite */}
            {isAuthenticated && (
                <div className="flex items-center">
                    <button
                        onClick={onClickLogout}
                        className="text-black border border-gray-300 px-4 py-1 rounded-full transition duration-150 hover:bg-gray-100"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging out..." : "Log out"}
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
