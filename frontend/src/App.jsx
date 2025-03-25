import React, { useState } from 'react';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import Navbar from './components/Navbar';
import About from './Pages/About';
import Footer from './components/Footer';
import axios from 'axios';


function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <About/>
      {selectedProject ? (
        <Tasks project={selectedProject} onBack={() => setSelectedProject(null)} />
      ) : (
        <Projects onProjectAdded={setSelectedProject} />
       
      )}
        <Footer/>
     
    </div>
    
  );
}

export default App;