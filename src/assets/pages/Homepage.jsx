import React from "react";
import axios from "axios";
import Navbar from "../components/jsx/Navbar";
import Footer from "../components/jsx/Footer";
import Card from "../components/jsx/Card";
import Searchbar from "../components/jsx/Searchbar";
import Errorpage from "./Errorpage";
import './Homepage.css';

import { plusOffset, minusOffset } from "../../redux/slice_offset";
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

    const API_KEY = 'ea2899c101ee46659ec25a85183e7a21';
    //const API_KEY = 'b142b7373106495b88bcbcc6fd77ccea';

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

        setIsPending(false);
    };

    const nextPage = () =>{
        dispatch(plusOffset())
    }

    const backPage = () =>{
        dispatch(minusOffset())
    }

    return (
        <>
        <Navbar></Navbar>
        
        <div className="search_container">
            <Searchbar getRecipes={getRecipes}></Searchbar>
        </div>
        
        <div className="recipes_container row">
            {isPending ? (<div>I'm searching...</div>) :
            error ? (<Errorpage error = {error}></Errorpage>) :
            recipes.length > 0 ? 
                (<>
                    {recipes.map((recipe) => (
                    <Card id={recipe.id}
                    title={recipe.title ?? 'title not found'}
                    photo={recipe.image}/>
                    ))}
                </>) : ( <Errorpage error = {error}></Errorpage> ) 
            
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