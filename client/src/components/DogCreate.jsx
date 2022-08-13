import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { getTemperaments } from '../redux/actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { postDogs } from '../redux/actions/index'; 
import style from '../styles/DogCreate.module.css'
import swal from 'sweetalert'

function validate(input){
  let error={};
  if (!input.name || !/^[A-Z]+[A-Za-z\s]+$/g.test(input.name)){
    error.name= 'Enter a name, first letter with uppercase without symbols or numbers'
  }
  if(!input.weight_min || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_min)){
    error.weight_min='Enter a weight min , only numbers'
  }
  if(!input.weight_max || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_max)){
    error.weight_max='Enter a weight max , only numbers'
  }
  if(Number(input.weight_max) <= Number(input.weight_min)){
    error.weight_min  = 'Weight min should be less than weight max';
  }
  if(!input.height_min || !/^[1-9]\d*(\.\d+)?$/.test(input.height_min)){
    error.height_min='Enter a height min , only numbers'
  }
  if(!input.height_max || !/^[1-9]\d*(\.\d+)?$/.test(input.height_max)){
    error.height_max='Enter a height max , only numbers'
  }
  if(Number(input.height_max) <= Number(input.height_min)){
    error.height_min = 'Height min should be less than height max';
  }
  if(!input.life_time_min || !/^[1-9]\d*(\.\d+)?$/.test(input.life_time_min)){
    error.life_time_min ='Enter a life time min , only numbers'
  }
  if(!input.life_time_max || !/^[1-9]\d*(\.\d+)?$/.test(input.life_time_max)){
    error.life_time_max='Enter a life time man , only numbers'
  }  
  if(Number(input.life_time_max) <= Number(input.life_time_min)){
    error.life_time_min='Life time min should be less than life time max'
  }
  return error;
}
export default function DogCreate(){
  const dispatch= useDispatch();
  const temperaments = useSelector((state) => state.temperaments)
  const history =useHistory();
  const [error,setError] = useState({});
  const [input,setInput]=useState({
    name: '',
    height_min: '',
    height_max: '',
    weight_min: '',
    weight_max: '',
    life_time_min: '',
    life_time_max: '',
    temperament: [],
    img:  '',
  }) 
  useEffect(() => {
    dispatch(getTemperaments())
}, [dispatch]);

  function handleChange(e){
    console.log(input);
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setError(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
    console.log(input)
  }
  
  function handleSelect(e){
    setInput({
        ...input,
        temperament: [...input.temperament, e.target.value]
    })
  }
  
  function handleSubmit(e)  {
    e.preventDefault()
    console.log(input)
    
    if( Object.keys(error).length === 0 && input.name !== "" && input.height_min !== "" && input.height_max !== "" && input.weight_min !== ""
        && input.weight_max !== "" && input.life_time_min !== "" && input.life_time_max !== "" && input.temperament.length !== 0 ){
    dispatch(postDogs(input))
    swal("Good job!", "Dog Created!", "success")
    setInput({
      name: "",
      height_min: "", 
      height_max: "",  
      weight_min: "", 
      weight_max: "", 
      life_time_min: "", 
      life_time_max: "", 
      temperament:[], 
      img:"",
  })  
    history.push('/home')
  }
  else{
  swal('Error','You must complete the required fields','error')}
  }
  function handleClear(e){
    e.preventDefault();
    setInput({
      ...input,
      temperament: input.temperament.filter((el) => el!= e.target.value)
    })
  }
  return  (
    <div>
      <Link to='home'><button className={style.button} >Regresar</button></Link>
      <div className={style.contenedor}>
        <h1 className={style.title}>Create Dog</h1>
        <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
          <div className={style.campos}>
          <label className={style.label}>Name*: </label>
          <br/>
          <input
            className={style.input}
            type="text"
            value={input.name}
            name='name'
            onChange={(e) => handleChange(e)}
          />
          {error.name && 
          <p className={style.danger}>{error.name}</p>}
        </div>
        <div className={style.campos}>
          <label className={style.label}>Weight Min(KG)*:</label>
          <br/>
          <input
            className={style.input}
            type="text"
            value={input.weight_min}
            name='weight_min'
            onChange={(e) => handleChange(e)}
          />
          {error.weight_min &&
          <p className={style.danger}>{error.weight_min}</p>}
        </div>
        <div className={style.campos}>
          <label className={style.label}>Weight Max(KG)*:</label>
          <br/>
          <input
            className={style.input}
            type="text"
            value={input.weight_max}
            name='weight_max'
            onChange={(e) => handleChange(e)}
          />
          {error.weight_max &&
          <p className={style.danger}>{error.weight_max}</p>}
        </div>
        <div className={style.campos}>
          <label className={style.label}>Height Min(CM)*:</label>
          <br/>
          <input
            className={style.input}
            type="text"
            value={input.height_min}
            name='height_min'
            onChange={(e) => handleChange(e)}
          />
          {error.height_min &&
          <p className={style.danger}>{error.height_min}</p>}
        </div>
        <div className={style.campos}>
          <label className={style.label}>Height Max(CM)*:</label>
          <br/>
          <input
            className={style.input}
            type="text"
            value={input.height_max}
            name='height_max'
            onChange={(e) => handleChange(e)}
          />
          {error.height_max &&
          <p className={style.danger}>{error.height_max}</p>}
        </div>
        <div className={style.campos}>
          <label className={style.label}>Life Time Min*: </label>
          <br/>
          <input
            className={style.input}
            type="text"
            value={input.life_time_min}
            name='life_time_min'
            onChange={(e) => handleChange(e)}
          />
          {error.life_time_min &&
          <p className={style.danger}>{error.life_time_min}</p>}
        </div>
        <div className={style.campos}>
          <label className={style.label}>Life Time Max*: </label>
          <br/>
          <input
            className={style.input}
            type="text"
            value={input.life_time_max}
            name='life_time_max'
            onChange={(e) => handleChange(e)}
          />
          {error.life_time_max &&
          <p className={style.danger}>{error.life_time_max}</p>}
        </div>
        <div className={style.campos}>
          <label className={style.label}>Image: </label>
          <br/>
          <input
            className={style.input}
            type="text"
            value={input.img}
            name='img'
            onChange={(e) => handleChange(e)}
          />
        </div>
          </div>
        <div className={style.campos}>
          <laber className={style.label}>Select temperaments:</laber>
          <br/>
          <select className={style.input} onChange={(e) => handleSelect(e)}>
            {temperaments && temperaments.map((temp)=> (
            <option  value={temp.name} key={temp.id}>{temp.name}</option>
            ))}
          </select>
        <ul><li>{input.temperament.map(el=> <button className={style.button} value={el} onClick={(e)=> handleClear(e)}>{el} X</button>)}</li></ul>
        </div>
        <br/>
        <br/>
        <br/>
        <button className={style.buttonS} type="submit" >Create</button>
      </form>
        </div>
      </div>
    </div>
  )


}

