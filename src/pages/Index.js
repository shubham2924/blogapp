import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import MoonLoader from "react-spinners/MoonLoader";
import { height } from "@mui/system";
function Index({ authh }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    window.location.reload();
  };
  return (
    <>
      <div className="homePage">
        <Container maxWidth="sm">
          <br></br>
          {postLists.length == 0 ? (
            <div style={{height:"600px"}}>
            <MoonLoader  color="#1976D2" /></div>
          ) : (
            postLists.map((post) => {
              return (
                <Box display="inline-block">
                  <Card variant="outlined" sx={{ minWidth: 375 }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 24 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {post.title}
                      </Typography>
                      <Typography variant="h6" component="div">
                        Posted by : @{post.author.name}
                      </Typography>

                      <Typography variant="body2">
                        {post.desc}
                        <br />
                        <br></br>
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Published on : {post.postdate.date}
                      </Typography>
                    </CardContent>
                    &nbsp;&nbsp;&nbsp;
                    {authh && post.author.id === auth.currentUser.uid && (
                      <Button
                        onClick={() => {
                          deletePost(post.id);
                        }}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    )}
                    <br></br>
                    <br></br>
                  </Card><br></br>
                </Box>
              );
            })
          )}
        </Container>
      </div>
    </>
  );
}

export default Index;
