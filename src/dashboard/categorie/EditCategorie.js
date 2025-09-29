import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { CATEGORY } from "../../Api/Api";
import "../../components/CSS/alert.css";
import LoadingPage from "../../components/Loading/loading";
import { Axios } from "../../Api/Axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddCategorie() {
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate;

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();

  // focus
  const focus = useRef("");
  const click = useRef("");
  // handel foucs
  useEffect(() => {
    focus.current.focus();
  }, []);

  // get data
  useEffect(() => {
    setLoading(true);
    Axios.get(`${CATEGORY}/${id}`)
      .then((res) => setTitle(res.data.title))
      .then(() => {
        setLoading(false)
        setDisable(false)
      }).catch(() => navigate('/dashboard/category/page/404', {replace: true}));
  }, []);

  //handle send form
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    // send the form data to the server
    try {
      await Axios.post(`${CATEGORY}/edit/${id}`, form);
      window.location.pathname = "/dashboard/Categories";
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <LoadingPage />}

      <div className="d-flex w-100 py-5 ps-5 align-items-center justify-content-center">
        <div className="me-5">
          <div className="mb-5">
            <h1>Edit Categorie to Exclusive</h1>
            <p>Enter User details below</p>
          </div>

          <Form className="auth-form my-5 " onSubmit={handleSubmit}>
            <Form.Group
              className="position-relative"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                ref={focus}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                categorie Name
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="my-5 position-relative"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Control
                type="file"
                required
                style={{ display: "none" }}
                onChange={(e) => setImage(e.target.files.item(0))}
                ref={click}
              />
            </Form.Group>
            <div className="drop-img d-flex justify-content-center mb-5 align-items-center w-100">
              <img
                src={require("../../Access/images/upload.png")}
                onClick={() => click.current.click()}
                width={"150px"}
                alt="cloud"
              />
            </div>

            <button disabled={disable} className="btn btn-danger px-4 py-2 w-100" type="submit">
              Save Change
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
