import { useEffect, useState } from "react";
import {  Navigate, Outlet, useNavigate } from "react-router-dom";
import useCookie from 'universal-cookie';
import { USER } from "../../Api/api";
import LoadingSubmit from "../../components/Loading/Loading";
import { Axios } from "../../Api/Axios";
import Err403 from "./403";

export default function RequireAuth( { allowedRole } ){

    const navigate = useNavigate()

    //user
    const [user, setUser]  = useState('');

    useEffect( ()=> {
        Axios.get(`/${USER}`)
        .then(data => setUser(data.data))
        .catch(() => navigate('/login', {replace: true}));
    } ,[])

    //token + Cookie
    const cookie = new useCookie();
    const token = cookie.get('e-commerce');


    return  token ? user === '' ? <LoadingSubmit /> :  allowedRole.includes(user.role) ?  <Outlet /> : 
    <Err403 role = {user.role} />: <Navigate to = {'/login'} replace = {true} />
}