import react,{useEffect,useState} from 'react'
import gate from '../assets/images/motor.png'
import NavBar from './NavBar';
import { Provinces, Districts, Sectors, Cells, Villages} from "rwanda";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import 'tw-elements';
import { axiosInstance } from '../config';

const MyGate = ()=>{

  const [idV, setIdV] = useState(false)
  const [passV, setPassV] = useState(false)
  const [id, setId] = useState(null);
  const [pin, setPin] = useState(null);
  const [error, setError] = useState(null);

   const getPin = ()=>{
      if(document.getElementById("pass").type == "text"){
        document.getElementById("pass").type ="password"
      setPassV(false)
      }else{
        document.getElementById("pass").type ="text"
      setPassV(true)
      }
   }

   const getId = ()=>{
    if(document.getElementById("id").type == "text"){
      document.getElementById("id").type ="password"
        setIdV(false)
    }else{
      document.getElementById("id").type ="text"
      setIdV(true)
    }
 }

    const [allDistricts, setAllDistricts] = useState([])
    const [allSectors, setAllSectors] = useState([])

useEffect(()=>{
    setAllDistricts(Districts());
},[])

const getSectors =()=>{
    let dist = document.getElementById("dist").value;
    Provinces().map((p)=>{
        Districts(p)?.map((d)=>{
            if(d == dist){
                setAllSectors(Sectors(p,dist));
                return 0;
            }
        })
    })
}

const [data, setData] = useState([]);

const getPassword = async(e)=>{
  e.preventDefault();

try{
  if(id && pin){
    setError(null);
    setData([]);
    let res = await axiosInstance.post("/customers/getPassword", 
    {gateIds: id, secretPin: pin});
if(res.data[0] == "Incorrect gateId or secretPin"){
setError(res.data[0]);
return ;
}
  setData(res.data);
  document.getElementById("openModal").click();
    return ;
   }
 
   alert("Complete all fields")
}
catch(error){
  console.log(error);
  setError(null);
  alert(error.message)
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
              <div className='desc-text'>
                <h3 className="font-bold text-center text-2xl mb-3">My Smart Gate Opener</h3>
                <p className='mb-7 text-center font-bold text-lg text-blue-700'>Contact Us: 0780682640</p>

                <p className="the-text text-center mb-5 fw-bold" style={{color: "darkcyan"}}>
                Want to obtain your smart gate opening password?</p>

                   <div className="px-10">
            
                   <form className="w-full" onSubmit={getPassword}>
  <div className="md:flex md:items-center mb-6">
    <div className="w-full">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Your Gate ID
      </label>
    </div>
    <div className="w-full">
      <input style={{height: "50px"}}
      onKeyUp={(val)=>setId(val.target.value)}
       required className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" placeholder='Gate ID' type="text"/>
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
        Gate Secret Pin
      </label>
    </div>
    <div className="md:w-2/3">
      <input style={{height: "50px"}} 
      onKeyUp={(val)=>setPin(val.target.value)}
      required className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="Secret Pin"/>
    </div>
  </div>

  {
                    error?
                    <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
  {/* <p class="font-bold">Login Error</p> */}
  <p>{error}</p>
</div>
                    :
                    <></>
                }

  <div className="md:flex md:items-center mt-10">
    <div className=""></div>
    <div className="md:w-2/3">
      <button className="shadow w-full bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-4 rounded" type="submit" 
      //  data-bs-toggle="modal" data-bs-target="#exampleModal"
       >
      Get Password
      </button>
    </div>
  </div>
</form>
<button className="hidden" id="openModal" data-bs-toggle="modal" data-bs-target="#exampleModal">open</button>
                   </div>

              </div>
             </div>
             </div>

<div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
  id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div
      className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div
        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">My Smart Get Opener</h5>
        <button type="button"
          className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body relative p-4">
      <div className="inp mb-3">
        <label htmlFor="" className="fw-bold">Gate Owner</label>
        <input type="text" value={data[1]} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" disabled />
        </div>

        <div className="inp mb-3">
        <label htmlFor="" className="fw-bold">Gate ID</label>
        <div className="flex bg-gray-200 border-2 border-gray-200 rounded w-full pr-3">
        <input type="password" id="id" value={id} className="appearance-none py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" disabled />
        <button onClick={getId} className="btn btn shadow-none ms-2 sh">
          {
            idV?
            <VisibilityIcon/>
            :
            <VisibilityOffIcon/>
          }
          </button>
        </div>
        </div>

        <div className="inp mb-3">
        <label htmlFor="" className="fw-bold">Gate Password</label>
        <div className="flex bg-gray-200 border-2 border-gray-200 rounded w-full pr-3">
        <input type="password" id="pass" value={data[0]} className="appearance-none py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" disabled />
        <button onClick={getPin} className="btn btn shadow-none ms-2 sh">
        {
            passV?
            <VisibilityIcon/>
            :
            <VisibilityOffIcon/>
          }
        </button>
        </div>
        </div>
      </div>
      <div
        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <button type="button" className="px-6
          py-2.5
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
          ease-in-out" data-bs-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default MyGate;