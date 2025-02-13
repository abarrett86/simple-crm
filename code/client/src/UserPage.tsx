import axios from "axios";
import { useEffect, useState } from "react";
import { User, Note } from "./types";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getFormattedDatetime } from "./getFormattedDatetime";
import { getFormattedPhone } from "./getFormattedPhone";

export const UserPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { id } = useParams<{ id: string }>(); // id will come from the route parameter

    const [user, setUser] = useState<User>();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/api/users/${id}`);
            setUser(result.data);
        };
        fetchData();
    }, []);

  

  const handleNavigation = () => {
    
    // check if navigating within the app
    const isWithinApp = location.pathname.startsWith('/');

    if (isWithinApp) {
        // navigate to the home route from a tab
        if (location.key === 'default') {
            navigate('/');
        } else {
            navigate(-1); 
        }
    } else { 
        navigate('/');
    }
  };

    return (
        <>
        <a href="#" className="block underline cursor-pointer" onClick={(e) => {e.preventDefault(); handleNavigation();}}>Back</a>
        <div className="space-y-4 p-6 rounded bg-gray-100 w-96 max-w-[800px] w-full m-auto">
        

        <div className="w-f">
            <h1 className="text-xl font-fold bg-gray-400 text-white p-4">{user?.firstName} {user?.lastName}</h1>
        </div>

        <div className="flex flex-col sm:flex-row  p-0 mt-0">
            <div className="sm:w-1/3 w-full p-0 pr-4 sm:border-r  border-gray-300  pt-0">
                <img src="/images/avatar.jpg" />

                <span className="block pt-4"><strong>Age:</strong> {user?.age}</span>
                <span className="block pt-4"><strong>Phone:</strong> {user && getFormattedPhone(user.phoneNumber)}</span>

            </div>

            <div className="sm:w-2/3 w-full p-0 sm:pl-4 pt-8 sm:pt-0 ">

                {user?.notes.map((note, noteIndex) => (
                    <p key={noteIndex} className="border-b border-gray-300 w-full max-w-full last:border-0 p-4 pl-0 sm:pl-4 wrap break-words">
                        <strong>
                            {getFormattedDatetime(note.createdAt)}
                        </strong>: {note.noteText}
                    </p>
                ))}    
            </div>
            </div>
        </div>
        </>
    );
};
