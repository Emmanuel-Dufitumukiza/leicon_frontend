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

const Tables = () => {
    const navigate = useNavigate();
    const [allDistricts, setAllDistricts] = useState([])
    const [allSectors, setAllSectors] = useState([])
    const [allCustomers, setAllCustomers]= useState([])
    const [allProducts, setAllProducts]= useState([])
    const [ids, SetId]= useState(null)

useEffect(()=>{
    setAllDistricts(Districts());
    getProductsId();
},[])

const getProductsId = async()=>{
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
    getCustomers();
},[])

const getCustomers = async(e)=>{
   try{
        let res = await axiosInstance.get("/customers");
        console.log(res.data)
        setAllCustomers(res.data);
       setDisabled(false);
   }
   catch(error)
   {
       console.log(error)
   }
}

const approve = async()=>{
  try{
    if(secretPin && ids){
      alert(ids)
      setDisabled(true)
      let res = await axiosInstance.patch("/customers/"+currentCustomer?.id, {secretPin: secretPin,gateIds: ids});
      document.getElementById("closeModalBtn2").click();
      getCustomers();
      return ;
    }else{
      alert("Please enter your secret pin")
      return ;
    }
  }
  catch(error)
  {
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

const [code, setCode] = useState(null);

useEffect(async()=>{
  await getRemoteCode(currentCustomer?.gateIds);
},[currentCustomer])

const getRemoteCode = async(gateIds)=>{
  setCode(null);
 let res = await axiosInstance.post("/customers/getRemoteCode", {
    gateIds: gateIds
  });

  setCode(res.data[0]);
  return res.data[0];
}

  return (
    <>
      <div className="customers-page bg-gray-50 dark:bg-gray-900">
        
        <div className="right-side-bar">

<NavBar/>
<br/>

<div className="px-6 mb-9 mt-5">
<h3 className="font-bold float-left">Customers ({allCustomers?.length})</h3>

<div className="float-right">
<button onClick={()=>window.location = "/customers/new"} className="px-4 py-2 bg-purple-600 text-sm text-white rounded-md relative font-bold mb-3" style={{top: "-15px"}}> <Add/> <span style={{position: "relative",top: "1px"}}>Add Customer</span></button>
</div>
</div>
    
<section className="container mx-auto font-mono px-2">
  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div className="w-full overflow-x-auto">

      <table className="mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
        <thead>
          <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">Names</th>
            <th className="px-4 py-3">Phone Number</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
            {
                allCustomers?.map((customer)=>(
                    <tr className="text-gray-700">
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                          <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-black">{customer?.username}</p>
                          <p className="text-xs text-gray-600">Customer</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">{customer?.telephone}</td>
                    <td className="px-4 py-3 text-ms border">
                    {
                        !customer?.gateIds ?
                        <span
                        className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600"
                      >
                        Pending
                      </span>
                        :
                        <span
                          className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                        >
                          Approved
                        </span>

                    }
                    </td>
                    <td className="px-4 py-3 text-ms border">{new Date(customer?.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-xs border">
                      <span onClick={()=>setCurrentCustomer(customer)} data-bs-toggle="modal" data-bs-target="#exampleModal" className="px-2 cursor-pointer py-2 font-semibold leading-tight text-green-700 bg-green-200 rounded-md hover:bg-green-400 hover:text-white">View More </span>
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
  id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
    <div
      className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div
        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">{currentCustomer?.username}</h5>
        <button type="button"
        id="closeModalBtn"
          className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline text-lg"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body relative p-4">

          <div className="mb-5 mt-1">
              <p>Registered on <span className="text-green-600">{getTime(currentCustomer)}</span></p>
          </div>

      <div className="floating-input mb-5 relative">
            <input
              type="text"
              id="password"
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              placeholder="Customer Name"
              autocomplete="off"
              required
              disabled={true}
              value={currentCustomer?.username}
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
              type="email"
              id="password"
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              placeholder=" Customer Email"
              autocomplete="off"
              required
              disabled={true}
              value={currentCustomer?.email}
            />
            <label
              for="password"
              className="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
            >
              Customer Email
            </label>
          </div>

          <div className="floating-input mb-5 relative">
            <input
              type="text"
              id="password"
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              placeholder="Telephone"
              autocomplete="off"
              required
              disabled={true}
              value={currentCustomer?.telephone}
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
              type="text"
              id="password"
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              placeholder="District"
              autocomplete="off"
              required
              disabled={true}
              value={currentCustomer?.district}
            />
            <label
              for="password"
              className="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
            >
              District
            </label>
          </div>


          <div className="floating-input mb-5 relative">
            <input
              type="text"
              id="password"
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              placeholder="Sector"
              autocomplete="off"
              required
              disabled={true}
              value={currentCustomer?.sector}
            />
            <label
              for="password"
              className="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
            >
              Sector
            </label>
          </div>

          {
           currentCustomer.gateIds ?
           <>
          <div className="floating-input mb-5 relative">
            <input
              type="text"
              id="password"
              className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
              placeholder="Remote Code"
              autocomplete="off"
              required
              disabled={true}
              value={code}
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
  type="text"
  id="password"
  className="border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-14"
  placeholder="GateID"
  autocomplete="off"
  required
  disabled={true}
  value={currentCustomer.gateIds}
/>
<label
  for="password"
  className="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
>
  GateID
</label>
</div>
</>
          :
          <></>
}
       
      </div>
      <div
        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        
       {
           !currentCustomer.gateIds ?
           <button type="submit" className="px-6
           py-3
           bg-green-600
           text-white
           font-medium
           text-xs
           leading-tight
           uppercase
           rounded
           shadow-md
           hover:bg-green-700 hover:shadow-lg
           focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
           active:bg-green-800 active:shadow-lg
           transition
           duration-150
           mr-5
           ease-in-out" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#secretPinModal">Approve</button>
           :
           <></>
       }

        <button type="submit" className="px-6
          py-3
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
          ease-in-out" data-bs-dismiss="modal" aria-label="Close">Close</button>
      </div>
    </div>
  </div>
</div>

<div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
  id="secretPinModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div
      className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div
        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 className="text-xl font-medium leading-normal text-gray-800" id="secretPinModal">Approve The Customer ({currentCustomer?.username})</h5>
        <button type="button"
        id="closeModalBtn2"
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
          ease-in-out" disabled={disabled} onClick={approve}>Approve</button>
      </div>
    </div>
  </div>
</div>


    </>
  );
};

export default Tables;
