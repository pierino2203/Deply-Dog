import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getDogs,filterCreated, orderByName, orderByWeight, filterDogsByTemperaments, getTemperaments } from '../redux/actions';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import NavBar from './NavBar';
import style from '../styles/Home.module.css'

export default function Home(){
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs );
  const temperaments= useSelector((state)=> state.temperaments)
  const [currentPage,setCurrentPage]= useState(1);
  const [dogsPerPage,setDogsPerPage]= useState(9);
  const indexOfLastDog = currentPage*dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog);
  const [orden,setOrden]=useState('');
  
  const paginado = (pageNumber)=>{
    setCurrentPage(pageNumber)
  }
  useEffect ( () => {
    dispatch(getDogs());
    dispatch(getTemperaments())
    
  },[dispatch]);

  function handleClick(e){
    e.preventDefault();
    dispatch(getDogs());
  }
  
  function handleFilterCreated(e){
    e.preventDefault();
    dispatch(filterCreated(e.target.value))
  }
  
  function handleOrderByName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  
  function handleOrderByWeight(e){
    e.preventDefault();
    dispatch(orderByWeight(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  function handleFilterTemperament(e) {
    
    dispatch(filterDogsByTemperaments(e.target.value));
  }
  return (
    <div>
      <NavBar/>
      
      <div className={style.contenedorPadre}>
        <aside className={style.aside}>
          <h1 className={style.titlefilter}>Filters</h1>
          <div className={style.filter}>
            <h4 className={style.titleSelect}>Temperaments</h4>
              <select className={style.selectAside} onChange={(e)=> handleFilterTemperament(e)}>
                <option value='all'>All</option>
                {temperaments && temperaments.map((temp)=> (
                  <option value={temp.name}
                     key={temp.id}>{temp.name}
                  </option>
                ))
                }
              </select>
          </div>
        <div className={style.filter}>
          <h4 className={style.titleSelect}>Alphabetical Order</h4>
          <select className={style.selectAside} onChange={e => {handleOrderByName(e)}}>
            <option value='none'>None</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
        <div className={style.filter}>
          <h4 className={style.titleSelect}>Order By Weight</h4>
          <select className={style.selectAside} onChange={e => {handleOrderByWeight(e)}}>
          <option value='none'>None</option>
            <option value="weightasc">↑</option>
            <option value="weightdesc">↓</option>
          </select>
        </div>
        <div className={style.filter}>
          <h4 className={style.titleSelect}>Filter By Created</h4>
          <select className={style.selectAside} onChange={e => {handleFilterCreated(e)}} >
            <option value="all">All</option> 
            <option value="created">Created</option>
            <option value="api">Api</option>
          </select>
        </div>
        </aside>
        <div className={style.total}>
          <div>
            <h1 className={style.titleBox}>Dogs</h1>
          </div>
        <ul className={style.lista}> {currentDogs?.map( el =>{
          return (
            <div className={style.card} > 
              <NavLink to={`/home/${el.id}`} >
              <div ><Card  
                      img={el.img ? el.img : "https://www.anipedia.net/imagenes/nombres-de-perros-800x375.jpg"}
                      name={el.name} 
                      temperaments={!el.createInBd ? el.temperament : el.Temperaments.map(e=>e.name + " ") }
                      key={el.id}
                      weight_min={el.weight_min} weight_max={el.weight_max}
                    />
              </div>
              </NavLink>
             </div>
           )
            })}
          </ul>
          <Paginado
          className={style.conteinerPaginado}
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />  
        </div>
        
        </div>  
      </div>
       
  )



}