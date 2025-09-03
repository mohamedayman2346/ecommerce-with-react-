import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/api";
import { useNavigate } from "react-router-dom";
import LoadingSubmit from "../../components/Loading/Loading";

export default function AddUser() {
    // user data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    //loading page
    const [loading, setLoading] = useState(false);
    //navigate
    const navigete = useNavigate();
    // ref
    const focus = useRef('');

    //handle focus
    useEffect(() => {
        focus.current.focus();
    })

    // Handle submit
    async function handleSubmit(e){
        setLoading(true);
        e.preventDefault();
        // send user data
        try{
            const res = await Axios.post(`${USER}/add`,{
                name: name,
                email: email,
                password: password,
                role: role,
            });
            navigete('/dashboard/users')
        }catch(err){
            setLoading(false);
            console.log(err)
        }
    }

    return (
        <>
        {loading && <LoadingSubmit />}
        <Form className = " bg-white w-100 mx-2 p-3" onSubmit = { handleSubmit }>
            <div>
                <h1>Update User</h1>

                <Form.Group className = "form-custom mt-5"  >
                    <Form.Control ref = {focus} type = 'text' id = 'text' placeholder = "Enter your Name..." 
                    value = {name} onChange = { (e) => setName(e.target.value) } name = "name" required/>
                    <Form.Label htmlFor = "text" >User Name:</Form.Label>
                </Form.Group>

                <Form.Group className = "form-custom">
                    <Form.Control type = 'email' id = 'email' placeholder = "Enter your Email..." 
                    value = {email} onChange = { (e) => setEmail(e.target.value) } name = 'email' required  />
                    <Form.Label htmlFor = "email" >Email:</Form.Label>
                </Form.Group>

                <Form.Group className = "form-custom">
                    <Form.Control type = 'password' id = 'password' placeholder = "Enter your Password..." 
                    value = {password} onChange = { (e) => setPassword(e.target.value) } name = 'password' required  />
                    <Form.Label htmlFor = "password" >Password:</Form.Label>
                </Form.Group>

                <Form.Group className = "form-custom">
                    <Form.Select  id = 'role' placeholder = "Enter your Role..." 
                    value = {role} onChange = { (e) => setRole(e.target.value) } >
                        <option disabled value = {''} >Select Role</option>
                        <option value = {1995}>Admin</option>
                        <option value = {2001}>User</option>
                        <option value = {1991}>Writer</option>
                        <option value = {1999}>Product manger</option>
                    </Form.Select>
                    <Form.Label htmlFor = "role" >Role:</Form.Label>
                </Form.Group>

                <button disabled = {name.length > 1 && email.length > 1 && password.length > 6 && role !== '' ? false : true}  className="btn btn-primary ">Update User</button>
            </div>
        </Form>
        </>
    )
}