import React from "react";
import ErrorImg from "../img/error_page.jpg";
import "./Errorpage.css";

export default function Errorpage (error) {
    return (
        <>
        <div className="error_container">
            <h1>It seems there was an error.</h1>
            <h3>We're so sorry!</h3>
            <h4>Something it's going wrong. <br/>
            Try to recharge the page or write us to have more info.</h4>
            <h4>Error message: {error}</h4>
            <img className="error_img" src={ErrorImg} alt="error page img"></img>
        </div>
        </>
    );
}