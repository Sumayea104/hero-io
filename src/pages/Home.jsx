import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import AppCard from "../components/AppCard";
import hero from "../assets/hero.png"; 


const Home = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get("/apps.json")
      .then((res) => setApps(res.data.slice(0, 8))) // Showing first 8 apps like the PNG
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white">
      {/* 1. Hero Section (White Background) */}
      <section className="py-20 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-black text-[#001931] leading-tight">
          We Build <br /> 
          <span className="text-secondary">Productive</span> Apps
        </h1>
        <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-sm md:text-black font-medium">
          At HERO.IO, we craft innovative apps designed to make everyday life simpler, smarter, and more exciting. 
          Our goal is to turn your ideas into digital experiences that truly make an impact.
        </p>
        
        {/* App Store Badges (Simulated) */}
        <div className="flex justify-center gap-4 mt-10">
           <button className="btn btn-outline border-gray-300 rounded-lg flex items-center gap-2 px-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-6" alt="Google Play" />
           </button>
           <button className="btn btn-outline border-gray-300 rounded-lg flex items-center gap-2 px-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-6" alt="App Store" />
           </button>
        </div>

        {/* Mockup Phone Image */}
        <div className="mt-16 flex justify-center">
          <img 
            src={hero} 
            alt="Mobile App Preview" 
            className="max-w-xs md:max-w-md"
          />
        </div>
      </section>

      {/* 2. Purple Stats Section (Using Hero Linear 2 or Secondary Color) */}
      <section className="bg-hero-linear2 py-16 text-white text-center">
        <h2 className="text-2xl font-bold mb-10">Trusted By Millions, Built For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto px-6">
          <div className="space-y-2">
            <p className="text-xs uppercase opacity-80">Total Downloads</p>
            <p className="text-4xl font-black">29.6M</p>
            <p className="text-[10px] opacity-60">21% more than last month</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase opacity-80">Total Reviews</p>
            <p className="text-4xl font-black">906K</p>
            <p className="text-[10px] opacity-60">65% more than last month</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase opacity-80">Active Apps</p>
            <p className="text-4xl font-black">132+</p>
            <p className="text-[10px] opacity-60">20 more will launch</p>
          </div>
        </div>
      </section>

      {/* Trending Apps Section */}
<section className="py-20 max-w-7xl mx-auto px-4 bg-[#F8F9FA]"> 
  <div className="text-center mb-12">
    <h2 className="text-4xl font-black text-[#001931]">Trending Apps</h2>
    <p className="text-gray-500 text-sm mt-2 font-medium italic">
      Explore All Trending Apps on the Market developed by us
    </p>
  </div>

  {/* The 4-column Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    {apps.map((app) => (
      <AppCard key={app.id} app={app} />
    ))}
  </div>

  {/* The Figma Gradient Button */}
  <div className="flex justify-center">
    <Link 
    to="/apps" 
    className="btn bg-hero-linear2 hover:opacity-90 text-white border-none px-12 rounded-lg font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 transition-all"
  >
    Show All
  </Link>
  </div>
</section>
    </div>
  );
};

export default Home;