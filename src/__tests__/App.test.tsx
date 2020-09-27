import React from "react";
import { shallow } from "enzyme";
import App from "../App";

it("renders without crashing", () => {
  const wrapper = shallow(<App />);
  const title = <h1 className="AppHeader">KPI Simulator</h1>;
  expect(wrapper.contains(title)).toEqual(true);
});
