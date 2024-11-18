import React, { useState, useEffect } from 'react';
import { postsAPI } from '../../api/communityPosts';

const CommunityPosts = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await postsAPI.getAllPosts();
            setPosts(data);
        } catch (err) {
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const post = await postsAPI.createPost(newPost);
            setPosts([post, ...posts]);
            setNewPost({ title: '', content: '' });
        } catch (err) {
            setError('Failed to create post');
        }
    };

    const handleLike = async (postId) => {
        try {
            await postsAPI.toggleLike(postId);
            fetchPosts(); // Refresh posts to get updated likes
        } catch (err) {
            setError('Failed to like post');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Create Post</h2>
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Title"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                className="w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Content"
                                value={newPost.content}
                                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                className="w-full rounded-md border-gray-300 shadow-sm"
                                rows="4"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Post
                        </button>
                    </div>
                </form>

                <div className="space-y-6">
                    {posts.map(post => (
                        <div key={post._id} className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-bold">{post.title}</h3>
                            <p className="text-gray-600 mt-2">{post.content}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <button
                                    onClick={() => handleLike(post._id)}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                                >
                                    <span>♥</span>
                                    <span>{post.likes.length} likes</span>
                                </button>
                                <span className="text-sm text-gray-500">
                                    {new Date(post.createdAt).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommunityPosts;