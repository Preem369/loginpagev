import React, { useState, useEffect } from 'react';
import './App.css';
import { GoogleLogin, GoogleLogout, } from 'react-google-login';
import { gapi } from 'gapi-script';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Navbar from './NavBar';
import Axios from "axios";

function App() {

  const clientId = "80445697984-hft4hh6kkictok8q22lm89nunm1l8vt7.apps.googleusercontent.com"

  const [flag, setflag] = useState(false);
  const [profile, setProfile] = useState([]);
  const [userList, setUserList] = useState([]);
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [tel,setTel] = useState("");
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    }
    gapi.load("client:auth2", initClient)
  }, [])

  const onSuccess = (res) => {
    setProfile(res.profileObj)
    console.log('success', res.profileObj)
    setflag(true);
  }

  const onFailure = (res) => {
    console.log('failed', res)
  }

  const logOut = () => {
    setProfile(null);
    setflag(false);
  }


  const addUser = () => {
    
    Axios.post("http://localhost:3001/create", {
      username: username ,
      email: profile.email, // ใช้ข้อมูลอีเมลจากโปรไฟล์
      tel: tel,
    }).then(() => {
      setUserList([
        ...userList,
        {
          username: username,
          email: email,
          tel: tel,
        },
      ]);
    });
  };


  return (
    <div>
      {flag ? (
       <div>
       <Navbar />
       <Box
           component="form"
           sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               padding: 5,
           }}
           noValidate
           autoComplete="off"
       >
           <div style={{ display: 'flex', flexDirection: 'column', width: '50ch' }}>
               <TextField

                   id="outlined-required"
                   label="Name"
                   defaultValue={profile.name}
                   onChange={(event) => {
                    setUsername(event.target.value)
                  }}
               />
               <br />
               <TextField
                   disabled
                   id="outlined-disabled"
                   label="Email"
                   defaultValue={profile.email}
               />
               <br />
               <TextField
                   id="outlined-required"
                   label="Tel" 
                   type='number'
                   defaultValue=" "
                   onChange={(event) => {
                    setTel(event.target.value)
                  }}
               />
           </div>
       </Box>
       <Button variant="contained" sx={{ backgroundColor: '#07C27F' }} onClick={addUser} >เสร็จสิ้น</Button>
       <GoogleLogout clientId={clientId} buttonText='LOG OUT' onLogoutSuccess={logOut} />
   </div>
      ) : (<div className="App">
        <header className="App-header">
          <img src="https://cdn.pic.in.th/file/picinth/368067465_2030957793916000_1185052255972145640_n-1.png" alt="โลโก้แอพ" />
          <GoogleLogin
            clientId={clientId}
            buttonText='LOG IN WITH GOOGLE'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
            render={(renderProps) => (
              <button 
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{
                  backgroundColor: '#f90101', /* เปลี่ยนสีพื้นหลังเป็นสีแดง*/
                  color: '#ffffff', /*เปลี่ยนสีตัวอักษรเป็นสีขาว*/
                  fontSize: '20px', /* เปลี่ยนขนาดตัวอักษร*/
                  width: '600px' , /* กำหนดความกว้าง */
                  height: '75px' , /* กำหนดความสูง */
                  margin: '50px' , /*กำหนดระยะห่าง */
                  cursor: 'pointer', /* ทำให้เมาส์เป็นรูปแบบของมือ*/
                }}
              >
                LOG IN WITH GOOGLE
              </button>
            )}
          />
        </header>
      </div>
      )}
    </div>
  );
}

export default App;