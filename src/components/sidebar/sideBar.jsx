import "./sideBar.css"
import React, { useState,useEffect } from "react";
import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School,
  } from "@material-ui/icons";
export default function SideBar({setOption,option}) {
  // const [option,setOption]=useState("dashboard")
  
    return (
        <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">

          <li 
          style={{backgroundColor:option=="dashboard" && "#f5f5f0"}} 
          onClick={()=>{
              setOption("dashboard")
              
            }} className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Dashboard</span>
            </li>
            <li style={{backgroundColor:option=="user" && "#f5f5f0"}}  onClick={()=>{
              setOption("user")
              
            }} className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">User Management</span>
            </li>
            <li style={{backgroundColor:option=="judge" && "#f5f5f0"}}  onClick={()=>{
              setOption("judge")
              
            }} className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Judges Management</span>
            </li>
            <li style={{backgroundColor:option=="post" && "#f5f5f0"}}  onClick={()=>{
              setOption("post")
              
            }} className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Post Management</span>
            </li>
          </ul>
          {/* <button className="sidebarButton">Show More</button> */}
          <hr className="sidebarHr" />
          {/* <ul className="sidebarFriendList">
            {Users.map((u) => (
              <CloseFriend key={u.id} user={u} />
            ))}
          </ul> */}
        </div>
      </div>
    )
}
