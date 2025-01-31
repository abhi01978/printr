// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.static('public'));

// let onlineUsers = [];

// io.on('connection', (socket) => {
//     // Track online users
//     socket.on('new-user', (username) => {
//         onlineUsers.push({ id: socket.id, username });
//         io.emit('update-users', onlineUsers);
//     });

//     // Typing indicator
//     socket.on('typing', (data) => {
//         socket.broadcast.emit('typing', data);
//     });

//     // Handle messages
//     socket.on('send-message', (data) => {
//         io.emit('receive-message', data);
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);
//         io.emit('update-users', onlineUsers);
//     });
// });

// server.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });
// //////File send

// const multer = require('multer');
// const path = require('path');

// const upload = multer({
//     dest: 'uploads/', // Folder to store uploaded files
//     limits: { fileSize: 50 * 1024 * 1024 }, // Max file size 50MB
// });

// app.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const fileUrl = `/uploads/${req.file.filename}`;
//     res.json({ fileUrl });
// });

// // Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const multer = require('multer');
// const path = require('path');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);
// let onlineUsers = [];

// // Serve static files from the "public" folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Serve uploaded files from the "uploads" folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Files will be saved in the "uploads" directory
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique file name
//     }
// });

// const upload = multer({ storage: storage });

// // Endpoint for file upload
// app.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const fileUrl = `/uploads/${req.file.filename}`;
//     console.log('File uploaded:', fileUrl); // Debugging: Log the uploaded file URL
//     res.json({ fileUrl });
// });

// // Socket.io connection
// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//       // Track online users
//     socket.on('new-user', (username) => {
//         onlineUsers.push({ id: socket.id, username });
//         io.emit('update-users', onlineUsers);
//     });

//     // Typing indicator
//     socket.on('typing', (data) => {
//         socket.broadcast.emit('typing', data);
//     });


//     // Listen for messages from clients
//     socket.on('send-message', (data) => {
//         console.log('Message received:', data);

//         // Broadcast the message to all connected clients
//         io.emit('receive-message', {
//             message: data.message || null,
//             fileUrl: data.fileUrl || null,
//             sender: socket.id,
//         });
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });

// // Start the server
// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



















// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const path = require('path');
// const multer = require('multer');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Set up storage for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // Serve static files (CSS, JS, images, etc.)
// app.use(express.static('public'));

// // Route for file upload
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (req.file) {
//     res.json({ fileUrl: `/uploads/${req.file.filename}`, fileName: req.file.originalname });
//   } else {
//     res.status(400).send('No file uploaded');
//   }
// });

// // Store connected users and their socket IDs
// let users = [];
// let blockedUsers = {};

// // Handle socket connections
// io.on('connection', (socket) => {
//   let currentUsername = '';

//   // Handle new user connection
//   socket.on('new-user', (username) => {
//     currentUsername = username;
//     users.push({ username, id: socket.id });

//     // Broadcast to all users about the new connection
//     io.emit('update-users', users);
//   });

//   // Handle sending and receiving messages
//   socket.on('send-message', (data) => {
//     if (blockedUsers[data.username] && blockedUsers[data.username].includes(currentUsername)) {
//       // Block the message from being sent to the user
//       return;
//     }

//     // Broadcast message to all users
//     io.emit('receive-message', data);
//   });

//   // Handle typing event
//   socket.on('typing', (message) => {
//     socket.broadcast.emit('typing', message);
//   });

//   // Handle user blocking
//   socket.on('block-user', (blockedUsername) => {
//     // Add blocked user to the blocked list
//     if (!blockedUsers[blockedUsername]) {
//       blockedUsers[blockedUsername] = [];
//     }
//     blockedUsers[blockedUsername].push(currentUsername);

//     // Notify the user that they have been blocked
//     socket.emit('blocked', blockedUsername);
//   });

//   // Handle user disconnection
//   socket.on('disconnect', () => {
//     // Remove the user from the user list
//     users = users.filter((user) => user.id !== socket.id);

//     // Broadcast updated user list to everyone
//     io.emit('update-users', users);
//   });
// });

// // Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Start the server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const path = require('path');
// const multer = require('multer');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Set up storage for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Uploads will be saved to 'uploads/' directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filenames
//   },
// });

// const upload = multer({ storage });

// // Serve static files (CSS, JS, images, etc.)
// app.use(express.static('public'));

// // Route for file upload
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (req.file) {
//     res.json({ fileUrl: `/uploads/${req.file.filename}`, fileName: req.file.originalname });
//   } else {
//     res.status(400).send('No file uploaded');
//   }
// });

// // Store connected users and their socket IDs
// let users = [];
// let blockedUsers = {};

// // Handle socket connections
// io.on('connection', (socket) => {
//   let currentUsername = ''; // To track the current user's username

//   // Handle new user connection
//   socket.on('new-user', (username) => {
//     currentUsername = username;
//     users.push({ username, id: socket.id });

//     // Broadcast to all users about the new connection
//     io.emit('update-users', users);
//   });

//   // Handle sending and receiving messages
//   socket.on('send-message', (data) => {
//     // Check if the sender is blocked by the receiver
//     if (blockedUsers[data.username] && blockedUsers[data.username].includes(currentUsername)) {
//       // Block the message from being sent to the user
//       return;
//     }

//     // Broadcast message to all users
//     io.emit('receive-message', data);

//     // Emit a 'receive-message' event to other users in the chat (handled client-side)
//     // for playing notification sounds
//     socket.broadcast.emit('receive-message', data);
//   });

//   // Handle typing event
//   socket.on('typing', (message) => {
//     socket.broadcast.emit('typing', message);
//   });

//   // Handle user blocking
//   socket.on('block-user', (blockedUsername) => {
//     // Add blocked user to the blocked list
//     if (!blockedUsers[blockedUsername]) {
//       blockedUsers[blockedUsername] = [];
//     }
//     blockedUsers[blockedUsername].push(currentUsername);

//     // Notify the user that they have been blocked
//     socket.emit('blocked', blockedUsername);
//   });

//   // Handle user disconnection
//   socket.on('disconnect', () => {
//     // Remove the user from the user list
//     users = users.filter((user) => user.id !== socket.id);

//     // Broadcast updated user list to everyone
//     io.emit('update-users', users);
//   });
// });

// // Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Start the server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const path = require('path');
// const multer = require('multer');
// const bcrypt = require('bcryptjs');
// const expressSession = require('express-session');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Set up session middleware
// app.use(expressSession({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: true,
// }));

// // Middleware to parse incoming requests
// app.use(express.json()); // To parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // To parse form data

// // Set up multer storage for user images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });

// // User storage (in-memory for demo purposes)
// let users = [];

// // Serve static files (CSS, JS, images, etc.)
// app.use(express.static('public'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Register Route
// app.post('/register', upload.single('image'), async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.status(400).json({ error: 'Username and password are required' });
//     }

//     const existingUser = users.find(user => user.username === username);
//     if (existingUser) {
//       return res.status(400).json({ error: 'Username already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = {
//       username,
//       password: hashedPassword,
//       imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
//     };

//     users.push(newUser);
//     req.session.username = username;

//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// // Login Route
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;  // Ensure req.body is being correctly parsed
//   const user = users.find(user => user.username === username);

//   if (!user || !await bcrypt.compare(password, user.password)) {
//     return res.status(400).send('Invalid username or password');
//   }

//   req.session.username = username;
//   res.send('Login successful');
// });

// // Logout Route
// app.post('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(500).send('Error logging out');
//     }
//     res.send('Logged out');
//   });
// });

// // User Authentication Middleware
// const isAuthenticated = (req, res, next) => {
//   if (!req.session.username) {
//     return res.status(401).send('You are not logged in');
//   }
//   next();
// };

// // Serve the chat app (client-side HTML, CSS, JS)
// app.get('/', isAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/button', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'button.html')); // Use correct filename
// });

// // Socket IO Handling
// io.on('connection', (socket) => {
//   let currentUsername = '';

//   // Handle new user connection
//   socket.on('new-user', (username) => {
//     currentUsername = username;
//     io.emit('update-users', users);
//   });

//   // Handle sending and receiving messages
//   socket.on('send-message', (data) => {
//     io.emit('receive-message', data);
//   });

//   // Handle typing event
//   socket.on('typing', (message) => {
//     socket.broadcast.emit('typing', message);
//   });

//   // Handle user disconnection
//   socket.on('disconnect', () => {
//     io.emit('update-users', users);
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const path = require('path');
// const multer = require('multer');
// const bcrypt = require('bcryptjs');
// const session = require('express-session');
// const fs = require('fs');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Set up session middleware
// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: true,
// }));

// // Middleware to parse incoming requests
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Set up multer storage for user images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//   }

//   const fileUrl = `/uploads/${req.file.filename}`;
//   res.status(200).json({ fileUrl, fileName: req.file.originalname });
// });

// // Load users from JSON file
// const usersFile = 'users.json';
// let users = fs.existsSync(usersFile) ? JSON.parse(fs.readFileSync(usersFile)) : [];

// // Serve static files (CSS, JS, images, etc.)
// app.use(express.static('public'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Register Route
// app.post('/register', upload.single('image'), async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.status(400).json({ error: 'Username and password are required' });
//     }

//     if (users.find(user => user.username === username)) {
//       return res.status(400).json({ error: 'Username already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = {
//       username,
//       password: hashedPassword,
//       imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
//     };

//     users.push(newUser);
//     fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
//     req.session.username = username;

//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Login Route
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(user => user.username === username);

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(400).json({ error: 'Invalid username or password' });
//   }

//   req.session.username = username;
//   res.json({ message: 'Login successful', user });
// });

// // Logout Route
// app.post('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error logging out' });
//     }
//     res.json({ message: 'Logged out successfully' });
//   });
// });
// app.get('/button', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'button.html')); // Use correct filename
// });
// // Authentication Middleware
// const isAuthenticated = (req, res, next) => {
//   if (!req.session.username) {
//     return res.status(401).json({ error: 'You are not logged in' });
//   }
//   next();
// };

// // Serve the chat app
// app.get('/', isAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Socket.IO Handling
// io.on('connection', (socket) => {
//   let currentUsername = '';

//   // Handle new user connection
//   socket.on('new-user', (username) => {
//     currentUsername = username;
//     io.emit('update-users', users);
//   });

//   // Handle messages
//   socket.on('send-message', (data) => {
//     io.emit('receive-message', data);
//   });

//   // Typing indicator
//   socket.on('typing', (message) => {
//     socket.broadcast.emit('typing', message);
//   });
  

//   // Handle user disconnection
//   socket.on('disconnect', () => {
//     io.emit('update-users', users);
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const path = require('path');
// const multer = require('multer');
// const bcrypt = require('bcryptjs');
// const session = require('express-session');
// const fs = require('fs');
// const cors = require('cors');
// app.use(cors({ origin: '*' }));


// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Set up session middleware
// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: true,
// }));

// // Middleware to parse incoming requests
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Set up multer storage for user images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });

// // Upload file endpoint
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }
//   const fileUrl = `/uploads/${req.file.filename}`;
//   res.status(200).json({ fileUrl, fileName: req.file.originalname });
// });

// // Load users from JSON file
// const usersFile = 'users.json';
// let users = fs.existsSync(usersFile) ? JSON.parse(fs.readFileSync(usersFile)) : [];

// // Serve static files (CSS, JS, images, etc.)
// app.use(express.static('public'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Register Route
// app.post('/register', upload.single('image'), async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.status(400).json({ error: 'Username and password are required' });
//     }
//     if (users.find(user => user.username === username)) {
//       return res.status(400).json({ error: 'Username already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = {
//       username,
//       password: hashedPassword,
//       imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
//     };
//     users.push(newUser);
//     fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
//     req.session.username = username;
//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Login Route
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(user => user.username === username);
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(400).json({ error: 'Invalid username or password' });
//   }
//   req.session.username = username;
//   res.json({ message: 'Login successful', user });
// });

// // Logout Route
// app.post('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) {
//       return res.status(500).json({ error: 'Error logging out' });
//     }
//     res.json({ message: 'Logged out successfully' });
//   });
// });

// // Serve button page
// app.get('/button', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'button.html'));
// });

// // Authentication Middleware
// const isAuthenticated = (req, res, next) => {
//   if (!req.session.username) {
//     return res.status(401).json({ error: 'You are not logged in' });
//   }
//   next();
// };

// // Serve the chat app
// app.get('/', isAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Active Users Management
// const activeUsers = {}; // Track active users by socket ID

// io.on('connection', (socket) => {
//   socket.on('new-user', (username) => {
//     activeUsers[socket.id] = username; // Store the username with socket ID
//     io.emit('update-users', Object.values(activeUsers)); // Broadcast updated user list
//   });

//   socket.on('send-message', (data) => {
//     io.emit('receive-message', data);
//   });

//   socket.on('typing', (message) => {
//     socket.broadcast.emit('typing', message);
//   });

//   socket.on('disconnect', () => {
//     delete activeUsers[socket.id]; // Remove user when they disconnect
//     io.emit('update-users', Object.values(activeUsers)); // Broadcast updated user list
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const fs = require('fs');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// ✅ Enable CORS after app initialization
app.use(cors({ origin: '*' }));

// ✅ Session Middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// ✅ Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ Serve Static Files
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Load Users from JSON File
const usersFile = 'users.json';
let users = fs.existsSync(usersFile) ? JSON.parse(fs.readFileSync(usersFile)) : [];

// ✅ File Upload Route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  res.status(200).json({
    fileUrl: `/uploads/${req.file.filename}`,
    fileName: req.file.originalname
  });
});

// ✅ Register Route
app.post('/register', upload.single('image'), async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

    if (users.find(user => user.username === username)) return res.status(400).json({ error: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    };

    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    req.session.username = username;

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  req.session.username = username;
  res.json({ message: 'Login successful', user });
});

// ✅ Logout Route
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Error logging out' });
    res.json({ message: 'Logged out successfully' });
  });
});

// ✅ Authentication Middleware
const isAuthenticated = (req, res, next) => {
  if (!req.session.username) return res.status(401).json({ error: 'You are not logged in' });
  next();
};

// ✅ Serve Chat App
app.get('/', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Serve Button Page
app.get('/button', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'button.html'));
});

// ✅ Socket.IO Handling
const activeUsers = {}; // Track active users by socket ID

io.on('connection', (socket) => {
  socket.on('new-user', (username) => {
    activeUsers[socket.id] = username;
    io.emit('update-users', Object.values(activeUsers)); // Send updated user list
  });

  socket.on('send-message', (data) => {
    io.emit('receive-message', data);
  });

  socket.on('typing', (message) => {
    socket.broadcast.emit('typing', message);
  });

  socket.on('disconnect', () => {
    delete activeUsers[socket.id]; // Remove user when they disconnect
    io.emit('update-users', Object.values(activeUsers)); // Update user list
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
