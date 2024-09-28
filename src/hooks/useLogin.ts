import { useLoginMutation } from "@/redux/features/authApiSlice";
import { setAuth } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter, redirect } from "next/navigation";
import { Store } from "@/redux/store";

const useLogin = () => {
    const router = useRouter()
    const [login, { isLoading, isSuccess }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)


    const loginSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const email = form["email"].value;
        const password = form["password"].value;
        console.log(email, password);

        await login({ email, password })
            .unwrap()
            .then(() => {
                toast.success("login success");
                dispatch(setAuth());

                console.log("State after dispatch setAuth:",  Store().getState().auth);
            })
            .catch(() => {
                toast.error("login failed");
            });

    };

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    return {
        loginSubmit,
        isLoading,
        isSuccess,
    };
};

export default useLogin;