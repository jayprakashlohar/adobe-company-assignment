import React from "react";
import { Box } from "@chakra-ui/react";

const PostList = () => {
  return (
    <>
      <Box>Here your post</Box>
    </>
  );
};

export { PostList };

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState({
//     user_id: '',
//     content: '',
//   });
//   const [selectedPost, setSelectedPost] = useState(null);

//   useEffect(() => {
//     getPosts();
//   }, []);

//   const getPosts = async () => {
//     try {
//       const res = await axios.get('/posts');
//       setPosts(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const createPost = async () => {
//     try {
//       const res = await axios.post('/posts', newPost);
//       setPosts([...posts, res.data]);
//       setNewPost({ user_id: '', content: '' });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const updatePost = async () => {
//     try {
//       const res = await axios.put(`/posts/${selectedPost.id}`, selectedPost);
//       const updatedPosts = posts.map(post => {
//         if (post.id === res.data.id) {
//           return res.data;
//         }
//         return post;
//       });
//       setPosts(updatedPosts);
//       setSelectedPost(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deletePost = async id => {
//     try {
//       await axios.delete(`/posts/${id}`);
//       const updatedPosts = posts.filter(post => post.id !== id);
//       setPosts(updatedPosts);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const likePost = async id => {
//     try {
//       const res = await axios.post(`/posts/${id}/like`);
//       const updatedPosts = posts.map(post => {
//         if (post.id === res.data.id) {
//           return res.data;
//         }
//         return post;
//       });
//       setPosts(updatedPosts);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const unlikePost = async id => {
//     try {
//       const res = await axios.post(`/posts/${id}/unlike`);
//       const updatedPosts = posts.map(post => {
//         if (post.id === res.data.id) {
//           return res.data;
//         }
//         return post;
//       });
//       setPosts(updatedPosts);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h1>Post App</h1>
//       <h2>Create Post</h2>
//       <form onSubmit={e => {
//         e.preventDefault();
//         createPost();
//       }}>
//         <label htmlFor="user_id">User ID:</label>
//         <input type="text" id="user_id" value={newPost.user_id} onChange={e => setNewPost({ ...newPost, user_id: e.target.value })} />
//         <br />
//         <label htmlFor="content">Content:</label>
//         <textarea id="content" value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })}></textarea>
//         <br />
//         <button type="submit">Create</button>
//       </form>
//       <h2>Posts</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>User ID</th>
//             <th>Content</th>
//             <th>Created At</th>
//             <th>Updated At</th>
//             <th>Likes</th>
//             <th>Actions</th>
//           </tr>
