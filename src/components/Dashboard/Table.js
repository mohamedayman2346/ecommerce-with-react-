import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import PaginatedItems from "./pagination/Pagination";
import { Axios } from "../../Api/Axios";
import TransformDate from "../../helpers/TransformDate";

export default function TableShow(props) {
  //default value
  const currentUser = props.currentUser || { name: "" };
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filterDataByDate = date.length !== 0 ? props.data.filter(
    (item) => TransformDate(item.created_at) === date
  ) : props.data;

  const filterSearchByDate = date.length !== 0 ? filterData.filter(
    (item) => TransformDate(item.created_at) === date
  ): filterData;

  const showSwtichData =
    search.length > 0 ? filterSearchByDate : filterDataByDate;

  console.log(filterDataByDate);
  async function getSearch(e) {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setFilterData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    const debunce = setTimeout(() => {
      search.length > 0 ? getSearch() : setSearchLoading(false);
    }, 500);
    return () => clearTimeout(debunce);
  }, [search]);

  // table header
  const headerShow = props.header.map((item, key) => (
    <th key={key}>{item.name}</th>
  ));
  // table details
  const dataShow = showSwtichData.map((usersArr, key) => (
    <tr key={key}>
      <td>{usersArr.id}</td>
      {props.header.map((item, key2) => (
        <td key={key2}>
          {item.key === "image" ? (
            <img src={usersArr[item.key]} alt="img" width={"50px"} />
          ) : item.key === "images" ? (
            <div
              key={key}
              className="d-flex align-items-center justify-content-start  gap-2 flex-wrap"
            >
              {usersArr[item.key].map((img) => (
                <img width={"50px"} src={img.image} alt="img" />
              ))}
            </div>
          ) : item.key === "created_at" || item.key === "updated_at" ? (
            TransformDate(usersArr[item.key])
          ) : // for users page
          usersArr[item.key] === "1995" ? (
            "Admin"
          ) : usersArr[item.key] === "1991" ? (
            "Writer"
          ) : usersArr[item.key] === "1999" ? (
            "Product manger"
          ) : usersArr[item.key] === "2001" ? (
            "User"
          ) : (
            //for categories page
            usersArr[item.key]
          )}
          {currentUser && usersArr[item.key] === currentUser.name
            ? " (You)"
            : ""}
        </td>
      ))}

      <td key={key}>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${usersArr.id}`}>
            <FontAwesomeIcon
              cursor={"pointer"}
              fontSize={"19px"}
              icon={faPenToSquare}
            />
          </Link>

          {currentUser.name !== usersArr.name && (
            <FontAwesomeIcon
              cursor={"pointer"}
              onClick={() => props.delete(usersArr.id)}
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
      <div className="col-3">
        <Form.Control
          type="search"
          className="my-2"
          placeholder="serach"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
        />
      </div>

      <div className="col-5">
        <Form.Control
          type="date"
          className="my-2"
          placeholder="serach"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            {headerShow}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.loading ? (
            <tr>
              <td colSpan={12} className="text-center">
                'Loading...'{" "}
              </td>
            </tr>
          ) : searchLoading ? (
            <tr>
              <td colSpan={12} className="text-center">
                'Searhing...'{" "}
              </td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-end gap-3">
        <Form.Select
          onChange={(e) => props.setLimit(e.target.value)}
          aria-label="select"
          value={props.limit}
          style={{ width: "80px" }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </Form.Select>

        <PaginatedItems
          itemsPerPage={props.limit}
          setPage={props.setPage}
          total={props.total}
        />
      </div>
    </>
  );
}

// // pagination points if use in front-end only
// const start = (props.page - 1) * props.limit;
// const end = start + +props.limit;
// const final = props.data.slice(start, end);
// //search
// function handleSearch(e) {
//   setSearch(e.target.value.toLowerCase())
// }
// const filterData = props.data.filter(item => item[props.search].toLowerCase().includes(search));
