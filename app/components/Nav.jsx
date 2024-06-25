"use client";
import { useState, useEffect } from 'react';
import headerLogo from '../assets/images/header-logo.svg';
import hamburger from '../assets/icons/hamburger.svg';
import { navLinks } from '../constants';
import Image from 'next/image';

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from '@chakra-ui/react';

const Nav = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [activeLink, setActiveLink] = useState(''); // Define activeLink state

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navBackgroundClass = scrollPosition > 100 ? 'bg-paradiso-500 shadow shadow-xl' : 'bg-paradiso-500';
    const navTextColorClass = scrollPosition > 100 ? 'text-white' : 'text-blue-40';

    const handleClick = (label) => {
        setActiveLink(label);
    };

    return (
        <header className={`padding-x sticky top-0 py-2 z-10 w-full ${navBackgroundClass} max-lg:flex max-lg:justify-end max-lg:items-end max-lg:px-4`}>
            <nav className={`flex justify-between items-center max-container ${navTextColorClass}`}>
                {/* Logo */}
                {/* <a href="/">
                    <Image src={headerLogo} alt="logo" width={130} height={29} />
                </a> */}
                    {/* Navigation Links */}
                <ul className="flex flex-1 justify-center items-center gap-12 max-lg:hidden">
                    {navLinks.map((item) => (
                        <li key={item.label} className="inline-block">
                            <a
                                href={item.href}
                                className={`font-montserrat leading-normal text-2xl transition-colors transition-font-weight duration-300 ${
                                    activeLink === item.label ? 'font-bold text-paradiso-950' : navTextColorClass
                                } hover:font-bold hover:text-paradiso-950`}
                                onClick={() => handleClick(item.label)}
                                style={{ display: 'inline-block', width: 'max-content' }}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <Menu>
                    <MenuButton as={Button} variant="link" className='cursor-pointer hidden max-lg:block'>
                        <Image className='hidden max-lg:block shadow-md shadow-nlue-50' src={hamburger} alt="hamburger" width={25} height={25} />
                    </MenuButton>
                    <MenuList className='bg-paradiso-500 px-4 shadow-lg shadow-nlue-50'>
                        {navLinks.map((item) => (
                            <MenuItem className='text-white font-montserrat leading-normal text-xl' key={item.label} minWidth="150px">
                                <a className={`font-montserrat leading-normal text-2xl transition-colors transition-font-weight duration-300 hover:font-bold hover:text-paradiso-950 ${
                                    activeLink === item.label ? 'font-bold text-paradiso-950' : navTextColorClass
                                }`}
                                onClick={() => handleClick(item.label)} href={item.href} style={{ display: 'inline-block', width: 'max-content' }}>{item.label}</a>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </nav>
        </header>
    );
};

export default Nav;
