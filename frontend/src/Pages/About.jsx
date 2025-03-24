import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-r from-red-300 to-red-900">
      <div className="max-w-4xl mx-auto px-4">
        {/* <img 
          src={image} 
          alt="X-Pert Construction" 
          className="w-full h-auto mb-8 rounded-lg" 
        /> */}
        <h2 className="text-3xl font-bold text-center text-white mb-8">About X-Pert Construction</h2>
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <p className="text-lg text-gray-700">
            ConstructionXpert Services est une entreprise spécialisée dans la gestion de projets de construction,
            visant à offrir des solutions technologiques innovantes pour améliorer l'efficacité et la productivité des équipes de construction.
          </p>
          <p>
            Nous comprenons les défis uniques auxquels les entreprises du secteur de la construction sont confrontées, et c'est pourquoi nous avons développé
            ConstructionXpert Services Solution, une application web de gestion de projets de construction.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
