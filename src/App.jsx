import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Footer, Navbar, Services, Transactions, Welcome } from './components';
const App = () => {
	return (
		<div className='min-h-screen'>
			<div className='gradient-bg-welcome'>
				<Navbar />
				<Welcome />
			</div>
			<Services />
			<Transactions />
			<Footer />
			<ReactQueryDevtools initialIsOpen={false} />
		</div>
	);
};

export default App;
