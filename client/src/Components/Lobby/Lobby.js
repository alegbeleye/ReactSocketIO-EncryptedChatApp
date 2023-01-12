import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Lobby.css'

function Lobby({username, setUsername, setDecryptionKey}) {
    const [inputValue, setInputValue] = useState('')
    const [keyValue, setKeyValue] = useState('')
    const navigate = useNavigate();

    const handleChange = (e) =>{
      setInputValue(e.target.value);
    }

    const handleChangeKey = (e) =>{
      setKeyValue(e.target.value);
    }


    const handleSubmit=(e)=>{
        e.preventDefault();
        if(inputValue === '' || keyValue === ''){
          window.alert("Name or DecryptionKey missing...")
          return;
        }
        setUsername(inputValue);
        setDecryptionKey(keyValue)
        navigate('/chat-room')
    }
  return (
    <div className='chat-lobby'>
        <form>
        <tr>
        <input className='user-name' placeholder='Enter your name' onChange={handleChange}/><br/>
        </tr>
        <tr><input className='user-name key' placeholder='Enter your Decryption Key' onChange={handleChangeKey}/></tr>
        <tr><button className='lobby-button' onClick={handleSubmit}>Go</button></tr>
        </form>
    </div>
  )
}

export default Lobby