'use client';

import { Store } from "./store";
import { Provider } from "react-redux";

interface props {
    children: React.ReactNode;
}

const CustomProviver: React.FC<props> = ({children}) => {
    return (
        <Provider store={Store()}>
            {children}
        </Provider>
    );
}

export default CustomProviver;