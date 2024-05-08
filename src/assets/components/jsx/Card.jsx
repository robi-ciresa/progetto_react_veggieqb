import React from 'react';
import '../css/Card.css';

import { addFavourites, removeFavourites } from '../../../redux/slice_favourites';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


export default function Card ({id, title, photo}) {
    
    const favourites = useSelector ((state)=> state.favourites.favourites)
    const dispatch = useDispatch()

    const isFav = favourites.length > 0 && favourites.some((fav) => fav.id === id);
    
    const addFav = () => {
        const newFav = {id: id, title: title, image: photo}
        dispatch(addFavourites({newFav}))
    }

    const removeFav = () => {
        dispatch(removeFavourites({id}))
    }
    
    return (
        <div className='col-xs-10 col-md-4 col-xl-3 card_component'>
            <section className='row'>
                <p className='card_title'>{title}</p>
            </section>
            <section className='row'>
            <img src={photo} alt='recipe pic' className='card_photo'></img>
            </section>
            <section className='row btn_container'>
                <Link to={`/detailpage/${id}`}>
                    <button className='card_button'>view more</button>
                </Link>
                <button onClick={isFav ? removeFav : addFav} className='card_button'>{isFav ? 'remove FAV' : 'add to FAV'}</button>
            </section>
        </div>
    )
} 