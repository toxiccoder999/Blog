const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String } // Add this field to store the image path
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
