import React from 'react';
import GoogleLogin from 'react-google-login';
import {Button} from "reactstrap";
import { connect } from "react-redux";
import { onLogin } from '../../_dux/action/userAction';

class GoLogin extends React.Component{

  constructor(props){
    super(props);
    this.state = {

    }

    this.responseGoogle = this.responseGoogle.bind(this);

  }

  componentWillReceiveProps(){

  }

  componentDidUpdate(){

  }


  responseGoogle(response){



    if(response){

      let name = response.profileObj.name;
      let provider = "google";
      let email = response.profileObj.email;
      let provider_id = response.profileObj.googleId;
      let provider_pic = response.profileObj.imageUrl;
      let token = response.accessToken;

      this.props.dispatch(onLogin(name,email,token,provider_pic,provider_id,provider));

    }

  }

  render() {

    return(
      <GoogleLogin
        clientId="801211553413-evitfvmqav482l62aonj281pt6gvsf1v.apps.googleusercontent.com"
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
});

export default connect(mapStateToProps)(GoLogin);
