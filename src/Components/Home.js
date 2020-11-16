import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Card, CardBody, Badge, CardImg} from 'reactstrap';
import {Link} from 'react-router-dom';
import firebase from 'firebase';

const database = axios.create({
    baseURL: "https://emart-4ab65.firebaseio.com/"
})

function Home(props){
    const [data, fetchData] = useState([]);        

    useEffect(() => {
        database.get("men.json")
        .then((data) => {
            fetchData(data);
        })
    }, []);

    var list = () => {
        return(
            <div><h2 style={{textAlign: "center"}}>Loading</h2></div>
        )
    };


    const addToCart = (item) => {
        if(props.user != undefined){
            firebase.database().ref(props.user.uid + "/" + item.prod_id + "/").set(item);
            alert("Product added to your cart");
        }
        else{
            alert("You should login first to perform this action")
        }
    }

    if(data.length != 0){
        list = () => data.data.map((item) => {
            var source = item.image;      
            var off = "";            

            if(item.off){
                off = item.off + " off";
            }         
            return(
                <div className="mt-2 cardItem">                    
                    <Card style={{height:"100%", borderRadius:"0px"}}>                                                                            
                        <CardBody>  
                            <Badge color="danger">{off}</Badge>                          
                            <CardImg style={{objectFit:"contain"}} src={source}></CardImg>                                
                            <div style={{textAlign: "center", color:"black"}}>
                                {item.name}                                
                            </div> 
                            <div style={{textAlign: "center", color:"#bb0b0b"}}>
                                <h6>{item.price}</h6>                                
                            </div>
                            <Link onClick={() => {
                                addToCart(item);
                            }}><i className="fa fa-shopping-cart"> Add to cart</i></Link>
                        </CardBody>                                                                      
                    </Card>                    
                </div>
            );
        });
    }
    

    return(
        <div className="container">
            <div className="row" style={{marginTop:"100px", marginBottom:"15px"}}>   
                {list()}
            </div>
        </div>
    );
}

export default Home;