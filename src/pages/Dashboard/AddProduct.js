import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { CATEGORIE, PRODUCT } from "../../Api/api";
import { useNavigate } from "react-router-dom";
import LoadingSubmit from "../../components/Loading/Loading";

export default function AddProduct() {
  // product data
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });

  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 222,
    discount: 0,
    About: "About",
    stock: 0,
  };

  //set images
  const [images, setImages] = useState([]);
  const [sent, setSent] = useState(false);
  const [id, setId] = useState();
  //get Categories
  const [categories, setCategories] = useState([]);
  //loading page
  const [loading, setLoading] = useState(false);
  //navigate
  const nav = useNavigate();
  //Ref
  const focus = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  // Hundle Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  //open upload image
  function handleOpenImage() {
    openImage.current.click();
  }

  // get All categories
  useEffect(() => {
    Axios.get(`/${CATEGORIE}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Handle Edit
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();

    // send product data
    try {
      // handle data to sent
      const res = await Axios.post(`${PRODUCT}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  //handle submit form
  async function HandleSubmitForm() {
    try {
      const res = await Axios.post(`${PRODUCT}/add`, dummyForm);
      setId(res.data.id);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  //handle change on form
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(1);
    if (sent !== 1) HandleSubmitForm();
  }
  //Handle image delete
  async function HandleImageDelete(id, img) {
    const findID = ids.current[id];
    try {
      const res = await Axios.delete(`product-img/${findID}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((i) => i !== findID);
      --j.current;
    } catch (err) {
      console.log(err);
    }
  }

  //handle images change
  const j = useRef(-1);
  async function HandleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imgaesAsFile = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imgaesAsFile.length; i++) {
      j.current++;
      data.append("image", imgaesAsFile[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.trunc((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  // //maping
  // categorie selector
  const categoriesShow = categories.map((item, key) => (
    <option value={item.id} key={key}>
      {item.title}
    </option>
  ));
  // show images
  const imagesShow = images.map((img, key) => (
    <div key={key} className=" border p-2 w-100 ">
      <div className="d-flex align-items-center justify-content-between gap-2">
        <img src={URL.createObjectURL(img)} width="80px" alt="img" />

        <div>
          <p className="mb-1">{img.name}</p>
          <p>
            {img.size / 1024 < 900
              ? `${(img.size / 1024).toFixed(2)} KB`
              : `${(img.size / (1024 * 1024)).toFixed(2)} MB`}
          </p>
        </div>
        <Button onClick={() => HandleImageDelete(key, img)} variant="danger">
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <LoadingSubmit />}
      <Form className=" bg-white w-100 mx-2 p-3" onSubmit={handleEdit}>
        <div>
          <h1>Update User</h1>

          <Form.Group className="form-custom mt-5">
            <Form.Select
              name="category"
              ref={focus}
              placeholder="Enter your category..."
              value={form.category}
              onChange={handleChange}
            >
              <option disabled>Select Category</option>
              {categoriesShow}
            </Form.Select>
            <Form.Label> Category:</Form.Label>
          </Form.Group>

          <Form.Group className="form-custom mt-5">
            <Form.Control
              name="title"
              placeholder="Enter your Title..."
              value={form.title}
              disabled={!sent}
              onChange={handleChange}
              required
            />
            <Form.Label> Title:</Form.Label>
          </Form.Group>

          <Form.Group className="form-custom mt-5">
            <Form.Control
              disabled={!sent}
              name="description"
              placeholder="Enter your Description..."
              value={form.description}
              onChange={handleChange}
              required
            />
            <Form.Label>Description</Form.Label>
          </Form.Group>

          <Form.Group className="form-custom mt-5">
            <Form.Control
              disabled={!sent}
              name="price"
              placeholder="Enter your price..."
              value={form.price}
              onChange={handleChange}
              required
            />
            <Form.Label>Price:</Form.Label>
          </Form.Group>

          <Form.Group className="form-custom mt-5">
            <Form.Control
              disabled={!sent}
              name="discount"
              placeholder="Enter your discount..."
              value={form.discount}
              onChange={handleChange}
              required
            />
            <Form.Label>Discount:</Form.Label>
          </Form.Group>

          <Form.Group className="form-custom mt-5">
            <Form.Control
              disabled={!sent}
              name="About"
              placeholder="Enter your About..."
              value={form.About}
              onChange={handleChange}
              required
            />
            <Form.Label>About:</Form.Label>
          </Form.Group>

          <Form.Group className="form-custom mt-5">
            <Form.Control
              disabled={!sent}
              name="stock"
              placeholder="Enter your Stock..."
              type = 'number'
              value={form.stock}
              onChange={handleChange}
              required
            />
            <Form.Label>Stock:</Form.Label>
          </Form.Group>

          <Form.Group className="form-custom mt-5">
            <Form.Control
              disabled={!sent}
              hidden
              type="file"
              multiple
              ref={openImage}
              onChange={HandleImagesChange}
            />
            <Form.Label>images:</Form.Label>
          </Form.Group>
          <div
            onClick={handleOpenImage}
            className="d-flex align-items-center justify-content-center gap-2 w-100 rounded mb-2 flex-column py-3"
            style={{
              border: !sent ? "2px dashed gray" : "2px dashed #0086fe",
              cursor: sent && "pointer",
            }}
          >
            <img
              src={require("../../Logo-google-icon-PNG.png")}
              alt="upload here"
              width="100px"
              style={{ filter: !sent && "grayscale(1)" }}
            />
            <p
              className="fw-bold mb-0"
              style={{ color: !sent ? "gray" : "#0086fe" }}
            >
              Upload Images
            </p>
          </div>

          <div className="d-flex align-items-start flex-column gap-2">
            {imagesShow}
          </div>

          <button
            disabled={form.title.length > 1 ? false : true}
            className="btn btn-primary mt-5 "
          >
            Add Product
          </button>
        </div>
      </Form>
    </>
  );
}
