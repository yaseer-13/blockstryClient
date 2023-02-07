import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai/';
import { HiMenuAlt4 } from 'react-icons/hi';
import { NavBarItem } from '../../components';
import importedImages from '../../constant/images';
import { navbarArray } from '../../data';

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = useState(false);
	const toggleMenuOn = () => {
		setToggleMenu(true);
	};
	const toggleMenuOff = () => {
		setToggleMenu(false);
	};
	return (
		<nav className='w-full flex md:justify-center justify-between items-center py-6'>
			<div className='md:flex-[0.5] flex-initial justify-center items-center'>
				<h1 className='text-white cursor-pointer font-bold text-2xl nav-logo'>Blockstry</h1>
				{/* <img src={importedImages.navbarLogo} alt='navbarLogo' className='w-32 cursor-pointer' /> */}
			</div>
			<ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
				{navbarArray.map((eachNavItem) => (
					<NavBarItem key={eachNavItem.id} eachNavItem={eachNavItem} />
				))}
				<li className='bg-[#2952e3]  px-6 py-2 rounded-lg mx-4 cursor-pointer hover:bg-[#2546bd]'>
					Login
				</li>
			</ul>
			<div className='flex relative'>
				{!toggleMenu && (
					<HiMenuAlt4
						fontSize={28}
						className='text-white md:hidden cursor-pointer'
						onClick={toggleMenuOn}
					/>
				)}
				{toggleMenu && (
					<ul
						className='z-10 fixed -top-0 right-0 p-3 w-[60vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'
					>
						<li className='text-xl w-full my-2'>
							<AiOutlineClose className='cursor-pointer' onClick={toggleMenuOff} />
						</li>
						{navbarArray.map((eachNavItem) => (
							<NavBarItem
								key={eachNavItem.id}
								eachNavItem={eachNavItem}
								classProps='my-2 text-lg'
							/>
						))}
					</ul>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
