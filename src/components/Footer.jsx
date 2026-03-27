import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaFacebook, FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaPhoneAlt, FaArrowRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 pt-20 pb-10 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Hero.io" className="h-10 w-10" />
              <span className="text-3xl font-black italic tracking-tighter">
                ZENITH<span className="text-primary">APPS</span>
              </span>
            </Link>
            <p className="text-sm font-medium opacity-60 leading-relaxed max-w-xs">
              The ultimate destination for discovering high-performance applications. Built for developers, designed for everyone.
            </p>
            <div className="flex gap-5 text-xl">
              <a href="#" className="text-primary hover:text-secondary transition-all transform hover:-translate-y-1"><FaFacebook /></a>
              <a href="#" className="text-primary hover:text-secondary transition-all transform hover:-translate-y-1"><FaTwitter /></a>
              <a href="#" className="text-primary hover:text-secondary transition-all transform hover:-translate-y-1"><FaGithub /></a>
              <a href="#" className="text-primary hover:text-secondary transition-all transform hover:-translate-y-1"><FaLinkedin /></a>
            </div>
          </div>

          {/* 2. Navigation */}
          <div>
            <h6 className="text-xs font-black uppercase tracking-[0.2em] text-secondary mb-8">Navigation</h6>
            <ul className="space-y-4 text-sm font-bold opacity-80">
              <li><Link to="/" className="hover:text-primary flex items-center gap-2 group"><FaArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-all" /> Home</Link></li>
              <li><Link to="/apps" className="hover:text-primary flex items-center gap-2 group"><FaArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-all" /> All Apps</Link></li>
              <li><Link to="/installation" className="hover:text-primary flex items-center gap-2 group"><FaArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-all" /> Installation</Link></li>
            </ul>
          </div>

          {/* 3. Support */}
          <div>
            <h6 className="text-xs font-black uppercase tracking-[0.2em] text-secondary mb-8">Support</h6>
            <ul className="space-y-4 text-sm font-bold opacity-80">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* 4. Contact Details */}
          <div>
            <h6 className="text-xs font-black uppercase tracking-[0.2em] text-secondary mb-8">Contact</h6>
            <div className="space-y-5 text-sm font-bold">
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <FaEnvelope />
                </div>
                <span className="opacity-80">hello@zenith.apps</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <FaPhoneAlt />
                </div>
                <span className="opacity-80">+1 (555) 000-12323</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-10 border-t border-base-300 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
            © 2026 HERO.IO — ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-40">
            <span className="hover:text-primary cursor-pointer transition-colors">System Status: Online</span>
            <span className="hover:text-primary cursor-pointer transition-colors">v1.2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;