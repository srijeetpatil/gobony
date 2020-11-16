import './App.css';
import Header from './Components/Header';
import firebase from 'firebase';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './Components/Home';
import Cart from './Components/Cart';
import HeaderSmallScreen from './HeaderSmallScreen';
import { useState, useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyCgj9FSuf9UaIDURNkFz0-sHBWD9vVV5xo",
  authDomain: "gobony-c93f3.firebaseapp.com",
  databaseURL: "https://gobony-c93f3.firebaseio.com",
  projectId: "gobony-c93f3",
  storageBucket: "gobony-c93f3.appspot.com",
  messagingSenderId: "203847528919",
  appId: "1:203847528919:web:f3adec325b5ce19f2c9b92",
  measurementId: "G-C21DPLDSDP"
};
// Initialize Firebase 
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}  

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
           setUser(user);                                       
        }
      });
  }, []);

  const header = () => {
    if(window.innerWidth > 800){
      return(
        <Header/>
      );
    }
    else{
      return(
        <HeaderSmallScreen/>
      );
    }
  }

  return (
    <div className="App">
        {header()}             
        <Switch>
            <Route exact path="/gobony/" component={() => <Home user={user}/>}/> 
            <Route path="/gobony/Cart" component={() => <Cart user={user}/>}/>            
        </Switch>             
    </div>
  );
}

export default App;
