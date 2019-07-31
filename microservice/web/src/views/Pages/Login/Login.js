import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Row } from 'reactstrap';
import GoLogin from '../../../component/GoogleLogin';


class Login extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <div className="text-center">
                    <h1>invesgram</h1>
                    <p className="text-muted">Login with your google account</p>
                  </div>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>

                    <Col xs="12" sm="12">
                      <GoLogin />
                    </Col>
                    {/*<Col xs="12" sm="6">*/}
                    {/*  <Button className="btn-facebook mb-1" block><span>facebook</span></Button>*/}
                    {/*</Col>*/}

                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
