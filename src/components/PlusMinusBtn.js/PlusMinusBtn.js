import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function PlusMinusBtn(props) {
  const [btn, setBtn] = useState(1);

  useEffect(() => {
    props.setCount(btn);

    if (props.changeCount) {
      props.changeCount(props.id, btn);
    }
  }, [btn]);

  useEffect(() => {
    if (props.count) {
      setBtn(props.count);
    }
  }, [props.count]);

  return (
    <div className="d-flex align-items-center input-group">
      <span className="input-group-btn">
        <button
          className="btn btn-danger btn-number"
          onClick={() => {
            btn > 0 ? setBtn((prev) => --prev) : setBtn(1);
          }}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </span>
      <div>
        <input
          type="number"
          className="input-number form-control"
          value={btn}
          min={1}
          max={100}
          onChange={(e) => {
            if (e.target.value > 0) setBtn(e.target.value);
            else setBtn(1);
          }}
        />
      </div>
      <span className="input-group-btn">
        <button
          className="btn btn-success btn-number"
          onClick={() => {
            setBtn((prev) => ++prev);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </span>
    </div>
  );
}
