import React from "react";
import "./assets/css/App.css";
import { Bins } from "./components/Bins";
import { Form } from "./components/Form";
import { Map } from "./components/Map";
import { Points } from "./components/Points";
import api from "./services/api";

interface AppState {
  data: any;
  popupInfo: any;
}

class App extends React.Component {
  state: AppState = {
    data: {},
    popupInfo: null,
  };

  triggerSimulation = async (requestsNumber: number) => {
    try {
      const data = await api.get("kpis", {
        number_of_requests: requestsNumber,
      });
      this.setState({
        data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  getGeoFeatures = (jsonString: string) => {
    try {
      const parsedJson = JSON.parse(jsonString);
      return parsedJson.features || [];
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  changePopup = (popupInfo: any) => {
    this.setState({
      popupInfo,
    });
  };

  render() {
    const { data, popupInfo } = this.state;
    const {
      booking_distance_bins = {},
      most_popular_dropoff_points = "{}",
      most_popular_pickup_points = "{}",
    } = data;

    const pointsByCategory = [
      {
        categoryId: "pickup",
        categoryName: "Pick up",
        points: this.getGeoFeatures(most_popular_pickup_points),
        color: "#085156",
      },
      {
        categoryId: "dropoff",
        categoryName: "Drop off",
        points: this.getGeoFeatures(most_popular_dropoff_points),
        color: "#26c4b8",
      },
    ];

    return (
      <div className="App">
        <div className="AppSidebar">
          <h1 className="AppHeader">KPI Simulator</h1>
          <Form onSubmit={this.triggerSimulation} />
          <Bins bins={booking_distance_bins} />
          <Points
            pointsByCategory={pointsByCategory}
            changePopup={this.changePopup}
          />
        </div>
        <Map
          pointsByCategory={pointsByCategory}
          popupInfo={popupInfo}
          changePopup={this.changePopup}
        />
      </div>
    );
  }
}

export default App;
