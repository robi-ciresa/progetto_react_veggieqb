import '../css/Card.css'
import { addFavourites, removeFavourites } from '../../../redux/slice_favourites'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


export default function Card ({id, title, photo, ingredients}) {
    
    const favourites = useSelector ((state)=> state.favourites.favourites)
    const dispatch = useDispatch()
    
    const addFav = () => {
        dispatch(addFavourites({id}))
    }

    const removeFav = () => {
        dispatch(removeFavourites({id}))
    }
    
    return (
        <div className='col-xs-12 col-sm-5 col-xl-2 card_component'>
        <p className='card_title'>{title}</p>
        <img src={photo} alt='recipe pic' className='card_photo'></img>
        <ul>
            {ingredients.map( ingredient => (
                <li>{ingredient.original}</li>
                ) 
            )}
        </ul>
        <section>
            <Link to={`/detailpage/${id}`} key={id}>
                <button className='card_button'>view more</button>
            </Link>
            <button onClick={favourites ? removeFav : addFav} className='card_button'>{favourites ? 'remove from fav' : 'add to fav'}</button>
        </section>
        </div>
    )
} 