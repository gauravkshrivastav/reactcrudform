import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../../../context/reactcontext";
import { clearcartall, getcartdata } from "../../../service/service";
import "./viewcart.css";


export const Viewcart = () =>{

    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(false);
    const [finalprice,setfinalprice] = useState();
    const { updatecart,load,setLoad,removecart } = useContext(Context);


    useEffect(()=>{
        if(sessionStorage.admin == "no"){
            getcartdata().then((response) =>{
                        var storedata = response.data;
                        var storeuserid = storedata.find((x)=>x.id == sessionStorage.id);
                        var storedataitem = storeuserid.item;
                        var totalprice = 0;    
                        storedataitem.map((y)=>{
                            var finalvalue = y.price * y.quantity;
                            totalprice += finalvalue;
                        })
                        setfinalprice(totalprice);
                        setCartItems(storedataitem);
                }).catch(error=>{
                    setError(true)
                })
        } else {
            navigate("/accessdenied");
        }
        setLoad(false);
    },[load]);

    const clearcart = () =>{
        clearcartall().then(
                setLoad(true)
            ).catch(error=>{
                // setError(true);
                toast.error("Some network issue unable to clear", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    style: {
                      backgroundColor: '#000',
                      color: '#fff',
                    }
                    });
            })
    }

    return (
        <>
            <div className='product'>
                <ToastContainer />
                {error ? <p role="alert" className='required networkissue'>Some network issue unable to fetch data</p> :
                <>
                {cartItems.length == 0 ?  <h3>You Cart List is Empty</h3> :
                <>
                    <h3>Cart Deatils</h3>
                    <table className="table table-style parentatble">
                    <thead>
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Price</th>
                        <th scope="col">Quantity</th>
                    </tr> 
                    </thead>
                    {cartItems && cartItems?.map((x) => {
                        return(
                            <>
                                <tbody className='table-striped'>
                                    <tr key={x.id}>
                                        <td>{x.name}</td>
                                        <td>${x.price}</td>
                                        <td>
                                            <button className='add' onClick={()=>updatecart(x)}>+</button>
                                            <span className="quantity">{x.quantity}</span>
                                            <button className='add' onClick={()=>removecart(x)}>-</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </>
                        )
                    })}
                    </table>
                    <label>Total price = ${finalprice}</label>
                    <button className="clear" onClick={clearcart}>Clear cart</button>
                    <button className="placeorder">Place order</button>
                </> 
                }</>
                }
             </div>
        </>
    )
}