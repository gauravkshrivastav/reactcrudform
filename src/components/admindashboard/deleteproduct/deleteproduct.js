import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Context } from "../../../context/reactcontext";
import { deleteproduct } from "../../../service/service";
import "./deleteproduct.css";

export const DeleteProduct =(props)=>{

    const navigate = useNavigate();
    // const { id } = useParams();
    const { close, productid } = props;
    const { setRefresh } = useContext(Context);
    const [neterror, setneterror] = useState(false);

    useEffect(()=>{
        if(!sessionStorage.admin) {
            navigate("/accessdenied");
        }
    },[]);

    const handleyes = () =>{
        deleteproduct(productid.id).then((response)=>{
            // navigate("/admindashboard");
            setRefresh(true);
            close();
        }).catch(error=>{
            setneterror(true);
        })
    }

    const goback = () =>{
        navigate("/admindashboard");
    }

    return(
        <>
            <div className="popupcontainer">
                <div className='delete' aria-modal="true">
                    <ToastContainer/>
                    {neterror ? <><p role="alert" className='required networkissue'>Some network issue unable to fetch data</p> 
                        <button className="back" onClick={goback}>Back</button></>
                        :
                        <><label className="deleted"> Are you sure want to delete the below product</label>
                            <div className="productdetails">
                                <img className="productimg" src={productid.img}></img>
                                <div className="nameprice">
                                    <label className="name">Name :<span>{productid.name}</span></label>
                                    <label className="price">Price :<span>${productid.price}</span></label>
                                </div>
                            </div>
                            <div className='buttons'>
                                <button className='yes' onClick={handleyes}>Yes</button>
                                <button className='no' onClick={close}>No</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}