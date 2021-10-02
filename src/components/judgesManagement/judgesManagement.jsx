import React, { useState, useEffect } from "react";
import './judgesManagement.css'
import axios from "axios";
import { Button } from '@material-ui/core';
import BlockIcon from "@material-ui/icons/Block";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";


const columns = [
  { id: "propic", label: "Profile Picture", minWidth: 100,align: "center" },
  { id: "UserName", label: "User Name", minWidth: 170,align: "center" },
  { id: "Email", label: "Email", minWidth: 100,align: "center" },
  {
    id: "payment",
    label: "Account Balance",
    minWidth: 100,
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "judgedPosts",
    label: "Valuated Posts",
    minWidth: 100,
    align: "center",
  },{
    id: "judge",
    label: "Remove Judge",
    minWidth: 100,
    align: "center",
  }
  
];

// let rows=[]  ;

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "calc(100vh - 50px)",
  },
});

export default function JudgesManagement() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [users, setUsers] = useState([]);
    const [rows, setRows] = useState([]);
  
    // function createData(propic, userName, email,rating,status) {
    //   // const density = population / size;
    //   return { propic, userName, email,rating,status};
    // }
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const renderJudges = () => {
        axios
        .get("http://localhost:5000/api/v1/admin/getJudges")
        .then((result) => {
          setRows(result.data);
          
        });
    };
   
    const manageJudge=(id)=>{
      axios
      .put("http://localhost:5000/api/v1/admin/manageJudge/" + id, {judge:false})
      .then(() => {
        renderJudges();
      });
    }
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/v1/admin/getJudges")
        .then((result) => {
          setRows(result.data);
        });
    }, []);
    return (
        <div className="judgesManagement">
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : column.id == "propic" ? (
                              <img
                                className="propic"
                                src={value ? value : "noAvatar.png"}
                              />
                            ) :column.id=="judge" ?<Button onClick={() => {manageJudge(row._id)}}variant="outlined" size="small" color="primary">
                              Remove Judge
                            
                          </Button> : (
                              value
                            )}
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
    </div>
    )
}
