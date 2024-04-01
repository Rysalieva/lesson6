import React, { useEffect, useRef, useState } from 'react';

function MainPage() {
    const blockElementRef = useRef(null);
    const [count, setCount] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        console.log(name)
    }, [count]);

    const changeBg = () => {
        blockElementRef.current.style.backgroundColor = 'red';
    };

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
            <div className="block" ref={blockElementRef}>
                <h2>{count}</h2>
            </div>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={changeBg}>change block color</button>

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

export default MainPage;
