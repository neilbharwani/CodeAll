import React, { useState, useEffect } from 'react';
import './Hero.css';
import Features from './Features';
import logo from '../logo.png';
import code1 from '../code1.png';
import ParticlesComponent from '../components/particles';
import { Link } from "react-router-dom";
import code2 from '../code2.png';
import Footer from '../components/Footer';

function Hero() {
    return (
                <div className="fadeIn">
                    <ParticlesComponent id="particles" />
                    <nav className="navbar">
                        <img src={logo} className='logo' alt="CodeAll" />
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to='/about'>About</Link></li>
                            <li><Link href="/projects">Projects</Link></li>
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
                        <h1>EVERYTHING YOU NEED TO LEARN CODING, RIGHT HERE.</h1>
                        {/* <p>CodeAll is your go-to for free, AI-powered coding tutorials. Learn faster, code better.</p> */}
                        <table>
                            <tr>
                                <td><img src={code1} className='codeimg' alt="img" /></td>
                                <td><img src={code2} className='codeimg2' alt="img" /></td>
                            </tr>
                        </table>
                        <Features />
                        <Footer />
                    </div>
                </div>
)}

export default Hero;
