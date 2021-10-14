import { useState } from "react";
import { useLocation } from "react-router-dom";
import Content from "./Content";

const Shell = () => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    const [code, _]  = useState<string | null>(useQuery().get('code'));

    console.log('Google code parameter:', code);

    return <Content googleAccessCode = {code}></Content>

}

export default Shell