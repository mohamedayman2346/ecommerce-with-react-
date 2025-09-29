import { Outlet } from "react-router-dom";
import Cookie from "universal-cookie";

export default function RequireBack() {
    const cookie = new Cookie();
    const token = cookie.get('ecommerce');

    return token ? window.history.back() : <Outlet />;
}