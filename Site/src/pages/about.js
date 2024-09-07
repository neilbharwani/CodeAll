import React from 'react';
import ParticlesComponent from '../components/particles';
import logo from '../logo.png';
import { Link } from "react-router-dom";
import '../components/Hero.css';
import qrcode from '../qr.png';
import Footer from '../components/Footer';

function About() {
  return (
            <div className="fadeIn">
                <ParticlesComponent id="particles" />
                <nav className="navbar">
                    <img src={logo} className='logo' alt="CodeAll" />
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                        <li><Link to="/events">Events</Link></li>
                    </ul>
                    <button className="sign-up">Sign Up Free</button>
                </nav>
                <div className="hero">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1>about</h1>
                    <br></br>
                    <br></br>
                    <p class="passion">I’m passionate about coding and love sharing my knowledge with others to help them learn programming skills for free. Teaching coding is incredibly rewarding for me, as it allows me to inspire and guide others on their journey to becoming skilled developers without any cost. I enjoy the challenge of coding and find joy in making complex concepts accessible to beginners through free, valuable instruction.</p>
                    <br></br>
                    <img src={qrcode} width={'10%'} />
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Footer />
                </div>
            </div>
);
}

export default About;