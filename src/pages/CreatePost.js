import {React, useEffect, useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import Snackbar from '@mui/material/Snackbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const postsCollectionRef = collection(db, "posts");
function CreatePost({authh}) {
  const [title, setTitle]= useState("");
  const [desc, setDesc]= useState("");
  let navigate = useNavigate();
  const handleCreatePost = async () =>{
    if(!title || !desc){
      toast.error('All fields are required!', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    else{
      const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    await addDoc(postsCollectionRef, {
      title,
      desc,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      postdate : {date}
    });
    localStorage.setItem("author",auth.currentUser.uid)
    navigate("/");
    }
  }
  useEffect(() => {
    if (!authh) {
      navigate("/login");
    }
  }, []);
  return (
    <>
    <ToastContainer
position="top-center"
autoClose={2500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PostAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a Post
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Post title"
              name="title"
              autoComplete="email"
              autoFocus
              onChange={(event)=>{
                setTitle(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="desc"
              label="Post description"
              id="desc"
              autoComplete="current-password"
              onChange={(event)=>{
                setDesc(event.target.value);
              }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCreatePost}
            >
              Submit Post
            </Button>
          </Box>
        </Box>
        
      </Container>
    </>
  )
}

export default CreatePost