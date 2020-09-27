import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Form } from "../components/Form";

describe("<Form /> rendering", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    const props = {
      onSubmit: jest.fn(),
    };

    wrapper = shallow(<Form {...props} />);
  });

  it("should render an input", () => {
    expect(wrapper.find("input.FormInput")).toHaveLength(1);
  });

  it("should render a button", () => {
    expect(wrapper.find("button.FormButton")).toHaveLength(1);
  });
});

describe("<Form /> interactions", () => {
  let wrapper: ShallowWrapper;
  let props: any;

  beforeEach(() => {
    props = {
      onSubmit: jest.fn(),
    };

    wrapper = shallow(<Form {...props} />);
  });

  it("should call the onSubmit function when button is clicked", () => {
    const formButton = wrapper.find(".FormButton").first();
    formButton.simulate("click");
    expect(props.onSubmit.mock.calls.length).toEqual(1);
  });

  it("should change the state inputValue when the onChange function of the text input is invoked", () => {
    wrapper.find(".FormInput").simulate("change", { target: { value: "10" } });
    expect(wrapper.state("inputValue")).toEqual("10");
  });
});
