import React, { useEffect, useState } from 'react';
import './ChatRoom.css';
import axios from 'axios';
import io from 'socket.io-client';

import { encode, decode } from "../../utils/cryptography"

function ChatRoom({ username }) {

    const serverURL = "http://localhost:4000";
    const socket = io.connect("http://localhost:3001");

    const [isConnected, setIsConnected] = useState(socket.connected);

    const [key, setKey] = useState('12345');
    const [messageValue, setMessageValue] = useState('')
    const [messages, setMessages] = useState([{ name: username, message: "this is a temporary message" }])
    const [rooms, setRooms] = useState(['jesse', 'Stella', 'Lanre']);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [timer, setTimer] = useState(60)


    useEffect(() => {
        timer > 0 && setTimeout(() => setTimer(timer - 1), 1000)
        socket.on('joinRoomServer', () => {
            setMessages([]);
        })

        socket.on('serverMessage', (value) => {
            let msg = value.message;
            if (value.name != username) {
                msg = encode(msg)
            }
            setMessages((messages) => [...messages, { name: value.name, message: msg }]);
            console.log('we got a message');
        })
    }, [socket, messages]);

    const handleInput = (e) => {
        setMessageValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentRoom !== null) {
            socket.emit('clientMessage', { name: username, message: messageValue, room: currentRoom });
        }
        setTimer(60)

    }

    const handleTimer = () => {
        setTimer(60)
    }


    const verify = (index) => {
        const query = prompt('Enter a key to decrypt message: ')
        if (query === key) {
            alert("Decryption Success");
            const decoded = decode(messages[index].message)
            const newMsgs = [...messages]
            newMsgs[index] = { ...messages[index], message: decoded }
            setMessages(newMsgs)

        } else {
            alert("Wrong Decryption Key");
        }
    }

    const changeRoom = async (val) => {
        socket.emit('joinRoomClient', { room: val });
        setCurrentRoom(val);
    }

    return (
        <div className='chat-room'>
            <div className='side-nav'>
                {rooms.map((value, idx) => {
                    return (
                        <p key={idx} className='userList' onClick={() => changeRoom(value)}>{value}</p>
                    )
                })}

            </div>
            <div className='message-section'>
                {messages.map((value, index) => {
                    return (
                        <div key={index} className='message-box' onClick={() => verify(index)}>
                            <p>{`${value.name}: `}</p>
                            <p>{value.message}</p>
                        </div>
                    );
                })}
                <form>
                    <input className='message-input' placeholder='Enter a message and send' onChange={handleInput} />
                    <button className='message-button' onClick={handleSubmit}>Send</button>
                    <p >
                        {timer}
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ChatRoom;