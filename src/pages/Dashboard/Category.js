import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { CATEGORY} from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSubmit from "../../components/Loading/Loading";

export default function Category() {
    // user data
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    // onsubmit 
    const [disable, setDisabel] = useState(true);
    //loading page
    const [loading, setLoading] = useState(false);
    //user id by use JS
    // const id = Number(window.location.pathname.replace('/dashboard/Categories/', ''));
    //by use react
    const { id } = useParams()

    //navigate
    const navigete = useNavigate();
    // get user data
    useEffect( () => {
        setLoading(true)
        Axios.get(`${CATEGORY}/${id}`)
        .then(data => {
            setTitle(data.data.title);
        }).then(() =>{
            setDisabel(false);
            setLoading(false);
            }).catch( () => navigete('/dashboard/categories/page/404', {replace: true}))
    }, [])

    // Handle submit
    async function handleSubmit(e){
        setLoading(true);
        e.preventDefault();
        // handle form data
        const form = new FormData()
        form.append('title', title)
        form.append('image', image)
        // send user data
        try{
            const res = await Axios.post(`${CATEGORY}/edit/${id}`, form );
            navigete('/dashboard/Categories')
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
                    <Form.Control  placeholder = "Enter your Title..." 
                    value = {title} onChange = { (e) => setTitle(e.target.value) }  required/>
                    <Form.Label >Product Title:</Form.Label>
                </Form.Group>

                <Form.Group className = "form-custom">
                    <Form.Control type = 'file'  placeholder = "Enter your Email..." 
                    onChange = { (e) => setImage(e.target.files.item(0)) } required  />
                    <Form.Label >Image:</Form.Label>
                </Form.Group>

                <button disabled = {disable} className="btn btn-primary ">Update User</button>
            </div>
        </Form>
        </>
    )
}