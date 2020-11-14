import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
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
                    <div className="row">
                        <img src={item.image} className="col-3"></img>
                        <div>
                            <p>{item.name} <div><Link onClick={() => {  
                                    if(arr.length === 1){
                                        alert("Try reloading the page");
                                    }                                                                 
                                    firebase.database().ref(props.user.uid + "/" + item.prod_id).remove();                                                                         
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
            <Link to="/Home">Back to home</Link>
            <Card>
                <CardBody>
                    {cartItems()}
                </CardBody>
            </Card>
        </div>
    );
}

export default Cart;