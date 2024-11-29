import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';

const SwipePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [dislikedProfiles, setDislikedProfiles] = useState([]);
  const [profiles, setProfiles] = useState([]); // State for storing fetched profiles
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const { user } = useAuth(); // Assuming the user context is available for other purposes
  const [profileId, setProfileId] = useState(null); // Store profile ID

  // Fetch the user's profile ID first

  const FALLBACK_IMAGE = 'https://www.shutterstock.com/image-vector/blank-avatar-photo-placeholder-flat-600nw-1151124605.jpg';


  useEffect(() => {
    const fetchProfileId = async () => {
      try {
        const token = sessionStorage.getItem('token'); 
        const response = await axios.get('http://localhost:8080/profiles/me/', {
          headers: { 'x-auth-token': token }
        });
        const userId = response.data.data.id; 
        setProfileId(userId); 
      } catch (error) {
        setError('Failed to fetch user profile.');
        console.error(error);
      }
    };

    fetchProfileId();
  }, []);

  // Fetch matches once the profile ID is available
  useEffect(() => {
    if (!profileId) return; // Do not fetch matches if the profile ID is not yet available

    const fetchMatches = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/matches/matches-list/${profileId}`);
        setProfiles(response.data.data); // Store profiles in state
        console.log(response.data.data)
      } catch (error) {
        setError('Failed to fetch matches.');
        console.error(error);
      } finally {
        setLoading(false); // Stop loading once the API call is done
      }
    };

    fetchMatches();
  }, [profileId]); // This effect runs every time the profileId changes

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
  const currentProfiles = Array.isArray(profiles) ? profiles : [];

  return (
    <>
      <Navbar />
      <div className="h-full flex justify-center items-center bg-gray-100 pt-16">
        <div className="grid grid-cols-2 gap-4 max-w-4xl w-full">
          {loading ? (
            <p>Loading profiles...</p>
          ) : error ? (
            <p>{error}</p>
          ) : currentProfiles.length > 0 ? (
            currentProfiles.map((profile) => (
              <div
                key={profile.id}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={profile.image || FALLBACK_IMAGE} // Fallback to a placeholder if image is missing
                  alt={profile.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{profile.name || 'EMPTY'}, {profile.profile.gender}</h2>
                  <p className="text-gray-600">{profile.profile.age} years old</p>
                  <p className="mt-2">{profile.profile.bio}, {profile.profile.location} </p>
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
            <p className='text-center'>No profiles to show!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SwipePage;
