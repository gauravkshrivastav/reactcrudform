import React from "react";
import { useNavigate } from "react-router-dom";
import "../accessdenied/access.css";

export const Access = () =>{
    const navigate = useNavigate();

    const back =() =>{
        navigate("/");
    }
    return(
        <>
            <div class="text-center access">
                <h1 class="w3-jumbo w3-animate-top w3-center accessdenied">Access Denied</h1>
                {/* <hr class="w3-border-white w3-animate-left" style="margin:auto;width:50%"></hr> */}
                <h3 class="w3-center w3-animate-right">You dont have permission to view this site.</h3>
                <h3 class="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
                <h6 class="w3-center w3-animate-zoom">error code:403 forbidden</h6>
                <button className="back" onClick={back}>Back to login</button>
            </div>
        </>
    )
}