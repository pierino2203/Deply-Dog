import React from "react";
import s from '../styles/DogCard.module.css'

export default function Card({name, img, temperaments,weight_min,weight_max}) {
  // console.log("dogCard",temperament)
   return(
       <div >
           <h3 className={s.subTitle} >{name}</h3>
           <img className={s.dogImage}  src={img} alt="img not found" width="200px" height="250px"/>
           <h5>Weight Min: {weight_min}Kg - Weight Max: {weight_max}Kg</h5>
           <h5>Temperaments:</h5>
           <h5 className={s.temperaments}>{temperaments}</h5>
       </div>
   )    
}