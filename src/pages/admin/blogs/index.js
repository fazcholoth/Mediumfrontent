import React ,{useState,useEffect}from "react";
import Adminlayout from "@/Components/Adminlayout";
import { useRouter } from 'next/router'
import axios from "axios";
import useAdminAuth from "@/Components/Customhook";
import server from "@/Config/config";



function index() {


  const router =  useRouter()
  const [allblogs, setallblogs] = useState([]);
  const [deletedpost, setdeletedpost] = useState([]);

  useEffect(() => {
    const fetchallblogs = async () => {
      const response = await axios.get(`${server}/blog`);

      const blogs = response.data;
      setallblogs(blogs);
    };

    fetchallblogs();
  }, [deletedpost]);



  const handledeletepost = async(id)=>{
    const deletedpost = await axios.delete(`${server}/blog/deletepost/${id}`);
    setdeletedpost(deletedpost)
  }


  


  const Adminlogged = useAdminAuth();
   useEffect(() => {
    Adminlogged()
   }, [])


  return (
    <div className="grid grid-cols-3 gap-4  bg-white px-2">
      {allblogs?.map((blog, index) => (
        <div
          key={index}
          className="p-4 shadow-2xl mx-1 my-1 space-y-4 hover:-translate-y-3 transition-all duration-300 ease-in-out cursor-pointer"
        >
          <div className="flex justify-between">
            <div>
              <img className="h-5 w-5 rounded-full" src="http://res.cloudinary.com/defmnpqkz/image/upload/v1697438328/i0wzx3hskjmxivp9k6y0.jpg" alt="" />
            </div>
            <div>{blog.creator}</div>
          </div>
          <div>
            <p className="line-clamp-3 text-sm text-left">{blog?.heading}</p>

           

            <p className="line-clamp-3 text-xs text-left font-thin">
              { blog?.content?.blocks?.find(block => block?.type === "paragraph")?.data?.text}
            </p>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-700 rounded-lg px-2 hover:bg-red-600">
              <button
                onClick={() => {
                  handledeletepost(blog._id);
                }}
                className="text-white text-xs my-0"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default index;

index.getLayout = function getLayout(page) {
  return <Adminlayout>{page}</Adminlayout>;
};
