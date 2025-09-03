import './bars.css';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../../context/MenuContext';
import { Axios } from '../../Api/Axios';
import { LOGOUT, USER } from '../../Api/api';
import { useNavigate, NavLink } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Cookie from "cookie-universal";

export default function Topbar() {

    const menu = useContext(Menu);
    const setIsOpen = menu.setIsOpen;
    const isOpen = menu.isOpen;
    const navigate = useNavigate();
    const [name, setName] = useState('');

    // cookie
    const cookie = Cookie();
    // get user name
    useEffect( ()=> {
        Axios.get(`/${USER}`)
        .then(data => setName(data.data.name))
        .catch(() => navigate('/login', {replace: true}));
    } ,[])

    //handle logout
    async function handleLogout(){
        
            try{
                await Axios.get(`/${LOGOUT}`);
                cookie.remove('e-commerce')
                window.location.pathname = '/login';
            }catch(err){
                console.log(err)
            }
        }


    return(
        <div className = 'top-bar d-flex align-items-center justify-content-between' >
                <div className = 'd-flex align-items-center gap-5'>
                    <NavLink to = '/' className = "text-black display-6" >E-commerce</NavLink>
                    <FontAwesomeIcon cursor = {'pointer'}
                    onClick = {() => setIsOpen( prev => !prev)} style = {{color: isOpen ? '#038edc': 'black',
                    padding: '8px', border: isOpen ? '2px solid #038edc': 'none', borderRadius: '10px'}} icon={faBars} />
                </div>
                <div>
                    <DropdownButton id = 'dropdown-basic-button'  title = {name}>
                        <Dropdown.Item style = {{background: 'red', color: 'white'}} onClick = {handleLogout}>Logout </Dropdown.Item>
                    </DropdownButton>
                </div>
        </div>
    )
}