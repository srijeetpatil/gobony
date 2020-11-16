import React, { useEffect, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import firebase from 'firebase';
import {Card, CardBody} from 'reactstrap';

function Cart(props){

    const [isEmpty, setEmpty] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        if(props.user != undefined){
            firebase.database().ref(props.user.uid).on("value", (snapshot) => {
                if(snapshot.val() != null){
                    setData(snapshot.val());
                    setEmpty(false)
                }
                else{
                    setEmpty(true);
                }
            })
        }
    }, [])

    const cartItems = () => {
        if(data){
            var arr = Object.values(data);
            return arr.map((item) => {
                return(
                    <div className="row" style={{marginTop:"10px", height:"100px", overflow:"hidden"}}>
                        <img src={item.image} className="col-3" style={{objectFit:"contain"}}></img>
                        <div className="col-8">
                            <p>{item.name} <div><Link onClick={() => {  
                                    var empty = 0; 
                                    if(arr.length === 1){
                                        empty = 1;
                                    }                                                                 
                                    firebase.database().ref(props.user.uid + "/" + item.prod_id).remove();   
                                    if(empty === 1){
                                        window.location.href = "https://srijeetpatil.github.io/gobony/";
                                    }                                                                      
                                }}><i className="fa fa-trash ml-2"> Remove</i></Link></div></p>
                            <p style={{textAlign:"left",color:"#bb0b0b"}}>{item.price}</p>                            
                        </div>
                    </div>
                );
            })
        }
        else{
            return(
                <div>
                    <h3>Your cart is Empty</h3>
                </div>
            );
        }
    } 

    return(
        <div className="container">
            <Link to="/gobony/">Back to home</Link>
            <Card>
                <CardBody>
                    {cartItems()}
                </CardBody>
            </Card>
        </div>
    );
}

export default Cart;