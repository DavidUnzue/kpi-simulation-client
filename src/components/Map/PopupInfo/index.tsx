import React from "react";
import { Popup } from "react-map-gl";

export class PopupInfo extends React.Component<{
  info: {
    category: string;
    lat: number;
    long: number;
    text: string;
  } | null;
  onClose: () => void;
}> {
  roundNumber(number: number) {
    return Math.round(number * 100) / 100;
  }

  render() {
    const { info, onClose } = this.props;
    return (
      info && (
        <Popup
          latitude={info.lat}
          longitude={info.long}
          closeButton={true}
          closeOnClick={false}
          onClose={onClose}
          anchor="top"
          className="popup"
        >
          <p>
            <i>{info.category}</i>
            <br />
            <strong>{info.text}</strong>
          </p>
          <p>
            Latitude: {this.roundNumber(info.lat)}
            <br />
            Longitude: {this.roundNumber(info.long)}
          </p>
        </Popup>
      )
    );
  }
}
