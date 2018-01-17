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

    const { filter } = this.props;

    console.log(filter);
    var checker = 'started';
    if(panelDescription.indexOf('starting')>-1) {
      checker = 'accepted';
    }

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
          <div onClick={this.props.selectFilter.bind(this,panelDescription,widgetLeftName)}
            className={["widget", "red"].join(' ')+(filter[0]===checker&&filter[1]===widgetLeftName.replace(' ','_').toLowerCase() ? ' selected ' : '')}>
            {widgetLeftName} ({widgetLeftData})
          </div>
          <div onClick={this.props.selectFilter.bind(this,panelDescription,widgetMiddleName)}
          className={["widget", "yellow"].join(' ')+(filter[0]===checker&&filter[1]===widgetMiddleName.replace(' ','_').toLowerCase() ? ' selected ' : '')}>
            {widgetMiddleName} ({widgetMiddleData})
          </div>
          <div onClick={this.props.selectFilter.bind(this,panelDescription,widgetRightName)}
          className={["widget", "green"].join(' ')+(filter[0]===checker&&filter[1]===widgetRightName.replace(' ','_').toLowerCase() ? ' selected ' : '')}>
          { widgetRightName}<br/>({widgetRightData})
          </div>
        </div>
      </div>
    );
  }
}

export default SummaryPanel;
