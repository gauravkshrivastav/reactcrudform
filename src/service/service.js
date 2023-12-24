import axios from "axios";


export function loginpage(data){
    return axios.get(`http://localhost:5001/users?email=${data.email}&password=${data.password}`).then((data) => data).catch((error)=>error);
}

export function getproductsdata(){
    return axios.get("http://localhost:5001/products");
}

export function getcartdata(){
    return axios.get(`http://localhost:5001/cart`);
}

export function geteditdata(id){
    return axios.get(`http://localhost:5001/products?id=${id}`);
}

export function viewdetails(id){
    return axios.get(`http://localhost:5001/products?id=${id}`);
}

export const addproduct = (data) =>{
    return axios.post("http://localhost:5001/products/",data);
}

export const deleteproduct = (id) =>{
    return axios.delete(`http://localhost:5001/products/${id}`);
}

export const editproduct = (id, data) =>{
    return axios.patch(`http://localhost:5001/products/${id}`,data);
}

export const addtocart = (data) =>{
    return axios.post("http://localhost:5001/cart",data);
}

export const addtocartpresent = (data) =>{
    return axios.patch(`http://localhost:5001/cart/${sessionStorage.id}`, {"item":data});
}

export const deletecart = (data) =>{
    return axios.patch(`http://localhost:5001/cart/${sessionStorage.id}`,{"item":data});
}

export const updatecartprsenet = (data) =>{
    return axios.patch(`http://localhost:5001/cart/${sessionStorage.id}`,{"item":data});
}

export const clearcartall = () => {
    return axios.patch(`http://localhost:5001/cart/${sessionStorage.id}`,{"item":[]})
}