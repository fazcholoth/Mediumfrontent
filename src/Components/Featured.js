import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'

function FeaturedPost({ blog }) {

  const router = useRouter()
  
  const handleClick =(id)=>{
    router.push(`/detailedblog/${id}`)
  }

  return (
    <div className="w-full h-full mt-2 px-4 shadow-md" onClick={()=>{handleClick(blog._id)}}>
      <div className="flex gap-2 mb-1">
        <div>
          <img className="h-3 w-3 rounded-full" src="http://res.cloudinary.com/defmnpqkz/image/upload/v1697438328/i0wzx3hskjmxivp9k6y0.jpg" alt="" />
        </div>
        <p className="font-thin text-[13px]">{blog?.creator}</p>
        {/* <p className="font-thin text-[13px]">{blog?.createdAt}</p> */}
      </div>
      <div className="flex justify-center px-0">
        <div className="w-11/12">
          <h3 className="pb-1 font-bold text-xs">{blog?.heading}</h3>
          {/* <p className="text-[12px] break-all overflow-y-hidden line-clamp-1">{blog?.content?.blocks?.find(block => block?.type === "paragraph")?.data?.text}</p> */}
        </div>
      </div>
    </div>
  )
}

export default FeaturedPost;
