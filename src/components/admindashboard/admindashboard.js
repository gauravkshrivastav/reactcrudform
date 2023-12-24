import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Context } from '../../context/reactcontext';
import MyModal from '../../Modal/mymodal';
import productlist from "../../images/product.png";
import { getproductsdata } from '../../service/service';
import { DeleteProduct } from './deleteproduct/deleteproduct';
import { NavigationBar } from '../navbar/navbar';
import "./admindashboard.css";

export const AdminDashboard = () =>{

    const navigate = useNavigate();
    const [products, setProducts]= useState();
    const { setLogIn, refresh,setRefresh } = useContext(Context);
    const [productId, setproductid] =useState();
    const [neterror, setneterror] = useState(false);
    const { open: openpopup, close: closepopup, ModalWrapper: Modalpopup } = MyModal();
    const valid = true;

    useEffect(()=>{
        setLogIn(sessionStorage.admin);
        if(valid || refresh){
            fetchdata();
            setRefresh(false);
        }
    },[valid,refresh]);

    async function fetchdata(){
        if(sessionStorage.admin == "yes"){
            await getproductsdata().then(response=>
                setProducts(response.data)
            ).catch(error=>{
                setneterror(true);
            })
        } else {
            navigate("/accessdenied");
        }
    }


    const update =(id) =>{
        navigate(`/editproduct/${id}`);
    }

    const deleteproduct = (id) =>{
        setproductid(id);
        openpopup();
        // navigate(`/deleteproduct/${id}`);
    }


    return(
        <>
        {neterror ? <p role="alert" className='required networkissue'>Some network issue unable to fetch data</p> :
             <><div className=' container product'>
                <ToastContainer/>
                <h3>Product Details</h3>
                <div className="admin_product">
                <table className="table table-style parentatble">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Image</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        {/* <th colspan="3">Edit</th> */}
                    </tr>
                    </thead>
                    { products?.map((product) => {
                        return(
                            <>
                                <tbody className='table-striped'>
                                <tr>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td className='product_img'><img src={productlist}/></td>
                                    <td><button className='cg-btn' onClick={() =>update(product.id)}>Edit</button></td>
                                    <td><button className='cg-btn' onClick={() =>deleteproduct(product)}>Delete</button></td>
                                </tr>
                                </tbody>
                            </>
                            );
                        })
                    }
                    </table>
                    </div>
             </div>
             <Modalpopup>
                <DeleteProduct productid={productId} close={closepopup}/>
            </Modalpopup>
            </>
        }
        </>
    )
}