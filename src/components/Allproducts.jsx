import react, { useState, useEffect } from "react";
import { Provinces, Districts, Sectors, Cells, Villages} from "rwanda";
import 'tw-elements';
import { axiosInstance } from "../config"
import NavBar from './NavBar';
import Add from "@material-ui/icons/Add";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet,
    useNavigate
  } from "react-router-dom";
  import motor from "../assets/images/motor.png";

const Allproducts = () => {
    const navigate = useNavigate();
    const [allDistricts, setAllDistricts] = useState([])
    const [allSectors, setAllSectors] = useState([])
    const [allProducts, setAllProducts]= useState([])

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

const [names, SetNames] = useState(null);
const [email, SetEmail] = useState(null);
const [secretPin, SetPin] = useState(null);
const [district, SetDist] = useState(null);
const [sector, SetSector] = useState(null);
const [phone, SetPhone] = useState(null);
const [disabled, setDisabled]= useState(false);
const [currentCustomer, setCurrentCustomer] = useState({});

useEffect(()=>{
    getProducts();
},[])

const getProducts = async(e)=>{
   try{
        let res = await axiosInstance.get("/customers/allProducts");
        console.log(res.data)
        setAllProducts(res.data);
       setDisabled(false);
   }
   catch(error)
   {
       console.log(error)
   }
}

const approve = async()=>{
  alert("This feature is not working yet.");
  return ;
  try{
      setDisabled(true)
      let res = await axiosInstance.delete("/Products/"+currentCustomer?.id);
      document.getElementById("closeModalBtn2").click();
      getProducts();
      return ;
  }
  catch(error)
  {
    setDisabled(false)
      alert(error.message)
      console.log(error)
  }
}

const getTime = (sale)=>{
    let hour = new Date(sale?.date).getHours();
    let minutes = new Date(sale?.date).getMinutes();

    let time_index = new Date().toLocaleTimeString().lastIndexOf(":");
    let last_t = new Date(sale?.date)
      .toLocaleTimeString()
      .slice(time_index + 3, new Date().toLocaleTimeString().length);
    let months = new Date(sale?.date).getMonth();
    let date = new Date(sale?.date).getDate();
    let year = new Date(sale?.date).getFullYear();
  
    let todayDate = new Date().getDate();
    let todayMonth = new Date().getMonth();
    let todayYear = new Date().getFullYear();
  
    const month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
  
    let name = month[months];
    let fullDate = date + " " + name + " " + year;
  
    let fullTime = hour + ":" + minutes + "" + last_t;
    let sendTime;
  
    if (todayYear == year && todayMonth == months && todayDate == date) {
      sendTime = "Today " + fullTime;
    } else {
      sendTime = fullDate + " , " + fullTime;
    }

    return sendTime;
}

  return (
    <>
      <div className="Products-page bg-gray-50 dark:bg-gray-900">
        
        <div className="right-side-bar">

<NavBar/>
<br/>

<div className="px-6 mb-9 mt-5">
<h3 className="font-bold float-left">Products ({allProducts?.length})</h3>

<div className="float-right">
<button onClick={()=>window.location = "/products/add"} className="px-4 py-2 bg-purple-600 text-sm text-white rounded-md relative font-bold mb-3" style={{top: "-15px"}}> <Add/> <span style={{position: "relative",top: "1px"}}>Add Product</span></button>
</div>
</div>
    
<section className="container mx-auto font-mono px-2">
  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div className="w-full overflow-x-auto">

      <table className="mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
        <thead>
          <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">Remote Code</th>
            <th className="px-4 py-3">GateId</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
            {
                allProducts?.map((customer)=>(
                    <tr className="text-gray-700">
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                          <img className="object-cover w-full h-full rounded-full" src={motor} alt="" loading="lazy" />
                          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-black">{customer?.remoteCode}</p>
                          <p className="text-xs text-gray-600">Product</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">{customer?.gateId}</td>
                    <td className="px-4 py-3 text-ms border">
                    {
                        customer?.status ?
                        <span
                        className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600"
                      >
                        Sold
                      </span>
                        :
                        <span
                          className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                        >
                          In Stock
                        </span>

                    }
                    </td>
                    <td className="px-4 py-3 text-ms border">{new Date(customer?.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-xs border">
                      <span onClick={()=>setCurrentCustomer(customer)} data-bs-toggle="modal"  data-bs-target="#secretPinModal" className="px-2 cursor-pointer py-2 font-semibold leading-tight bg-red-500 text-white rounded-md hover:bg-red-700 hover:text-white">Delete</span>
                    </td>
                  </tr>
                ))
            }
        </tbody>
      </table>
    </div>
  </div>
</section>

</div>
              </div>

<div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
  id="secretPinModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div
      className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div
        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 className="text-xl font-medium leading-normal text-gray-800" id="secretPinModal">Delete Product ({currentCustomer?.gateId})</h5>
        <button type="button"
        id="closeModalBtn2"
          className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline text-lg"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body relative p-4">

          <p className="my-5 mt-2">Are you sure you want to delete this product?</p>
    
      </div>
      <div
        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <button type="submit" className="px-6
          py-4
          bg-red-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-red-700 hover:shadow-lg
          focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-red-800 active:shadow-lg
          transition
          duration-150
          ease-in-out" disabled={disabled} onClick={approve}>Delete</button>
      </div>
    </div>
  </div>
</div>


    </>
  );
};

export default Allproducts;
