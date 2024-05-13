import React from "react";
import axios from "axios";
import Navbar from "../../components/jsx/Navbar";
import Footer from "../../components/jsx/Footer";
import Card from "../../components/jsx/Card";
import Searchbar from "../../components/jsx/Searchbar";
import Errorpage from "./Errorpage";
import Loader from "./Loader";
import '../css/Homepage.css';

import { plusOffset, minusOffset } from "../../../redux/slice_offset";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function Homepage () {
    
    const [totalResults, setTotalResults] = useState(0)
    const [recipes, setRecipes] = useState([{}])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    const query = useSelector((state) => state.query.query)
    const lactoseFree = useSelector((state) => state.lactoseFree.lactoseFree)
    const glutenFree = useSelector((state) => state.glutenFree.glutenFree)
    const offset = useSelector((state) => state.offset.value)
    const dispatch = useDispatch()

    //const API_KEY = 'ea2899c101ee46659ec25a85183e7a21';
    //const API_KEY = 'b142b7373106495b88bcbcc6fd77ccea';
    const API_KEY = 'b55d8d65f16f417294e2c1857c048c53';

    let intolerances = "";
    if (lactoseFree&&glutenFree) {
        intolerances = "dairy,gluten"; }
    else {
        if (lactoseFree) {
            intolerances = "dairy"; }
        else {
            if (glutenFree) {
                intolerances = "gluten"; }
            else { intolerances = ""; }
            }
        }

    useEffect(() => {
        getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset])

    const getRecipes = async () =>  {
        try {
            const recipeList = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&titleMatch=${query}&intolerances=${intolerances}&diet=vegan|vegetarian&number=12&offset=${offset}`); // Replace with your API endpoint
            if (recipeList.status === 429) {
                console.log (recipeList.status);
                throw new Error('API for free, too many request.');
            }
            if (!recipeList.status === 200) {
                console.log (recipeList.status);
                throw new Error('Something went wrong.');
              }
            if (recipeList.data.results === null) {
                console.log (recipeList.data.results);
                throw new Error('Results not found.');
              }
            console.log (recipeList.data.results);
            setRecipes(recipeList.data.results);
            setTotalResults(recipeList.data.totalResults);
            
        } catch (error) {
            setError(error.message);
          }

          setTimeout(() => {
            setIsPending(false);
          }, 2000);
    };

    const nextPage = () =>{
        dispatch(plusOffset())
    }

    const backPage = () =>{
        dispatch(minusOffset())
    }

    return (
        <>
        <helmet>
            <title>Veggie q.b.</title>
            <meta name="description" content="React project for Start2Impact University. You can use this website to search vegetarian recipes offered by Spoonacular API."/>
        </helmet>

        <Navbar></Navbar>
        
        <div className="search_container">
            <Searchbar getRecipes={getRecipes}></Searchbar>
        </div>
        
        <div className="recipes_container row">
            {isPending ? (<Loader></Loader>) :
            error ? (<Errorpage></Errorpage>) :
            recipes.length > 0 ? 
                (<>
                    {recipes.map((recipe) => (
                    <Card id={recipe.id}
                    title={recipe.title ?? 'title not found'}
                    photo={recipe.image}/>
                    ))}
                </>) : ( <Errorpage></Errorpage> ) 
            
            }
        </div>
        
        <div className="button_container">
            {offset !== 0 ? <button className="homepage_button" onClick={backPage}>Back</button> : null}
            {(totalResults-offset) < 12 ? null :<button className="homepage_button" onClick={nextPage}>Next</button>}
        </div>
        
        <Footer></Footer>
        </>
    );
}