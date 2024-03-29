import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './_dux/store';
import { getFromStorage } from  './_libs/storage';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

const isAuthenticated = () => {
  //write your condition here
  let user = getFromStorage("USER");
  return !!user;

};

const UnauthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
);

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
            <React.Suspense fallback={loading()}>
              <Switch>
                <UnauthenticatedRoute exact path="/login" name="Register Page"  component={Login}  />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                <AuthenticatedRoute path="/" name="Home" component={DefaultLayout} />
              </Switch>
            </React.Suspense>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
