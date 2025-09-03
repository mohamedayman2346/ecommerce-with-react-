import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { CATEGORIE, PRODUCT } from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSubmit from "../../components/Loading/Loading";

export default function UpdateProduct() {
  // product data
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });

  //set images
  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [idsFromServer, setIdsFromServer] = useState([]);
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
  // images id
  const ids = useRef([]);
  // product id
  const { id } = useParams();

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

  // get data
  useEffect(() => {
    Axios.get(`/${PRODUCT}/${id}`)
      .then((data) => {
        setForm(data.data[0]);
        setImagesFromServer(data.data[0].images);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle Edit
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();

    // send product data
    try {
      for (let i = 0; i < idsFromServer.length; i++) {
        await Axios.delete(`product-img/${idsFromServer[i]}`).then((data) =>
          console.log(data)
        );
      }
      // handle data to sent
      await Axios.post(`${PRODUCT}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  //handle change on form
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //Handle image delete
  async function HandleImageDelete(id, img) {
    const findID = ids.current[id];
    try {
      await Axios.delete(`product-img/${findID}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((i) => i !== findID);
      --j.current;
    } catch (err) {
      console.log(err);
    }
  }

  //Handle image delete
  async function HandleDeleteimageFromServer(id) {
    setImagesFromServer((prev) => prev.filter((img) => img.id !== id));
    setIdsFromServer((prev) => [...prev, id]);
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
  const categoriesShow = categories?.map((item, key) => (
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
  // show images
  const imagesFromServerShow = imagesFromServer.map((img, key) => (
    <div key={key} className=" border p-2 col-2 position-relative">
      <div className="d-flex align-items-center justify-content-start gap-2">
        <img src={img.image} width="80px" alt="img" />
      </div>
      <div className="position-absolute top-0 end-0 bg-danger rounded text-white">
        <p
          className="py-1 px-2 m-0"
          style={{ cursor: "pointer" }}
          onClick={() => HandleDeleteimageFromServer(img.id)}
        >
          X
        </p>
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
              onChange={handleChange}
              required
            />
            <Form.Label> Title:</Form.Label>
          </Form.Group>

          <Form.Group className="form-custom mt-5">
            <Form.Control
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
              name="stock"
              placeholder="Enter your stock..."
              value={form.stock}
              onChange={handleChange}
              type="number"
              required
            />
            <Form.Label>stock:</Form.Label>
          </Form.Group>

          <Form.Group className="form-custom mt-5">
            <Form.Control
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
            style={{ border: "2px dashed #0086fe", cursor: "pointer" }}
          >
            <img
              src={require("../../Logo-google-icon-PNG.png")}
              alt="upload here"
              width="100px"
            />
            <p className="fw-bold mb-0" style={{ color: "#0086fe" }}>
              Upload Images
            </p>
          </div>

          <div className="d-flex align-items-start flex-wrap gap-2">
            {imagesFromServerShow}
          </div>

          <div className="d-flex align-items-start flex-column gap-2">
            {imagesShow}
          </div>

          <button className="btn btn-primary  ">Save</button>
        </div>
      </Form>
    </>
  );
}
