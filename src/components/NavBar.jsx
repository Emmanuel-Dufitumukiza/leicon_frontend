import react from 'react'
import 'flowbite';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";

const NavBar = ()=>{
  const navigate = useNavigate();

    return(
        <>
        
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800 flex">
        <div
            className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300"
          >

            <div className="flex justify-center flex-1 lg:mr-32">
              <div
                className="relative w-full max-w-xl mr-6 focus-within:text-purple-500"
              >
                <div className="absolute inset-y-0 flex items-center pl-2">
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  className="w-full pl-8 py-2.5 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-gray-200 form-input"
                  type="text"
                  placeholder="Search for customers..."
                  aria-label="Search"
                />
              </div>
            </div>
            </div>

            {/* <button
                  className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none mr-6"
                  aria-label="Account"
                  aria-haspopup="true"
                  data-dropdown-toggle="dropdown"
                >
              
                </button> */}

                <button
              class="p-1 mr-5 -ml-1 rounded-md focus:outline-none focus:shadow-outline-purple"
              aria-label="Menu"
              data-dropdown-toggle="dropdownInformation"
            >
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>

            <div id="dropdownInformation" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
      <div><b>Mugisha Joel</b></div>
      <div class="font-medium truncate italic">Leicon Admin</div>
    </div>
    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
      <li>
        <a class="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="/customers" class="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">Customers</a>
      </li>
      <li>
        <a href="/customers/new" class="block px-4 cursor-pointer py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add Customer</a>
      </li>
    </ul>
    <div class="py-1">
      <a href="/login" class="block px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
    </div>
</div>
            
          </header>
        </>
    )
}

export default NavBar;