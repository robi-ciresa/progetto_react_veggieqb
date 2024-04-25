import React from "react";
import Navbar from "../components/jsx/Navbar";
import Footer from "../components/jsx/Footer";
import ErrorImg from "../img/error_page.jpg";
import "./Errorpage.css";

export default function Errorpage () {
    return (
        <>
        <Navbar></Navbar>
        <div className="error_container">
            <h1>It seems there was an error.</h1>
            <h3>We're so sorry!</h3>
            <h4>Something it's going wrong. <br/>
            Try to recharge the page or write us to have more info.</h4>
            <img className="error_img" src={ErrorImg} alt="error page img"></img>
        </div>
        <Footer></Footer>
        </>
    );
}