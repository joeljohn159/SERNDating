// import React, { useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import { useAuth } from '../context/AuthContext';

// const Profile = () => {
//     const {user} = useAuth();

//     useEffect(()=>{

//     }, [user])

//     // Example usage
// const Myuser = {
//     avatar: 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
//   } ;
//     return (
//         <div className='min-h-screen flex flex-col' style={{ backgroundColor: '#f6f8fd' }}>
//             <Navbar/>
//             <div  className="flex flex-col bg-white items-center mt-20 p-6 rounded-lg shadow-lg max-w-md mx-auto">
//                 <img
//                     src={Myuser.avatar}
//                     alt={`${user.name}'s avatar`}
//                     className="w-24 h-24 rounded-full border-4 border-gray-200 mb-4"
//                 />
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user.username}</h2>
//                 <p className="text-gray-600 mb-2">{user.email}</p>
//                 <p className="text-gray-500 text-center mb-4">Created Date : {user.createdAt}</p>
//                 <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
//                     Edit Profile
//                 </button>
//             </div>
//         </div>
//     );
// };



// export default Profile;

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';  // Assuming you already have an AuthContext
import axios from 'axios';

const Profile = () => {
    const { user } = useAuth();  // Get user from AuthContext
    const [profile, setProfile] = useState(null);  // Store profile data
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);  // Modal state
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        location: '',
        bio: ''
    });

    useEffect(() => {
        // Fetch the user's profile if user is logged in
        if (user && user.id) {
            const token = sessionStorage.getItem('token');  // Retrieve token from sessionStorage
            axios.get(`http://localhost:8080/profiles/me/`, {
                headers: {
                    'x-auth-token': token  // Send token in request header
                }
            })
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    setProfile(response.data.data);  // Set the fetched profile data
                }
            })
            .catch((err) => {
                console.log('Error fetching profile:', err);
            });
        }
    }, [user]);

    // Handle changes in the modal form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle profile submit (both create and update)
    const handleSubmitProfile = () => {
        const token = sessionStorage.getItem('token');  // Retrieve token from sessionStorage
        const url = profile ? `http://localhost:8080/profiles/me/` : `http://localhost:8080/profiles/`;
        const method = profile ? 'PUT' : 'POST';

        axios({
            method: method,
            url: url,
            headers: {
                'x-auth-token': token  // Send token in request header
            },
            data: formData
        })
        .then((response) => {
            if (response.data.status === 'SUCCESS') {
                setProfile(response.data.data);  // Update the profile state
                setProfileModalOpen(false);  // Close the modal
            }
        })
        .catch((error) => {
            console.error('Error saving profile:', error);
        });
    };

    return (
        <div className='min-h-screen flex flex-col' style={{ backgroundColor: '#f6f8fd' }}>
            <Navbar />
            <div className="flex flex-col bg-white items-center mt-20 p-6 rounded-lg shadow-lg max-w-md mx-auto">
                {profile ? (
                    <>
                        <img
                            src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
                            alt={`${user.username}'s avatar`}
                            className="w-24 h-24 rounded-full border-4 border-gray-200 mb-4"
                        />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user.username}</h2>
                        <p className="text-gray-600 mb-2">{user.email}</p>
                        <p className="text-gray-500 text-center mb-4">Created Date: {user.createdAt}</p>
                        <p className="text-gray-700 mb-2">Location: {profile.location}</p>
                        <p className="text-gray-700 mb-2">Age: {profile.age}</p>
                        <p className="text-gray-700 mb-2">Gender: {profile.gender}</p>
                        <p className="text-gray-700 mb-4">Bio: {profile.bio}</p>
                        <button 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            onClick={() => setProfileModalOpen(true)}>
                            Edit Profile
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-gray-800 mb-4">You don't have a profile yet.</p>
                        <button 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            onClick={() => setProfileModalOpen(true)}>
                            Create Profile
                        </button>
                    </>
                )}
            </div>

            {/* Profile Modal */}
            {isProfileModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
                        <div className="mb-4">
                            <label htmlFor="age" className="block text-gray-700">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gender" className="block text-gray-700">Gender</label>
                            <input
                                type="text"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="location" className="block text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="bio" className="block text-gray-700">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button 
                                className="px-4 py-2 bg-gray-500 text-white rounded mr-2" 
                                onClick={() => setProfileModalOpen(false)}>
                                Cancel
                            </button>
                            <button 
                                className="px-4 py-2 bg-blue-500 text-white rounded" 
                                onClick={handleSubmitProfile}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
