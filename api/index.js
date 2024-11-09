const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const User = require('./user'); 
const Blog = require('./blog');
const path = require('path'); 
const app = express();
const PORT = 4000;


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null, path.join(__dirname, 'uploads')); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});
const upload = multer({ storage: storage });



async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://omDhumal:om1234@blog.v483u.mongodb.net/?retryWrites=true&w=majority&appName=BLOCKDATABASE");
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}


async function startServer() {
    await connectDB(); 
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer(); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
        console.error('Error saving user to the database', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user1 = await User.findOne({ email });
        if (user1) {
            const match = await bcrypt.compare(password, user1.password);
            if (match) {
                res.status(200).json({ user1 });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);         res.status(500).json({ message: err.message });
    }
});

app.post('/post', upload.single('file'), async (req, res) => {
    const { title, summary, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    console.log(image)
    console.log('Received data:', { title, summary, content, image });

    try {
        const newPost = new Blog({ title, summary, content, image }); 
        const savedPost = await newPost.save();
        res.status(201).json({ message: 'Blog post uploaded successfully', post: savedPost });
    } catch (error) {
        console.error('Error uploading blog post:', error);
        res.status(500).json({ message: 'Failed to upload blog post', error: error.message });
    }
});


app.get('/post', async (req, res) => {
    try {
        const posts = await Blog.find(); 
        res.status(200).json({ posts });
    } catch (error) {
        console.error('Error retrieving blog posts:', error);
        res.status(500).json({ message: 'Failed to retrieve blog posts', error: error.message });
    }
});
