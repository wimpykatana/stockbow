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
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

import config from '../../../config/config';
import ReactGA from 'react-ga';

ReactGA.initialize(config.trackerId);
ReactGA.pageview(window.location.pathname);

const brandInfo = getStyle('--info');

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 29;
var data1 = [];


let mainChart = {

    labels: [],
    datasets: [
      {
        label: 'IHSG',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff',
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
          max: 6500,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
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

      newarr.map(x => {
        mainChart.labels.push(x[0]);
        data1.push(x[1]["5. adjusted close"])
      });

      // for (var i = 0; i <= elements; i++) {
      //   data1.push(random(50, 200));
      // }

      console.log(mainChart);
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
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">IHSG</CardTitle>
                  </Col>

                </Row>
                <div className="chart-wrapper" style={{ height: 500 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={mainChart} options={mainChartOpts} height={300} onChange={this.changeHandler} redraw />

                  {/*{chart}*/}
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
