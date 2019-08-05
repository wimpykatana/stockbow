import React from 'react';
// import store from './_dux/store';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {DropdownItem, DropdownMenu, DropdownToggle, Nav,UncontrolledDropdown} from "reactstrap";
// import {UncontrolledDropdown} from "@coreui/react";
import { delStorage,getFromStorage } from "../../_libs/storage";
import { getUserDetail } from "../../_dux/action/userAction";


let userpic;

class Avatar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userToken: null,
      userId: null,
      avatarPic: null
    }
    this.onLogout = this.onLogout.bind(this);
    this.init = this.init.bind(this);
  }

  componentWillMount() {
    let user = getFromStorage("USER");
    if(user){
      this.setState({
        userToken: user.token,
        userId: user.id
      })
    }
  }

  componentDidMount() {
    this.props.dispatch(getUserDetail(this.state.userId, this.state.userToken));
  }

  init() {
    if (this.props.user.data) {
      userpic = <img width={'45px'} height={'45px'} src={this.props.user.data.user_pic ? this.props.user.data.user_pic : '../../assets/img/avatars/is.png'} className="img-avatar" alt={this.props.user.data.email}/>

    }
  }

  onLogout(){
    delStorage("USER");
    window.location.reload();
  }

  render() {
    // console.log("token ",this.state.userToken);
    // console.log("user ",this.state.userId);

    this.init();
    return(
      <Nav  className="ml-auto" navbar>
        <UncontrolledDropdown direction="down">
          <DropdownToggle nav>
            {userpic}
          </DropdownToggle>
          <DropdownMenu right style={{ right: 'auto' }}>
            <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
            <DropdownItem><i className="nav-icon icon-speedometer"/> <Link to="/dashboard" >Dashboard</Link></DropdownItem>
            <DropdownItem><i className="fa fa-user"/> <Link to="/profile" >Profile</Link></DropdownItem>
            <DropdownItem><i className="fa fa-usd"/> <Link to="/payment" >Payment</Link></DropdownItem>
            <DropdownItem onClick={ this.onLogout }><i className="fa fa-sign-out"/> <span className="looksLink" >Logout</span></DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    )
  }

}

const mapStateToProps = state => ({
  user: state.user,
  // token: state.user.data.token
});

export default connect(mapStateToProps)(Avatar);
