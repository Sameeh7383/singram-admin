import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/HomePage/home";
import Login from "./pages/login/login.jsx"
function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/Login" component={Login} />
    </Switch>
   
    </BrowserRouter>
  );
}

export default App;
