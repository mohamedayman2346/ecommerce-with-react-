
import { useEffect, useRef, useState } from "react"

import { Form } from "react-bootstrap";

export default function Test(){

    // states
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

   const focus = useRef(null)
   useEffect(()=> {
    focus.current.focus();
   }, [])
   
    

    // handle form change
    function handleForm(e){
            setForm( {...form, [ e.target.name ] : e.target.value} )
    }

    // // handle Submit
    // async function handleSubmit(e) {
    //     setLoading(true);
    //     e.preventDefault();
    //     try{
    //         const res = await axios.post(`${baseURL}/${REGISTER}`, form );
    //         setLoading(false);
    //         window.location.pathname = '/dashboard/users';
    //         const token = res.data.token;
    //         cookie.set('e-commerce', token)  
    //     }catch(err){
    //         console.log(err)
    //         if(err.response.status === 422)
    //             setErr("Email is already been taken");
    //         else
    //             setErr('Internal Server Error');

    //         setLoading(false);
    //     }
    // }


    return (
        <>
    
        <div className = "container">
            <div className = "row" style = {{height: '100vh'}}>
                <Form className = "form" >
                    <div className = 'custom-form'>
                        <h1>Test Now</h1>
                            
                        <Form.Group className = "mb-3 form-custom mt-5">
                            <Form.Control type = 'text' id = 'name' placeholder = "Enter your Name..." 
                            value = {form.name} onChange = { handleForm } name = 'name' ref = {focus} required />
                            <Form.Label htmlFor = "name" >Name</Form.Label>
                        </Form.Group>

                        <Form.Group className = "mb-3 form-custom">
                            <Form.Control type = 'email' id = 'email' placeholder = "Enter your Email..." 
                            value = {form.email} onChange = { handleForm } name = "email" required />
                            <Form.Label htmlFor = "email" >Email</Form.Label>
                        </Form.Group>

                        <Form.Group className = "mb-3 form-custom">
                            <Form.Control type = 'password' id = 'password' placeholder = "Enter your Password..." 
                            value = {form.password} onChange = { handleForm } name = 'password' required minLength = "6" />
                            <Form.Label htmlFor = "password" >password</Form.Label>
                        </Form.Group>

                        <button className="btn btn-primary">Register</button>



                        {/* {err !== '' && <span className = "err">{err}</span>} */}
                    </div>
                </Form>
            </div>
        </div>
        </>
    )
}