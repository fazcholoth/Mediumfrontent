import React ,{useEffect,useState}from "react";
import { FiUsers } from "react-icons/fi";
import { FaBlogger } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import dayjs from "dayjs";
import Adminlayout from "@/Components/Adminlayout";
import axios from "axios";
import useAdminAuth from "@/Components/Customhook";
import server from "@/Config/config";


function index() {

  const [topics, settopics] = useState([]);
  const [updatedtopics, setupdatedtopics] = useState([]);
  const [newtopics, setnewtopics] = useState([]);
  

  useEffect(() => {
    const fetchtopics = async () => {
      const response = await axios.get(`${server}/blog/alltopics`);
  
      const topics = response.data;
      settopics(topics);
    };
  
    fetchtopics();
  }, [updatedtopics]);



  const handlelist = async(catid)=>{
    const updatedcategory = await axios.put(
      `${server}/blog/listtopic/${catid}`,
    );
     setupdatedtopics(updatedcategory)
  }

  const handleunlist = async(catid)=>{
    const updatedcategory = await axios.put(
      `${server}/blog/unlisttopic/${catid}`,
    );
    setupdatedtopics(updatedcategory)
  }

  const handleaddtopic = async()=>{
    const updatedcategory = await axios.post(
      `${server}/blog/addtopic`,{name:newtopics,listed:true}
    );
    setupdatedtopics(updatedcategory)
    setnewtopics("")
  }




  const data = [
    {
      type: "Users",
      logo: <FiUsers />,
      count: "20",
      link: "/users",
    },
    {
      type: "Blogs",
      logo: <FaBlogger />,
      count: "20",
      link: "/blogs",
    },
    {
      type: "Category",
      logo: <BiCategoryAlt />,
      count: "20",
      link: "/categories",
    },
  ];


  


  const Adminlogged = useAdminAuth();
   useEffect(() => {
    Adminlogged()
   }, [])



  return (
    <>
      <div className="grid grid-cols-3 bg-white px-4 gap-4">
        {topics.map((category, index) => (
          <div key={index} className="shadow-2xl py-2">
            <div className=" flex items-center justify-center py-1">
              <div className="font-extrabold">{category.name}</div>
            </div>
            <div className="flex justify-center items-center font-thin text-xs text-gray-500 py-1">
              Created On {dayjs(category?.createdAt).format("DD MM YYYY")}
            </div>
            <div className="flex items-center justify-center">
              <div className=" rounded-lg px-3 text-white text-xs">
                {category?.listed ? (
                  <button
                    className="bg-red-700 px-2 rounded-lg"
                    onClick={() => {
                      handleunlist(category._id);
                    }}
                  >
                    Unlist
                  </button>
                ) : (
                  <button className="bg-blue-700 px-2 rounded-lg"
                    onClick={() => {
                      handlelist(category._id);
                    }}
                  >
                    List
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <div className="col-span-1 shadow-xl px-2 py-3 border-blue-200 border-2 flex-col justify-evenly">
          <div className="px-2 py-2 ">
            <label htmlFor="category">Category Name</label>
            <input
              className="w-full shadow-lg rounded-2xl outline-slate-400 px-2"
              onChange={(e) => {setnewtopics(e.target.value)}}
              type="text"
              value={newtopics}
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-blue-700 text-white rounded-2xl px-2">
              <button onClick={handleaddtopic}>Add Category</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;

index.getLayout = function getLayout(page) {
  return <Adminlayout>{page}</Adminlayout>;
};
