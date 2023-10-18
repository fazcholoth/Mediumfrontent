import React ,{useState,useEffect}from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import server from "@/Config/config";
import Shimmer from "@/Components/Shimm";





function Adminlogin() {

  
  
  
  const router = useRouter()
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const onSubmit =async (e) => {
    e.preventDefault();
    

    setloading(true)
    const adminData ={
        email:email,
        password : password
    }

    if (email !== "fazil@gmail.com" || password !=="fazil123") {
      setloading(false)
      toast.error('You Are not Authorised Admin')
      setemail("")
      setpassword("")
      return
    }
   

    const response = await axios.post(`${server}/blog/loginadmin`, {
      adminData
    });

    localStorage.setItem('admin', JSON.stringify(response))

    setTimeout(() => {
      router.push('/admin')
    }, 4000);

  };



//   useEffect(() => {
//     if (admin) {
//         navigate('/admin');
//     }
//   }, [admin])

if (loading) {
  return <Shimmer/>
}
  

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="shadow-lg w-4/6 bg-slate-200">
        <div className="flex justify-center pt-3"><h1 className="text-2xl">Login Now</h1></div>
        <div className="flex justify-center py-2">
        <div className="w-3/4 ">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Email
          </label>
          <input
            type="text"
            name="createrName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            required
          />
        </div>
        </div>

        <div className="flex justify-center py-2">
        <div className="w-3/4 ">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Pass Word
          </label>
          <input
            type="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            required
          />
        </div>
        </div>

        
        <div className="flex justify-center pb-2">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mx-auto"
          onClick={onSubmit}
        >
          Login
        </button>
      </div>
      </div>
      <div></div>
    </div>
  );
}

export default Adminlogin;
