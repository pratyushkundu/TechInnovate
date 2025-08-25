// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./index.css";

// // Add error handling to catch any React rendering issues
// const rootElement = document.getElementById("root");
// if (!rootElement) {
//   throw new Error("Root element not found");
// }

// try {
//   createRoot(rootElement).render(<App />);
// } catch (error) {
//   console.error("Failed to render React app:", error);
//   rootElement.innerHTML = `
//     <div style="padding: 20px; color: red; font-family: Arial;">
//       <h1>App Loading Error</h1>
//       <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
//       <p>Check the browser console for more details.</p>
//     </div>
//   `;
// }


import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // <-- import BrowserRouter

// Add error handling to catch any React rendering issues
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

try {
  createRoot(rootElement).render(
    <BrowserRouter> {/* Wrap App in BrowserRouter */}
      <App />
    </BrowserRouter>
  );
} catch (error) {
  console.error("Failed to render React app:", error);
  rootElement.innerHTML = `
    <div style="padding: 20px; color: red; font-family: Arial;">
      <h1>App Loading Error</h1>
      <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
      <p>Check the browser console for more details.</p>
    </div>
  `;
}

