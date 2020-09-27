import React from "react";
import { PointList } from "./PointList";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export const Points = ({
  pointsByCategory,
  changePopup,
}: {
  pointsByCategory: Array<{
    categoryId: string;
    categoryName: string;
    points: [];
    color: string;
  }>;
  changePopup: Function;
}) => {
  let isEmpty = true;
  pointsByCategory.forEach((pointsCategory) => {
    isEmpty = pointsCategory.points.length <= 0;
  });

  return !isEmpty ? (
    <div className="Points">
      <Tabs className="Tabs">
        <TabList className="TabList">
          <span className="PointsTitle">Points</span>
          {pointsByCategory.map((pointCategory, index) => (
            <Tab key={index} className="Tab">
              {pointCategory.categoryName}
            </Tab>
          ))}
        </TabList>

        {pointsByCategory.map((pointCategory, index) => (
          <TabPanel key={index} className="TabPanel">
            <PointList
              category={pointCategory.categoryName}
              points={pointCategory.points}
              onClick={changePopup}
            />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  ) : null;
};
