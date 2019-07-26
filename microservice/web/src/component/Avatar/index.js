import React from 'react';
// import store from './_dux/store';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from "reactstrap";
import {AppHeaderDropdown} from "@coreui/react";
import { delStorage,getFromStorage } from "../../_libs/storage";


class Avatar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userToken: null,
    }
    this.onLogout = this.onLogout.bind(this);
  }

  componentWillMount() {
    let user = getFromStorage("USER");
    // console.log(user);
    if(user){
      this.setState({
        userToken: user.token
      })
    }

  }

  onLogout(){
    delStorage("USER");
    window.location.reload();
  }

  render() {
    console.log(this.state.userToken);
    return(
      <Nav className="ml-auto" navbar>
        <AppHeaderDropdown direction="down">
          <DropdownToggle nav>
            <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
          </DropdownToggle>
          <DropdownMenu right style={{ right: 'auto' }}>
            <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
            <DropdownItem><i className="fa fa-user"/> <Link to="/profile" >Profile</Link></DropdownItem>
            <DropdownItem><i className="fa fa-usd"/> <Link to="/payment" >Payment</Link></DropdownItem>
            <DropdownItem onClick={ this.onLogout }><i className="fa fa-sign-out"/> <span className="looksLink" >Logout</span></DropdownItem>
          </DropdownMenu>
        </AppHeaderDropdown>
      </Nav>
    )
  }

}

const mapStateToProps = state => ({
  user: state.user,
  // token: state.user.data.token
});

export default connect(mapStateToProps)(Avatar);
