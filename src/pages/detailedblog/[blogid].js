import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineStar } from "react-icons/ai";
import { BsHandThumbsUp} from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from 'next/router'
import dayjs from 'dayjs';
import server from '@/Config/config';

function Detailedpost() {


  const router = useRouter()
  const [blog, setBlog] = useState(null);
  const blogId = router.query.blogid



  useEffect(() => {
    

    const fetchBlog = async () => {
      try {
        const blogResponse = await axios.get(`${server}/blog/${blogId}`);
        const fetchedBlog = blogResponse.data;
        setBlog(fetchedBlog);
        console.log(fetchedBlog);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBlog();
  }, [blogId]);

  return (
    <>
    {/* <Mainheader/> */}
    <div className="pt-16">
      <div  className="w-full flex gap-2 items-center pl-64"><div className="text-yellow-400"><AiOutlineStar/></div><div>Member Only</div></div>
      <div className="w-full flex justify-center"><h1 className="w-1/2 text-3xl font-extrabold pt-3" >{blog?.heading}</h1></div>
      <div className="w-full flex justify-center"><h1 className="w-1/2 text-xl pb-3  text-gray-500" >Story Of The Success And Revenge</h1></div>
      <div className="w-full flex justify-center"><div className="w-1/2  flex  pb-3 gap-2 text-gray-400 items-center text-xs" ><div><img className='w-6 h-6 rounded-full' src="http://res.cloudinary.com/defmnpqkz/image/upload/v1697438328/i0wzx3hskjmxivp9k6y0.jpg" alt="" /></div> <div><div className="flex gap-4"> <div>{blog?.creator}</div> <div className="text-blue-500">Follow</div></div>
      <div className='flex items-center gap-3'><div>Assistant Professor</div> <div>{blog?.readTime} minutes . {dayjs(blog?.createdAt).format('MMM DD')}</div></div></div></div></div>
      <div className="w-full flex justify-center pb-6"><div className="w-1/2 py-3 flex justify-between" > <div className="flex items-center text-gray-500 gap-2"><BsHandThumbsUp/>2<BiMessageRounded/>28</div><div className="flex items-center text-gray-500 gap-2"><BsBookmark/><BiUpload/><BsThreeDots/><AiOutlinePlayCircle/></div></div></div>
      <div className="w-full flex justify-center"><img className="w-1/2 py-3"  src={blog?.image} /></div>
      
      {/* <div className="w-full flex justify-center"><h3 className="text-lg w-1/2 py-3">{blog?.creator}</h3></div> */}

      <div className="w-full py-7">
        {blog?.content?.blocks?.map((block, index) => {
          switch (block.type) {
            case 'header':
              return <div key={index} className="w-full flex justify-center"><h3 className="text-xl w-1/2 pb-2" key={index}>{block.data.text}</h3></div>;
            case 'paragraph':
              return <div  key={index} className="w-full flex justify-center"><p className="text-sm w-1/2 pb-3" key={index}>{block.data.text}</p></div>;
              case 'image':
              return <div key={index}  className="w-full flex justify-center"><img className="w-1/2 py-3"  src={block.data.file.url} key={index}/></div>;
            default:
              return null;
          }
        })}
      </div>
    </div>
    </>
  )
}

export default Detailedpost