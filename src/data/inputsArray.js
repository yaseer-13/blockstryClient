import { nanoid } from 'nanoid';
const inputsArray = [
	{ id: nanoid(), placeholder: 'Address To', name: 'addressTo', type: 'text' },
	{ id: nanoid(), placeholder: 'Amount in (ETH)', name: 'amount', type: 'text' },
	{ id: nanoid(), placeholder: 'Keyword (Gif)', name: 'keyword', type: 'text' },
	{ id: nanoid(), placeholder: 'Enter Message', name: 'message', type: 'text' },
];

export default inputsArray;
