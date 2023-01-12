import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Lobby.css'

function Lobby({username, setUsername}) {
    const [inputValue, setInputValue] = useState('')
    const navigate = useNavigate();

    const handleChange = (e) =>{
      setInputValue(e.target.value);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setUsername(inputValue);
        navigate('/chat-room')
    }
  return (
    <div className='chat-lobby'>
        <form>
        <tr>
        <input className='user-name' placeholder='Enter your name' onChange={handleChange}/>
        <button className='lobby-button' onClick={handleSubmit}>Go</button>
        </tr>
        </form>
    </div>
  )
}

export default Lobby