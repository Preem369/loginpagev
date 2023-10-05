import React, { useEffect } from 'react';
import './App.css';
import { gapi } from 'gapi-script';
import Login from './loginpage';

const clientId = "80445697984-hft4hh6kkictok8q22lm89nunm1l8vt7.apps.googleusercontent.com";

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };

    gapi.load("client:auth2", start)
  });

  return (
    <div className='APP'>
      <Login/>
    </div>
  );

}

export default App;







