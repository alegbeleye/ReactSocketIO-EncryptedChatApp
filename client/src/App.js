import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Lobby from './Components/Lobby/Lobby';
import ChatRoom from './Components/ChatRoom/ChatRoom';
import { useState } from 'react';

function App() {
  //
  const [username, setUsername] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('')
  return (
    <Routes>
      <Route path='/' exact element={<Lobby username={username} setUsername={setUsername} setDecryptionKey={setDecryptionKey}/>} />
      <Route path='/chat-room' exact element={<ChatRoom username={username} decryptionKey={decryptionKey}/>} />
    </Routes>
  );
}

export default App;
