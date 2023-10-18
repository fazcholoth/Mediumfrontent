import Userlayout from "@/Components/Userlayout";
import dayjs from "dayjs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineBook } from "react-icons/ai";
import { AiOutlinePlayCircle } from "react-icons/ai";
import server from "@/Config/config";

export default function Home() {
  const allblogs = [
    {
      heading: "Good News",
      content:
        "Teachers are good and very usefull when it comes to the subjects that they have to get the Chance to Update",
      creator: "Rameez",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU",
      creatorimg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU",
    },
    {
      heading: "Good News",
      content:
        "Teachers are good and very usefull when it comes to the subjects that they have to get the Chance to Update",
      creator: "Rameez",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU",
      creatorimg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU",
    },
    {
      heading: "Good News",
      content:
        "Teachers are good and very usefull when it comes to the subjects that they have to get the Chance to Update",
      creator: "Rameez",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU",
      creatorimg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU",
    },
    {
      heading: "Good News",
      content:
        "Teachers are good and very usefull when it comes to the subjects that they have to get the Chance to Update",
      creator: "Rameez",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU",
      creatorimg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU",
    },
  ];

  return (
    <>
      {allblogs.map((blog, index) => (
        <div className="w-full h-full  mt-7 px-20">
          <div className="flex gap-1 mb-3 items-center font-sans">
            <div>
              <img
                className="h-5 w-5 rounded-full pr-1"
                src={blog?.creatorimg}
                alt=""
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
                {blog?.content}
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
