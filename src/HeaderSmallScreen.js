import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import {Button, Modal, ModalBody, ModalHeader, Input} from 'reactstrap';
import {Link} from 'react-router-dom';

function HeaderSmallScreen(){

    const [photo, setUserPhoto] = useState("");
    const [name, setUserEmail] = useState("");
    const [logged, setLogged] = useState(false);
    const [isOpen, setModal] = useState(false);
    const [email, changeEmail] = useState("");
    const [password, changePassword] = useState("");  

    var provider = new firebase.auth.GoogleAuthProvider();    
    var provider2 = new firebase.auth.FacebookAuthProvider();

    const handlePasswordChange = (e) => {
        changePassword(e.target.value);
    }

    const handleEmailChange = (e) => {
        changeEmail(e.target.value);                      
    }

    const login = () => {
        var em = email.toString().trim();
        var ps = password.toString().trim();        
        const validEmail = () => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(em);
        if(validEmail){
            firebase.auth().signInWithEmailAndPassword(em, ps)
            .then(() => {
                window.location.reload(false);
            })
            .catch(function(error) {               
                var errorCode = error.code;
                var errorMessage = error.message;
                document.getElementById("emailLoginError").innerHTML = errorMessage;
              });
        }
        else{
            document.getElementById("emailLoginError").innerHTML = "Invalid Email";
        }
    }

    const googleLogin = () => {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            document.getElementById("emailLoginError").innerHTML = errorMessage;
            // ...
          });          
    }

    const facebookLogin = () => {
        firebase.auth().signInWithPopup(provider2).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;            
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            document.getElementById("emailLoginError").innerHTML = errorMessage;
            // ...
          }); 
    }

    const signin = () => {
        var em = email.toString().trim();
        var ps = password.toString().trim();
        const validEmail = () => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(em);
        if(validEmail){
            firebase.auth().createUserWithEmailAndPassword(em, ps)
            .then((user) => {
                toggle();                         
                window.location.reload(false);
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                document.getElementById("emailLoginError").innerHTML = errorMessage; 
              });
        }
        else{
            document.getElementById("emailLoginError").innerHTML = "Invalid Email";
        }
    }

    const logout = () => {
        firebase.auth().signOut()
        .then(() => {
            window.location.reload(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    var isUserLoggedIn = () => {        
        if(logged == false){
            return(
                <div>
                    <div>
                        <Input placeholder="Email" style={{width:"40%", marginLeft:"10px"}} onChange={handleEmailChange}></Input>
                        <Input placeholder="Password" style={{width:"40%", marginLeft:"10px"}} onChange={handlePasswordChange} type="password"></Input>
                        <p className="text-danger" id="emailLoginError" style={{marginLeft:"10px", marginRight:"10px"}}></p>
                    </div>  
                    <Button color="primary" style={{marginLeft:"10px", marginTop:"5px"}} onClick={login}>Log in</Button>
                    <Button color="info" style={{marginLeft:"10px", marginTop:"5px"}} onClick={toggle}>Sign in</Button> 
                    <a className="btn btn-social-icon btn-google" onClick={googleLogin}> 
                        <i className="fa fa-google fa-social" style={{marginLeft:"10px", marginTop:"auto", marginBottom:"auto"}}></i>
                    </a>
                    <a className="btn btn-social-icon btn-facebook" onClick={facebookLogin}> 
                        <i className="fa fa-facebook-square" style={{marginTop:"auto", marginBottom:"auto"}}></i>
                    </a>                                                           
                </div>
            );
        }
        else{
            return(
                <div style={{marginRight:"30px", userSelect:"none"}}>
                    <div style={{marginLeft:"10px", marginTop:"auto", marginBottom:"auto"}}>
                        {name}
                    </div>                    
                    <div className="row" style={{marginLeft:"10px", marginRight:"10px", overflow:"hidden", width:"100px", borderRadius:"50%"}}>                        
                        <img src={photo}
                        style={{height:"100%", width:"100%"}}></img>          
                    </div>
                    <Link to="/gobony/Cart" style={{marginLeft:"10px", marginTop:"5px"}}><i className="fa fa-shopping-cart"> Cart</i></Link>
                    <Button color="danger" style={{marginLeft:"10px", marginTop:"5px"}} onClick={logout}>Log out</Button>
                </div>
            );
        }
    }

    const toggle = () => setModal(!isOpen);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              var displayName = user.displayName;
              var email = user.email;
              var emailVerified = user.emailVerified;
              var photoURL = user.photoURL;
              var isAnonymous = user.isAnonymous;
              var uid = user.uid;
              var providerData = user.providerData;              
              var photo = photoURL || "https://www.pikpng.com/pngl/m/16-168770_user-iconset-no-profile-picture-icon-circle-clipart.png";              
              setUserPhoto(photo);
              setUserEmail(displayName || email);             
              setLogged(true);                
            }
          });
    }, []);


    return(
        <div style={{width: "100%"}}>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Sign In</ModalHeader>
                <ModalBody>
                    <Input placeholder="Email" type="text" style={{width:"80%", margin:"auto", marginTop:"10px"}} onChange={handleEmailChange}></Input>
                    <Input placeholder="Password" type="password" style={{width:"80%", margin:"auto", marginTop:"10px"}} onChange={handlePasswordChange}></Input>
                    <Button style={{margin:"auto", display:"block", marginTop:"10px"}} onClick={signin}>Sign in</Button>
                    <p className="text-danger" style={{margin:"auto", display:"block", marginTop:"10px", textAlign:"center"}} id="emailExists"></p>
                    <div className="row">
                        <a className="btn btn-social-icon btn-google" style={{marginLeft:"auto", marginTop:"10px"}} onClick={() => {
                            googleLogin();
                            toggle();
                        }}><i className="fa fa-google"></i></a>
                        <a className="btn btn-social-icon btn-facebook" style={{marginTop:"10px", marginRight:"auto"}} onClick={() => {
                            facebookLogin();
                            toggle();
                        }}><i className="fa fa-facebook-square"></i></a>
                    </div>
                </ModalBody>
            </Modal>
            <h3 style={{marginLeft:"10px", marginTop:"10px"}}><b>Go bony</b></h3>  
            {isUserLoggedIn()}          
        </div>
    );
}

export default HeaderSmallScreen;