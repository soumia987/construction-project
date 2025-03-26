import React, { useState } from 'react';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Resource from './components/Resources';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <Hero/>
      {/* <Projects/>
      <Tasks/>
      <Resource/> */}
   
      
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