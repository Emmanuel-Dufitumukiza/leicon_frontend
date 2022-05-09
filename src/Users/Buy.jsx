import react,{useEffect,useState} from 'react'
import gate from '../assets/images/motor.png'
import NavBar from './NavBar';
import { Provinces, Districts, Sectors, Cells, Villages} from "rwanda";
import { axiosInstance } from "../config"
import 'tw-elements';

const Buy = ()=>{

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

const [names, SetNames] = useState(null);
const [email, SetEmail] = useState(null);
const [secretPin, SetPin] = useState(null);
const [district, SetDist] = useState(null);
const [sector, SetSector] = useState(null);
const [phone, SetPhone] = useState(null);
const [disabled, setDisabled]= useState(false);

const registerCustomer = async(e)=>{
   try{
    e.preventDefault();

    if(names && email && district && sector && phone){
      setDisabled(true)
        let res = await axiosInstance.post("/customers/register", {
           username: names,
           email: email,
           secretPin: "",
           district: district,
           sector: sector,
           telephone: phone
         });
 
          setDisabled(false)
          if(res.status == 200){
            SetNames(null);
            SetEmail(null)
            SetPin(null)
            SetPhone(null);
            alert("Your response has been received");
            window.location.reload();
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

    return(
        <>
        
          <div className="home-cont w-100">
          <NavBar></NavBar>
             <div className="cont2 mx-auto p-5">
             {/* <div className="welcome-pic welPic">
                  <div className="welcome-picture ">
                  <img src={gate} alt="gate" />
                  </div>
              </div> */}
<br></br><br></br><br></br><br></br>
              <form method='POST' onSubmit={registerCustomer} className='desc-text'>
                <h3 className="font-bold text-center text-2xl mb-3">Buy Smart Gate Opener</h3>
                <p className='mb-7 text-center font-bold text-lg text-blue-700'>Contact Us: 0780682640</p>

                <p className="the-text text-center mb-5 fw-bold" style={{color: "darkcyan"}}>
                    Fill out the form bellow to buy smart gate opener </p>

                   <div className="px-10">
                 
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

          <div className="floating-input mb-7 relative">
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

<p className='text-center mt-8'>
By submitting you will get your smart gate opener installed to your gate in 3(three) days and focus technologies will protect your trust .
</p>

<p className=" text-center mb-2 sb-btn mt-8">
<button type="submit" className="w-full py-3 bg-purple-500 text-white rounded-md font-bold">Send</button>
</p>
                   </div>

              </form>
             </div>
             </div>
        </>
    )
}

export default Buy;