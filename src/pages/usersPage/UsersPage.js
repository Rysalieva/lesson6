import React, { useEffect, useState } from 'react';

function UsersPage(props) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        getUsers();
    }, []);

    const fetchUserInfo = async (userId) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            const user = await response.json();
            setSelectedUser(user);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const clearUserInfo = () => {
        setSelectedUser(null);
    };

    return (
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} <button onClick={() => fetchUserInfo(user.id)}>more</button>
                    </li>
                ))}
            </ul>

            {selectedUser && (
                <>
                    <ul>
                        <li>name: {selectedUser.name}</li>
                        <li>username: {selectedUser.username}</li>
                        <li>email: {selectedUser.email}</li>
                    </ul>
                    <button onClick={clearUserInfo}>Clear</button>
                </>
            )}
        </>
    );
}

export default UsersPage;
