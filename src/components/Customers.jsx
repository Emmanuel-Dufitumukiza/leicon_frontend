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

const Customers = () => {
  const navigate = useNavigate();
    const [allDistricts, setAllDistricts] = useState([])
    const [allSectors, setAllSectors] = useState([])
    const [allProducts, setAllProducts]= useState([])

useEffect(()=>{
    setAllDistricts(Districts());
    getProductsId();
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

const [names, SetNames] = useState(null);
const [email, SetEmail] = useState(null);
const [secretPin, SetPin] = useState(null);
const [district, SetDist] = useState(null);
const [sector, SetSector] = useState(null);
const [id, SetId] = useState(null);

const [phone, SetPhone] = useState(null);
const [disabled, setDisabled]= useState(false);

const registerCustomer = async(e)=>{
   try{
    e.preventDefault();

    if(names && email && secretPin && district && sector && phone && id){
      setDisabled(true)
        let res = await axiosInstance.post("/customers/register", {
           username: names,
           email: email,
           secretPin: secretPin,
           district: district,
           sector: sector,
           telephone: phone,
           gateIds: id
         });
 
          setDisabled(false)
          if(res.status == 200){
            document.getElementById("closeModalBtn").click();
            SetNames(null);
            SetEmail(null)
            SetPin(null)
            SetPhone(null);
            navigate("/customers");
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

const getProductsId = async(e)=>{
  try{
       let res = await axiosInstance.get("/customers/allProducts");
       console.log(res.data)
       setAllProducts(res.data);
  }
  catch(error)
  {
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
            <form className="w-full" method="POST" onSubmit={registerCustomer}>

            <h3 className="text-2xl font-bold mb-6 text-gray-600">Register New Customer</h3>

            <div className="floating-input mb-5 relative">
            <input
              type="text"
              id="password"
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              placeholder="Customer Name"
              autocomplete="off"
              required
              onKeyUp={(val)=>SetNames(val.target.value)}
            />
            <label
              for="password"
              className="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
            >
              Customer Name
            </label>
          </div>


          <div className="floating-input mb-5 relative">
            <input
              type="number"
              id="password"
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              placeholder="Telephone"
              autocomplete="off"
              required
              maxLength={10}
              onKeyUp={(val)=>SetPhone(val.target.value)}
            />
            <label
              for="password"
              className="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
            >
              Telephone
            </label>
          </div>

          <div className="floating-input mb-5 relative">
            <input
              type="email"
              id="password"
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              placeholder="Email"
              autocomplete="off"
              required
              onKeyUp={(val)=>SetEmail(val.target.value)}
            />
            <label
              for="password"
              className="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
            >
              Email
            </label>
          </div>

          <div className="floating-input mb-5 relative">
            <select
            onChange={getSectors}
            id="dist"
            required
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              
            >
                <option disabled selected>Select district</option>
                {
      allDistricts?.map((d)=>(
          <option value={d}>{d}</option>
      ))
  }
                </select>
          </div>

          <div className="floating-input mb-5 relative">
            <select
              required
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              onChange={(val)=>SetSector(val.target.value)}
            >
                <option disabled selected>Select Sector</option>
                {
      allSectors?.map((s)=>(
          <option value={s}>{s}</option>
      ))
  }
                </select>
          </div>

          <div className="floating-input mb-7 relative">
            <select
            id="ids"
            required
            onChange={(val)=>SetId(val.target.value)}
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              
            >
                <option disabled selected>Select Gate Opener Id</option>
                {
                  allProducts?.map((i)=>(
                  !i?.status ?
          <option value={i?.gateId}>{i?.gateId}</option>
          :
          <></>
                  ))
                }
                </select>
          </div>
  
          <div className="my-6 mb-17">
            <button
            type="button"
              className="h-14 text-lg w-full px-4 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              data-bs-toggle="modal" data-bs-target="#exampleModal"
            >
              Continue
            </button>
          </div>
          <br/>   <br/>   <br/>   <br/>

          <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
  id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div
      className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div
        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Register Customer</h5>
        <button type="button"
        id="closeModalBtn"
          className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline text-lg"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body relative p-4">

          <p className="my-5 mt-2">Enter your secret password</p>
        
      <div className="floating-input mb-5 relative">
            <input
              type="password"
              id="SecretPin"
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              placeholder="SecretPin"
              autocomplete="off"
              required
              maxLength={7}
              onKeyUp={(val)=>SetPin(val.target.value)}
            />
            <label
              for="password"
              className="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
            >
              Secret Pin
            </label>
          </div>
      </div>
      <div
        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <button type="submit" className="px-6
          py-4
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out" disabled={disabled} onClick={registerCustomer}>Register</button>
      </div>
    </div>
  </div>
</div>
         
        </form>
            </div>
        </div>
      </div>

    </>
  );
};

export default Customers;
