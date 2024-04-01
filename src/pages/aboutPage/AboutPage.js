import React, { useEffect, useRef, useState } from 'react';

function AboutPage(props) {
    const elements = useRef([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        elements.current[0].style.color = 'red'
    }, [])

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
        <div>
            {
                [1, 2, 3].map((el, index) => (
                    <div ref={elem => elements.current[index] = elem}>
                        {el} <button onClick={() => fetchUserInfo(el)}>more</button>
                    </div>
                ))
            }
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
        </div>
    );
}

export default AboutPage;
