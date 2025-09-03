import {  useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import {  CATEGORY } from "../../Api/api";
import { useNavigate } from "react-router-dom";
import LoadingSubmit from "../../components/Loading/Loading";

export default function AddCategorie() {
    // categorie data
    const [title, setTitle] = useState("")
    const [image, setImage] = useState('')
    //loading page
    const [loading, setLoading] = useState(false);
    //navigate
    const navigete = useNavigate();
    //ref
    const focus = useRef('');
    //handle focus 
    useEffect(()=> {
        focus.current.focus();
    })

    // Handle submit
    async function handleSubmit(e){
        setLoading(true);
        e.preventDefault();
        
        // handle form data
        const form = new FormData()
        form.append('title', title)
        form.append('image', image)

        // send categorie data
        try{
            const res = await Axios.post(`${CATEGORY}/add`, form);
            navigete('/dashboard/categories')
        }catch(err){
            setLoading(false);
            console.log(err)
        }
        console.log(form)
    }


    return (
        <>
        {loading && <LoadingSubmit />}
        <Form className = " bg-white w-100 mx-2 p-3" onSubmit = { handleSubmit }>
            <div>
                <h1>Update User</h1>

                <Form.Group className = "form-custom mt-5"  >
                    <Form.Control ref = {focus}  placeholder = "Enter your Title..." 
                    value = {title} onChange = { (e) => setTitle(e.target.value) } required/>
                    <Form.Label  >Product Title:</Form.Label>
                </Form.Group>

                <Form.Group className = "form-custom mt-5" controlId = 'image' > 
                    <Form.Control type = 'file' 
                    onChange = {(e) => setImage(e.target.files.item(0))}></Form.Control>
                    <Form.Label  >Product Image:</Form.Label>
                </Form.Group>


                <button disabled = {title.length > 1 ? false : true}  className="btn btn-primary ">Update User</button>
            </div>
        </Form>
        </>
    )
}