import * as yup from 'yup';

const validateEthAddress = (string) => {
	const pattern = /^0x[a-fA-F0-9]{40}$/;
	return pattern.test(string);
};

const numberAndAllowDecimalRegex = /^([0-9]+(\.[0-9]+)?)$/;

const onlyStringAndAllowSpaceRegex = /^[a-zA-Z ]*$/;

const ethFormSchema = yup.object().shape({
	addressTo: yup
		.string()
		.trim()
		.required('Sender Address is required')
		.test(
			'eth-address',
			'Invalid Eth address( Eg: 0x1234567890abcdef1234567890abcdef12345678)',
			(value) => validateEthAddress(value)
		),
	amount: yup
		.string()
		.trim()
		.required('Amount is required')
		.matches(numberAndAllowDecimalRegex, 'Amount must be a number')
		.test('amount', 'Amount must be greater than 0', (value) => {
			return parseFloat(value) > 0;
		})
		.test('amount', 'Amount must be less than 1', (value) => {
			return parseFloat(value) < 1;
		}),

	keyword: yup
		.string()
		.trim()

		.required('Keyword is required')
		.matches(onlyStringAndAllowSpaceRegex, 'Keyword must be a alphabets'),
	message: yup
		.string()
		.trim()

		.required('Message is required')
		.matches(onlyStringAndAllowSpaceRegex, 'Keyword must be a alphabets'),
});

export default ethFormSchema;
