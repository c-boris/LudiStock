// environment.jsx
const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://ludistock-95072edabbd0.herokuapp.com';

export default API_URL;