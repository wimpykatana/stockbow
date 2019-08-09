import React from 'react';
import GoogleLogin from 'react-google-login';
import {Button} from "reactstrap";
import { connect } from "react-redux";
import { onLogin } from '../../_dux/action/userAction'
import { setInStorage } from  '../../_libs/storage';
import config from '../../config/config';
import ReactGA from 'react-ga';

ReactGA.initialize(config.trackerId);

class GoLogin extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      user : null,
    }
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  componentWillReceiveProps(){

    if(this.props.user.data){
      setInStorage("USER", this.props.user.data);
      window.location.reload();
    }

  }

  responseGoogle(response){

    if(response){
      // console.log(response);
      let name = response.profileObj.name;
      let provider = "google";
      let email = response.profileObj.email;
      let provider_id = response.profileObj.googleId;
      let provider_pic = response.profileObj.imageUrl;
      let token = response.accessToken;

      ReactGA.event({
        category: "USER_ACTION",
        action: "LOGIN",
        label: "LOGIN_WITH_GOOGLE",
      });

      this.props.dispatch(onLogin(name,email,token,provider_pic,provider_id,provider));

    }

  }

  render() {
    // console.log(config.gkey);
    return(
      <GoogleLogin
        clientId={config.gkey}
        render={
          renderProps => (
            <Button className="btn-danger mb-1" onClick={renderProps.onClick} block><span>google</span></Button>
          )
        }
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  // token: state.user.data.token
});

export default connect(mapStateToProps)(GoLogin);
