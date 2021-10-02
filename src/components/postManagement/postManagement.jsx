import React,{ useState,useEffect,} from 'react'
import './postManagement.css'
import { format } from "timeago.js";
import ReactPlayer from "react-player";
import axios from "axios";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'postedBy', label: 'Posted User', minWidth: 170 ,align: 'center'},
    { id: 'name', label: 'Song Name', minWidth: 170,align: 'center' },
    { id: 'likes', label: 'Likes', minWidth: 100,align: 'center'},
    {
      id: 'views',
      label: 'Views',
      minWidth: 100,
      align: 'center',
   
    },
    {
        id: 'comments',
      label: 'Comments',
      minWidth: 100,
      align: 'center',
   
    },

    {
      id: 'url',
      label: 'Delete',
      minWidth: 140,
      align: 'center',
    
    },
  ];
  
 
  // let rows=[]  ;
  
  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 'calc(100vh - 50px)',
    },
  });

export default function UserManagement() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [users,setUsers]=useState([])
    const [rows,setRows]=useState([])
    // const [popup,setPopup]=useState(false)
    const [post,setPost]=useState(false)
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const renderPosts=()=>{
        axios.get("http://localhost:5000/api/v1/admin/getAllPosts").then((result)=>{
            setRows(result.data)
          })
    }
  const deletePost=(id,url)=>{
    axios.put("http://localhost:5000/api/v1/admin/deletePost/"+id,{url}).then((result)=>{
       renderPosts()
    })
  }
  const showPost=(id)=>{
    // alert("hey")
    axios.get("http://localhost:5000/api/v1/admin/getPost/"+id).then((result)=>{
        setPost(result.data)
      })
  }
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    useEffect(() => {
      axios.get("http://localhost:5000/api/v1/admin/getAllPosts").then((result)=>{
        setRows(result.data)
      })
       
    },[])
    return (
        <div className="postManagement">
            <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow className="tableRow" onClick={()=>showPost(row._id)} hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id]; 
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value):column.id=="likes"||column.id=="comments"?value.length : column.label=="Delete"?<DeleteSharpIcon onClick={()=>{row.url && deletePost(row._id,row.url)}} style={{cursor:"pointer"}}  color={row.url?"secondary" : "disabled"}/>: column.id=="postedBy"?row.postedUser.UserName:value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    {post && <div className="channel-popup-main-div" id="dropdown">
          <div className="channel-popup-inner-div">
           
                <div  className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postProfileImg"
                src=
                {post.user.propic != undefined ? post.user.propic: "/noAvatar.png"}
              />
              
                <span  style={{ color: "black"}}className="postUsername">
                  {post.user.UserName}
                  </span>
              
              <span className="postDate">
                {format(post.postedAt)}
                </span>
            </div>
            <div className="postTopRight">
            <button
              onClick={() => {
                
                setPost(false);
              }}
              className="close-btn"
            >
              x
            </button>
            </div>
          </div>
          <hr style={{marginBottom:"10px",marginTop:"10px"}}/>
          <div className="postCenter">
            <span className="postDescription">
              {post.description}
              </span><br/>
            <span className="postText"><b>Song Name:  </b>
            {post.name}
            </span><br/>
            <span className="postText"><b>Film/Source:  </b>
            {post.sources}
            </span><br/>
            <span className="postText"><b>Category:   </b>
            {post.category}
            </span><br/><hr style={{marginBottom:"10px"}}/>
            <ReactPlayer
              controls
              width="600px"
              height="300px"
              url={post.url} />
        
              
           
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <span className="postLikeCounter">
                {post.likes.length} 
                   people liked it</span>
            </div>
            <div className="postBottomRight">
            <span className="postCommentText"> 
              {post.comments.length} comments
              </span>
              <span className="postCommentText"> 
               {post.views} views
              </span>
            </div>
            
           
          </div>
     
        </div>
      </div>

              
              
          </div>
        </div>}
        </div>
    )
}
