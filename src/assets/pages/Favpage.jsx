import React from "react";
import Navbar from "../components/jsx/Navbar";
import Footer from "../components/jsx/Footer";

import { Link } from "react-router-dom";

export default function Favpage () {
    return (
        <>
        <Navbar></Navbar>
        {
            //mappare elenco ricette preferite e inserire card
        }
        <section>
            <Link to={"/"}>
                <button className='detail_button'>back home</button>
            </Link>
        </section>
        <Footer></Footer>
        </>
    );
}