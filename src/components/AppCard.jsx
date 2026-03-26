import { FaStar, FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";

const AppCard = ({ app, isInstalledPage, onUninstall }) => {
  
  const savedApps = JSON.parse(localStorage.getItem("installed-apps")) || [];
  const isAlreadyInstalled = savedApps.some((item) => item.id === app.id);

  const handleInstall = () => {
    const currentApps = JSON.parse(localStorage.getItem("installed-apps")) || [];
    const updatedApps = [...currentApps, app];
    localStorage.setItem("installed-apps", JSON.stringify(updatedApps));
    
    toast.success(`${app.title} installed successfully!`, {
      style: { borderRadius: '10px', background: '#333', color: '#fff', fontSize: '12px' },
    });
    
    
    window.dispatchEvent(new Event("storage")); 
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="aspect-square bg-[#E5E5E5] rounded-lg mb-4 overflow-hidden">
        <img src={app.image} alt={app.title} className="w-full h-full object-cover" />
      </div>

      <h3 className="text-[14px] font-black text-[#001931] mb-3 line-clamp-1">{app.title}</h3>

      <div className="flex justify-between items-center mb-4 text-[10px] font-bold">
        <div className="flex items-center gap-1 bg-[#F1FFF8] text-[#27AE60] px-2 py-1 rounded-md">
          <FaDownload className="text-[8px]" /> {app.downloads}
        </div>
        <div className="flex items-center gap-1 bg-[#FFF8F1] text-[#F2994A] px-2 py-1 rounded-md">
          <FaStar className="text-[8px]" /> {app.ratingAvg}
        </div>
      </div>

      <div className="mt-auto">
        {isInstalledPage ? (
          <button 
            onClick={() => onUninstall(app.id)}
            className="w-full py-2 bg-red-50 text-red-500 text-[10px] font-black uppercase rounded-lg hover:bg-red-500 hover:text-white transition-all"
          >
            Uninstall
          </button>
        ) : (
          <button 
            onClick={handleInstall}
            disabled={isAlreadyInstalled}
            className={`w-full py-2 text-[10px] font-black uppercase rounded-lg transition-all border ${
              isAlreadyInstalled 
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed" 
              : "bg-gray-50 text-[#001931] hover:bg-primary hover:text-white border-gray-100"
            }`}
          >
            {isAlreadyInstalled ? "Installed" : "Install Now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AppCard;