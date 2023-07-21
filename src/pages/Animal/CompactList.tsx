import React from "react";
import { Button, Divider } from "antd";
import { Link } from "react-router-dom";

import type { AnimalModel } from "../../types/Animal";

const CompactList = ({
  divider,
  animals,
  title,
}: {
  divider: boolean;
  animals: Array<AnimalModel>;
  title: React.ReactNode;
}) => (
  <>
    {divider && <Divider />}
    <h4 className="compact-list-header">{title}</h4>
    {animals.map((child, index) => (
      <React.Fragment key={child._id}>
        {!!index && <Divider type="vertical" />}
        <Button>
          <Link to={`/animals/${child._id}`}>{Number(child.serialNumber)}</Link>
        </Button>
      </React.Fragment>
    ))}
  </>
);

export default CompactList;
