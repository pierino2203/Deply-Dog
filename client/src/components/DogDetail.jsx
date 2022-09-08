import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { useEffect } from "react";
import { getDogDetail, cleanDetail } from "../redux/actions/index";
import style from '../styles/DogDetail.module.css'
import altura from '../images/pngwing.com.png'
import vida from '../images/corazon.png.png'
import peso from '../images/peso.png.png'
import load from '../images/load.gif';

export default function DogDetail(props)  {
const dispatch = useDispatch()
useEffect(()=>  {
  dispatch(getDogDetail(props.match.params.id))
  return () => dispatch(cleanDetail())
},[dispatch]);
const myDog= useSelector((state)=> state.detail);

return  (
  <div>
    
    {
      myDog.length>0 ?
      <div className={style.conteninerDetail}>
        <h1 className={style.title} >{myDog[0].name}</h1>
      <div className={style.div1}>
        <div className={style.div2}>
        <img className={style.imageDetail} src={myDog[0].img ? myDog[0].img : "https://www.anipedia.net/imagenes/nombres-de-perros-800x375.jpg"} alt=""/>
        </div>   
        <div className={style.divdetail}>
          <div className={style.conteninerInfo}>
          <div className={style.conteinderIco}>
            <img className={style.iconos} src={altura}/>
            <div>
              <h3>Height Min: {myDog[0].height_min}-Cm</h3>  
              <h3>Height Max: {myDog[0].height_max}-Cm</h3>
            </div>
          </div>
          <div className={style.conteinderIco}>
            <img className={style.iconos} src={peso}/>
            <div>
              <h3>Weight Min: {myDog[0].weight_min}-Kg</h3>
              <h3>Weight Max: {myDog[0].weight_max}-Kg</h3>
            </div>
          </div>
          <div className={style.conteinderIco}>
            <img className={style.iconos} src={vida}/>
            <div className={style.conteinerCorazon}>
              <h3>Life Time Min: {myDog[0].life_time_min}-Years</h3>
              <h3>Life Time Max: {myDog[0].life_time_max}-Years</h3>
            </div>
          </div>
            </div>
        </div>
        
      </div>         
      <div className={style.temperament}>
        <h4>Temperaments: </h4>
        <p>{!myDog[0].createInBd ? myDog[0].temperament : myDog[0].Temperaments.map(e=>e.name + " ")}</p>
      </div>  
      <div className={style.contButton}>
        <Link to='/home'><button className={style.button}>Back</button></Link>  
      </div>  
      </div>
      :<div className={style.loading}>
        <img src={load}/>
        <br/>
        <p>Loading...</p>
      </div>
    }
  
  </div>
)


}