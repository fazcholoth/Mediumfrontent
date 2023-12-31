import Userlayout from "@/Components/Userlayout";
import dayjs from "dayjs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineBook } from "react-icons/ai";
import { AiOutlinePlayCircle } from "react-icons/ai";
import React, {useState ,useEffect} from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import server from "@/Config/config";

export default function Home() {
  const router = useRouter()
  const [allblogs, setallblogs] = useState([]);

  useEffect(() => {
    const fetchallblogs = async () => {
      const response = await axios.get(`${server}/blog`);

      const blogs = response.data;
      setallblogs(blogs);
    };

    fetchallblogs();
  }, []);



  const handleClick =(id)=>{
    router.push(`/detailedblog/${id}`)
  }
  
  

  return (
    <>
      {allblogs.map((blog, index) => (
        <div className="w-full h-full  mt-7 px-20" key={index} onClick={()=>{handleClick(blog._id)}}>
          <div className="flex gap-1 mb-3 items-center font-sans">
            <div>
              <img
                className="h-5 w-5 rounded-full pr-1"
                src="http://res.cloudinary.com/defmnpqkz/image/upload/v1697438328/i0wzx3hskjmxivp9k6y0.jpg"
                alt="img"
              />
            </div>
            <p className="font-thin text-xs">{blog?.creator} .</p>
            <p className="font-thin text-xs">
              {dayjs(blog?.createdAt).format("MMM DD")}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center mb-5 gap-5 sm:flex-row">
            <div className="sm:w-10/12 width-full ">
              <h3 className="text-lg font-bold pb-3 ">{blog?.heading}</h3>
              <p className="text-xs break-all overflow-y-hidden line-clamp-3 from-gray-400 font-serif">
                {blog?.content?.blocks?.find(block => block?.type === "paragraph")?.data?.text}
              </p>
            </div>
            <div>
              <img className="w-24 h-24" src={blog?.image} alt="" />
            </div>
          </div>
          <div className="flex justify-between pr-24">
            <div className="flex justify-start gap-3 font-thin text-xs text-gray-500">
              <p className="bg-slate-100 rounded-lg px-1 py-0 text-xs ">
                {blog?.topic}
              </p>{" "}
              <p>{blog?.readTime} min read</p>{" "}
              <p className="pr-2">Based On Your reading History</p>
            </div>
            <div className="flex justify-start gap-2 text-gray-500 flex-wrap">
              <div>
                <AiOutlinePlayCircle />
              </div>
              <div>
                <AiOutlineBook />
              </div>
              <div>
                <BiDotsHorizontalRounded />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Userlayout>{page}</Userlayout>;
};
