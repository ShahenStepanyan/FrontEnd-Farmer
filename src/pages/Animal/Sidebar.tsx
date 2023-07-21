import { Button, Card } from "antd";
import { Link } from "react-router-dom";
import { GenderEnum } from "../../types/Animal";
import CompactList from "./CompactList";
import InfoItem from "./InfoItem";

import type { AnimalModel } from "../../types/Animal";

const Sidebar = ({
  animal,
  children,
  siblings,
  onAddChildren,
}: {
  animal?: AnimalModel;
  children: Array<AnimalModel>;
  siblings: Array<AnimalModel>;
  onAddChildren: () => void;
}) => (
  <div className="sidebar">
    <Card style={{ height: "inherit" }}>
      {animal?.parent && (
        <InfoItem
          title="Parent"
          info={
            <Button>
              <Link to={`/animals/${animal.parent}`}>
                {Number(animal.parentNumber)}
              </Link>
            </Button>       
          }
        />
      )}
        {animal?.father && (
        <InfoItem
          title="Father"
          info={
            <Button>
              <Link to={`/animals/${animal.father}`}>
                {Number(animal.fatherNumber)}
              </Link>
            </Button>       
          }
        />
      )}
      {animal?.gender === GenderEnum.FEMALE && (
        <CompactList
          divider={!!animal?.parent}
          animals={children}
          title={
            <>
              Children
              <Button disabled={animal.removed} onClick={onAddChildren}>
                Add
              </Button>
            </>
          }
        />
      )}
      {!!siblings.length && (
        <CompactList divider animals={siblings} title="Siblings" />
      )}
    </Card>
  </div>
);

export default Sidebar;
