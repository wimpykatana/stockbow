import React from 'react';
import config from '../../../config/config.json';
import ReactGA from 'react-ga';

ReactGA.initialize(config.trackerId);
ReactGA.pageview(window.location.pathname);

class Payment extends React.Component {

  render() {
    return(
      <div className="animated fadeIn">
        PAYMENT PAGE
      </div>
    )
  }

}
export default Payment;
