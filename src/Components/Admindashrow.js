import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { FaBlogger } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import server from "@/Config/config";

function Admindashrow() {

  const [counts,setcounts] = useState()


  const data = [
    {
      type: "users",
      logo: <FiUsers />,
      count: counts?.usercount,
      link: "/users",
    },
    {
      type: "blogs",
      logo: <FaBlogger />,
      count: counts?.blogcount,
      link: "/blogs",
    },
    {
      type: "categories",
      logo: <BiCategoryAlt />,
      count: counts?.topiccout,
      link: "/categories",
    },
  ];


  useEffect(() => {
    const fetchcounts = async () => {
      const response = await axios.get(`${server}/blog/counts`);

      const counts = response.data;
      setcounts(counts);
    };

    fetchcounts();
  }, []);




  return (
    <div className=" grid grid-cols-3 gap-x-4 bg-white px-4">
      {data.map((item, index) => (
        <div className="" key={index}>
          <Link href={`/admin/${item.type}`}>
            <div className="flex justify-between items-center p-4  text-blue-800 shadow-2xl bg-gray-200">
              <div className="flex items-center justify-center space-x-2 text-[16px]">
                <span style={{ fontSize: "20px" }}>{item.logo}</span>{" "}
                <span>{item.type}</span>
              </div>
              <div>{item.count}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Admindashrow;
