import { NavLink, Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import logo from "../assets/logo.png";

const Header = () => {
  const navLinkStyles = ({ isActive }) => 
    `text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-primary ${
      isActive ? "text-primary border-b-2 border-secondary pb-1" : "opacity-70"
    }`;

  return (
    <div className="bg-base-100/90 backdrop-blur-md sticky top-0 z-50 border-b border-base-200">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-12 py-3">
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-black italic tracking-tighter uppercase">
              HERO<span className="text-primary">.IO</span>
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-10">
            <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
            <li><NavLink to="/apps" className={navLinkStyles}>All Apps</NavLink></li>
            <li><NavLink to="/installation" className={navLinkStyles}>Installation</NavLink></li>
          </ul>
        </div>

        <div className="navbar-end">
          {/* Using your custom linear gradient variable */}
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="btn bg-hero-linear2 hover:opacity-90 text-white border-none rounded-xl flex items-center gap-3 px-5 group transition-all duration-300 shadow-lg shadow-primary/20"
          >
            <FaGithub className="text-xl group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest hidden sm:inline">
              Contribute
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;