import React from 'react';
import Navbar from './components/Navbar';
import ChatBox from './components/Chatbox';
import Footer from './components/Footer';
import './App.css';  // Import the new App.css file

function App() {
  return (
    <div className="app">
      <Navbar />
      <ChatBox />
      <Footer />
    </div>
  );
}

export default App;
