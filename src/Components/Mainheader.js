import { FiSearch } from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import { PiNotePencilDuotone } from "react-icons/pi";
import Link from "next/link";
import {useState,useEffect} from "react";
import { useRouter } from "next/router";


function Mainheader() {
  
  const router =useRouter()

  const [isOpen, setIsOpen] = useState(false);
  const [User, setUser] = useState('');

  useEffect(() => {
  
    const user = JSON.parse(localStorage.getItem('user'))
    setUser(user)
    
    
  }, [])


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  

  

  

  const userlogout =()=>{
    
    localStorage.removeItem('user')
   
  }




  return (
    <div className="flex w-full justify-between h-11 px-3 items-center">
      <div className="flex justify-center gap-2 items-center">
        <img
          className="h-12 w-12 "
          src="https://cdn.icon-icons.com/icons2/3922/PNG/512/medium_icon_250136.png"
          alt=""
        />
        <div className="search relative">
          <input
            type="text"
            className="search pl-8 pr-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring w-58 h-6"
            placeholder="Search Medium..."
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="h-4 flex items-center justify-around gap-3 relative">
        <div className="flex items-center justify-center gap-1">
          <Link href='/addblog' >
          <div>
            <PiNotePencilDuotone className="text-gray-400" />
          </div>
          </Link>
          
          <div>
            <p className="text-neutral-400">Write</p>
          </div>
        </div>
        <div>
          {" "}
          <BsBell className="text-gray-400" />
        </div>
        <div>
          <img className="h-6 w-6 rounded-full" onClick={toggleDropdown} src={User?.image} alt="" />
        </div>
        {isOpen&&User&&(<div  onClick={userlogout}  className="absolute right-2 top-5 bg-blue-500 px-2 ">Logout</div> )}
          {isOpen&&!User&&(<Link href='/login' ><div className="absolute right-2 top-5 bg-blue-500 px-2 ">Login</div> </Link>)}
      </div>
    </div>
  );
}

export default Mainheader;
