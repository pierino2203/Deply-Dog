import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from '../images/dog.png'
import { getDogs, getNameDogs, getTemperaments } from "../redux/actions";
import style from '../styles/NavBar.module.css'
import Paginado from '../components/Paginado';
import SearchBar from "./SearchBar";


export default function NavBar(){
  const allDogs=useSelector((state) => state.dogs)
  const temperaments=useSelector((state) => state.temperaments)
  const [currentPage,setCurrentPage]=useState(1);
  const [dogsPerPage,setDogsPerPage]=useState(8);
  const indexOfLastDog= currentPage*dogsPerPage;
  const indexOfFirstDog= indexOfLastDog - dogsPerPage;
  const currentDogs=allDogs.slice(indexOfFirstDog,indexOfLastDog)
  const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getDogs())
    dispatch(getTemperaments())
  },[dispatch]);
  
  function handleClick(e){
  e.preventDefault();
  dispatch(getDogs());
  }
  return(
    <nav className={style.navbar}>
    <Link to='/'>
       <img className={style.logo} src={logo} alt='logo de pag'/>
    </Link>
    <div>
      <h1 className={style.titleH1} >Dogs-Page</h1>
    </div>
    <SearchBar className={style.inputContainer}/>
    <div className={style.conteiner}>
      <ul className={style.listContainer}>
        <li className={style.listNav}>
          <button className={style.button}  onClick={(e)=> handleClick(e)}>Home</button>
        </li>
        <li className={style.listNav}>
          <Link to='/dogs'>
            <button className={style.button}>Create Dog</button>
          </Link>
        </li>
        <li className={style.listNav}>
          <Link to='/about'>
            <button className={style.button}>About</button>
          </Link>
        </li>     
      </ul>

    </div>
  </nav>
  )
}