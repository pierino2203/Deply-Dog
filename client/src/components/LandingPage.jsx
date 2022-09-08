import React from "react";
import { NavLink } from 'react-router-dom';
import img from '../images/dog.png'
import style from '../styles/LandingPage.module.css'
export default function LandingPage() {
  return  (
    <div >
      <h1 className={style.title}>Welcome to Dog World</h1>
      
      <NavLink className={style.navlink} to='/home'>
        <div>
        <h4 className={style.subTitle}  >ENTER</h4>
        <img src={img} alt="Logo de dog"/>
        </div>
      </NavLink>
      
    </div>
  )
}