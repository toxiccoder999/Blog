import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Upload.css'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 

export default function Upload() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    function createNewPost(ev) {
        ev.preventDefault(); 

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', stripHtml(content)); 
        if (files) {
            data.set('file', files[0]);
        }

        
        for (let pair of data.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        
        setLoading(true);

        
        fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
        })
        .then(response => response.json())
        .then(data => {
            setLoading(false); // Rese
            if (data.message) {
                console.log('Post uploaded successfully');
                toast.success('Post uploaded successfully!'); // Success toast notification
                // Reset the fields after a successful upload
                setTitle('');
                setSummary('');
                setContent('');
                setFiles(null);
                // Redirect to homepage after a slight delay to show toast
                setTimeout(() => {
                    navigate('/'); // Redirect to the homepage
                }, 2000); // Adjust delay as needed
            } else {
                console.error('Failed to upload post:', data.error);
                toast.error('Failed to upload post: ' + (data.error || 'Unknown error')); // Error toast notification
            }
        })
        .catch(error => {
            setLoading(false); // Reset loading state
            console.error('Error:', error);
            toast.error('Error: ' + error.message); // Fetch error toast notification
        });
    }

    return (
        <>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                pauseOnFocusLoss
                theme="light"
                style={{ zIndex: 9999 }}
            />
            <div className="upload-container">
                <h1>Upload Your Blog</h1>
                <form className="upload-form" onSubmit={createNewPost}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Blog Title" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Summary" 
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="file" 
                            onChange={(e) => setFiles(e.target.files)} 
                            accept="image/*" 
                        />
                    </div>
                    {files && (
                        <div className="image-preview">
                            <img 
                                src={URL.createObjectURL(files[0])} 
                                alt="Selected" 
                                className="preview-img" 
                            />
                        </div>
                    )}
                    <div className="input-group">
                        <ReactQuill 
                            value={content} 
                            onChange={setContent} 
                            placeholder="Write your blog content here..." 
                        />
                    </div>
                    <button type="submit" className="upload-btn" disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload Blog'}
                    </button>
                </form>
            </div>
        </>
    );
}
