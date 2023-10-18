import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState ,useEffect } from 'react'
import { useRouter } from "next/router";


const CustomEditor = dynamic(()=>import('../../Components/Editer'),{ssr:false})

const Home  = () => {


  const router =useRouter()

  useEffect(() => {
  
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      router.push("/login");
    }
    
  }, [])


  const [content,setContent] = useState('')
  return (
    <div >
     <CustomEditor setContent={setContent} content={content} />
    </div>
  )
}

export default Home