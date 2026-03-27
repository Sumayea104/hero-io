import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import AppCard from "../components/AppCard";
import hero from "../assets/hero.png"; 

const Home = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get("/apps.json")
      .then((res) => setApps(res.data.slice(0, 8))) 
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white font-sans ">
      
      {/* --- 1. HERO SECTION --- */}
      <section className="pt-20 md:pt-28 pb-0 text-center px-4 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-black text-[#001931] leading-[1.1] tracking-tighter uppercase italic">
            We Build <br /> 
            <span className="text-secondary">Productive</span> Apps
          </h1>
          
          {/* Store Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-10 mb-16">
            <a href="https://play.google.com" className="flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 group">
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" className="h-5 md:h-6" alt="Play Store" />
              <span className="text-lg md:text-xl font-bold text-[#001931]">Google Play</span>
            </a>

            <a href="https://www.apple.com/app-store/" className="flex items-center gap-3 px-6 py-2 md:px-8 md:py-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 group">
              <div className="bg-info p-1.5 rounded-lg flex items-center justify-center">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_Logo_2017.svg" 
                  className="h-5 w-5 brightness-0 invert" 
                  alt="App Store" 
                />
              </div>
              <span className="text-lg md:text-xl font-bold text-[#001931]">App Store</span>
            </a>
          </div>

          {/* --- SINGLE PHONE VIEW --- */}
          <div className="flex justify-center relative overflow-visible px-4">
            <img 
              src={hero} 
              alt="Mobile App Preview" 
              className="w-full max-w-75 md:max-w-4xl drop-shadow-2xl relative z-20  object-contain" 
            />
          </div>
        </div>
      </section>

      {/* --- 2. STATS/REVIEW SECTION --- */}
      
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-hero-linear2 pt-20 md:pt-20 pb-24 text-white text-center z-30 -mt-10 md:-mt-10 shadow-[0_-15px_40px_rgba(0,0,0,0.15)]">
        <div className="w-full px-6">
          <h2 className="text-xl md:text-3xl font-black mb-16 md:mb-24 tracking-[0.2em] uppercase italic opacity-80">
            Trusted By Millions, Built For You
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-7xl mx-auto">
            <div className="space-y-3">
              <p className="text-xs uppercase font-bold tracking-widest opacity-60">Total Downloads</p>
              <p className="text-6xl md:text-7xl font-black tracking-tighter">29.6M</p>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">21% MORE THAN LAST MONTH</p>
            </div>
            
            <div className="space-y-3 border-y md:border-y-0 md:border-x border-white/10 py-12 md:py-0">
              <p className="text-xs uppercase font-bold tracking-widest opacity-60">Total Reviews</p>
              <p className="text-6xl md:text-7xl font-black tracking-tighter">906K</p>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">65% MORE THAN LAST MONTH</p>
            </div>
            
            <div className="space-y-3">
              <p className="text-xs uppercase font-bold tracking-widest opacity-60">Active Apps</p>
              <p className="text-6xl md:text-7xl font-black tracking-tighter">132+</p>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">20 MORE WILL LAUNCH</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. TRENDING APPS SECTION --- */}
      <section className="py-24 bg-[#F9FAFB] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#001931] tracking-tight uppercase italic">Trending Apps</h2>
            <p className="text-gray-900 bold text-sm mt-3 font-medium uppercase tracking-widest opacity-70">
              Explore All Trending Apps on the Market developed by us
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {apps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>

          <div className="flex justify-center mt-20">
            <Link 
              to="/apps" 
              className="px-16 py-5 bg-hero-linear2 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all active:scale-95"
            >
              Show All
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;