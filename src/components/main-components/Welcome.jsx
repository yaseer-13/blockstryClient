import React, { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { AiFillPlayCircle } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { SiEthereum } from 'react-icons/si';
import { FeaturesCard, Loader } from '../../components';
import { TransactionContext } from '../../context/TransactionContext';
import { featuresArray, inputsArray } from '../../data';
import { shortenAddress } from '../../utils/shortenAddress';

const Welcome = () => {
	const {
		connectWallet,
		currentAccount,
		sendTransaction,
		isLoading,
		register,
		handleSubmit,
		errors,
	} = useContext(TransactionContext);

	const formSubmitHandler = (data) => {
		sendTransaction(data);
	};
	return (
		<div className='flex w-full justify-center items-center'>
			<div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
				<div className='flex flex-1 justify-start items-start flex-col mf:mr-10'>
					<h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
						Send Crypto <br /> across the world
					</h1>
					<p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
						Explore the crypto world. Buy and sell cryptocurrencies easily on Blockstry.
					</p>
					{currentAccount ? (
						<button
							type='button'
							disabled
							className='flex flex-row justify-center items-center my-5 bg-[#254a] py-3 px-6 rounded-lg hover:bg-[#254e]  cursor-not-allowed'
						>
							<p className='text-white text-base font-semibold'>Connected</p>
						</button>
					) : (
						<button
							type='button'
							onClick={connectWallet}
							className='flex flex-row justify-center items-center my-5 bg-[#2952e3] py-3 px-6 rounded-lg cursor-pointer hover:bg-[#2546bd]'
						>
							<AiFillPlayCircle className='text-white mr-2' />
							<p className='text-white text-base font-semibold'>Connect Wallet</p>
						</button>
					)}

					<div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
						{featuresArray.map((eachFeature) => (
							<FeaturesCard key={eachFeature.id} {...eachFeature} />
						))}
					</div>
				</div>

				<div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
					<div className='p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism '>
						<div className='flex justify-between flex-col w-full h-full'>
							<div className='flex justify-between items-start'>
								<div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
									<SiEthereum fontSize={21} color='#fff' />
								</div>
								<BsInfoCircle fontSize={17} color='#fff' />
							</div>
							<div>
								<p className='text-white font-light text-sm'>{shortenAddress(currentAccount)}</p>
								<p className='text-white font-semibold text-lg mt-1'>Ethereum</p>
							</div>
						</div>
					</div>
					<div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism gap-4'>
						{inputsArray.map(({ id, placeholder, name, type }) => (
							<div key={id} className='flex flex-col w-full gap-2'>
								<input
									key={id}
									placeholder={placeholder}
									name={name}
									type={type}
									{...register(name)}
									className='border border-sky-700 w-full p-2  text-white text-md white-glassmorphism rounded-lg outline-none '
								/>

								{errors[name] && (
									<p className='text-red-500 text-sm ml-2 font-semibold text-left'>
										{errors[name].message}
									</p>
								)}
							</div>
						))}

						<div className='h-[1px] w-full bg-gray-400 my-2' />
						{isLoading ? (
							<Loader />
						) : (
							<button
								type='button'
								onClick={handleSubmit(formSubmitHandler)}
								className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer'
							>
								Send now
							</button>
						)}
					</div>
				</div>
			</div>
			<Toaster position='top-right' reverseOrder={false} duration={30000} />
		</div>
	);
};

export default Welcome;
