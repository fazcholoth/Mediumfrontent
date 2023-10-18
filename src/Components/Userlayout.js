import React from "react";
import FeaturedPost from "./Featured";
import Recommented from "./Recommented";
import Mainheader from "./Mainheader";
import Connect from "./Connect";
import CatHeader from "./Categoryhead";
import Follow from "./Follow";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineBook } from "react-icons/ai";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import {useState,useEffect} from "react";
import axios from "axios";
import server from "@/Config/config";

function Userlayout({ children }) {


  const [featuredblogs, setfeaturedblogs] = useState([]);

  useEffect(() => {
    const fetchfeaturedblogs = async () => {
      const response = await axios.get(`${server}/blog/featured`);

      const blogs = response.data;
      setfeaturedblogs(blogs);
    };

    fetchfeaturedblogs();
  }, []);


  const [writers, setwriters] = useState([]);

  useEffect(() => {
    const fetchwriters = async () => {
      const response = await axios.get(`${server}/blog/topwriters`);

      const writers = response.data;
      setwriters(writers);
    };

    fetchwriters();
  }, []);



  const [topics, settopics] = useState([]);


  useEffect(() => {
    const fetchrecommentedTopics = async () => {
      const response = await axios.get(`${server}/blog/recommented`);

      const topics = response.data;
      settopics(topics);
    };

    fetchrecommentedTopics();
  }, []);


  const categories = [
    {
      name: "technology",
    },
    {
      name: "technology",
    },
    {
      name: "technology",
    },
    {
      name: "technology",
    },
  ];

  

 

  return (
    <>
      <Mainheader />

      <div className="w-full h-full relative top-7 flex ">
        <div className="h-full mx-1 sm:w-8/12 w-full">
          <div className="sticky w-full bottom-0 h-7 flex  gap-4 flex-wrap bg-slate-50 pl-20 ">
            <GrAdd />
            {categories?.map((category, index) => (
              <CatHeader category={category} key={index} />
            ))}
          </div>

          {children}
        </div>

        <div className="h-full mx-1 sm:w-3/12 sticky top-0 hidden sm:block">
          <div className="font-serif text-sm font-semibold">Staff Picks</div>
          {featuredblogs?.map((blog, index) => (
            <FeaturedPost blog={blog} key={index} />
          ))}
          <Connect />

          <div className="mt-6">Recommented Topics</div>

          {topics?.map((topic, index) => (
            <Recommented topic={topic} key={index} />
          ))}

          {writers?.map((writer, index) => (
            <Follow writer={writer} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Userlayout;
