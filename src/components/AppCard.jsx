import { useState, useEffect } from "react";
import { FaStar, FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; 

const AppCard = ({ app, isInstalledPage, onUninstall }) => {
  const [isInstalled, setIsInstalled] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const savedApps = JSON.parse(localStorage.getItem("installed-apps")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsInstalled(savedApps.some((item) => String(item.id) === String(app.id)));
  }, [app.id]);

  
  const handleNavigate = () => {
    navigate(`/app/${app.id}`);
  };

  const handleInstall = (e) => {
    e.stopPropagation(); 
    const currentApps = JSON.parse(localStorage.getItem("installed-apps")) || [];
    
    if (currentApps.some((item) => String(item.id) === String(app.id))) {
      toast.error("App is already installed!");
      return;
    }

    const updatedApps = [...currentApps, app];
    localStorage.setItem("installed-apps", JSON.stringify(updatedApps));
    setIsInstalled(true);

    toast.success(`${app.title} installed successfully!`, {
      style: { borderRadius: '10px', background: '#333', color: '#fff', fontSize: '12px' },
    });
    
    window.dispatchEvent(new Event("storage")); 
  };

  return (
    <div 
      onClick={handleNavigate} 
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full cursor-pointer hover:shadow-md transition-all group"
    >
      {/* App Image */}
      <div className="aspect-square bg-[#f9f9f9] rounded-lg mb-4 overflow-hidden border border-gray-50">
        <img 
          src={app.image} 
          alt={app.title} 
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300" 
        />
      </div>

      {/* Title */}
      <h3 className="text-[14px] font-black text-[#001931] mb-3 line-clamp-1 group-hover:text-primary transition-colors">
        {app.title}
      </h3>

      {/* Stats */}
      <div className="flex justify-between items-center mb-4 text-[10px] font-bold">
        <div className="flex items-center gap-1 bg-[#F1FFF8] text-[#27AE60] px-2 py-1 rounded-md">
          <FaDownload className="text-[8px]" /> {app.downloads}
        </div>
        <div className="flex items-center gap-1 bg-[#FFF8F1] text-[#F2994A] px-2 py-1 rounded-md">
          <FaStar className="text-[8px]" /> {app.ratingAvg}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto">
        {isInstalledPage ? (
          <button 
            onClick={(e) => {
              e.stopPropagation(); 
              onUninstall(app.id);
            }}
            className="w-full py-2 bg-red-50 text-red-500 text-[10px] font-black uppercase rounded-lg hover:bg-red-500 hover:text-white transition-all"
          >
            Uninstall
          </button>
        ) : (
          <button 
            onClick={handleInstall}
            disabled={isInstalled}
            className={`w-full py-3 rounded-lg font-bold text-[12px] transition-all ${
              isInstalled 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-[#00D391] text-white hover:bg-[#00b97e]"
            }`}
          >
            {isInstalled ? "✓ Installed" : `Install Now`}
          </button>
        )}
      </div>
    </div>
  );
};

export default AppCard;