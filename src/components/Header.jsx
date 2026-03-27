import { NavLink, Link } from "react-router-dom";
import { FaGithub, FaBars } from "react-icons/fa"; 
import logo from "../assets/logo.png";

const Header = () => {
  const navLinkStyles = ({ isActive }) => 
    `text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-primary ${
      isActive ? "text-primary border-b-2 border-secondary pb-1" : "opacity-70"
    }`;

  
  const navLinks = (
    <>
      <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
      <li><NavLink to="/apps" className={navLinkStyles}>All Apps</NavLink></li>
      <li><NavLink to="/installation" className={navLinkStyles}>Installation</NavLink></li>
    </>
  );

  return (
    <div className="bg-base-100/90 backdrop-blur-md sticky top-0 z-50 border-b border-base-200">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-12 py-3">
        
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden mr-2">
              <FaBars className="text-xl" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-4 shadow bg-base-100 rounded-box w-52 gap-4 border border-base-200"
            >
              {navLinks}
            </ul>
          </div>

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Logo" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
            <span className="text-lg md:text-2xl font-black italic tracking-tighter uppercase">
              ZENITH<span className="text-primary">APPS</span>
            </span>
          </Link>
        </div>

        
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-10">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end">
          <a 
            href="https://github.com/Sumayea104" 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-sm md:btn-md bg-[#7C3AED] hover:opacity-90 text-white border-none rounded-xl flex items-center gap-2 md:gap-3 px-4 md:px-5 group transition-all duration-300 shadow-lg shadow-primary/20"
          >
            <FaGithub className="text-lg md:text-xl group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest hidden sm:inline">
              Contribute
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;