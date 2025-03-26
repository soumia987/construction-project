const Hero = () => {
    return (
      <header className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://github.com/HuXn-WebDev/HTML-CSS-JavaScript-100-Projects/blob/main/90.%20Construction%20Landing%20Page/Images/scott-blake-x-ghf9LjrVg-unsplash.jpg?raw=true")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start px-40 text-white">
          <h3 className="text-3xl">Build <span className="text-[#87bc29]">Your</span></h3>
          <h1 className="text-6xl font-extrabold">DREAM <span className="font-algerian">HOME</span></h1>
          <p className="font-bold mt-4">WE CONSTRUCT YOUR FUTURE</p>
        </div>
      </header>
    );
  };
  
  export default Hero;
  