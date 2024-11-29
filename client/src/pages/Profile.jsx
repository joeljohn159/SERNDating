// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import { useAuth } from '../context/AuthContext';  // Assuming you already have an AuthContext
// import axios from 'axios';

// const Profile = () => {
//     const { user } = useAuth();  // Get user from AuthContext
//     const [profile, setProfile] = useState(null);  // Store profile data
//     const [isProfileModalOpen, setProfileModalOpen] = useState(false);  // Modal state
//     const [formData, setFormData] = useState({
//         age: '',
//         gender: '',
//         location: '',
//         bio: ''
//     });

//     useEffect(() => {
//         // Fetch the user's profile if user is logged in
//         if (user && user.id) {
//             const token = sessionStorage.getItem('token');  // Retrieve token from sessionStorage
//             axios.get(`http://localhost:8080/profiles/me/`, {
//                 headers: {
//                     'x-auth-token': token  // Send token in request header
//                 }
//             })
//             .then((response) => {
//                 if (response.data.status === "SUCCESS") {
//                     setProfile(response.data.data);  // Set the fetched profile data
//                 }
//             })
//             .catch((err) => {
//                 console.log('Error fetching profile:', err);
//             });
//         }
//     }, [user]);

//     // Handle changes in the modal form
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     // Handle profile submit (both create and update)
//     const handleSubmitProfile = () => {
//         const token = sessionStorage.getItem('token');  // Retrieve token from sessionStorage
//         const url = profile ? `http://localhost:8080/profiles/me/` : `http://localhost:8080/profiles/`;
//         const method = profile ? 'PUT' : 'POST';

//         axios({
//             method: method,
//             url: url,
//             headers: {
//                 'x-auth-token': token  // Send token in request header
//             },
//             data: formData
//         })
//         .then((response) => {
//             if (response.data.status === 'SUCCESS') {
//                 setProfile(response.data.data);  // Update the profile state
//                 setProfileModalOpen(false);  // Close the modal
//             }
//         })
//         .catch((error) => {
//             console.error('Error saving profile:', error);
//         });
//     };

//     return (
//         <div className='min-h-screen flex flex-col' style={{ backgroundColor: '#f6f8fd' }}>
//             <Navbar />
//             <div className="flex flex-col bg-white items-center mt-20 p-6 rounded-lg shadow-lg max-w-md mx-auto">
//                 {profile ? (
//                     <>
//                         <img
//                             src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
//                             alt={`${user.username}'s avatar`}
//                             className="w-24 h-24 rounded-full border-4 border-gray-200 mb-4"
//                         />
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user.username}</h2>
//                         <p className="text-gray-600 mb-2">{user.email}</p>
//                         <p className="text-gray-500 text-center mb-4">Created Date: {user.createdAt}</p>
//                         <p className="text-gray-700 mb-2">Location: {profile.location}</p>
//                         <p className="text-gray-700 mb-2">Age: {profile.age}</p>
//                         <p className="text-gray-700 mb-2">Gender: {profile.gender}</p>
//                         <p className="text-gray-700 mb-4">Bio: {profile.bio}</p>
//                         <button 
//                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                             onClick={() => setProfileModalOpen(true)}>
//                             Edit Profile
//                         </button>
//                     </>
//                 ) : (
//                     <>
//                         <p className="text-gray-800 mb-4">You don't have a profile yet.</p>
//                         <button 
//                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                             onClick={() => setProfileModalOpen(true)}>
//                             Create Profile
//                         </button>
//                     </>
//                 )}
//             </div>

//             {/* Profile Modal */}
//             {isProfileModalOpen && (
//                 <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
//                         <div className="mb-4">
//                             <label htmlFor="age" className="block text-gray-700">Age</label>
//                             <input
//                                 type="number"
//                                 name="age"
//                                 value={formData.age}
//                                 onChange={handleInputChange}
//                                 className="w-full p-2 border border-gray-300 rounded mt-1"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="gender" className="block text-gray-700">Gender</label>
//                             <input
//                                 type="text"
//                                 name="gender"
//                                 value={formData.gender}
//                                 onChange={handleInputChange}
//                                 className="w-full p-2 border border-gray-300 rounded mt-1"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="location" className="block text-gray-700">Location</label>
//                             <input
//                                 type="text"
//                                 name="location"
//                                 value={formData.location}
//                                 onChange={handleInputChange}
//                                 className="w-full p-2 border border-gray-300 rounded mt-1"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="bio" className="block text-gray-700">Bio</label>
//                             <textarea
//                                 name="bio"
//                                 value={formData.bio}
//                                 onChange={handleInputChange}
//                                 className="w-full p-2 border border-gray-300 rounded mt-1"
//                             />
//                         </div>
//                         <div className="flex justify-end">
//                             <button 
//                                 className="px-4 py-2 bg-gray-500 text-white rounded mr-2" 
//                                 onClick={() => setProfileModalOpen(false)}>
//                                 Cancel
//                             </button>
//                             <button 
//                                 className="px-4 py-2 bg-blue-500 text-white rounded" 
//                                 onClick={handleSubmitProfile}>
//                                 Save
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';  // Assuming you already have an AuthContext
import axios from 'axios';
import { errorToast } from '../utilities/toast';

const Profile = () => {
    const { user } = useAuth();  // Get user from AuthContext
    const [profile, setProfile] = useState(null);  // Store profile data
    const [interests, setInterests] = useState([]);  // Store user interests
    const [allInterests, setAllInterests] = useState([]);  // All available interests
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);  // Modal state
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        location: '',
        bio: ''
    });
    const [selectedInterest, setSelectedInterest] = useState(null);  // Selected interest for dropdown
    const [newInterest, setNewInterest] = useState('');  // New interest input value
    const [isAddingInterest, setIsAddingInterest] = useState(false);  // Show input box for creating a new interest

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

    useEffect(() => {
        if (profile && profile.id) {
            const token = sessionStorage.getItem('token');
            console.log('PROFILE IS THERE', profile.id)
            // Fetch user's interests
            axios.get(`http://localhost:8080/profile-interests/${profile.id}`)
                .then((response) => {
                    if (response.data.status === "SUCCESS") {
                        console.log(response)
                        setInterests(response.data.data);  // Set user's interests
                    }
                })
                .catch((err) => {
                    console.log('Error fetching interests:', err);
                });

            // Fetch all available interests for dropdown
            axios.get('http://localhost:8080/interests', {
                headers: {
                    'x-auth-token': token
                }
            })
                .then((response) => {
                    if (response.data.status === "SUCCESS") {
                        setAllInterests(response.data.data);  // Set available interests
                    }
                })
                .catch((err) => {
                    console.log('Error fetching all interests:', err);
                });
        }
    }, [profile]);

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

    // Handle adding a new interest
    const handleAddInterest = () => {
        const token = sessionStorage.getItem('token');
        axios.post('http://localhost:8080/interests', {
            name: newInterest
        }, {
            headers: {
                'x-auth-token': token
            }
        })
            .then((response) => {
                if (response.data.status === "SUCCESS") {
                    setAllInterests([...allInterests, response.data.data]); // Update available interests
                    setNewInterest(''); // Clear the input field
                    setIsAddingInterest(false); // Close the input field
                }
            })
            .catch((error) => {
                console.error('Error adding new interest:', error);
            });
    };

    //Handle Add an interest to profile:
    const handleProfileInterestAdd = async (interestId) => {
        const token = sessionStorage.getItem('token'); // Assuming token is stored in sessionStorage

        try {
            // Get the profile ID (you might already have it stored in the profile state or user context)
            const profileId = profile.id; // Example, you should use the actual profile ID here (can be dynamic)

            // Make the POST request to add the interest to the profile
            const response = await axios.post(
                'http://localhost:8080/profile-interests',
                {
                    profile_id: profileId,
                    interest_ids: [interestId], // Send the selected interest ID as an array
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token, // Include the token in the request header
                    },
                }
            );

            if (response.data.status === 'SUCCESS') {
                console.log('Interest added successfully');
                return true; // Success response
            } else {
                throw new Error('Failed to add interest');
            }
        } catch (error) {
            console.error('Error adding interest:', error);
            return false; // Failed response
        }
    };


    // Handle removing an interest
    const handleRemoveInterest = (interestId) => {
        const token = sessionStorage.getItem('token');
        axios.post(`http://localhost:8080/profile-interests/remove-interest`, {
            "profile_id": profile.id,
            "interest_id": interestId
        })
            .then(() => {
                setInterests(interests.filter(interest => interest.id !== interestId));  // Remove from user's interests
            })
            .catch((error) => {
                console.error('Error removing interest:', error);
            });
    };

    return (
        <div className='min-h-screen flex flex-col' style={{ backgroundColor: '#f6f8fd' }}>
            <Navbar />
            <div className="flex flex-row justify-between items-start mt-20 px-8">
                {/* Profile Card */}
                <div className="flex flex-col bg-white items-center p-6 rounded-lg shadow-lg max-w-md mx-auto">
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

                            {/* Edit Profile Modal */}
                {isProfileModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{profile ? 'Edit Profile' : 'Create Profile'}</h2>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="age" className="block text-sm font-semibold text-gray-700">Age</label>
                                    <input
                                        type="text"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                        placeholder="Enter age"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="gender" className="block text-sm font-semibold text-gray-700">Gender</label>
                                    <input
                                        type="text"
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                        placeholder="Enter gender"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                        placeholder="Enter location"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">Bio</label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                        placeholder="Enter bio"
                                    />
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                                        onClick={() => setProfileModalOpen(false)}>
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                        type="button"
                                        onClick={handleSubmitProfile}>
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                        </>
                    ) : (
                        <>
                            <p className="text-gray-800 mb-4">You don't have a profile yet.</p>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                onClick={() => {setProfileModalOpen(true); console.log('Create Profile', isProfileModalOpen)}}>
                                Create Profile
                            </button>



                            {isProfileModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{profile ? 'Edit Profile' : 'Create Profile'}</h2>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="age" className="block text-sm font-semibold text-gray-700">Age</label>
                                    <input
                                        type="text"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                        placeholder="Enter age"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="gender" className="block text-sm font-semibold text-gray-700">Gender</label>
                                    <input
                                        type="text"
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                        placeholder="Enter gender"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                        placeholder="Enter location"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">Bio</label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded mt-1"
                                        placeholder="Enter bio"
                                    />
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                                        onClick={() => setProfileModalOpen(false)}>
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                        type="button"
                                        onClick={handleSubmitProfile}>
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                        </>
                    )}
                </div>

                {/* Interests Card */}
                <div className="flex flex-col bg-white items-center mt-8 p-6 rounded-lg shadow-lg max-w-md mx-auto ml-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">My Interests</h2>
                    <div className="flex flex-wrap gap-2">
                        {interests.length > 0 ? (
                            interests.map((interest) => (
                                <div key={interest.id} className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full text-sm text-gray-800">
                                    {interest.name}
                                    <button
                                        className="text-red-500"
                                        onClick={() => handleRemoveInterest(interest.id)}>
                                        &#x2716; {/* Cross mark */}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No interests yet.</p>
                        )}
                        <div className="relative">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-full text-sm text-gray-800 flex items-center gap-2"
                                onClick={() => setSelectedInterest(!selectedInterest)}>
                                + Add  Interest
                            </button>

                            {/* Dropdown Menu */}
                            {selectedInterest && (
                                <div className="absolute mt-2 bg-white border rounded-lg shadow-lg max-w-xs w-full z-10">
                                    {allInterests.map((interest) => (
                                        <div
                                            key={interest.id}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={async () => {
                                                try {
                                                    await handleProfileInterestAdd(interest.id);

                                                    if (!interests.some(i => i.id === interest.id)) {
                                                        setInterests(prevInterests => [...prevInterests, interest]);
                                                    }
                                                } catch (error) {
                                                    errorToast('Server Error Failed to Add Interest!');
                                                    setInterests(prevInterests => prevInterests.filter(i => i.id !== interest.id));
                                                }
                                            }}
                                        >
                                            {interest.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Create New Interest Button */}
                    <button
                        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
                        onClick={() => setIsAddingInterest(true)}>
                        Create New Interest
                    </button>

                    {/* Create New Interest Modal */}
                    {isAddingInterest && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Interest</h2>
                                <input
                                    type="text"
                                    value={newInterest}
                                    onChange={(e) => setNewInterest(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="Enter new interest"
                                />
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                                        onClick={() => setIsAddingInterest(false)}>
                                        Cancel
                                    </button>
                                    <button
                                        disabled = {!profile.id}
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                        onClick={handleAddInterest}>
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
