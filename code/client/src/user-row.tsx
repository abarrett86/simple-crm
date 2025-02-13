import { useState } from "react";
import { User } from "./types";
import axios from "axios";

export const UserRow: React.FC<{ user: User }> = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(`${user.age}`);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [newNoteText, setNewNoteText] = useState(""); //newNoteText to disambiguate from existing note texts

    
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmitEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await axios.put(`/api/users/${user.id}`, {
                firstName,
                lastName,
                age,
                phoneNumber,
            });
            setSuccess(true);
            setIsEditing(false);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError((error as any).response.data);
        }
        setLoading(false);
    };

    const handleSubmitNote = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await axios.post(`/api/notes`, {
                noteText: newNoteText,
                userId: user.id
            });
            setSuccess(true);
            setIsAddingNote(false);
            setNewNoteText("");

            //add new note to user.notes list
            user.notes.push(response.data);

        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError((error as any).response.data);
        }
        setLoading(false);
    };

    const onEdit = () => {
        setIsAddingNote(false);
        setIsEditing(true);
    }

    const onAddNote = () => {
        setIsAddingNote(true);
        setIsEditing(false);
    }

    const getFormattedDatetime = (dateTime:Date) => {
        const date = new Date(dateTime);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}`;
    }

    if (isEditing) {
        return (
            <tr className="border-b border-gray-300">
                <td colSpan={6}>
                    <form
                        onSubmit={handleSubmitEdit}
                        className="space-y-4 p-4 rounded bg-gray-100 w-96">
                        <h2 className="text-xl font-fold">Edit</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        {success && (
                            <p className="text-green-500">User added successfully</p>
                        )}
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Age"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="block w-full p-2 bg-blue-500 text-white rounded">
                            Update User
                        </button>
                    </form>
                </td>
            </tr>
        );
    }
    


    return (
        <tr key={user.id} className="border-b border-gray-200">
            <td>
                <button className=" p-2 bg-blue-500 text-white rounded mr-2" onClick={onEdit}>Edit</button>
                <button className=" p-2 bg-blue-500 text-white rounded" onClick={() => onAddNote()}>Add Note</button>
                { isAddingNote && 
                    (
                        <div 
                        className="absolute inset-0 bg-gray-900 bg-opacity-50 text-white flex items-center justify-center"
                        onClick={() => setIsAddingNote(false)}
                        >
                            <div
                             onClick={(e) => e.stopPropagation()} // Prevents event from bubbling up to the parent
                            >
                                <form
                                    onSubmit={handleSubmitNote}
                                    className="space-y-4 p-4 rounded bg-gray-100 w-96 text-black">
                                        <h2 className="text-xl">Add Note to {firstName} {lastName}</h2>
                                    <textarea
                                        className="w-full"
                                        value={newNoteText}
                                        placeholder="Enter Note"
                                        onChange={e => setNewNoteText(e.target.value)}
                                    />

                                    <div className="w-full">
                                        <button
                                            type="submit"
                                            disabled={loading || newNoteText == ""}
                                            className="block w-full p-2 bg-blue-500 text-white rounded">
                                            Add Note
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>{phoneNumber}</td>
            <td>
                
                {user.notes.map((note, noteIndex) => (
                <p key={noteIndex} className="max-w-[250px]">
                    <strong>
                        {getFormattedDatetime(note.createdAt)}
                    </strong>: {note.noteText}
                </p>
                ))}
              
            </td>
        </tr>
    );
};
