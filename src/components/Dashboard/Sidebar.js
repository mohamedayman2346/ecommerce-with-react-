import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './bars.css';

import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Menu } from '../../context/MenuContext';
import { WindowSize } from '../../context/WindowContext';
import { Axios } from '../../Api/Axios';
import { USER } from '../../Api/api';
import { Links } from './NavLink'

export default function Sidebar(){

    // sidebar open or close
    const menu = useContext(Menu);
    const isOpen = menu.isOpen;
    //size of window
    const window = useContext(WindowSize);
    const width = window.windowResize;

    const navigate = useNavigate()
    
    //user
    const [user, setUser]  = useState('');

    useEffect( ()=> {
        Axios.get(`/${USER}`)
        .then(data => setUser(data.data))
        .catch(() => navigate('/login', {replace: true}));
    } ,[])



    return(
        <>
        <div style = {{position: 'fixed', top: '70px', left: '0', width: '100%', height: '100vh', background: 'rgba(0, 0 ,0 ,0.2', display: width < '768' && isOpen ?'block' : 'none'}}></div>

        <div className = 'side-bar pt-3' style = {{
            left: width < '768' ?  isOpen ? 0 : '-100%': 0,
            width: isOpen ? '230px' : '65px',
            position: width <'768' ? 'fixed' : 'sticky',
            overflow: 'hidden'
        }}>

        {Links.map( (link, key) => (
            link.role.includes(user.role) &&
                <NavLink key = {key} to = {link.path} className = 'd-flex align-items-center gap-2 side-bar-link'>
                    <FontAwesomeIcon style = {{
                        padding: isOpen ? '10px 8px 10px 15px' : '10px 15px'}} 
                        icon={link.icon} />
                        <p className = 'm-0' style = 
                            {{isplay: isOpen ? 'block': 'none',}}>
                            {link.name}
                        </p>
            </NavLink>
        )) 
        }

        </div>
        </>
    )
}