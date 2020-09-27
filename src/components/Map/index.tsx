import React from "react";
import ReactMapGL from "react-map-gl";
import config from "../../config";
import { PopupInfo } from "./PopupInfo";
import { Markers } from "./Markers";

interface MapProps {
  pointsByCategory: Array<{
    categoryId: string;
    categoryName: string;
    points: [];
    color: string;
  }>;
  changePopup: Function;
  popupInfo: any;
}

interface MapState {
  viewport: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export class Map extends React.Component<MapProps, MapState> {
  private mapContainer: any = React.createRef();

  state = {
    viewport: {
      latitude: 52.5300463,
      longitude: 13.4007813,
      zoom: 10,
    },
  };

  openPopup = (popupInfo: any) => {
    this.props.changePopup(popupInfo);
  };

  closePopup = () => {
    this.props.changePopup(null);
  };

  render() {
    const { viewport } = this.state;
    const { pointsByCategory, popupInfo } = this.props;

    return (
      <div className="mapContainer">
        <ReactMapGL
          ref={this.mapContainer}
          {...viewport}
          className="map"
          mapStyle="mapbox://styles/mapbox/streets-v9"
          width="100%"
          height="100%"
          onViewportChange={(viewport: any) => this.setState({ viewport })}
          mapboxApiAccessToken={config.mapboxApiToken}
          onClick={this.closePopup}
        >
          <PopupInfo info={popupInfo} onClose={this.closePopup} />
          {pointsByCategory.map((pointCategory, index) => {
            const { categoryName, points, color } = pointCategory;
            return (
              <Markers
                key={index}
                category={categoryName}
                data={points}
                onClick={this.openPopup}
                color={color}
              />
            );
          })}
        </ReactMapGL>
      </div>
    );
  }
}
