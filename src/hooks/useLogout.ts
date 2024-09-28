import { useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { setLogout } from "@/redux/features/authSlice";
import { toast } from "react-toastify";
import { MouseEventHandler } from "react";

const useLogout = () => {
    const dispatch = useAppDispatch();
    const [logout, { isLoading }] = useLogoutMutation();

    const onClickLogout = () => {
        logout(undefined)
            .unwrap()
            .then(() => {
                toast.success("logout succrssfully");
                dispatch(setLogout());
            })
            .catch(() => {
                toast.error("logout failed");
            });
        //the user is logout
    };

    return {
        onClickLogout,
        isLoading,
    };
};

export default useLogout;
