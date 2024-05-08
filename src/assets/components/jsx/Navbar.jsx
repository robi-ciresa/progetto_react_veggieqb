import React from "react";
import Logo from '../../img/logo_img.png';
import '../css/Navbar.css';

 export default function Navbar() {
    return(
    <nav className="row navbar">
        <section className='col sec_title'>
            VEGGIE q.b.
        </section>
        <section className='col sec_logo'>  
            <img className='img_logo' src={Logo} alt='logo veggie q.b.'></img>
        </section>
        <section className='col sec_description'>
            Project React App for Start2Impact University <br/>
            Supported by Spoonacular API
        </section>
    </nav>
    );
}