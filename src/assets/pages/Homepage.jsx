import React from "react";
import Navbar from "../components/jsx/Navbar";
import Footer from "../components/jsx/Footer";
import Card from "../components/jsx/Card";
import Searchbar from "../components/jsx/Searchbar";
import { plusOffset, minusOffset } from "../../redux/slice_offset";
import { newRecipes } from "../../redux/slice_recipes";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import './Homepage.css'

export default function Homepage () {
    
    const [totalResults, setTotalResults] = useState(0)

    const query = useSelector((state) => state.query.query)
    const lactoseFree = useSelector((state) => state.lactoseFree.lactoseFree)
    const glutenFree = useSelector((state) => state.glutenFree.glutenFree)
    const offset = useSelector((state) => state.offset.value)
    const recipes = useSelector((state) => state.recipes.recipes)
    const dispatch = useDispatch()

    const nextPage = () =>{
        dispatch(plusOffset())
    }

    const backPage = () =>{
        dispatch(minusOffset())
    }

    const API_KEY = 'ea2899c101ee46659ec25a85183e7a21';

    useEffect(() =>{
        getRecipes()
    }, [query])

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

    const getRecipes = async () => {
        let recipeList = await fetch (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&titleMatch=${query}&intolerances=${intolerances}&diet=vegan|vegetarian&number=10`);
        let recipeListJson = await recipeList.json();
        console.log (recipeListJson)
            setTotalResults(recipeListJson.totalResults)
        dispatch(newRecipes(recipeListJson.results))
        }

    let pageArray = recipes.slice (offset-12, offset);

    return (
        <>
        <Navbar></Navbar>
        <div className="search_container">
            <Searchbar></Searchbar>
        </div>
        <div className="card_container row">
            { pageArray.map ((recipe) => (
                <Card id={recipe.id}
                title={recipe.title}
                photo={recipe.image}/>
                ))
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