import React from "react";

export const PointList = ({
  category,
  points,
  onClick,
}: {
  category: string;
  points: [];
  onClick: Function;
}) => (
  <div className="PointList">
    {points.map((point: any) => {
      const [long, lat] = point.geometry?.coordinates;
      const { name, id }: { name: string; id: string } = point.properties;
      const popupInfo = {
        category,
        lat,
        long,
        text: name,
      };
      return (
        <div key={id} className="PointItem" onClick={() => onClick(popupInfo)}>
          {point.properties?.name}
        </div>
      );
    })}
  </div>
);
