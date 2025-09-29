import axios from "axios"
import { baseURL, GOOGLECALLBACK } from "../../Api/Api"
import { useLocation } from "react-router-dom";
import Cookie from "universal-cookie";
import { useEffect } from "react";

export default function GoogleCallBack(){

    const cookie = new Cookie();
    const location = useLocation();
    
    useEffect( () => {
        async function callBack() {
            try{
                const res = await axios.get(`${baseURL}/${GOOGLECALLBACK}${location.search}`);
                const token = res.data.access_token;
                cookie.set('ecommerce', token)
                window.location.pathname = '/';
            } catch(err){
                console.log(err);
            }

        }

        callBack();
    }, [])

    return;
}