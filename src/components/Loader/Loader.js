import React from 'react';
import loader from '../../assets/images/loader.svg';
import './Loader.scss';

const Loader = ({ isShowLoading }) => {
  return (
    isShowLoading && (
      <div className="overlay-container">
        <div className="overlay-backdrop" />
        <div className="overlay-wrapper">
          <img className="loader" src={loader} alt="Cargando..." />
        </div>
      </div>
    )
  );
};

export default Loader;
