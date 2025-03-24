import React from 'react'
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import Resources from './components/Resources';
import Providers from './components/Providers';
import Footer from './components/Footer';
import About from './Pages/About';
import './App.css'

function App() {

  return (
    <div> 
      <main>

    <Navbar/>
    <About/>
    <Projects/>
    <Tasks/>
    <Resources/>
    <Providers/>
    <Footer/>

    </main>

    </div>
  )
}

export default App
