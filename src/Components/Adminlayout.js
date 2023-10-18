import React ,{useEffect} from "react";
import Link from "next/link";
import { FiUsers } from "react-icons/fi";
import { FaBlogger } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import useAdminAuth from "./Customhook"
import { useState } from "react";

function Adminlayout({ children }) {

   const[adminnow,setAdminnow]=useState('')

  const Adminlogged = useAdminAuth();
   useEffect(() => {
    Adminlogged()
   }, [adminnow])

  

  const logout =()=>{
    localStorage.removeItem('admin')
    setAdminnow('loggeduot')
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const data = [
    {
      type: "users",
      logo: <FiUsers />,
      count: "20",
      link: "/allusers",
    },
    {
      type: "blogs",
      logo: <FaBlogger />,
      count: "20",
      link: "/blogs",
    },
    {
      type: "categories",
      logo: <BiCategoryAlt />,
      count: "20",
      link: "/categories",
    },
  ];

  return (
    <div className="grid grid-cols-11 h-screen w-screen overflow-x-hidden">
      <div className="col-span-2 sticky top-0 h-screen">
        <div className="flex flex-col py-2">
          <div className="bg-white px-5 py-2 cursor-pointer flex">
            <Link href="/admin">
              {" "}
              <div className="flex justify-center items-center space-x-2">
                <img
                  className="h-6 w-6 "
                  src="https://cdn.icon-icons.com/icons2/3922/PNG/512/medium_icon_250136.png"
                  alt=""
                />
                <p>Medium Blogs</p>
              </div>
            </Link>
          </div>
          <div className="bg-purple-800 h-screen flex flex-col   text-white">
            {data.map((item, index) => (
              <div key={index}>
                <Link href={`/admin/${item.type}`} >
                  <div className="flex p-4 space-x-2 hover:bg-purple-400 cursor-pointer ">
                    {" "}
                    <span className="flex items-center justify-center">
                      {item?.logo} &nbsp;{" "}
                    </span>{" "}
                    {item?.type}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-9  ">
        <div className="flex flex-col space-y-4  h-screen ">
          <div className="flex items-center justify-between p-4 shadow-xl">
            <div className="">
              <Link href="/admin">
                <div className="flex items-center justify-between space-x-2">
                  <AiOutlineHome color="#FFA500" /> <span>Home</span>
                </div>
              </Link>
            </div>
            <div className="bg-orange-500 px-4 py-1 text-white rounded-sm">
              
                <button onClick={logout}>Logout</button>
             
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default Adminlayout;
