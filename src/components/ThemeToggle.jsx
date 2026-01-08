import { SunIcon } from '@radix-ui/react-icons';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const navigate = useNavigate()

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme, navigate]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        // <button onClick={toggleTheme} className="btn">
        //     Switch to {theme === 'light' ? 'dark' : 'light'} theme
        // </button>
        <div className='mx-6 text-2xl'>
            <SunIcon className={theme === 'light' ? 'size-5 hover:text-black' : 'size-5 hover:text-white'} onClick={toggleTheme} />
        </div>
    );
};

export default ThemeToggle;
