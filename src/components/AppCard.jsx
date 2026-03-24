import { FaStar, FaDownload } from "react-icons/fa";

const AppCard = ({ app }) => {
  
  const handleInstall = () => {
    // 1. Get existing installed apps from localStorage (or empty array)
    const savedApps = JSON.parse(localStorage.getItem("installed-apps")) || [];
    
    // 2. Check if this app is already in the list
    const isAlreadyAdded = savedApps.find((item) => item.id === app.id);

    if (!isAlreadyAdded) {
      // 3. Add new app to the list
      const updatedApps = [...savedApps, app];
      localStorage.setItem("installed-apps", JSON.stringify(updatedApps));
      alert(`${app.title} has been added to your Installations!`);
    } else {
      alert("This app is already installed.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
      {/* Image Area */}
      <div className="aspect-square bg-[#E5E5E5] rounded-lg mb-4 overflow-hidden">
        {app.image ? (
          <img src={app.image} alt={app.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>

      <h3 className="text-[14px] font-black text-[#001931] mb-3 truncate">{app.title}</h3>

      {/* Badges */}
      <div className="flex justify-between items-center mb-4 text-[10px] font-bold">
        <div className="flex items-center gap-1 bg-[#F1FFF8] text-[#27AE60] px-2 py-1 rounded-md border border-[#DFF6E9]">
          <FaDownload className="text-[8px]" /> {app.downloads}
        </div>
        <div className="flex items-center gap-1 bg-[#FFF8F1] text-[#F2994A] px-2 py-1 rounded-md border border-[#FEEBD8]">
          <FaStar className="text-[8px]" /> {app.ratingAvg}
        </div>
      </div>

      {/* Install Button */}
      <button 
        onClick={handleInstall}
        className="w-full py-2.5 bg-gray-50 hover:bg-primary hover:text-white text-[#001931] text-[10px] font-black uppercase tracking-widest rounded-lg border border-gray-100 transition-all"
      >
        Install Now
      </button>
    </div>
  );
};

export default AppCard;