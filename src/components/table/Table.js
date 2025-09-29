import {
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import TransformDate from "./TransformDate";
import PaginatedItems from "../Pagination/pagination";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Axios } from "../../Api/Axios";

export default function TableShow(props) {
  const currentUser = props.currentUser || { name: "" };

  // search tool
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [date, setDate] = useState("");

  // search by Date
  const filterDataByDate =
    date.length !== 0
      ? props.data.filter((item) => TransformDate(item.created_at) === date)
      : props.data;

  const filteSearchByDate =
    date.length !== 0
      ? searchData.filter((item) => TransformDate(item.created_at) === date)
      : searchData;

  const searchShow = search.length > 0 ? filteSearchByDate : filterDataByDate;
  
  // search
  async function getSearch() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setSearchData(res.data);
      console.log(res)
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }
  // Run the Search
  useEffect(() => {
    const debunce = setTimeout(() => {
      search.length > 0 ? getSearch() : setSearchLoading(false);
      return () => clearTimeout(debunce);
    }, 300);
  }, [search]);

  const headerShow = props.header.map((item, key) => (
    <th key={key}>{item.name}</th>
  ));

  const dataShow = searchShow?.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((value, index) => (
        <td key={index}>
          {item[value.key] === "1995" ? (
            "admin"
          ) : item[value.key] === "1991" ? (
            "writer"
          ) : item[value.key] === "1999" ? (
            "Product Manger"
          ) : item[value.key] === "2001" ? (
            "user"
          ) : value.key === "images" ? (
            <div
              key={key}
              className="d-flex align-items-center justify-content-start gap-2 flex-wrap"
            >
              {item[value.key].map((img) => (
                <img src={img.image} alt="img" width={"50px"} />
              ))}
            </div>
          ) : value.key === "image" ? (
            <img src={item[value.key]} width={"50px"} alt="image" />
          ) : value.key === "created_at" || value.key === "updated_at" ? (
            TransformDate(item[value.key])
          ) : (
            item[value.key]
          )}
          {currentUser && item[value.key] === currentUser.name ? " (You)" : ""}
        </td>
      ))}

      <td key={key}>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon
              cursor={"pointer"}
              fontSize={"19px"}
              icon={faPenToSquare}
            />
          </Link>

          {currentUser.name !== item.name && (
            <FontAwesomeIcon
              cursor={"pointer"}
              onClick={() => props.delete(item.id)}
              fontSize={"19px"}
              color="red"
              icon={faTrash}
            />
          )}
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      {/* search Conteiner */}
      <Container className="row gap-2 mb-4">
        <Form.Group className="position-relative col-12 col-md-4 ">
          <Form.Control
            type="search"
            placeholder="search"
            className="me-2 "
            aria-label="Search"
            id="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchLoading(true);
            }}
          />
          <Form.Label htmlFor="search">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="position-absolute top-0 end-0 m-2 me-5"
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="col-12 col-md-4">
          <Form.Control type="date" onChange={(e) => setDate(e.target.value)} />
        </Form.Group>
      </Container>
      {/* Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            {headerShow}
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {props.loading ? (
            <tr>
              <td colSpan={12} className="text-center">
                Loading...
              </td>
            </tr>
          ) : searchLoading ? (
            <tr>
              <td colSpan={12} className="text-center">
                Search...
              </td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>

      <div className="d-flex align-items-center justify-content-center my-5 gap-3">
        <Form.Select
          onChange={(e) => props.setLimit(e.target.value)}
          aria-label="select"
          value={props.limit}
          style={{ width: "80px" }}
          className="mb-3"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </Form.Select>

        {/* pagination */}
        <PaginatedItems
          itemsPerPage={props.limit}
          setPage={props.setPage}
          total={props.total}
        />
      </div>
    </>
  );
}
