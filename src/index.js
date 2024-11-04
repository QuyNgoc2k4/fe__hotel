// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import Google OAuth
import App from "./App";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
const queryClient =new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
