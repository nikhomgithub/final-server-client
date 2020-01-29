import React from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom';
import AddContextProvider from './context/AddContext';

import ShopUserPage from './pages/ShopUserPage';
import AuthenPage from './pages/AuthenPage'
import SignUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'
import ChangePasswordPage from './pages/ChangePasswordPage'
import AddUserPage from './pages/AddUserPage'
import Test from './pages/Test'
import Error from './pages/Error';
import Navbar from './components/Navbar';

function App() {

  return (
    <> 
      <AddContextProvider>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={ShopUserPage}/>
          <Route exact path="/auth" component={AuthenPage}/>
          <Route exact path="/changepassword" component={ChangePasswordPage}/>
          <Route exact path="/adduser" component={AddUserPage}/>
          <Route exact path="/login" component={LogInPage}/>
          <Route exact path="/signup" component={SignUpPage}/>

          <Route component={Error}/>
      </Switch>
      </AddContextProvider>
    </>
  );
}

export default App;
