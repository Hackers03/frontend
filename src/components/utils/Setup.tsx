'use client';
import useVerify from "@/hooks/useVerify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Setup = () => {
    useVerify() //thats check if there's a valid access Tocken
    return <ToastContainer/>
}

export default Setup;