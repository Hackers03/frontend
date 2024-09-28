import { useActivationMutation } from "@/redux/features/authApiSlice"
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const useActivation = ({uid, token}: {uid: string, token: string}) => {
    const [activation, {isLoading}] = useActivationMutation();

    activation({uid, token})
        .unwrap()
        .then(() => {
            toast.success("account activation success");
            redirect('/');
        })
        .catch((err) => {
            console.log('error in activation account: ', err);
        })
        
}

export default useActivation;