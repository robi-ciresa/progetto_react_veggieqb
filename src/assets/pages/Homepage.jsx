import React from "react";
import Navbar from "../components/jsx/Navbar";
import Footer from "../components/jsx/Footer";
import Card from "../components/jsx/Card";
import Searchbar from "../components/jsx/Searchbar";
import Errorpage from "./Errorpage";
import { plusOffset, minusOffset } from "../../redux/slice_offset";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import './Homepage.css'

export default function Homepage () {
    
    const [totalResults, setTotalResults] = useState(0)
    const [recipes, setRecipes] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    const query = useSelector((state) => state.query.query)
    const lactoseFree = useSelector((state) => state.lactoseFree.lactoseFree)
    const glutenFree = useSelector((state) => state.glutenFree.glutenFree)
    const offset = useSelector((state) => state.offset.value)
    const dispatch = useDispatch()

    const nextPage = () =>{
        dispatch(plusOffset())
    }

    const backPage = () =>{
        dispatch(minusOffset())
    }

    const API_KEY = 'ea2899c101ee46659ec25a85183e7a21';

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
    }, [])

    const getRecipes = async () =>  {
        try {
            const recipeList = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&titleMatch=${query}&intolerances=${intolerances}&diet=vegan|vegetarian&number=12`); // Replace with your API endpoint
            if (!recipeList.ok) {
              throw new Error('Network response was not ok.');
            }
            const recipeListJson = await recipeList.json();
            setRecipes(recipeListJson.results);
            setTotalResults(recipeListJson.totalResults)
            setIsPending(false);
        } catch (error) {
            setError(error.message);
            setIsPending(false);
          }
    };

    return (
        <>
        <Navbar></Navbar>
        <div className="search_container">
            <Searchbar getRecipes={getRecipes}></Searchbar>
        </div>
        <div className="card_container row">
            {isPending ? (<div>I'm searching...</div>) :
            error ? (<Errorpage></Errorpage>) :
            recipes ? 
                (<><p>I've found {totalResults} recipes!</p>
                {recipes.map((recipe) => (
                    <Card id={recipe.id}
                    title={recipe.title}
                    photo={recipe.image}/>
                ))}
                </>) : (<Errorpage></Errorpage>) 
            
            }
        </div>
        <div className="page_button_container">
        {offset !== 0 ? <button className="a" onClick={backPage}>Back</button> : null}
        {(totalResults-offset) < 12 ? null :<button className="a" onClick={nextPage}>Next</button>}
        </div>
        <Footer></Footer>
        </>
    );
}