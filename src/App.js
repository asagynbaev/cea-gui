import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import { connect } from 'react-redux';
import { getEmployeesForAutocompleteFetchData } from './redux/_actions/employees';
import { positionsFetchData } from './redux/_actions/positions';

import './App.scss';

const mapStateToProps = (state) => {
  return { };
};

const mapDispatchToProps = (dispatch) => {
  return {
      positions: (url) => dispatch(positionsFetchData(url)),
      employeesForAutocomplete: (url) => dispatch(getEmployeesForAutocompleteFetchData(url)),
  };
};

const loading = () => <div className="animated fadeIn pt-3 text-center">Загрузка...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {
  
  componentDidMount() {
    this.props.positions(`http://localhost:5000/positions/`);
    this.props.employeesForAutocomplete(`https://ceaapi.herokuapp.com/employees/autocomplete`); 
  }
  
  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
              <NotificationContainer />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
