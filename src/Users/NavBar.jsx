import react, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import gate from "../assets/images/gate.webp";
import gate2 from "../assets/images/gate2.gif";
import motor from "../assets/images/motor.png";
import gate3 from "../assets/images/gate3.gif";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from 'react-player'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate
} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Clear';

const NavBar = () => {

  const navigate = useNavigate();

 function toggleMenu(){
  const menu = document.querySelector(".left-bar");

    if( menu.style.display !="block"){
    document.getElementById("menuBtn").style.display="none"
      document.getElementById("closeBtn").style.display="block"
    return menu.style.display ="block";
    }
    menu.style.display ="none";
    document.getElementById("menuBtn").style.display="block"
    document.getElementById("closeBtn").style.display="none"
 }

 const howItWorks = ()=>{
  navigate("/");
  document.querySelector(".left-bar").style.display ="none";
  document.getElementById("menuBtn").style.display="block"
  document.getElementById("closeBtn").style.display="none"
  setTimeout(()=>{
    window.scroll(0, 850)
  },500)
 }

 const home = ()=>{
  navigate("/");
  document.querySelector(".left-bar").style.display ="none";
  document.getElementById("menuBtn").style.display="block"
  document.getElementById("closeBtn").style.display="none"
 }

 const order = ()=>{
  navigate("/order");
  document.querySelector(".left-bar").style.display ="none";
  document.getElementById("menuBtn").style.display="block"
  document.getElementById("closeBtn").style.display="none"
 }

 const mygate = ()=>{
  navigate("/mygate");
  document.querySelector(".left-bar").style.display ="none";
  document.getElementById("menuBtn").style.display="block"
  document.getElementById("closeBtn").style.display="none"
 }

  return (
    <>
      <nav className=" shadow-lg navbarcont fixed">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <a href="#" className="flex items-center py-2">
                <img src={logo} alt="Logo" className="logo mr-2 select-none" />
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <a
               onClick={home}
                className="py-4 px-2 text-gray-500 border-b-4 border-purple-500 font-semibold mr-7"
              >
                HOME
              </a>

              <a
                onClick={howItWorks}
                className="py-4 px-4 text-gray-500 font-semibold hover:text-purple-500 transition duration-300"
              >
                HOW IT WORKS
              </a>
              <p>&nbsp;&nbsp;&nbsp;</p>
              <a
                onClick={mygate}
                className="py-4 px-6 text-gray-500 font-semibold hover:text-purple-500 transition duration-300"
              >
                MY GATE Opener
              </a>
              <a
               onClick={order}
                className="py-4 px-6 text-gray-500 font-semibold hover:text-purple-500 transition duration-300"
              >
                ORDER NOW
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} id="menuBtn" className="outline-none menu-button">
                <MenuIcon/>
              </button>
              <button onClick={toggleMenu} id="closeBtn" style={{display: "none"}} className="outline-none menu-button">
                <CloseIcon/>
              </button>
            </div>
          </div>
        </div>
      </nav>

<div className="left-bar">
  <div className="min-bar shadow-lg">
    <div className="links w-100 mb-3">
      <button onClick={home} className="px-6">Home</button>
    </div>
    <div className="links w-100 mb-3">
      <button className="px-6" onClick={howItWorks}>How It Works</button>
    </div>
    <div className="links w-100 mb-3">
      <button onClick={order} className="px-6">Order Gate</button>
    </div>

    <div className="links w-100 mb-3">
      <button onClick={mygate} className="px-6">My GateOpener</button>
    </div>

    <div className="links w-100 mb-3">
      <button onClick={()=>window.location = "/login"} className="px-6 bg-teal-500 ml-5 text-white rounded-md  text-sm py-2">Login</button>
    </div>
  </div>
</div>

      </>
      )
      }

      export default NavBar;