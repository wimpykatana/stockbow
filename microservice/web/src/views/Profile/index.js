import React from 'react';
import { connect } from "react-redux";
import { Card, CardBody, CardHeader, Col, Row, Table} from "reactstrap";

let fullname;
let email;
let aboutUser;
let dob;
let phoneNumber;
let startSubs;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.init = this.init.bind(this);
  }

  init(){
    if(this.props.user) {
      fullname = this.props.user.fullname;
      email = this.props.user.email;
      aboutUser = this.props.user.aboutUser;
      dob = this.props.user.dob;
      phoneNumber = this.props.user.phoneNumber;
      startSubs = this.props.user.startSubs;
    }
  }

  render() {
    this.init();
    return(
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>{fullname}</strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <tbody>
                    <tr>
                      <td>email</td>
                      <td>:</td>
                      <td>{email}</td>
                    </tr>

                    <tr>
                      <td>about</td>
                      <td>:</td>
                      <td>{aboutUser}</td>
                    </tr>

                    <tr>
                      <td>date of birth</td>
                      <td>:</td>
                      <td>{dob}</td>
                    </tr>

                    <tr>
                      <td>phone number</td>
                      <td>:</td>
                      <td>{phoneNumber}</td>
                    </tr>

                    <tr>
                      <td>end of subscribe</td>
                      <td>:</td>
                      <td>{startSubs}</td>
                    </tr>

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

}
const mapStateToProps = state => ({
  user: state.user.data,
});
export default connect(mapStateToProps)(Profile);
