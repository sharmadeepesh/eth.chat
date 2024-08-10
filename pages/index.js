// index.js - The homepage for the website (loads the Chat screen by default)
// - Deepesh Sharma

import React from 'react'

import {Filter, Friend} from '../Components/index';

const ChatApp = () => {

  // Returns the Friend component, which contains the Card and Chat subcomponent
  return <div>
    <Filter/>
    <Friend/>
  </div>;
};

export default ChatApp;