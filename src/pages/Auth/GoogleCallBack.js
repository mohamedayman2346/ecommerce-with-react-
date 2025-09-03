import { useEffect } from "react";
import { baseURL, GOOGLECALLBACK } from "../../Api/api";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Cookie from "universal-cookie";

export default function GoogleCallBack() {
  const cookie = new Cookie();

  const location = useLocation();

  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          `${baseURL}/${GOOGLECALLBACK}${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("e-commerce", token);
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, []);

  return <div>test</div>;
}
