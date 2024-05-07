import React from "react";
import Navbar from "../components/jsx/Navbar";
import Footer from "../components/jsx/Footer";
import './Detailpage.css';

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

//importa state recipe oppure passa parametri

export default function Detailpage () {

    const [details, setDetails] = useState()
    
    const {recipeID} = useParams();
    const API_KEY = 'ea2899c101ee46659ec25a85183e7a21';
    
    useEffect (() => {
        const getDetails = async () => { 
        let recipeInfo = await fetch (`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${API_KEY}&includeNutrition=false`);
        let recipeInfoJson = await recipeInfo.json();
        setDetails(recipeInfoJson);
        }
        getDetails()
    } , [recipeID])
    
    return (
        <>
        <Navbar></Navbar>
        <div className='detail_page'>
        <h1 className='detail_title'>{details.title}</h1>
        <img src={details.image} alt='recipe pic' className='detail_photo'></img>
        <ul>
            {details.extendedIngredients.map( ingredient => (
                <li>{ingredient.original}</li>
                ) 
            )}
        </ul>
        <ol>
            {details.analyzedInstructions[0].steps.map( step => (
                <li>{step.number}</li>
                ) 
            )}
        </ol>
            {
                //Intolleranze ecc...
            }
        <section>
            <Link to={"/"}>
                <button className='detail_button'>back home</button>
            </Link>
            <button className='detail_button'>add/remove fav</button>
        </section>
        </div>
        <Footer></Footer>
        </>
    );
}