import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from "react-redux";
import { getJKSE } from "../../../_dux/action/jkseAction";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';

import config from '../../../config/config';
import ReactGA from 'react-ga';

ReactGA.initialize(config.trackerId);
ReactGA.pageview(window.location.pathname);

const brandInfo = getStyle('--info');

// IHSG Chart
var data1 = [];
let chart;


let mainChart = {

    labels: [],
    datasets: [
      {
        label: 'IHSG',
        backgroundColor: '#fff',
        fill: false,
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff',
        pointBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data1,
      },

    ],

};


const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
        },
      }],
  },
  elements: {
    point: {
      radius: 3,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.init = this.init.bind(this);
    this.changeHandler = this.changeHandler.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  componentWillMount() {
    if(!this.props.jkse.data){
      this.props.dispatch(getJKSE());
    }

  }

  componentDidMount() {

  }

  componentDidUpdate() {
  }

  changeHandler() {
    this.chart.update();
  }

  componentWillReceiveProps() {
    if(this.props.jkse.data){

      let obj = this.props.jkse.data;
      let arr = Object.entries(obj);
      let newarr = arr.slice(0,30).reverse();

      // eslint-disable-next-line array-callback-return
      newarr.map(x => {
        mainChart.labels.push(x[0]);
        data1.push(x[1]["5. adjusted close"])
      });

      chart = <Line data={mainChart} options={mainChartOpts} height={500} onChange={this.changeHandler} redraw />;
    }
  }

  init(){

  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    this.init();
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="8">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">IHSG</CardTitle>
                  </Col>

                </Row>
                <div className="chart-wrapper" style={{ height: 500 + 'px', marginTop: 40 + 'px' }}>
                  {chart}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  jkse: state.jkse,
  // token: state.user.data.token
});

export default connect(mapStateToProps)(Dashboard);
