import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, query, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import MoonLoader from "react-spinners/MoonLoader";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
// async function myfunc(){
//     const postsCollectionRef = collection(db, "posts");
//     const author= localStorage.getItem("author")
//     console.log(author)
//     const q = query(postsCollectionRef, where("author[id]", "==", author));
//     const data = await getDocs(q);
//     console.log(data)
// }
// myfunc

function MyPosts({authh}) {
    const [postLists, setPostList] = useState([]);
    let navigate = useNavigate();
    useEffect(()=>{
        async function myfunc(){
                const postsCollectionRef = collection(db, "posts");
                const author= localStorage.getItem("author")
                console.log(author)
                const q = query(postsCollectionRef, where("author.id", "==", author));
                const data = await getDocs(q);
                data.forEach((user)=>{
                    console.log(user.data())
                })
                setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            }
            myfunc()
    },[]);
    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
        // window.location.reload();
        navigate("/");
      };
  return (
    <>
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
    </>
  )
}

export default MyPosts