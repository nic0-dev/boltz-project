// Import necessary modules and styles
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const activeChain = "arbitrum-sepolia";
// Define the main app component
function MyApp({ Component, pageProps }: AppProps) {
  // Return the ThirdwebProvider component, wrapping the entire app
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID} // Client ID for Thirdweb authentication
      activeChain={ activeChain }
      >
      {/* Render the main component of the application */}
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

// Export the main app component as default
export default MyApp;