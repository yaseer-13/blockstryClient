import React from 'react';

const NavBarItem = ({ eachNavItem, classProps }) => {
	return (
		<li className={`cursor-pointer mx-4 ${classProps}`}>
			<a href={`#${eachNavItem.title}`}>{eachNavItem.title}</a>
		</li>
	);
};

export default NavBarItem;
