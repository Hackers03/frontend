'use client';

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";

const Page = () => {
    const { isAuthenticated } = useAppSelector(state => state.auth)
    //const [retrieveUser, {isLoading}] = useRetrieveUserQuery();
    
    const router = useRouter()
    return (
        <>
            { isAuthenticated ? (
                <main>
                    <h1>dashbord</h1>
                </main>
            ):(
                router.push('/auth/register-login')
            )}
        </>
    );
}

export default Page;