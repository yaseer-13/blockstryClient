import { yupResolver } from '@hookform/resolvers/yup';
import { ethers } from 'ethers';
import moment from 'moment';
import React, { createContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { contractABI, contractAddress } from '../utils/constants';
import ethFormSchema from '../validation/ethFormSchema';
export const TransactionContext = createContext();
const { ethereum } = window;
const createEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

	return transactionsContract;
};
// ethFormSchema

export const TransactionsProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [transactionCount, setTransactionCount] = useState(
		localStorage.getItem('transactionCount')
	);
	const [transactions, setTransactions] = useState([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(ethFormSchema),
		mode: 'all',
	});

	const getAllTransactions = async () => {
		try {
			if (ethereum) {
				const transactionsContract = createEthereumContract();

				const availableTransactions = await transactionsContract.getAllTransactions();

				const structuredTransactions = availableTransactions.map((transaction) => ({
					addressTo: transaction.reciever,
					addressFrom: transaction.sender,
					timestamp: moment(new Date(transaction.timestamp * 1000)).format('llll'),
					message: transaction.message,
					keyword: transaction.keyword,
					amount: parseInt(transaction.amount._hex) / 10 ** 18,
				}));

				setTransactions(structuredTransactions);
			} else {
				console.log('Ethereum is not present');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const checkIfWalletIsConnect = async () => {
		try {
			if (!ethereum) {
				toast.error('Please install MetaMask.');
			}

			const accounts = await ethereum.request({ method: 'eth_accounts' });
			if (accounts.length) {
				toast.success('Wallet connected');
				setCurrentAccount(accounts[0]);
				getAllTransactions();
			} else {
				toast.error('Your wallet is not connected');
			}
		} catch (error) {
			console.error('No ethereum object');
		}
	};

	const checkIfTransactionsExists = async () => {
		try {
			if (ethereum) {
				const transactionsContract = createEthereumContract();
				const currentTransactionCount = await transactionsContract.getTransactionCount();

				window.localStorage.setItem('transactionCount', currentTransactionCount);
			}
		} catch (error) {
			console.log(error);

			throw new Error('No ethereum object');
		}
	};

	const connectWallet = async () => {
		try {
			if (!ethereum) {
				toast.error('Please install MetaMask.');
			}

			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			setCurrentAccount(accounts[0]);
			toast.success('Wallet connected');
			const timeOut = setTimeout(() => {
				window.location.reload();
			}, 1000);

			return () => clearTimeout(timeOut);
		} catch (error) {
			console.error('No ethereum object');

			throw new Error('No ethereum object');
		}
	};

	const sendTransaction = async (data) => {
		try {
			if (ethereum) {
				const { addressTo, amount, keyword, message } = data;

				const transactionsContract = createEthereumContract();
				const parsedAmount = ethers.utils.parseEther(amount);

				await ethereum.request({
					method: 'eth_sendTransaction',
					params: [
						{
							from: currentAccount,
							to: addressTo,
							gas: '0x5208',
							value: parsedAmount._hex,
						},
					],
				});

				const transactionHash = await transactionsContract.addToBlockchain(
					addressTo,
					parsedAmount,
					message,
					keyword
				);

				setIsLoading(true);

				await transactionHash.wait();
				console.log(`Success - ${transactionHash.hash}`);
				toast.success('Transaction successful');
				setIsLoading(false);

				const transactionsCount = await transactionsContract.getTransactionCount();

				setTransactionCount(transactionsCount.toNumber());
				const timeOut = setTimeout(() => {
					window.location.reload();
				}, 1000);

				return () => clearTimeout(timeOut);
			} else {
				console.log('Ethereum is not present');
			}
		} catch (error) {
			toast.error('Transaction failed');
		}
	};

	useEffect(() => {
		checkIfWalletIsConnect();
		checkIfTransactionsExists();
	}, [transactionCount]);

	return (
		<TransactionContext.Provider
			value={{
				transactionCount,
				connectWallet,
				transactions,
				currentAccount,
				isLoading,
				sendTransaction,
				register,
				handleSubmit,
				errors,
			}}
		>
			{children}
		</TransactionContext.Provider>
	);
};
