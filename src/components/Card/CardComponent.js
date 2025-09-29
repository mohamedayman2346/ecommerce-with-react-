import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import {faTwitter, faInstagram,  faLinkedinIn} from "@fortawesome/free-brands-svg-icons";

export default function CardComponent(props) {

  return (
    <Card style={{ width: "18rem" }}  className={props.cardClass}>
      {props.img && (
        <Card.Img variant="top" src={props.img} className={props.imgClass} />
      )}
      {props.icon}
      <Card.Body>
        <Card.Title className={props.titleClass}>{props.title}</Card.Title>
        <Card.Text className={props.textClass}>{props.text}</Card.Text>
        {props.social && <div className="social d-flex justify-content-start align-items-center gap-4">
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faLinkedinIn} />
          </div>}
      </Card.Body>
    </Card>
  );
}
