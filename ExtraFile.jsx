// Backend API:

// // User model
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     name: {
//         type: String,
//         minlength: 1,
//         maxlength: 50
//     },
//     email: {
//         type: String,
//         required: true,
//         validate: {
//             validator: function(v) {
//                 return /\S+@\S+\.\S+/.test(v);
//             }
//         }
//     },
//     bio: {
//         type: String,
//         minlength: 0,
//         maxlength: 200
//     },
//     created_at: {
//         type: Date,
//         default: Date.now
//     },
//     updated_at: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Post model
// const PostSchema = new Schema({
//     user_id: {
//         type: Schema.Types.ObjectId,
//         required: true
//     },
//     content: {
//         type: String,
//         minlength: 1,
//         maxlength: 300
//     },
//     created_at: {
//         type: Date,
//         default: Date.now
//     },
//     updated_at: {
//         type: Date,
//         default: Date.now
//     },
//     likes: {
//         type: Number,
//         default: 0
//     }
// });

// // User Endpoints

// // POST /users: Create a new user.
// router.post('/users', (req, res) => {
//     const user = new User(req.body);
//     user.save()
//         .then(() => res.json({ success: true }))
//         .catch((err) => res.json({ success: false, error: err.message }));
// });

// // GET /users/{id}: Retrieve a user by id.
// router.get('/users/:id', (req, res) => {
//     User.findById(req.params.id)
//         .then((user) => res.json({ success: true, user }))
//         .catch((err) => res.json({ success: false, error: err.message }));
// });

// // PUT /users/{id}: Update a user's name or bio by id.
// router.put('/users/:id', (req, res) => {
//     User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
//         .then((user) => res.json({ success: true, user }))
//         .catch((err) => res.json({ success: false, error: err.message }));
// });

// // DELETE /users/{id}: Delete a user by id.
// router.delete('/users/:id', (req, res) => {
//     User.findByIdAndDelete(req.params.id)
//         .then(() => res.json({ success: true }))
//         .catch((err) => res.json({ success: false, error: err.message }));
// });

// // GET /analytics/users: Retrieve the total number of users.
// router.get('/analytics/users', (req, res) => {
//     User.countDocuments()
//         .then((count) => res.json({ success: true, count }))
//         .catch((err) => res.json({ success: false, error: err.message }));
// });

// // GET /analytics/users/top-active: Retrieve the top 5 most active users, based on the number of posts.
// router.get('/analytics/users/top-active', (req, res) => {
//     Post.aggregate([
//         {
//             $group: {
//                 _id: '$user_id',
//                 count: { $sum: 1 }
//             }
//         },
//         { $sort: { count: -1 } },
//         { $limit: 5 }
//     ])
//         .then((posts) => {
//             let userIds = posts.map((post) => post._id);
//             User.find({ _id: { $in: userIds } })
//                 .then((users) => res.json({ success: true, users }))
//                 .catch((err) => res.json({ success: false, error: err.message }));
//         })
//         .catch((err) => res.json({ success: false, error: err.message }));
// });

// // Post Endpoints

// // POST /posts: Create a new post. The request should include the user_id.
// router.post('/posts', (req, res) => {
//     const post = new Post(req.body);
//     post.save()
//         .then(() => res.json({ success: true }))
//         .catch((err) => res.json({ success: false, error: err.message }));
// });

// // GET /posts/{id}: Retrieve a post by id.
// router.get('/posts/:id', (req, res) => {
//     Post.findById(req.params.id)
//         .then((post) => res.json({ success: true, post }))
//         .catch((err) => res.json({ success: false, error: err.message }));
// });

// // PUT /posts/{id}: Update a post's content by id.
// router.put('/posts/:id', (req, res) => {
//     Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
//         .then((post) => res.json({ success: true, post }))
//         .catch((err) => res.json({ success: false, error: err.message }));
// });

// // DELETE /posts/{id}: Delete a post by id.
// router.delete('/posts/:id', (req, res) => {
//     Post.findByIdAndDelete(req.params.id)
//         .then(() => res.json({ success: true }))
//         .catch((err) => res.json({ success: false, error: err.message }));
// });

// // POST /posts/{id}/like: Increment the like count of a post by id.
// router.post('/posts/:id/like', (req, res) => {
//     Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true })
//         .then((post) => res.json({ success: true, post }))
//         .catch((err) => res.json({ success: false, error: err.message }));
// });

// // POST /posts/{id}/unlike: Decrement the like count of a post by id. The count should not go below 0.
// router.post('/posts/:id/unlike', (req, res) => {
//     Post.findByIdAndUpdate(req.params.id, { $inc: { likes: -1 } }, { new: true })
//         .then((post) => res.json({ success: true, post }))
//         .catch((err) => res.json({ success: false, error: err.message }));
// });

// // GET /analytics/posts: Retrieve the total number of posts.
// router.get('/analytics/posts', (req, res) => {
//     Post.countDocuments()
//         .then((count) => res.json({ success: true, count }))
//         .catch((err) => res.json({ success: false, error: err.message }));
// });

// // GET /analytics/posts/top-liked: Retrieve the top 5 most liked posts.
// router.get('/analytics/posts/top-liked', (req, res) => {
//     Post.find({ likes: { $gt: 0 } })
//         .sort('-likes')
//         .limit(5)
//         .then((posts) => res.json({ success: true, posts }))
//         .catch((err) => res.json({ success: false, error: err.message }));
// });

// Frontend UI:

// // UserForm Component

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserForm = (props) => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [bio, setBio] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Validate inputs
//         if (!name || !email) {
//             alert('Name and email are required.');
//             return;
//         }

//         // Make API call
//         axios.post('/users', { name, email, bio })
//             .then((res) => {
//                 if (res.data.success) {
//                     alert('User created successfully!');
//                     // Reset form
//                     setName('');
//                     setEmail('');
//                     setBio('');
//                 }
//             })
//             .catch(err => alert(err.message));
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//             />
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Bio (optional)"
//                 value={bio}
//                 onChange={e => setBio(e.target.value)}
//             />
//             <button type="submit">Create</button>
//         </form>
//     );
// }

// export default UserForm;

// // PostForm Component

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PostForm = (props) => {
//     const [content, setContent] = useState('');
//     const [userId, setUserId] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Validate inputs
//         if (!content || !userId) {
//             alert('Content and user ID are required.');
//             return;
//         }

//         // Make API call
//         axios.post('/posts', { content, userId })
//             .then((res) => {
//                 if (res.data.success) {
//                     alert('Post created successfully!');
//                     // Reset form
//                     setContent('');
//                     setUserId('');
//                 }
//             })
//             .catch(err => alert(err.message));
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Content"
//                 value={content}
//                 onChange={e => setContent(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="User ID"
//                 value={userId}
//                 onChange={e => setUserId(e.target.value)}
//             />
//             <button type="submit">Create</button>
//         </form>
//     );
// }

// export default PostForm;

// // UserList Component

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserList = (props) => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         axios.get('/users')
//             .then((res) => {
//                 if (res.data.success) {
//                     setUsers(res.data.users);
//                 }
//             })
//             .catch(err => alert(err.message));
//     }, []);

//     const handleView = (id) => {
//         // Make API call
//         axios.get(`/users/${id}`)
//             .then((res) => {
//                 if (res.data.success) {
//                     alert(`Name: ${res.data.user.name}\nEmail: ${res.data.user.email}\nBio: ${res.data.user.bio || 'N/A'}`);
//                 }
//             })
//             .catch(err => alert(err.message));
//     }

//     const handleEdit = (id) => {
//         // TODO
//     }

//     const handleDelete = (id) => {
//         // Make API call
//         axios.delete(`/users/${id}`)
//             .then((res) => {
//                 if (res.data.success) {
//                     alert('User deleted successfully!');
//                 }
//             })
//             .catch(err => alert(err.message));
//     }

//     return (
//         <div>
//             {users.map((user) =>