import React from "react";
import loaderIMG from "../../img/loader.png"
import "../css/Loader.css";

export default function Loader() {
    return (
        <div className="loader_container">
            <h3>Hey! Wait just a second to find recipes!</h3>
            <img className="loader_img" alt="loading_img" src={loaderIMG}></img>
        </div>
    )
}