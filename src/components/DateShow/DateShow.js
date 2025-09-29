import { useEffect, useState } from "react";

export default function DateShow(props) {
  const date = new Date();
  let [day, setDay] = useState(date.getDay());
  let [hours, setHours] = useState(date.getHours());
  let [minute, setMinute] = useState(date.getMinutes());
  let [second, setSecond] = useState(date.getSeconds());

  useEffect(() => {
    const time = setTimeout(() => {
      setSecond((prev) => --prev);

      if (second <= 0) {
        setMinute((prev) => --prev);
        setSecond(60);
      }
      if (minute <= 0) {
        setMinute(60);
        setHours((prev) => (prev -= 1));
      }
      if (hours <= 0) {
        setHours(60);
        setDay((prev) => (prev = -1));
      }
      if (day <= 0) {
        clearTimeout(time);
      }
    }, 1000);
  }, [second]);
  return (
    <>
      {props.position === "upper" ? (
        <div className="justify-content-center  align-items-center">
          <div className="d-flex justify-content-center align-items-center gap-3">
            <span className="fw-bold" style={{ fontSize: "15px" }}>
              Days
            </span>
            <span className="fw-bold" style={{ fontSize: "15px" }}>
              Hours
            </span>
            <span className="fw-bold" style={{ fontSize: "15px" }}>
              Minute
            </span>
            <span className="fw-bold" style={{ fontSize: "15px" }}>
              Second
            </span>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-4">
            <span className="fw-bold fs-4">
              {day < 10 && 0}
              {`${day} :`}
            </span>
            <span className="fw-bold fs-4">
              {hours < 10 && 0}
              {`${hours} :`}
            </span>
            <span className="fw-bold fs-4">
              {minute < 10 && 0}
              {`${minute} :`}
            </span>
            <span className="fw-bold fs-4">
              {second < 10 && 0}
              {`${second} `}
            </span>
          </div>
        </div>
      ) : (
        <div className="justify-content-center text-center align-items-center">
          <div className="d-flex justify-content-center flex-wrap align-items-center gap-4">
            <div className="bg-white rounded-circle  px-4 py-3">
              <span className="fw-bold fs-4">
                {day < 10 && 0}
                {`${day} `}
              </span>
              <span className="fw-bold d-block" style={{ fontSize: "15px" }}>
                Days
              </span>
            </div>

            <div className="bg-white rounded-circle  px-4 py-3">
              <span className="fw-bold fs-4">
                {hours < 10 && 0}
                {`${hours} `}
              </span>
              <span className="fw-bold d-block" style={{ fontSize: "15px" }}>
                Hours
              </span>
            </div>

            <div className="bg-white rounded-circle  px-4 py-3">
              <span className="fw-bold fs-4">
                {minute < 10 && 0}
                {`${minute} `}
              </span>
              <span className="fw-bold d-block" style={{ fontSize: "15px" }}>
                minute
              </span>
            </div>

            <div className="bg-white rounded-circle px-4 py-3">
              <span className="fw-bold fs-4">
                {second < 10 && 0}
                {`${second} `}
              </span>
              <span className="fw-bold d-block" style={{ fontSize: "15px" }}>
                second
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return `${day} : ${hours} : ${minute} : ${second}`;
}
