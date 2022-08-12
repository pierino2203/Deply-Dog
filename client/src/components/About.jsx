import React from "react";
import style from '../styles/About.module.css'
import umma from '../images/ummita.png.png'
import html from '../images/html.png'
import css from '../images/css.png'
import js from '../images/js.png'
import react from '../images/react.png'
import redux from '../images/redux.png'
import node from '../images/node.png'
import express from '../images/express.png'
import sequelize from '../images/sequelize.png'
import posgres from '../images/posgres.png'
import {Link} from 'react-router-dom'

export default function About(){
 return (
  <div>
    <div>
      <Link to='/home'><button className={style.button}>Back</button></Link>
    </div>
    <div className={style.contenedor}>
      <div className={style.contTitle}>
        <h1 className={style.title}>About this proyect</h1>
      </div>
        <div className={style.contP}>
          <p>This Page is a proyect for Bootcamp-Full Stack Developer(Soy Henry)</p>
          <p>On this page you can find information about dogs, such as their weight, height, life-time, ext.</p>
          <p>Page construction:</p>
          <ul>
            <li>Use API <a href="https://thedogapi.com/" target="_blank" rel="noopener noreferrer" color="white">"The Dog Api"</a></li>
            <li>Save the information in database.</li>
            <li>Show the dogs with details.</li>
            <li>Create your own dog.</li>
            <li>Filter Dogs.</li>
            <li>Search Dog by Name.</li>
            <li>Filter dogs by Temperaments.</li>
            <li>Order dogs by Weight.</li>
          </ul>
        </div>
        <div>
          <div className={style.contTitle}>
           <h1 className={style.title}>About me</h1>
          </div>
          <div className={style.contInfo}> 
            <p>Hi!,my name is Pierino Juncos, I am from Argentina, always passionate about technology. way to become a full stack developer (soy henry)</p>
            <p>Contac:</p>
            <ul>
              <li><a href="https://www.linkedin.com/in/pierino-esteban-juncos-9a4804240/" target="_blank" rel="noopener noreferrer" color="white">Linkedin</a></li>
              <li><a href="https://github.com/pierino2203" target="_blank" rel="noopener noreferrer" color="white">GitHub</a></li>
              <li>Mail: Pierinoe@gmail.com</li>
            </ul>
          </div>
          <div>
            <div className={style.contTitle1}>
              <h1 className={style.title}>Technologies</h1>
            </div>
            <div className={style.contenedorTech}>
              <div>
                <img  src={html} width='42px'/>
                {/* <p>HTML</p> */}
              </div>
              <div>
                <img className={style.techImg} src={css}/>
                {/* <p>CSS</p> */}
              </div>
              <div>
                <img  src={js} width='47px'/>
                {/* <p>JavaScript</p> */}
              </div>
              <div>
                <img className={style.techImg} src={react}/>
                {/* <p>React</p> */}
              </div>
              <div>
                <img src={redux} width='59px'/>
                {/* <p>Redux</p> */}
              </div>
              <div>
                <img src={node} width='93px'/>
                {/* <p>Nodejs</p> */}
              </div>
              <div>
                <img  src={express} width='85px'/>
                {/* <p>Express</p> */}
              </div>
              <div>
                <img  src={sequelize} width='47px'/>
                {/* <p>Sequelize</p> */}
              </div>
              <div>
                <img  src={posgres} width='55px'/>
                {/* <p>PostgreSQL</p> */}
              </div>
            </div>
          </div>           
        <div>
      </div>
     </div>
    </div>  
  </div>
 )
}