// Import React core library
import React from 'react';

// Import ReactDOM for rendering the React component into the DOM
import ReactDOM from 'react-dom/client';

// Import the App component (main component of your application)
import App from './App';

// Create a root DOM node where the React application will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root node
root.render(<App />);
