import React, { Component } from 'react';

class SummaryPanel extends Component {
  render() {
    const {
      totalTrips, 
      widgetLeftName,
      widgetLeftData,
      widgetMiddleName,
      widgetMiddleData, 
      widgetRightName,
      widgetRightData,
      panelDescription 
    } = this.props.data;

    return (
      <div>
      <p className="panelText">
        {panelDescription}
      </p>
      <div className="left">
        <p className="totalTrips">
          {totalTrips}
        </p>
          <br/>Trips
      </div>
      <div className="right">
        <div className={["widget", "red"].join(' ')}>
          {widgetLeftName} ({widgetLeftData})
        </div>
        <div className={["widget", "yellow"].join(' ')}>
          {widgetMiddleName} ({widgetMiddleData})
        </div>
        <div className={["widget", "green"].join(' ')}>
        { widgetRightName}<br/>({widgetRightData})
        </div>
      </div>
      </div>
    );
  }
}

export default SummaryPanel;