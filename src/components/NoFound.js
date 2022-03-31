import React from 'react';
import { Link } from 'react-router-dom';
import NoPage from '../img/noPage.png';
import { TiArrowBack } from 'react-icons/ti';

function NotFound() {
  return (
    <div className="noPage">
      <img src={NoPage} alt="404 not page" />
      <h1>Page Not Found!</h1>
      <Link to="/" className="backToHome">
        <TiArrowBack /> Back to home
      </Link>
    </div>
  );
}

export default NotFound;
