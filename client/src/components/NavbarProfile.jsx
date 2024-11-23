// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';


// const NavbarProfile = () => {
//   const { user, logout } = useAuth();
//   const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);
//   const [profileExists, setProfileExists] = useState(false);  // Track whether the user has a profile

//   useEffect(()=>{
//     if(user){
//       setOptions(['Profile', 'Sign Out']);
//     }else{
//       setOptions(['Sign In', 'Sign Up'])
//     }
//   }, [user])
//   const [isOpen, setIsOpen] = useState(false);
//   const [options, setOptions] = useState([])
//   const navigate = useNavigate();


//   const toggleDropdown = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const handleOptionSelect = (option) => {
//     console.log(option); // Handle option selection
//     if (option === 'Sign Out' || option === 'Sign In') {
//       logout();
//       navigate('/login')
//     }

//     if (option === 'Sign Up') {
//       logout();
//       navigate('/signup')
//     }

//     if (option === 'Profile') {
//       navigate('/profile')
//     }
//   };




//   const handleOptionClick = (option) => {
//     handleOptionSelect(option); // Handle the option click
//     setIsOpen(false); // Close the dropdown after selection
//   };

//   return (
//     <div className=" bg-white text-left mr-40 max-md:mr-0">
//       <button
//         onClick={toggleDropdown}
//         className="inline-flex justify-center items-center w-10 h-10 rounded-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
//       >
//         {/* You can replace this with an icon or image if desired */}
//         {/* <span className="material-icons">account_circle</span> */}
//         {user ? <img src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj" alt="" /> : <img className='w-7' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9UH_hMXtWBOaa5PZozN3FxjrPVd2Cotxu7A&s' alt='No User' />}
//       </button>
//       {isOpen && (
//         <div className="absolute right-10 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//           <div className="py-1" role="menu" aria-orientation="vertical">

//             {options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleOptionClick(option)}
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                 role="menuitem"
//               >
//                 {option}
//               </button>
//             ))} 

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



// export default NavbarProfile;

// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
// import PreferenceModal from './PreferenceModal'; // Assuming you have the PreferenceModal component

// const NavbarProfile = () => {
//   const { user, logout } = useAuth();
//   const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);
//   const [profileExists, setProfileExists] = useState(false);  // Track whether the user has a profile
//   const [isOpen, setIsOpen] = useState(false);
//   const [options, setOptions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       setOptions(['Profile', 'Sign Out']);
      
//       // Check if user has a profile
//       const token = sessionStorage.getItem('token');
//       axios.get('http://localhost:8080/profiles/me/', {
//         headers: { 'x-auth-token': token }
//       })
//       .then((response) => {
//         if (response.data.status === "SUCCESS") {
//           setProfileExists(true);  // User has a profile
//         } else {
//           setProfileExists(false); // User does not have a profile
//         }
//       })
//       .catch((err) => {
//         console.log('Error checking profile:', err);
//         setProfileExists(false);
//       });
//     } else {
//       setOptions(['Sign In', 'Sign Up']);
//     }
//   }, [user]);

//   const toggleDropdown = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const handleOptionSelect = (option) => {
//     if (option === 'Sign Out' || option === 'Sign In') {
//       logout();
//       navigate('/login');
//     }

//     if (option === 'Sign Up') {
//       logout();
//       navigate('/signup');
//     }

//     if (option === 'Profile') {
//       navigate('/profile');
//     }

//     if (option === 'Preferences') {
//       setIsPreferenceModalOpen(true);  // Open the preference modal
//     }
//   };

//   const handleOptionClick = (option) => {
//     handleOptionSelect(option); // Handle the option click
//     setIsOpen(false); // Close the dropdown after selection
//   };

//   return (
//     <div className="bg-white text-left mr-40 max-md:mr-0">
//       <button
//         onClick={toggleDropdown}
//         className="inline-flex justify-center items-center w-10 h-10 rounded-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
//       >
//         {user ? (
//           <img src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj" alt="User Avatar" />
//         ) : (
//           <img className="w-7" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9UH_hMXtWBOaa5PZozN3FxjrPVd2Cotxu7A&s" alt="No User" />
//         )}
//       </button>
//       {isOpen && (
//         <div className="absolute right-10 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//           <div className="py-1" role="menu" aria-orientation="vertical">
//             {options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleOptionClick(option)}
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                 role="menuitem"
//               >
//                 {option}
//               </button>
//             ))}
//             {profileExists && (
//               <button
//                 onClick={() => handleOptionClick('Preferences')}
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//               >
//                 Preferences
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Preference Modal */}
//       <PreferenceModal isOpen={isPreferenceModalOpen} onClose={() => setIsPreferenceModalOpen(false)} />
//     </div>
//   );
// };

// export default NavbarProfile;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import PreferenceModal from './PreferenceModal'; // Assuming you have the PreferenceModal component

const NavbarProfile = () => {
  const { user, logout } = useAuth();
  const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);
  const [profileExists, setProfileExists] = useState(false);  // Track whether the user has a profile
  const [userPreferences, setUserPreferences] = useState(null);  // Store the user's preferences
  const [isOpen, setIsOpen] = useState(false);
  const [profileId, setProfileId] = useState();
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      setOptions(['Profile', 'Sign Out']);
      
      // Check if the user has a profile and fetch preferences
      const token = sessionStorage.getItem('token');
      axios.get('http://localhost:8080/profiles/me/', {
        headers: { 'x-auth-token': token }
      })
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setProfileExists(true);
          setProfileId(response.data.data.id)
          
          // Check for user preferences
          axios.get(`http://localhost:8080/preferences/${response.data.data.id}`, {
            headers: { 'x-auth-token': token }
          })
          .then((prefResponse) => {
            if (prefResponse.data.status === "SUCCESS") {
              setUserPreferences(prefResponse.data.data); // Set the preferences if they exist
            } else {
              setUserPreferences(null); // No preferences found
            }
          })
          .catch((err) => {
            setUserPreferences(null);
          });
        } else {
          setProfileExists(false); // User does not have a profile
        }
      })
      .catch((err) => {
        setProfileExists(false);
      });
    } else {
      setOptions(['Sign In', 'Sign Up']);
    }
  }, [user]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    if (option === 'Sign Out' || option === 'Sign In') {
      logout();
      navigate('/login');
    }

    if (option === 'Sign Up') {
      logout();
      navigate('/signup');
    }

    if (option === 'Profile') {
      navigate('/profile');
    }

    if (option === 'Preferences') {
      setIsPreferenceModalOpen(true);  // Open the preference modal
    }
  };

  const handleOptionClick = (option) => {
    handleOptionSelect(option); // Handle the option click
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="bg-white text-left mr-40 max-md:mr-0">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center items-center w-10 h-10 rounded-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        {user ? (
          <img src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj" alt="User Avatar" />
        ) : (
          <img className="w-7" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9UH_hMXtWBOaa5PZozN3FxjrPVd2Cotxu7A&s" alt="No User" />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-10 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                role="menuitem"
              >
                {option}
              </button>
            ))}
            {profileExists && (
              <button
                onClick={() => handleOptionClick('Preferences')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Preferences
              </button>
            )}
          </div>
        </div>
      )}

      {/* Preference Modal */}
      <PreferenceModal 
        isOpen={isPreferenceModalOpen} 
        onClose={() => setIsPreferenceModalOpen(false)} 
        preferences={userPreferences}  // Pass current preferences (if any)
        profileId={user ? profileId : null}  // Pass user profile ID to preference modal
        onSave={(newPreferences) => {
          setUserPreferences(newPreferences);  // Update preferences state
          setIsPreferenceModalOpen(false);  // Close the modal after saving
        }}
      />
    </div>
  );
};

export default NavbarProfile;
