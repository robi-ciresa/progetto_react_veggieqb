import React from "react";
import '../css/Searchbar.css';

import { useDispatch, useSelector } from "react-redux";
import { checkGlutenFalse,checkGlutenTrue } from "../../../redux/slice_gluten";
import { checkLactoseFalse,checkLactoseTrue } from "../../../redux/slice_lactose";
import { resetOffset } from "../../../redux/slice_offset";
import { newQuery } from "../../../redux/slice_query";
import { Link } from "react-router-dom";

export default function Searchbar ({getRecipes}) {
    
    const query = useSelector((state) => state.query.query)
    const dispatch = useDispatch()

    function handleChange(e){
        dispatch(newQuery(e.target.value))
    }

    function handleLactose(e){
        if(e.target.checked){
            dispatch(checkLactoseTrue())
        }
        else{
            dispatch(checkLactoseFalse())
        }
    }

    function handleGluten(e){
        if(e.target.checked){
            dispatch(checkGlutenTrue())
        }
        else{
            dispatch(checkGlutenFalse())
        }
    }

    function searchRecipes(e){
        e.preventDefault();
        dispatch(resetOffset())
        getRecipes()
    }

    return (
        <form>
            <input onChange={handleChange} value={query} className="search_input col-6" type="text" placeholder="search here new recipes"></input>
            <section className="search_lactose">
                <input className="search_checkbox" onChange={handleLactose} type="checkbox" id="search_lactose" name="search_lactose"></input>
                <label className="search_label" for="search_lactose">Lactose Free</label>
            </section>
            <section className="search_gluten">
                <input className="search_checkbox" onChange={handleGluten} type="checkbox" id="search_gluten" name="search_gluten"></input>
                <label className="search_label" for="search_gluten">Gluten Free</label>
            </section>
            <section>
                <button className="search_button" onClick={searchRecipes} type="submit">Go to results...</button>
                <p className="search_label">or</p>
                <Link to={"/favourites"}>
                    <button className="search_button">Go to favourites!</button>
                </Link>
            </section>
        </form>
    );
}