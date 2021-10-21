import React from "react";
import { FormControl } from "react-bootstrap";
import moment from "moment-timezone";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import './App.css'



var PORT = process.env.PORT || 5000
class App extends React.Component {
  constructor(props) {
    super(props);
    let start = moment(new Date(2016, 8, 20, 0, 0, 0, 0));
    let end = moment(start).add(5, "days").subtract(1, "second");
    this.state = {
      start: start,
      end: end,
      timezone: "America/Los_Angeles",
      secondDisplay: false
    };

    this.onClick = this.onClick.bind(this);
    this.applyCallback = this.applyCallback.bind(this);
  }

  applyCallback(startDate, endDate) {
    console.log("Apply Callback");
    console.log(startDate.format("YYYY-MM-DD HH:mm"));
    console.log(endDate.format("YYYY-MM-DD HH:mm"));
    this.setState({
      start: startDate,
      end: endDate
    });
  }

  rangeCallback(index, value) {
    console.log(index, value);
  }

  onClick() {
    let newStart = moment(this.state.start).subtract(3, "days");
    // console.log("On Click Callback");
    // console.log(newStart.format("YYYY-MM-DD HH:mm"));
    this.setState({ start: newStart });
  }



 

  renderPickerAutoApplyPastFriendly(ranges, local, maxDate, descendingYears) {
    let value = `${this.state.start.format(
      "YYYY-MM-DD HH:mm"
    )} - ${this.state.end.format("YYYY-MM-DD HH:mm")}`;
    return (
      <div>
        <br />
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={this.applyCallback}
          rangeCallback={this.rangeCallback}
          autoApply
          descendingYears={descendingYears}
          years={[2010, 2020]}
          pastSearchFriendly
          smartMode
        >
          <FormControl
            id="formControlsTextB"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: "pointer" }}
            disabled
            value={value}
          />
        </DateTimeRangeContainer>
        <div onClick={this.onClick}>
          Click Me to test the Date Picker in Past Search Friendly mode with
          auto apply with custom dates and descending years set to{" "}
          {descendingYears.toString()}
        </div>
        <br />
      </div>
    );
  }

  renderStandalone(ranges, local, maxDate, descendingYears) {
    return (
      <div class='DateTimeRangeStandAloneContainer' id="DateTimeRangeContainerStandalone">
        <br />
        <p>
          {" "}
          <b> Avi's </b> DateTime picker. Values are{" "}
          {this.state.start.format("YYYY-MM-DD HH:mm")} and{" "}
          {this.state.end.format("YYYY-MM-DD HH:mm")}{" "}
        </p>
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={this.applyCallback}
          rangeCallback={this.rangeCallback}
          autoApply
          descendingYears={descendingYears}
          years={[2010, 2020]}
          standalone
          style={{
            standaloneLayout: { display: "flex", maxWidth: "fit-content" }
          }}
        />
        <br />
      </div>
    );
  }

  render() {
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start).add(1, "days").subtract(1, "seconds");
    let ranges = {
      "Today Only": [moment(start), moment(end)],
      "Yesterday Only": [
        moment(start).subtract(1, "days"),
        moment(end).subtract(1, "days")
      ],
      "3 Days": [moment(start).subtract(3, "days"), moment(end)],
      "5 Days": [moment(start).subtract(5, "days"), moment(end)],
      "1 Week": [moment(start).subtract(7, "days"), moment(end)],
      "2 Weeks": [moment(start).subtract(14, "days"), moment(end)],
      "1 Month": [moment(start).subtract(1, "months"), moment(end)],
      "1st August 18": [
        moment("2021-08-01 00:00:00"),
        moment("2021-08-02 23:59:59")
      ],
      "1 Year": [moment(start).subtract(1, "years"), moment(end)]
    };
    let local = {
      format: "YYYY-MM-DD HH:mm",
      sundayFirst: false
    };
    let maxDate = moment(end).add(24, "hour");
    let pickersRender = (
      <div>
        {this.renderStandalone(ranges, local, maxDate, false)}
      </div>
    );
    let pickers;
    if (this.state.secondDisplay) {
      pickers = this.renderPickerAutoApplySmartModeDisabledSecondsIncluded(
        ranges,
        local,
        maxDate,
        true
      )
    } else {
      pickers = pickersRender;
    }

    return (
      <div className="container">
        <h1>Welcome to Avi's Date-Time-Picker Demo</h1>
        <button
          id={"Reset-Toggle"}
          onClick={() =>
            this.setState({
              secondDisplay: false
            })
          }
        >
          Reset
        </button>
        {pickers}
      </div>
    );
  }
}
export default App;
