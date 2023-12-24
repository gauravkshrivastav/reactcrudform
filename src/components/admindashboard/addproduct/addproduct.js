import React, { useEffect, useState } from "react";
import "./addproduct.css";
import "../editproduct/editproduct.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { addproduct } from "../../../service/service";
import { toast, ToastContainer } from "react-toastify";
import MyModal from "../../../Modal/mymodal";

export const Addproduct = () => {
  const navigate = useNavigate();
  const [productname, setproductname] = useState("");
  const [productprice, setproductprice] = useState("");
  const [errorname, seterrorname] = useState(false);
  const [errorprice, seterrorprice] = useState(false);
  const {
    open: openpopup,
    close: closepopup,
    ModalWrapper: Modalpopup,
  } = MyModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [neterror, setneterror] = useState(false);

  useEffect(() => {
    if (!sessionStorage.admin) {
      navigate("/accessdenied");
    }
  }, []);

  const goback = () => {
    navigate("/admindashboard");
  };




  const handleFormData = async (data) => {
    seterrorname(false);
    seterrorprice(false);
    // axios.post("http://localhost:3000/dashboard/products",data).then(response=>{
   await axios.post("http://localhost:5001/products", data).then((response) => {console.log(response);
        openpopup();
      })
      .catch((error) => console.log(error));
  };

  const handleyes = () => {
    navigate("/admindashboard");
  };

  return (
    <>
      <div className="addproduct">
        <ToastContainer />

        <h3>Add Product</h3>
        <form onSubmit={handleSubmit(handleFormData)}>
          <div className="productname">
            <label>Product Name</label>
            <input
              className="form-control"
              type="text"
              maxLength={20}
              {...register("name", { required: true, maxLength: 20 })}
            ></input>
             {errors.name?.type === 'required' &&  <p role="alert" className='required'>Please enter product name</p>}
          </div>
          <div className="productprice">
            <label>Product Price</label>
            <input
              className="form-control"
              type="number"
              {...register("price", { required: true })}
            ></input>
             {errors.price?.type === 'required' &&  <p role="alert" className='required'>Please enter productprice</p>}

          </div>
          <br />
        {neterror && (
          <p role="alert" className="required">
            Network issue
          </p>
        )}
        <div className="gobutn">
          <button className="backbutton" onClick={goback}>
            Back
          </button>
          <button className="updatebtn">
            Submit
          </button>
        </div>
        </form>

      </div>

      <Modalpopup>
        <div className="popupcontainer">
          <div className="addproduct handelingproduct">
            <label className="added"> Product added successfully</label>
            <div className="buttons">
              <button className="yes" onClick={handleyes}>
                Ok
              </button>
            </div>
          </div>
        </div>
      </Modalpopup>
    </>
  );
};
