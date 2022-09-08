import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../redux/actions";
import style from '../styles/SearchBar.module.css'

export default function SearchBar()  {
  const dispatch = useDispatch();
  const [name,setName]=useState("");

  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value);
    console.log(name)
  }
  function handleSubmit(e){
    e.preventDefault();
    dispatch(getNameDogs(name))
    setName('');
  }
  return(
    <div className={style.contenedor}>
      <input
        className={style.input}
        type="text"
        value={name}
        placeholder="Enter name"
        onChange={(e)=> handleInputChange(e)}
      />
      <button className={style.button} type='submit' onClick={(e)=>handleSubmit(e)}>Search</button>
    </div>
  )

}





