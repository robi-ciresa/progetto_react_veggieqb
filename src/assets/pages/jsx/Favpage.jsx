import React from "react";
import Navbar from "../../components/jsx/Navbar";
import Footer from "../../components/jsx/Footer";
import Card from "../../components/jsx/Card";
import "../css/Favpage.css";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function Favpage () {

    const favourites = useSelector ((state)=> state.favourites.favourites)

    return (
        <>
        <helmet>
            <title>Veggie q.b. - favourites page</title>
            <meta name="description" content="In this page, you can find all the recipes saved in FAV."/>
        </helmet>
        <Navbar></Navbar>
        <div className="fav_container row">
        { favourites.length > 0 ?
            (<>
                {favourites.map ((fav) => 
                <Card
                    id={fav.id}
                    title={fav.title}
                    photo={fav.image}>
                </Card>
            )}
            </>) : ( <h2>There are no recipes in your favorites!</h2> )
        }
        </div>
        <div className="fav_container">   
            <Link to={"/"}>
                <button className='fav_button'>back home</button>
            </Link>
        </div>
        <Footer></Footer>
        </>
    );
}