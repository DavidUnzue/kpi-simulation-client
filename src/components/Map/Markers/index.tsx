import React from "react";
import { Marker } from "react-map-gl";
import { ReactComponent as Location } from "../../../assets/images/location.svg";

export class Markers extends React.PureComponent<{
  category: string;
  data: any;
  onClick: Function;
  color: string;
}> {
  render() {
    const { category, data, color, onClick } = this.props;

    return data.map((point: any) => {
      const [long, lat] = point.geometry?.coordinates;
      const { name, id }: { name: string; id: string } = point.properties;
      const popupInfo = {
        category,
        lat,
        long,
        text: name,
      };

      return (
        <Marker
          key={id}
          latitude={lat}
          longitude={long}
          offsetLeft={-12}
          offsetTop={-24}
        >
          <Location
            width={24}
            height={24}
            title={name}
            onClick={() => onClick(popupInfo)}
            className="markerIcon"
            fill={color}
          />
        </Marker>
      );
    });
  }
}
