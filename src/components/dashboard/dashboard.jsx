import React,{ useState, useEffect }  from 'react'
import './dashboard.css'
import {  Line } from "react-chartjs-2";
import axios from "axios"
import PeopleIcon from '@material-ui/icons/People';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import DescriptionIcon from '@material-ui/icons/Description';
import CreateIcon from '@material-ui/icons/Create';
import BlockIcon from '@material-ui/icons/Block';
import VisibilityIcon from '@material-ui/icons/Visibility';

export default function Dashboard() {
    const [chartData, setChartData] = useState({});
  const [employeeSalary, setEmployeeSalary] = useState([]);
  const [employeeAge, setEmployeeAge] = useState([]);
  const [dashboard,setDashboard] = useState({});

  const chart = () => {
    let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let posts = [];
    setChartData({
            labels: month,
            datasets: [
              {
                label: "level of thiccness",
                data: posts,
                backgroundColor: ["red"],
                borderWidth: 4
              }
            ]
          });
    axios
      .get("http://localhost:5000/api/v1/admin/getDashBoard")
      .then(res => {
        console.log(res);
        setDashboard(res.data)
        
        setChartData({
          labels: month,
          datasets: [
            {
              label: "No of Posts",
              data: res.data.graphData,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 4
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(month,posts);
  };

  useEffect(() => {
    chart();
  }, []);
    return (
        <div className="dashBoard">
          
                    <div className="cards">
                    <div className="dashboardCard" >
                        <div className="dashBoardIcon">
                        <PeopleIcon color="primary" fontSize="large"/>
                        </div>
                        <div className="dashboardText">
                    
                            <span>
                            {dashboard.user} Users
                              </span>
                        </div>

                    </div>
                    <div className="dashboardCard" >
                        <div className="dashBoardIcon">
                        <PlayCircleFilledIcon fontSize="large" color="inherit"/>
                        </div>
                        <div className="dashboardText">
                       
                            <span>
                             {dashboard.post} Posts
                              </span>
                        </div>

                    </div>
                    <div className="dashboardCard" >
                        <div className="dashBoardIcon">
                        <DescriptionIcon fontSize="large" color="primary"/>
                        </div>
                        <div className="dashboardText">
                         
                            <span>
                             {dashboard.judge} Judges
                              </span>
                        </div>

                    </div>
                    </div>
                    <div className="cards">
                    <div className="dashboardCard" >
                        <div className="dashBoardIcon">
                        <CreateIcon fontSize="large" color="inherit"/>
                        </div>
                        <div className="dashboardText">
                       
                            <span>
                              {dashboard.rated} valuations
                              </span>
                        </div>

                    </div>
                    <div className="dashboardCard" >
                        <div className="dashBoardIcon">
                        <BlockIcon fontSize="large" color="secondary"/>
                        </div>
                        <div className="dashboardText">
                         
                            <span>
                              {dashboard.block} Blocked Users
                              </span>
                        </div>

                    </div>
                    <div className="dashboardCard" >
                        <div className="dashBoardIcon">
                        <VisibilityIcon fontSize="large" color="primary" />
                        </div>
                        <div className="dashboardText">
                        
                            <span>
                              {dashboard.views} Video Views
                              </span>
                        </div>

                    </div>
                    </div>
            <div className="App">
      <div style={{textAlign:"center"}}>
<h1>Monthly Posts</h1>
      </div>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
    </div>
        </div>
    )
}
