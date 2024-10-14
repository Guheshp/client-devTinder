import { SunIcon } from '@radix-ui/react-icons';
import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        // <button onClick={toggleTheme} className="btn">
        //     Switch to {theme === 'light' ? 'dark' : 'light'} theme
        // </button>
        <div className='mx-12 text-2xl'>
            <SunIcon className={theme === 'light' ? 'size-5 hover:text-black' : 'size-5 hover:text-white'} onClick={toggleTheme} />
        </div>
    );
};

export default ThemeToggle;
