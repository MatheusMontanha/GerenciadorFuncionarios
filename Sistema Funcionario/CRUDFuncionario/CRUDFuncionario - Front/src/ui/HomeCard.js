import React from "react";
import { Card, CardText, CardBody, Button } from "reactstrap";
import { Link } from "react-router";

const HomeCard = props => {
  return (
    <div
      className="col-12 col-sm-4"
      style={{
        paddingTop: "10px",
      }}
    >
      <Card>
        <CardBody>
          <CardText>{props.text}</CardText>
          <Link to="/Cadastrar"></Link>
          <Button color="primary" onClick={props.action}>
            {props.title}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default HomeCard;
