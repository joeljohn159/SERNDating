import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const SwipePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [dislikedProfiles, setDislikedProfiles] = useState([]);
  const { user } = useAuth();
  // Sample data in data.js
const profiles = [
  { id: 1, name: 'John Doe', age: 25, bio: 'I love traveling and outdoor activities.', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Jane Smith', age: 28, bio: 'I enjoy reading and cooking.', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Michael Green', age: 22, bio: 'I am a tech enthusiast and love coding.', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Emily Brown', age: 30, bio: 'I enjoy music and movies.', image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Chris Lee', age: 26, bio: 'Hiking and photography are my hobbies.', image: 'https://via.placeholder.com/150' },
  // Add more profiles as needed
];


  const handleSwipe = (direction, profileId) => {
    if (direction === 'right') {
      setLikedProfiles([...likedProfiles, profileId]);
      toast.success('You liked this profile!');
    } else {
      setDislikedProfiles([...dislikedProfiles, profileId]);
      toast.error('You disliked this profile.');
    }

    // Remove the profile from the current display
    setCurrentIndex(currentIndex + 1);
  };

  // Fetch the current profile from the list
  const currentProfiles = profiles.slice(currentIndex, currentIndex + 4);

  return (
    <>
      <Navbar />
      <div className="h-full flex justify-center items-center bg-gray-100 pt-16">
        <div className="grid grid-cols-2 gap-4 max-w-4xl w-full">
          {currentProfiles.length > 0 ? (
            currentProfiles.map((profile) => (
              <div
                key={profile.id}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <p className="text-gray-600">{profile.age} years old</p>
                  <p className="mt-2">{profile.bio}</p>
                </div>
                <div className="flex justify-between p-4">
                  <button
                    onClick={() => handleSwipe('left', profile.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-400"
                  >
                    Dislike
                  </button>
                  <button
                    onClick={() => handleSwipe('right', profile.id)}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-400"
                  >
                    Like
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No more profiles to show!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SwipePage;
