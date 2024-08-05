// _app.js - Renders the overall document structure of the website
// - Deepesh Sharma

import '../styles/globals.css';

import { ChatAppProvider } from "../Context/ChatAppContext";
import { NavBar } from '../Components/index';

const MyApp = ({ Component, pageProps }) => (
  <div>

    {/* Renders the NavBar component, plus any other component with their props */}

    <ChatAppProvider>
      <NavBar />
      <Component {...pageProps} />
    </ChatAppProvider>
  </div>
);

export default MyApp;