import { nanoid } from 'nanoid';
import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { BsShieldFillCheck } from 'react-icons/bs';
import { RiHeart2Fill } from 'react-icons/ri';
const services = [
	{
		color: 'bg-[#2952E3]',
		title: 'Security gurantee',
		icon: <BsShieldFillCheck fontSize={21} className='text-white' />,
		subtitle:
			'Security is guranteed. We always maintain privacy and maintain the quality of our products',
	},
	{
		color: 'bg-[#8945F8]',
		title: 'Best exchange rates',
		icon: <BiSearchAlt fontSize={21} className='text-white' />,
		subtitle: 'We offer the best exchange rates on the market',
	},
	{
		color: 'bg-[#F84550]',
		title: 'Fastest transactions',
		icon: <RiHeart2Fill fontSize={21} className='text-white' />,
		subtitle: 'Experience lightning-fast transactions with us',
	},
];
const ServiceCard = ({ color, title, icon, subtitle }) => (
	<div className='flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl w-full '>
		<div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>{icon}</div>
		<div className='ml-5 flex flex-col flex-1'>
			<h3 className='mt-2 text-white text-lg font-bold'>{title}</h3>
			<p className='mt-1 text-white text-sm md:w-9/12'>{subtitle}</p>
		</div>
	</div>
);

const Services = () => {
	return (
		<div className='flex w-full justify-center items-center gradient-bg-services'>
			<div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
				<div className='flex-1 flex flex-col justify-start items-start'>
					<h1 className='text-white text-3xl sm:text-5xl py-2 text-gradient '>
						Services that we
						<br />
						continue to improve
					</h1>
					<p className='text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base'>
						The best choice for buying and selling your crypto assets, with the various super
						friendly services we offer
					</p>
				</div>

				<div className='flex-1 flex flex-col justify-start items-center'>
					{services.map((service) => (
						<ServiceCard
							key={nanoid()}
							color={service.color}
							title={service.title}
							icon={service.icon}
							subtitle={service.subtitle}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Services;
