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
  isLoading: boolean;
  error: boolean;
}

class App extends React.Component {
  state: AppState = {
    data: {},
    popupInfo: null,
    isLoading: false,
    error: false,
  };

  triggerSimulation = (requestsNumber: number) => {
    this.setState(
      {
        isLoading: true,
        error: false,
      },
      async () => {
        let data = {};
        try {
          // get data from api
          data = await api.get("kpis", {
            number_of_requests: requestsNumber,
          });
        } catch (e) {
          console.log(e);
          this.setState({
            error: true,
          });
        } finally {
          this.setState({
            data,
            isLoading: false,
          });
        }
      }
    );
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

  // will be called by map markers or list items to show a popup
  changePopup = (popupInfo: any) => {
    this.setState({
      popupInfo,
    });
  };

  render() {
    const { data, popupInfo, error, isLoading } = this.state;
    const {
      booking_distance_bins = {},
      most_popular_dropoff_points = "{}",
      most_popular_pickup_points = "{}",
    } = data;

    const isDataAvailable =
      Object.keys(booking_distance_bins).length > 0 &&
      Object.keys(most_popular_dropoff_points).length > 0 &&
      Object.keys(most_popular_pickup_points).length > 0;

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
          {error ? (
            <p className="Alert">
              Error: Unable to retrieve the footprint data. Try again.
            </p>
          ) : isLoading ? (
            <p className="Info">Loading...</p>
          ) : !isDataAvailable ? (
            <p className="Info">Run the simulation first to show the data.</p>
          ) : (
            <>
              <Bins bins={booking_distance_bins} />
              <Points
                pointsByCategory={pointsByCategory}
                changePopup={this.changePopup}
              />
            </>
          )}
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
