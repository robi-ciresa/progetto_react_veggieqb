import React from "react";
import ErrorImg from "../../img/error_page.jpg";
import "../css/Errorpage.css";

export default function Errorpage () {
    return (
        <>
        <helmet>
            <title>Veggie q.b. - error page</title>
            <meta name="description" content="Something went wrong, this is an error page!"/>
        </helmet>
        <div className="error_container">
            <h1>It seems there was an error.</h1>
            <h3>We're so sorry!</h3>
            <h4>Something it's going wrong. <br/>
            Try to recharge the page or write us to have more info.</h4>
            <img className="error_img" src={ErrorImg} alt="error page img"></img>
        </div>
        </>
    );
}