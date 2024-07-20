// pages/_app.js
import React from 'react';
import App from 'next/app';
import 'react-image-crop/dist/ReactCrop.css'; // Importing global CSS here
import './Demo.css'; // Assuming your global CSS is also meant to be imported globally

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;