import React from 'react';
import ParticlesComponent from '../components/particles';
import logo from '../logo.png';
import { Link } from "react-router-dom";
import Footer from '../components/Footer';

function Projects() {
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
                    <h1>projects</h1>
                    <br></br>
                    <table border={1} width={'70%'}>
                        <tr>
                            <th width={'5%'}>#</th>
                            <th width={'20%'}>Date</th>
                            <th width={'30%'}>Name</th>
                            <th width={'60%'}>Github</th>
                        </tr>
                        <line></line>
                        <tr>
                            <td>1</td>
                            <td>7/11/2024</td>
                            <td><a href='https://prathamusa.org/'>PrathamAI Hackathon</a></td>
                            <td><a href='https://github.com/neilbharwani/hackathon2024'>https://github.com/neilbharwani/hackathon2024</a></td>
                        </tr>
                    </table>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Footer />
                </div>
            </div>
);
}

export default Projects;