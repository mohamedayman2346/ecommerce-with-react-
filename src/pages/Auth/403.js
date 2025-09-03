import { Link } from 'react-router-dom';
import './403.css';
export default function Err403( {role} ){
    return(
        <div className = 'text-wrapper'>
            <div className = 'title' data-content = {404}>
                403 - Access DENIED
            </div>
            <div className = 'subtitle'>
                Oops, you don't have permission to access this page.
                <Link to = {role === '1991' ? '/dashboard/writer' : "/"}  className = 'd-block text-center btn btn-primary' >
                {role === '1991' ? 'Go to writer page' : "Go to Home page"}
                </Link>
            </div>
        </div>
    )
}
