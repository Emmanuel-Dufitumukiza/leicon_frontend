import react, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import gate from "../assets/images/gate.webp";
import gate2 from "../assets/images/gate2.gif";
import motor from "../assets/images/motor.png";
import gate3 from "../assets/images/gate3.gif";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from 'react-player'
import NavBar from './NavBar';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate
} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const btn = document.querySelector("button.menu-button");
    const menu = document.querySelector(".mobile-menu");
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }, []);

  return (
    <>

    <NavBar/>
     
      <div className="bg-blue w-100" style={{ marginTop: "80px" }}></div>

     <div className="sl-cont">
     <Carousel
        showArrows={true}
        useKeyboardArrows={true}
        emulateTouch={true}
        infiniteLoop={true}
        dynamicHeight={true}
        // autoPlay={true}
      >
        <div>
          <img src={gate} />
          <p className="legend">Open with phone</p>
        </div>
        <div>
          <img src={gate2} />
          <p className="legend">Smart gate</p>
        </div>
        <div>
          <img src={gate3} />
          <p className="legend">Smart gate</p>
        </div>
      </Carousel>
     </div>

      <div className="px-6" >
        <h3 className="text-2xl font-bold text-center mb-6">
          Smart Gate Opener
        </h3>

        <p className="text-center mb-5">
          Make your gate smart with Leicon where you open, close,
          lock and unlock your gate using a remote or with your smart phone.
        </p>

        <div className="moto-image flex">
          <img src={motor} alt="" />

          <div>
            <button onClick={()=>navigate("/order")} className="px-4 py-2 rounded-md bg-teal-500 text-white hover:bg-orangereds mt-16 ml-10">
              Order Now
            </button>
          </div> 
        </div>
      </div>

      <div className="px-6 mt-10" id="how">
        <h3 className="text-2xl font-bold text-center mb-6">How It Works</h3>

        <p className="mb-5 text-center">
          There are six steps followed to get your gate connected with your
          smart phone. Follow Bellow steps to connect your smart gate.
        </p>

        <h3 className="font-bold mb-4">Steps</h3>

        <div className="flex mb-4">
            <div className="box"></div>

            <p className="list-s">Open remote xy app in your phone</p>
        </div>

        <div className="flex mb-4">
            <div className="box"></div>

            <p className="list-s">Tap plus sign in the top right Conor</p>
        </div>

        <div className="flex mb-4">
            <div className="box"></div>

            <p className="list-s">Choose Wi-Fi point</p>
        </div>

        <div className="flex mb-4">
            <div className="box"></div>

            <p className="list-s">In list of different networks, choose your smart gate</p>
        </div>
        
        <div className="flex mb-4">
            <div className="box"></div>

            <p className="list-s">It will request password, please type your smart gate Opening password</p>
        </div>

        
        <div className="flex mb-6">
            <div className="box"></div>

            <p className="list-s">There you go! Control the gate.</p>
        </div>

        <ReactPlayer url='https://youtu.be/czElAYwMnSo'
             controls={true}
             width="100%"
             
             />

      </div>
    </>
  );
};

export default Home;
