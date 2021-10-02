import "./navbar.css";
import { Link, useHistory } from "react-router-dom";
import React,{useState} from "react";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";

export default function Navbar() {

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Logo</span>
      </div>
      <div className="topbarCenter">
        {/* <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div> */}
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {/* <Link style={{ textDecoration: "none" }} to="/">
          <span style={{color: "white"}} className="topbarLink">
            Homepage
          </span>
          </Link>
          <Link style={{ textDecoration: "none" }} to={`/profile/${user.userData._id}`}>
          <span style={{color: "white"}}  className="topbarLink">
            Profile
          </span>
          </Link>
          <span onClick={logout} className="topbarLink">Timeline</span> */}
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        
{/* <Link style={{ textDecoration: "none" }} to={`/profile/${user.userData._id}`}> */}
        <img
         
          src="/assets/person/noAvatar.png"
          alt=""
          className="topbarImg"
        />
        {/* </Link> */}
      
      </div>
    </div>
  );
}
