import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockIcon from '@mui/icons-material/Lock';
import FilterListIcon from '@mui/icons-material/FilterList';
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/"><Button variant="contained" endIcon={<HomeIcon />}>Home</Button></Link>
          </Typography>
          
          {!isAuth ? (
            <>
            <h3><Link to="/signup"><Button variant="contained" startIcon={<PersonAddIcon />}>Register</Button></Link></h3>&nbsp;&nbsp;&nbsp;
          <h3><Link to="/login"><Button variant="contained" startIcon={<LockIcon />}>Login</Button></Link></h3></>
        ) : (
          <>
          <Link to="/myposts"> <Button variant="contained" startIcon={<FilterListIcon />}>My posts</Button> </Link> &nbsp;&nbsp;
            <Link to="/createpost"> <Button variant="contained" startIcon={<AddBoxIcon />}>Create a post</Button> </Link> &nbsp;&nbsp;&nbsp;
            <Button onClick={signUserOut} variant="contained" startIcon={<LogoutIcon />}>Log Out</Button>
          </>
        )}
        </Toolbar>
      </AppBar>
    </Box>
      <Routes>
        <Route path="/" element={<Index authh={isAuth}/>} />
        <Route path="/myposts" element={<MyPosts authh={isAuth}/>} />
        <Route path="/createpost" element={<CreatePost authh={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/signup" element={<SignUp setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
