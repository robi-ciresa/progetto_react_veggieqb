import React from "react";
import LogoIG from '../../img/logo_ig.png'
import LogoIN from '../../img/logo_in.png'
import LogoTH from '../../img/logo_th.png'
import '../css/Footer.css'

export default function Footer () {
    return(
        <>
        <footer className='footer'>
            <section className='sec_footer'>
                <h4>Contacts</h4>
                <hr></hr>
                <p>Autore: Roberta Ciresa</p>
                <hr></hr>
                <p>Email: inviami una mail <a href='mailto:robertaciresa.ch@gmail.com'>qui</a></p>
                <hr></hr>
                <p>Telefono: +39 342 6623***</p>
                <hr></hr>
            </section>
            <section className='sec_footer'>
                <h4>Support</h4>
                <hr></hr>
                <a href='https://spoonacular.com'>API from...</a>
                <hr></hr>
                <a href='https://linkin.bio/vegolosi-it/'>Vegolosi.it</a>
                <hr></hr>
                <a href='https://www.instagram.com/veganrecipesideas/'>VeganRecipesIdeas</a>
                <hr></hr>
            </section>
            <section className='sec_footer'>
                <h4>Social</h4>
                <hr></hr>
                <p>Linkedin: <a href='https://www.linkedin.com/in/roberta-ciresa-557800246/'><img className='logo_social' src={LogoIN} alt='Logo Linkedin'></img></a></p>
                <hr></hr>
                <p>Instagram: <a href='https://www.instagram.com/robi_ciresa/'><img className='logo_social' src={LogoIG} alt='Logo IG'></img></a></p>
                <hr></hr>
                <p>Thread: <a href='https://www.threads.net/@robi_ciresa'><img className='logo_social' src={LogoTH} alt='Logo Thread'></img></a></p>
                <hr></hr>
            </section>
        </footer>
        </>
        );
}