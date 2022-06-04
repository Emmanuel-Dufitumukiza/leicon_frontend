import react, { useState, useEffect } from "react";
import { Provinces, Districts, Sectors, Cells, Villages} from "rwanda";
import 'tw-elements';
import { axiosInstance } from "../config"
import NavBar from './NavBar';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate
} from "react-router-dom";
import LeftBar from "./LeftBar";

const AddProduct = () => {
  const navigate = useNavigate();
    const [allDistricts, setAllDistricts] = useState([])
    const [allSectors, setAllSectors] = useState([])

useEffect(()=>{
    setAllDistricts(Districts());
},[])

const getSectors =()=>{
    let dist = document.getElementById("dist").value;
    SetDist(dist)
    Provinces().map((p)=>{
        Districts(p)?.map((d)=>{
            if(d == dist){
                setAllSectors(Sectors(p,dist));
                return 0;
            }
        })
    })
}

const [code, SetCode] = useState(null);
const [password, SetPassword] = useState(null);

const [disabled, setDisabled]= useState(false);

const registerProduct = async(e)=>{
   try{
    e.preventDefault();

    if(password && code){
      setDisabled(true)

        let res = await axiosInstance.post("/customers/addProduct", {
           remoteCode: code,
           password: password
         });
 
          setDisabled(false)

          if(res.status == 200){
            window.location = "/products"
            return ;
          }else{
            alert("an error occured, please try again")
          }
        
    }else{
        return alert("Complete all fields");
    }
   }
   catch(error)
   {
    setDisabled(false)
       console.log(error)
   }
}

  return (
    <>
      <div className="customers-page bg-gray-50 dark:bg-gray-900">      

        <div className="right-side-bar">

<NavBar/>
<br/>
            <div className="form-cont form-cont-c mx-auto mt-6">
            <form className="w-full" method="POST" onSubmit={registerProduct}>

            <h3 className="text-2xl font-bold mb-6 text-gray-600">Register Product</h3>

            <div className="floating-input mb-5 relative">
            <input
              type="text"
              id="password"
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              placeholder="Remote Code"
              autocomplete="off"
              required
              maxLength={10}
              onKeyUp={(val)=>SetCode(val.target.value)}
            />
            <label
              for="password"
              className="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
            >
              Remote Code
            </label>
          </div>


          <div className="floating-input mb-5 relative">
            <input
              type="password"
              id="password"
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              placeholder="Password"
              autocomplete="off"
              required
              maxLength={30}
              onKeyUp={(val)=>SetPassword(val.target.value)}
            />
            <label
              for="password"
              className="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
            >
              Password
            </label>
          </div>
  
          <div className="my-6">
            <button
            type="submit"
              className="h-14 text-lg w-full px-4 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              disabled={disabled}
            >
              Register Product
            </button>
          </div>
         
        </form>
            </div>
        </div>
      </div>

    </>
  );
};

export default AddProduct;