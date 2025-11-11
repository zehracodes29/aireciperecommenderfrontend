"use client";          

import React from 'react'

const Home = () => {
      

  return (
    

    <div className="home" style={{ backgroundColor: '#e5f09aff', height: '100vh' }}>

    
      <h1 className="home-title text-center text-black  text-4xl font-bold">Welcome to the Recipe Recommender</h1>
      <p className="home-description container  padding-12 mx-auto text-center text-gray-700 mt-8 font-bold">Discover new recipes tailored to your preferences!!!!.</p>
      <div className="text-center mt-8">
        
        <button onClick={() => window.location.href='/FileUpload'} className="home-button  bg-gray-900 text-white py-2 px-4 rounded">Get Started</button>
      </div>
      </div>
  )
}

export default Home;