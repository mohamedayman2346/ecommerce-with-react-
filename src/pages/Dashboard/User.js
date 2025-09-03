import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSubmit from "../../components/Loading/Loading";

export default function User() {
    // user data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    // onsubmit 
    const [disable, setDisabel] = useState(true);
    //loading page
    const [loading, setLoading] = useState(false);
    //user id
    const {id} = useParams();
    //navigate
    const navigete = useNavigate();
    // get user data
    useEffect( () => {
        setLoading(true)
        Axios.get(`${USER}/${id}`)
        .then(data => {
            setName(data.data.name);
            setEmail(data.data.email);
            setRole(data.data.role);
        }).then(() =>{
            setDisabel(false);
            setLoading(false);
            }).catch( () => navigete('/dashboard/users/page/404', {replace: true}))
    }, [])

    // Handle submit
    async function handleSubmit(e){
        setLoading(true);
        e.preventDefault();
        // send user data
        try{
            const res = await Axios.post(`${USER}/edit/${id}`,{
                name: name,
                email: email,
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
                    <Form.Control type = 'text' id = 'text' placeholder = "Enter your Name..." 
                    value = {name} onChange = { (e) => setName(e.target.value) } name = "name" required/>
                    <Form.Label htmlFor = "text" >User Name:</Form.Label>
                </Form.Group>

                <Form.Group className = "form-custom">
                    <Form.Control type = 'email' id = 'email' placeholder = "Enter your Email..." 
                    value = {email} onChange = { (e) => setEmail(e.target.value) } name = 'email' required  />
                    <Form.Label htmlFor = "email" >Email:</Form.Label>
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
                <button disabled = {disable} className="btn btn-primary ">Update User</button>
            </div>
        </Form>
        </>
    )
}