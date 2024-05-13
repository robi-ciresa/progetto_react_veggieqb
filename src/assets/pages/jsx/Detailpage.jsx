import React from "react";
import axios from "axios";
import Navbar from "../../components/jsx/Navbar";
import Footer from "../../components/jsx/Footer";
import Errorpage from "./Errorpage";
import Loader from "./Loader";
import '../css/Detailpage.css';

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addFavourites, removeFavourites } from '../../../redux/slice_favourites';

export default function Detailpage () {

    const [details, setDetails] = useState()
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    const favourites = useSelector ((state)=> state.favourites.favourites);
    const dispatch = useDispatch();
    const {id} = useParams();

    //const API_KEY = 'ea2899c101ee46659ec25a85183e7a21';
    //const API_KEY = 'b142b7373106495b88bcbcc6fd77ccea';
    const API_KEY = 'b55d8d65f16f417294e2c1857c048c53';
    
    useEffect (() => {
        getDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [id])

    const getDetails = async () => { 
        try {
            const recipeInfo = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`);
            if (recipeInfo.status === 402) {
                console.log (recipeInfo.status);
                throw new Error('API for free, too many request.');
            }
            if (!recipeInfo.status === 200) {
                console.log (recipeInfo.status);
                throw new Error('Something went wrong.');
              }
            if (recipeInfo.data === null) {
                console.log (recipeInfo.data);
                throw new Error('Results not found.');
              }
            console.log (recipeInfo.data);
            setDetails(recipeInfo.data);

        } catch (error) {
            setError(error.message);
          }

          setTimeout(() => {
            setIsPending(false);
          }, 2000);
        };

    const isFav = favourites.length > 0 && favourites.some((fav) => fav.id === parseInt(id));
    
    const addFav = () => {
        const newFav = {id: parseInt(id), title: details.title, image: details.image}
        dispatch(addFavourites({newFav}))
    }

    const removeFav = () => {
        dispatch(removeFavourites({id: parseInt(id)}))
    }

    return (
        <>
        <helmet>
            <title>Veggie q.b. - detail page</title>
            <meta name="description" content="In this page, you can find more details about the recipe you are searching for."/>
        </helmet>
        <Navbar></Navbar>
        {
            isPending ? (<Loader></Loader>) :
            
            error ? (<Errorpage></Errorpage>) :
            
            details ?
            ( <div className='detail_page'>
            
                <h1 className='detail_title'>{details.title ?? 'title not found'}</h1>
                <img src={details.image} alt='recipe pic' className='detail_photo'></img>
                <h5>Ready in minutes: {details.readyInMinutes ?? 'time not found'}</h5>
                <h5>Servings n: {details.servings ?? 'servings not found'}</h5>
                <h5>Link to website: <a href={details.sourceUrl ?? 'URL not found'}>HERE!</a></h5>
                <h5>Vegetarian: {details.vegetarian ? <span>&#10003;</span> : <span>&#10007;</span>}</h5>
                <h5>Vegan: {details.vegan ? <span>&#10003;</span> : <span>&#10007;</span>}</h5>
                <h5>Gluten free: {details.glutenFree ? <span>&#10003;</span> : <span>&#10007;</span>}</h5>
                <h5>Dairy free: {details.dairyFree ? <span>&#10003;</span> : <span>&#10007;</span>}</h5>
            
                <h4>Ingredients:</h4>
                <ul>
                {details.extendedIngredients.map( ingredient => (
                    <li>{ingredient.original ?? 'ingredients not found'}<br/></li>
                ))}
                </ul>
            
                <h4>Step by step:</h4>
                <ol>
                {details.analyzedInstructions[0].steps.map( step => (
                    <li>{step.step ?? 'steps not found'}<br/></li>
                ))}
                </ol>
            
                <section>
                    <Link to={"/"}>
                        <button className='detail_button'>go home</button>
                    </Link>
                    <Link to={"/favourites"}>
                        <button className='detail_button'>go to fav</button>
                    </Link>
                    <button className='detail_button' onClick={isFav ? removeFav : addFav}>{isFav ? 'remove FAV' : 'add to FAV'}</button>
                </section>
            
            </div> ) : <Errorpage></Errorpage>
        }
        <Footer></Footer>
        </>
    );
}