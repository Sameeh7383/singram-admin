import React,{ useState,useEffect } from "react";
import SideBar from "../../components/sidebar/sideBar";
import Navbar from "../../components/navbar/navbar";
import Dashboard from "../../components/dashboard/dashboard.jsx";
import JudgesManagement from "../../components/judgesManagement/judgesManagement.jsx";
import PostManagement from "../../components/postManagement/postManagement.jsx";
import UserManagement from "../../components/userManagement/userManagement.jsx";
import "./home.css";
export default function Home() {
  const [option,setOption]=useState("dashboard")
  return (
<>
         <Navbar />
      <div className="homePage">
        

        <SideBar setOption={setOption} option={option}/>
        {option=="dashboard" ?(<Dashboard />):option=="user"?(<UserManagement/>):option=="post"?(<PostManagement />):option=="judge" &&(<JudgesManagement/>)}

       
      </div>
</>
  );
}