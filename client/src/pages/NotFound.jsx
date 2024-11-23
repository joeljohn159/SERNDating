import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
    <div className='text-5xl'>404 Not Found</div>
    <Link to='/'>CLICK TO - NAVIGATE TO HOME</Link>
    </>
  )
}

export default NotFound