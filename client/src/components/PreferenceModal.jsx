// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext'; // Assuming you're using AuthContext for user

// const PreferenceModal = ({ isOpen, onClose }) => {
//     const { user } = useAuth();  // Get user from AuthContext
//     const [preferences, setPreferences] = useState({
//         preferred_gender: '',
//         min_age: '',
//         max_age: ''
//     });
//     const [loading, setLoading] = useState(false);
//     const [profileExists, setProfileExists] = useState(false);  // Track whether the user has a profile

//     useEffect(() => {
//         if (user && user.id && isOpen) {
//             const token = sessionStorage.getItem('token');  // Retrieve token from sessionStorage
//             // Fetch user profile to check if it exists
//             axios.get(`http://localhost:8080/profiles/me/`, {
//                 headers: {
//                     'x-auth-token': token  // Send token in request header
//                 }
//             })
//             .then((response) => {
//                 if (response.data.status === "SUCCESS") {
//                     setProfileExists(true);  // User has a profile
//                     // Fetch preferences if profile exists
//                     axios.get(`http://localhost:8080/preferences/${response.data.data.id}`, {
//                         headers: {
//                             'x-auth-token': token
//                         }
//                     })
//                     .then((preferencesResponse) => {
//                         if (preferencesResponse.data.status === "SUCCESS") {
//                             setPreferences(preferencesResponse.data.data);  // Set preferences data if available
//                         }
//                     })
//                     .catch((err) => {
//                         console.log('Error fetching preferences:', err);
//                     });
//                 } else {
//                     setProfileExists(false);  // No profile exists for the user
//                 }
//             })
//             .catch((err) => {
//                 console.log('Error fetching profile:', err);
//                 setProfileExists(false);  // Handle case where user does not have a profile
//             });
//         }
//     }, [user, isOpen]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setPreferences((prevState) => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = () => {
//         const token = sessionStorage.getItem('token');
//         setLoading(true);

//         axios.post('http://localhost:8080/preferences', {
//             profile_id: user.id,
//             preferred_gender: preferences.preferred_gender,
//             min_age: preferences.min_age,
//             max_age: preferences.max_age
//         }, {
//             headers: {
//                 'x-auth-token': token
//             }
//         })
//         .then((response) => {
//             if (response.data.status === "SUCCESS") {
//                 setLoading(false);
//                 onClose(); // Close the modal after success
//             }
//         })
//         .catch((err) => {
//             console.log('Error saving preferences:', err);
//             setLoading(false);
//         });
//     };

//     if (!isOpen || !profileExists) return null;  // Don't render the modal if not open or if user doesn't have a profile

//     return (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Preferences</h2>
//                 <div className="mb-4">
//                     <label htmlFor="preferred_gender" className="block text-gray-700">Preferred Gender</label>
//                     <select
//                         name="preferred_gender"
//                         value={preferences.preferred_gender}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded mt-1"
//                     >
//                         <option value="">Select Gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="any">Any</option>
//                     </select>
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="min_age" className="block text-gray-700">Minimum Age</label>
//                     <input
//                         type="number"
//                         name="min_age"
//                         value={preferences.min_age}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded mt-1"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="max_age" className="block text-gray-700">Maximum Age</label>
//                     <input
//                         type="number"
//                         name="max_age"
//                         value={preferences.max_age}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded mt-1"
//                     />
//                 </div>
//                 <div className="flex justify-end">
//                     <button 
//                         className="px-4 py-2 bg-gray-500 text-white rounded mr-2" 
//                         onClick={onClose}
//                     >
//                         Cancel
//                     </button>
//                     <button 
//                         className="px-4 py-2 bg-blue-500 text-white rounded" 
//                         onClick={handleSubmit}
//                         disabled={loading}
//                     >
//                         {loading ? 'Saving...' : 'Save Preferences'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PreferenceModal;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { successToast, errorToast } from '../utilities/toast';


const PreferenceModal = ({ isOpen, onClose, preferences, profileId, onSave }) => {
  const [preferredGender, setPreferredGender] = useState(preferences?.preferred_gender || 'female');
  const [minAge, setMinAge] = useState(preferences?.min_age || 18);
  const [maxAge, setMaxAge] = useState(preferences?.max_age || 32);

  useEffect(() => {
    if (preferences) {
      setPreferredGender(preferences.preferred_gender);
      setMinAge(preferences.min_age);
      setMaxAge(preferences.max_age);
    }
  }, [preferences]);

  const handleSave = () => {
    const token = sessionStorage.getItem('token');
    const data = { profile_id: profileId, preferred_gender: preferredGender, min_age: minAge, max_age: maxAge };
    if (preferences) {
      // Update existing preferences
      axios.post(`http://localhost:8080/preferences`, data, {
        headers: { 'x-auth-token': token }
      })
      .then((response) => {
        onSave(response.data.data); // Return the updated preferences
        successToast('Preference Updated')

      })
      .catch((err) => {
        console.error('Error updating preferences:', err);
        errorToast('Invalid Preference')
      });
    } else {
      // Create new preferences
      axios.post('http://localhost:8080/preferences', data, {
        headers: { 'x-auth-token': token }
      })
      .then((response) => {
        onSave(response.data.data); // Return the newly created preferences
        successToast('Preference Updated')

      })
      .catch((err) => {
        console.error('Error creating preferences:', err);
        errorToast('Invalid Preference')
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"  style={{ zIndex: 9999 }}>
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">{preferences ? 'Edit Preferences' : 'Create Preferences'}</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Preferred Gender</label>
          <select
            className="block w-full border rounded px-3 py-2"
            value={preferredGender}
            onChange={(e) => setPreferredGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Min Age</label>
          <input
            type="number"
            className="block w-full border rounded px-3 py-2"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Max Age</label>
          <input
            type="number"
            className="block w-full border rounded px-3 py-2"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default PreferenceModal;
