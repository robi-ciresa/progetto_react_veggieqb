import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkGlutenFalse,checkGlutenTrue } from "../../../redux/slice_gluten";
import { checkLactoseFalse,checkLactoseTrue } from "../../../redux/slice_lactose";
import { resetOffset } from "../../../redux/slice_offset";
import { newQuery } from "../../../redux/slice_query";
import '../css/Searchbar.css'

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
    <>
        <form>
            <input onChange={handleChange} value={query} className="search_input" type="text" placeholder="Insert here your request..."></input>
            <section className="search_lactose">
                <input className="search_checkbox" onChange={handleLactose} type="checkbox" id="search_lactose" name="search_lactose"></input>
                <label className="search_label" for="search_lactose">Lactose Free</label>
            </section>
            <section className="search_gluten">
                <input className="search_checkbox" onChange={handleGluten} type="checkbox" id="search_gluten" name="search_gluten"></input>
                <label className="search_label" for="search_gluten">Gluten Free</label>
            </section>
            <button className="search_button" onClick={searchRecipes} type="submit">Go to results...</button>
        </form>
    </>
    );
}