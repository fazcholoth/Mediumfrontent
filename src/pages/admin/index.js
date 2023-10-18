import React ,{useEffect}from "react";
import Adminlayout from "@/Components/Adminlayout";
import Admindashrow from "@/Components/Admindashrow";
import useAdminauth from "../../Components/Customhook";
import { useSelector, useDispatch } from 'react-redux'
import server from "@/Config/config";

function index() {

  


  const Adminlogged = useAdminauth();
   useEffect(() => {
    Adminlogged()
   }, [])

  return <Admindashrow />;
  
}

export default index;

index.getLayout = function getLayout(page) {
  return <Adminlayout>{page}</Adminlayout>;
};
