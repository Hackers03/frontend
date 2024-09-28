import { FormEvent } from "react";
import { useRegisterMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const useRegister = () => {
    const router = useRouter();
    const [register, { isLoading }] = useRegisterMutation();
    const registerSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const nickname = form["nickname"].value;
        const email = form["email"].value;
        const password = form["password"].value;
        const re_password = form["re_password"].value;

        if (password != re_password) {
            //register_error  = "password aren't the s
        }

        register({ nickname, email, password, re_password })
            .unwrap()
            .then(() => {
                toast.success("Please check your email to verify account");
                router.refresh()
            })
            .catch(() => {
                toast.error("Failed toregister account");
            });
    };
    const isLoading_register = isLoading;
    return {
        registerSubmit,
        isLoading_register,
    };
};
export default useRegister;
