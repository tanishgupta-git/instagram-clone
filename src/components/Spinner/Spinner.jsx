import React from 'react';


import './Spinner.css';

const Spinner = ({centerPage}) => {
   return ( 
   <div className={centerPage ? 'Spinner__Container centerPage':'Spinner__Container'}>
      <div className='Spinner' >

      </div>
    </div>
   )
}
export default Spinner;