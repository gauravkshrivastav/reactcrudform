import React, { useState } from "react";
import "./details.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { viewdetails } from "../../../service/service";
import { toast, ToastContainer } from "react-toastify";
import productlist from "../../../images/product.png";


export const Details =() =>{

    const {id} = useParams();
    const navigate = useNavigate();
    const [products, setProducts]= useState();
    const [error, setError] = useState(false);

    useEffect(()=>{
        if(!sessionStorage.admin) {
            navigate("/accessdenied");
        } else {
            viewdetails(id).then((response) =>{
                if(response.data.length == 0){
                    setError(true);
                } else {
                    setProducts(response.data);
                }
            }).catch(error=>{
                setError(true);
            })
        }
    },[]);


    // async function fetchdata(){
    //     // const showproducts = viewdetails(id);
    //     if(!sessionStorage.admin) {
    //         navigate("/accessdenied");
    //     } else {
    //         viewdetails(id).then((response) =>{
    //             setProducts(response.data);
    //         }).catch(error=>{
    //             setError(true)
    //         })
    //     }
    // }

    return(
        <>
            {error ? <p role="alert" className='required networkissue'>Some network issue unable to fetch data</p> :
                <>
                <ToastContainer/>
                <div className="showview">
                            {products?.map(product => (
                            <div className='carddetails' key={product.id}>
                                <div class="card mb-3" >
                                    <div class="row g-0">
                                        <img src={productlist} alt="imgloader"></img>
                                        <div class="col-md-12">
                                            <div class="card-body">
                                                <h5 class="card-title">{product.name}</h5>
                                                <p className='card-text'><strong>Price:</strong> ${product.price}</p>
                                            </div>
                                            <div className="backbutton1">   
                                                <button className="back" onClick={()=>navigate("/userdashboard")}>Back</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                            ))}
                </div>
                </>
            }
        </>
    )
}