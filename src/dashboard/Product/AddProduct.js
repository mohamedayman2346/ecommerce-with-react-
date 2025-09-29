import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { CATEGORIE, PRODUCT } from "../../Api/Api";
import "../../components/CSS/alert.css";
import LoadingPage from "../../components/Loading/loading";
import { Axios } from "../../Api/Axios";
import { Button } from "react-bootstrap";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);

  const [categories, setCategoies] = useState([]);
  const [images, setImages] = useState([]);
  const [id, setId] = useState("");
  // disable input
  const [sent, setSent] = useState(false);

  // current data
  const [form, setForm] = useState({
    category: "select category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock: "",
  });
  // Dummy form
  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 222,
    discount: 0,
    About: "dummy",
    stock: 0,
  };

  // focus
  const focus = useRef("");
  const click = useRef("");
  // progress precent
  const progress = useRef([]);
  const ids = useRef([]);

  // handel foucs
  useEffect(() => {
    focus.current.focus();
  }, []);

  // get category
  useEffect(() => {
    setLoading(true);
    Axios.get(`${CATEGORIE}`)
      .then((res) => setCategoies(res.data))
      .then(setLoading(false))
      .catch((rej) => console.log(rej));
  }, []);

  // handle form
  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(1);
    if (sent !== 1) handleSubmitDummyForm();
  }

  // send dummy form to get id
  async function handleSubmitDummyForm() {
    try {
      await Axios.post(`${PRODUCT}/add`, dummyForm).then((res) =>
        setId(res.data.id)
      );
    } catch (err) {
      console.log(err);
    }
  }

  //handle send form
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await Axios.post(`${PRODUCT}/edit/${id}`, form);
      window.location.pathname = "/dashboard/products";
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  // handle image and sent
  const j = useRef(-1);
  async function HandelImageChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesFile = e.target.files;
    const data = new FormData();
    // loop in image
    for (let i = 0; i < imagesFile.length; i++) {
      data.append("image", imagesFile[i]);
      data.append("product_id", id);
      j.current++;
      try {
        const res = await Axios.post(`/product-img/add`, data, {
          onUploadProgress: (progressEvent) => {
            const { total, loaded } = progressEvent;
            const percent = Math.trunc((loaded * 100) / total);
            if (percent % 4 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute("percent", `${percent}%`);
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Delete Image
  async function handleDeleteImage(img, id) {
    const findID = ids.current[id];
    try{
      await Axios.delete(`product-img/${findID}`);
      setImages(prev => prev.filter(item => item !== img ));
      ids.current = ids.current.filter((id) => id !== findID);
      --j.current;
    } catch(err){
      console.log(err);
    }
  }

  // image Show
  const imageShow = images.map((img, key) => (
    <div key={key} className="border px-4 py-2 mb-2 w-100 rounded">
      {/* image container */}
      <div className="d-flex align-items-center justify-content-between gap-2">
        <img src={URL.createObjectURL(img)} width="100px" alt="img" />

        <div>
          <p className="mb-1">{img.name}</p>
          <p>
            {img.size / 1024 >= 1024
              ? `${(img.size / (1024 * 1024)).toFixed(2)} MB`
              : `${(img.size / 1024).toFixed(2)} KB`}
          </p>
        </div>
        <Button onClick={() => handleDeleteImage(img, key)} variant="danger">
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-2">
        <span
          className="inner-progress"
          ref={(e) => (progress.current[key] = e)}
        ></span>
      </div>
    </div>
  ));
 

  // category show
  const categoryShow = categories.map((item, key) => (
    <option value = {item.id} key={key}>{item.title}</option>
  ));
 

  return (
    <>
      {loading && <LoadingPage />}

      <div className="d-flex w-100 py-5 ps-5 align-items-center justify-content-center">
        <div className="me-5">
          <div className="mb-5">
            <h1>Add Product to Exclusive</h1>
            <p>Enter User details below</p>
          </div>

          <Form className="auth-form my-5 " onSubmit={handleSubmit}>
            <Form.Group className=" mt-5 position-relative" id="cat">
              <Form.Label htmlFor="cat">select category:</Form.Label>
              <Form.Select
                value={form.category}
                onChange={handleForm}
                name="category"
                required
                ref={focus}
              >
                <option disabled value={"select category"}>
                  Select Role
                </option>
                {categoryShow}
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="position-relative mt-5"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Control
                type="text"
                required
                name="title"
                value={form.title}
                onChange={handleForm}
                disabled={!sent}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Product Title
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="position-relative mt-5"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="text"
                required
                name="description"
                value={form.description}
                onChange={handleForm}
                disabled={!sent}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Product description
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="position-relative mt-5"
              controlId="exampleForm.ControlInput4"
            >
              <Form.Control
                type="text"
                required
                name="price"
                value={form.price}
                onChange={handleForm}
                disabled={!sent}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Product price
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="position-relative mt-5"
              controlId="exampleForm.ControlInput5"
            >
              <Form.Control
                type="text"
                required
                name="discount"
                value={form.discount}
                onChange={handleForm}
                disabled={!sent}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Product discount
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="position-relative mt-5"
              controlId="exampleForm.ControlInput6"
            >
              <Form.Control
                type="text"
                required
                name="About"
                value={form.About}
                onChange={handleForm}
                disabled={!sent}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Product About
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="position-relative mt-5"
              controlId="exampleForm.ControlInput4"
            >
              <Form.Control
                type="text"
                required
                name="stock"
                value={form.stock}
                onChange={handleForm}
                disabled={!sent}
              />
              <Form.Label className="position-absolute top-0 start-0 ">
                Product stock
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="my-5 position-relative"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Control
                type="file"
                // required
                multiple
                style={{ display: "none" }}
                onChange={HandelImageChange}
                ref={click}
                disabled={!sent}
              />
            </Form.Group>
            <div
              className="drop-img d-flex gap-2 justify-content-center mb-5 align-items-center w-100"
              onClick={() => click.current.click()}
              style={{
                border: !sent ? "2px dashed gray" : "2px dashed #038edc",
                cursor: sent && "pointer",
              }}
            >
              <img
                src={require("../../Access/images/upload.png")}
                style={{ filter: !sent && "grayscale(1)" }}
                width={"150px"}
                alt="cloud"
              />
              <p
                style={{ color: !sent ? "gray" : "#038edc" }}
                className="fw-bold m-0"
              >
                Upload images
              </p>
            </div>

            {imageShow}

            <button
              className="btn btn-danger px-4 py-2 w-100 mt-5"
              type="submit"
            >
              Add Product
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
