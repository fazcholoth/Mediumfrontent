import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Shimmer from "@/Components/Shimmer";
import server from "@/Config/config";

function Loginform() {
  const router = useRouter();
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [img, setimage] = useState("");
  const [loading, setloading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [clicked, setclicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      validateForm();
    }
    console.log('mounted');
  }, [name, email, password, img,clicked]);
  // Validate form
  const validateForm = () => {
    let errors = {};

    if (!name) {
      errors.name = "Name is required.";
    }

    if (!img) {
      errors.img = "Please Add Photo.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    onSubmit()
  };

  const onSubmit = async (e) => {
    setclicked(true);
    // validateForm()
    // console.log(clicked);
    // console.log(isFormValid);
    
    if (isFormValid) {
      // e.preventDefault();

      console.log('enetered submission');

      setloading(true)

      const formData = new FormData();

      formData.append("file", img);

      console.log("uploading image");

      const imgresponse = await axios.post(`${server}/upload-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: false,
      });

      const image = imgresponse?.data?.file?.url;

      console.log("uploading datas");

      const response = await axios.post(`${server}/blog/loginuser`, {
        name: name,
        password: password,
        email: email,
        image: image,
        blocked: false,
      });

      localStorage.setItem("user", JSON.stringify(response.data));

      router.push("/");
    }
  };

  //   useEffect(() => {
  //     if (user) {
  //       navigate('/');
  //     }
  //   }, [user])

  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center mt-2">
      <div className="shadow-lg w-4/6 bg-slate-200">
        <div className="flex justify-center pt-3">
          <h1 className="text-2xl">Register Now</h1>
        </div>
        <div className="flex justify-center py-2">
          <div className="w-3/4 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Name
            </label>
            <input
              type="text"
              name="createrName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
        </div>

        <div className="flex justify-center py-2">
          <div className="w-3/4 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Email
            </label>
            <input
              type="email"
              name="createrName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        </div>

        <div className="flex justify-center py-2">
          <div className="w-3/4 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="createrName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
        </div>

        <div className="flex justify-center py-4">
          <div className="w-3/4 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Photo
            </label>
            <input
              type="file"
              name="createrName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Name"
              onChange={(e) => {
                setimage(e.target.files[0]);
              }}
              required
            />
            {errors.img && <p className="error">{errors.img}</p>}
          </div>
        </div>
        <div className="flex justify-center pb-2">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mx-auto"
            onClick={()=>{validateForm()}}
          >
            Register
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Loginform;
