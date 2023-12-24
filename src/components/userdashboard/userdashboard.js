import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Context } from '../../context/reactcontext';
import { getcartdata, getproductsdata } from '../../service/service';
import { NavigationBar } from '../navbar/navbar';
import "./userdashboard.css";
import productlist from "../../images/product.png";


export const UserDashboard = () =>{

    const navigate = useNavigate();
    const [products, setProducts]= useState();
    const [error, setError] = useState(false);
    const { setLogIn,addToCart,updatecart,load,setLoad,removecart } = useContext(Context);
    const [cartItems, setCartItems] = useState();

    useEffect(()=>{
        setLogIn(sessionStorage.admin);
        if(sessionStorage.admin == "no"){
            getproductsdata().then((response) =>{
                setProducts(response.data);
            }).catch(error =>{
                setError(true)
            })
            getcartdata().then((response) =>{
                var getdata = response.data;
                var userlogindata = getdata.find((x)=>x.id == sessionStorage.id);
                // console.log(">>>>",userlogindata.item);
                if(userlogindata){
                    var finalcartdata = userlogindata.item;
                    setCartItems(finalcartdata);
                }
            }).catch(error =>{
                setError(true)
            })
        } else {
            navigate("/accessdenied");
        }
        setLoad(false);
    },[load]);

    const handleview = (id) =>{
        navigate(`/details/${id}`);
    }

    

    return(
        <>
            <ToastContainer/>
            {error ? <p role="alert" className='required networkissue'>Some network issue unable to fetch data</p> :
            <>
                <div className='container-fluid mt-5'>
                    <div className='row'>
                        {products?.map(product => (
                        <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4' key={product.id}>
                            <div class="card mb-3" >
                                <div class="row g-0">
                                    <img src={productlist} alt="imgloader"></img>
                                    <div class="col-md-12">
                                        <div class="card-body">
                                        <h5 class="card-title">{product.name}</h5>
                                        <p className='card-text'><strong>Price:</strong> ${product.price}</p>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                            <div className='mt-6 d-fle items-center view-btns'>
                                                { cartItems && cartItems.find(x=>x.id == product.id) ? cartItems.find(x=>x.id == product.id).quantity !=0 ?
                                                    <><button className='add' onClick={()=>updatecart(cartItems.find(x=>x.id == product.id))}>+</button>
                                                        <p className='count'>{cartItems.find(x=>x.id == product.id).quantity}</p>
                                                    <button className='add' onClick={()=>removecart(cartItems.find(x=>x.id == product.id))}>-</button></>
                                                    : <button className='add' onClick={()=>addToCart(product)}>Add to cart</button>
                                                    : <button className='add' onClick={()=>addToCart(product)}>Add to cart</button>
                                                }
                                                <button className='btn-desc' variant="primary" onClick={()=>handleview(product.id)}>View Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                        ))}
                    </div>
                </div>
            </>
            }
        </>
    )
}