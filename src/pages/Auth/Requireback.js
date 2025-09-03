import Cookie from 'universal-cookie'
import { Outlet } from 'react-router-dom'

export default function Requireback(){
    
    const cookie = new Cookie()
    const token = cookie.get('e-commerce')

    return token ? window.history.back() : <Outlet />
}