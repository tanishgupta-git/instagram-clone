import React from 'react';
import Error from '../../static/Error.svg';
import './error-boundary.css';

class ErrorBoundary extends React.Component {
    constructor(){
        super();
        this.state = {
            hasErrored : false
        }
    }
    static getDerivedStateFromError(error) {
        // process the error
     return { hasErrored : true }
    }
   
    componentDidCatch (error,info) {
        console.log(error);
    }

    render() {
        if(this.state.hasErrored) {
            return ( 
            <div className='ErrorBoundary'>
            <div className='ErrorBoundary__img'>
                <img src={Error} alt=''/>
            </div>
            <h1>Something went wrong</h1>
            <h4>Brace yourself till we get the error fixed</h4>
            <h4>You may also refresh the page or try again later</h4>
            </div>    
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary;