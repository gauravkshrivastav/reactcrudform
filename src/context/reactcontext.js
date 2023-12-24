import axios from "axios";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import { addtocart, addtocartpresent, deletecart, getcartdata, updatecartprsenet } from "../service/service";


const Context = createContext({});

const Provider = props => {
    const { children } = props;
	const [user, setUser]= useState();
    const [isloggedin, setIsLoggedIn]= useState(false);
    const [loginvalue,setLogIn] =useState(sessionStorage.admin);
    // const [load,setload]=useState(false);
    const [load, setLoad] = useState(false);
    const [refresh, setRefresh] =useState(false);

    const addToCart = async (item) => {
        const cartdata = await getcartdata();
        const cartuserdata = cartdata.data.find((x)=>x.id == sessionStorage.id);
        if(cartuserdata){
            const cartitemdata = cartuserdata.item;
            const wholedata = {
                ...item, 
                quantity: 1
                }
            const previousdata = [...cartitemdata,wholedata];
            addtocartpresent(previousdata).then((respose)=>{
                setLoad(true);
            }).catch(error=>{
                toast.error("Some network issue unable to add", {
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
        } else {
            const data = {
                "id": sessionStorage.id,
                "item":[{
                    ...item, 
                    quantity: 1
                }]
            }
            addtocart(data).then((respose)=>{
                setLoad(true);
            }).catch(error=>{
                toast.error("Some network issue unable to add", {
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
      };
    
    const updatecart = async (item) => {
        const cartdata = await getcartdata();
        const cartuserdata = cartdata.data.find((x)=>x.id == sessionStorage.id);
        if(cartuserdata){
            const cartitemdata = cartuserdata.item;
            cartitemdata.map((x)=>{
                if(x.id == item.id){
                    x.quantity = x.quantity + 1
                } 
                return x;
            })
            updatecartprsenet(cartitemdata).then((respose)=>{
                setLoad(true);
            }).catch(error=>{
                toast.error("Some network issue unable to increase quantity", {
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
    }

    const removecart =async (item) => {
        if(item.quantity == 1){
            const cartdata = await getcartdata();
            const cartuserdata = cartdata.data.find((x)=>x.id == sessionStorage.id);
            if(cartuserdata){
                const cartitemdata = cartuserdata.item;
                var finaldata = [];
                cartitemdata.forEach((x)=>{
                    if(x.id != item.id){
                        finaldata = [...finaldata,x];
                    } 
                })
                deletecart(finaldata).then((respose)=>{
                    setLoad(true);
                }).catch(error=>{
                    toast.error("Some network issue unable to decrease quantity", {
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
        } else {
            const cartdata = await getcartdata();
            const cartuserdata = cartdata.data.find((x)=>x.id == sessionStorage.id);
            if(cartuserdata){
                const cartitemdata = cartuserdata.item;
                cartitemdata.map((x)=>{
                    if(x.id == item.id){
                        x.quantity = x.quantity - 1
                    } 
                    return x;
                })
                deletecart(cartitemdata).then((respose)=>{
                    setLoad(true);
                }).catch(error=>{
                    toast.error("Some network issue unable to decrease quantity", {
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
        }
    }


    return(
        <Context.Provider value={{user,setUser,isloggedin, setIsLoggedIn,loginvalue,setLogIn, load,setLoad,
            addToCart,updatecart,removecart,refresh, setRefresh}}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider };