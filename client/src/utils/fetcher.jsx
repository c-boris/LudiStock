const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://ludistock-95072edabbd0.herokuapp.com';

// const API_URL = "http://localhost:3001";
// const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : '/api';

const fetcher = async (url, options) => {
  const response = await fetch(`${API_URL}${url}`, options);
  return response.json();
};

export default fetcher;