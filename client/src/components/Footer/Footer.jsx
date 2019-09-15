import React, { useState, useEffect } from 'react';
import './Footer.scss';

const Footer = () => {
    const [state, setState] = useState({
        daysPassed: '',
    });

    useEffect(() => {
        let current = new Date();
        let started = new Date(2019, 7, 10)

        setState({
            daysPassed: Math.ceil((current - started + 1) / 86400000),
        });
    }, []);

    return (
        <footer className='footer'>
            <div className='Main-footer-container'>
                <div className='left-wrapper'>
                    <div className='days-passed-container'>
                        this project started {state.daysPassed} days ago for learning purposes, more to go 🥂
                    </div>
                </div>
                <div className='right-wrapper'>
                    <a href='https://github.com/ebru/euphony' target='_blank' rel='noopener noreferrer'><b>repo</b></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;