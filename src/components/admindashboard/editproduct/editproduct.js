import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import MyModal from '../../../Modal/mymodal';
import { editproduct, geteditdata } from '../../../service/service';
import "./editproduct.css";

export const EditProduct = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [productid, setproductid] = useState();
    const [product, setproduct] = useState();
    const { open: openpopup, close: closepopup, ModalWrapper: Modalpopup } = MyModal();

    const { register, handleSubmit, formState: { errors },reset } = useForm();

    const [neterror, setneterror] = useState(false);
    const [neterror1, setneterror1] = useState(false);

    useEffect(()=>{
            if(!sessionStorage.admin) {
                navigate("/accessdenied");
            } else {
                geteditdata(id).then((response)=>{
                setproductid(response.data[0].id);
                setproduct(response.data[0]);
                }).catch(error=>{
                    setneterror(true);
                })
            }
    },[]);


    useEffect(()=>{
        reset(product);
    },[product]);

    const handleFormData = async (data) =>{

        let response= await  editproduct(productid, data);

    
        
        if (response !== "error") {
            setproduct(response);
            openpopup();

        } else{
            setproduct("error");
            
        }
    }




    const goback =() =>{
        navigate("/admindashboard");
    }

    const handleyes = () =>{
        navigate("/admindashboard");
    }

    return(
        <>  
        {neterror ? <p role="alert" className='required networkissue'>Some network issue unable to fetch data</p> :
                <><div className='Update'>
                    <ToastContainer/>
                        <h2>Update Product</h2>
                        <form onSubmit={handleSubmit(handleFormData)}>
                            <div className='productname'>
                                <label>Product Name</label>
                                <input  className="form-control" type="text" name="name" {...register("name", { maxLength: 20, required : true})}></input>
                                {errors.name?.type === 'required' &&  <p role="alert" className='required'>Please enter productname</p>}
                            </div>
                            <div className='productprice'>
                                <label>Product Price</label>
                                <input  className="form-control" type="number" name="price" {...register("price",{required : true})}></input>
                                {errors.price?.type === 'required' &&  <p role="alert" className='required'>Please enter productprice</p>}
                            </div>
                            <br/>
                            {neterror1 && <p role="alert" className='required'>Network issue</p>}
                            <div className='gobutn'>
                                <button className='backbutton' onClick={goback}>Back</button>
                                {/* <button className='updatebtn' onClick={handleupdate}>Update</button> */}
                                <button className='updatebtn'>Update</button>
                            </div>
                        </form>
                </div>
                    
                <Modalpopup>
                    <div className='popupcontainer'>
                        <div className='Update handelingproduct'>
                            <label className='edited'> Product updated successfully</label>
                            <div className='buttons'>
                                <button className='yes' onClick={handleyes}>Ok</button>
                            </div>
                        </div>
                    </div>
                </Modalpopup>
                </>
        }
        </>
    )
}