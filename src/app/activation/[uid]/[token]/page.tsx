'use client'
import { useEffect } from "react";
import { useActivationMutation } from "@/redux/features/authApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
    params: {
        uid: string,
        token: string
    } 
}

const Page: React.FC<Props> = ({ params }) => {
    const [activation, { isLoading }] = useActivationMutation();
    const router = useRouter();

    useEffect(() => {
        const activateAccount = async () => {
            try {
                await activation(params).unwrap();
                toast.success("Account activation successful");
                router.push('/');
            } catch (err) {
                console.error('Error in activating account: ', err);
            }
        };

        activateAccount();
    }, [params, activation, router]);

    return (
        <main>
            <h1>Activation</h1>
        </main>
    );
};

export default Page;
