import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Map } from "../components/Map";

describe("<Map />", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    const props = {
      pointsByCategory: [],
      changePopup: jest.fn(),
      popupInfo: {},
    };

    wrapper = shallow(<Map {...props} />);
  });

  it("renders the map container", () => {
    expect(wrapper.find(".mapContainer")).toHaveLength(1);
  });
});
