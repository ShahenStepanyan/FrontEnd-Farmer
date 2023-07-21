import { Col, Row } from "antd";
import AnimalTypes from "./AnimalTypes";
import DeregisterFields from "./DeregisterFields";
import ProblemFields from "./ProblemFields";

function SelectFields() {
  return (
    <Row gutter={[16, 16]}>
      <Col lg={12} md={24}>
        <AnimalTypes />
        <ProblemFields />
      </Col>
      <Col lg={12} md={24}>
        <DeregisterFields />
      </Col>
    </Row>
  );
}

export default SelectFields;
