// const vars = {
// 	googleApiKey: 'AIzaSyD-ZPcMh4YKvZJSo-H2C7ESf2PEDJWlcEc'
// };

// export default vars;


const variables = {
	development: {
		googleApiKey: 'AIzaSyBrRJZ9R8e_nmrIJEboq8AP-iC3sz1jHCI'
	},
	production: {
		googleApiKey: 'AIzaSyBrRJZ9R8e_nmrIJEboq8AP-iC3sz1jHCI'
	}
};

const getEnvVariables = () => {
	if (__DEV__) {
		return variables.development; // return this if in development mode
	}
	return variables.production; // otherwise, return this
};

export default getEnvVariables; // export a reference to the function