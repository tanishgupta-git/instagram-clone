import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setHidePopup } from '../../redux/hidePopup/hidePopup.actions.js';
import { setLoading } from '../../redux/loading/loading.actions.js';
import PageNotFound from '../../static/PageNotFound.svg';
import './Page404.css';
const Page404 =({setHidePopup,setLoading}) => {
    //    setting the popup to false
    useEffect(() => {
    setHidePopup(false);
    setLoading()
   },[setHidePopup,setLoading])

    return (
        <div className='Page404'>
        <div className='Page404__img'>
           <img src={PageNotFound} alt=""/>
        </div>
        <div className='Page404__text'>
             <h1>We Couldn't find the page you are looking for</h1> 
            <Link className='Page404__text__button' to='/'>Go Back To Home</Link>
        </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    setLoading : () => dispatch(setLoading()),
    setHidePopup : userCond => dispatch(setHidePopup(userCond))
  })

export default connect(null,mapDispatchToProps)(Page404);
