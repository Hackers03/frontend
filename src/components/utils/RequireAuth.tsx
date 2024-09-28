'use client';

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isRefresh, setRefresh] = useState(false);
    const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        console.log('isLoading:', isLoading);
        console.log('isAuthenticated:', isAuthenticated);

        if (!isLoading && !isAuthenticated) {
            console.log('Redirecting to /auth/login-register');
            router.push("/auth/login-register");
        }
    }, [isLoading, isAuthenticated, router]);


    if (!isAuthenticated) {
        <div className=""><p className="">You must be authenticated</p></div>
    }

    return <>{children}</>;
};

export default RequireAuth;
