import React, { useEffect, useState } from 'react';
import './HomePage.css';

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post')
            .then(response => response.json())
            .then(data => setPosts(data.posts))
            .catch(error => console.error('Error fetching posts:', error));
    }, []); 

    return (
        <div className="homepage-container">
            <h1>Blog Posts</h1>
            {posts.length === 0 ? (
                <p>No posts available</p>
            ) : (
               
                    posts.map(post => (
                        <div key={post._id} className="post-card">
                            
                            <div className="post-content">
                                <h1 className="post-title">{post.title}</h1>
                                {post.image && (
                                    <img src={`http://localhost:4000${post.image}`} alt={post.title} className="post-image" />
                                )}
                                <p className="post-summary">{post.summary}</p>
                                <p className="post-summary">{post.content}</p>
                            </div>
                        </div>
                    ))
            
                
                
            )}
        </div>
    );
};

export default HomePage;
