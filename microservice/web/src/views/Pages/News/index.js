import React from 'react';
import config from '../../../config/config.json';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Table
} from "reactstrap";
import ReactGA from 'react-ga';

ReactGA.initialize(config.trackerId);
ReactGA.pageview(window.location.pathname);

const newsSide = {

};

class News extends React.Component {
  render() {
    return(
      <div className="animated fadeIn" style={{height: '100%'}}>
        <Row className="no-gutters" style={{height:'100%'}}>
          <Col sm={12} md={8} className="content-holder white-text" >
            <div>
              NEWS
            </div>
          </Col>
          <Col sm={12} md={4} className="content-holder white-text" style={newsSide}>
            <div>
              <Col md="12">
                <InputGroup>

                  <Input type="text" id="input1-group1" name="input1-group1" placeholder="search emiten news" />

                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <i className="fa fa-search"></i>
                    </InputGroupText>
                  </InputGroupAddon>

                </InputGroup>
              </Col>
            </div>
          </Col>

        </Row>
      </div>
    )
  }
}
export default News;
