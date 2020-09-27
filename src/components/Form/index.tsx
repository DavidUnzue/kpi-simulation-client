import React from "react";

interface FormProps {
  onSubmit: Function;
}

interface FormState {
  inputValue: string;
}

export class Form extends React.Component<FormProps, FormState> {
  state = {
    inputValue: "10",
  };

  handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: ev.target.value,
    });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.inputValue);
  };

  render() {
    const { inputValue } = this.state;

    return (
      <form className="Form">
        <label className="FormLabel" htmlFor="requestsNumber">
          Number of requests (max. 10)
        </label>
        <input
          id="requestsNumber"
          className="FormInput"
          value={inputValue}
          min="1"
          max="10"
          type="number"
          onChange={this.handleChange}
        />
        <button
          className="FormButton"
          type="button"
          onClick={this.handleSubmit}
        >
          Run simulation
        </button>
      </form>
    );
  }
}
