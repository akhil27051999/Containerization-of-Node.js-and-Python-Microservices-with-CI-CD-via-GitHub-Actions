// Import React library which is required to create a React component
import React from "react";

// Define the main App component
function App() {
  return (
    // JSX code starts here
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Heading displayed on the page */}
      <h1>Welcome to Dockerized Frontend!</h1>
      
      {/* Description paragraph */}
      <p>This is the frontend service running in a container.</p>
    </div>
  );
}

// Export the App component so it can be imported in other files (like index.js)
export default App;
