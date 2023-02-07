import React from 'react';
const companyCommonStyles =
	'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';
const FeaturesCard = (eachFeature) => {
	return (
		<>
			<div className={`${eachFeature.rounded} ${companyCommonStyles}`}>
				{eachFeature.featureName}
			</div>
		</>
	);
};

export default FeaturesCard;
