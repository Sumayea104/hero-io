import { useEffect, useState } from "react";
import { FaStar, FaDownload } from "react-icons/fa";
import Swal from 'sweetalert2';

const Installation = () => {
  const [installedApps, setInstalledApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("installed-apps")) || [];
    setInstalledApps(data);
    
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleUninstall = (id, title) => {
    // 🔥 Confirm before removing
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to uninstall ${title}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#001931',
      confirmButtonText: 'Yes, Uninstall!',
      borderRadius: '15px'
    }).then((result) => {
      if (result.isConfirmed) {
        // 1. Filter and update logic
        const updated = installedApps.filter(app => app.id !== id);
        setInstalledApps(updated);
        localStorage.setItem("installed-apps", JSON.stringify(updated));

        // 2. Success Alert
        Swal.fire({
          title: 'Uninstalled!',
          text: 'Application removed successfully.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });

        // 3. Global event for Navbar/Stats update
        window.dispatchEvent(new Event("storage"));
      }
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <span className="loading loading-spinner loading-lg text-[#00D391]"></span>
    </div>
  );

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-20">
      {/* Header Section */}
      <div className="py-12 text-center">
        <h1 className="text-3xl font-black text-[#001931] mb-2 uppercase italic tracking-tight">
          Your Installed Apps
        </h1>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          Explore All Trending Apps on the Market developed by us
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Sub Header: Count & Sort */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-sm font-black text-[#001931]">
            ({installedApps.length}) Apps Found
          </h2>
          <select className="select select-bordered select-xs rounded font-bold text-[10px] focus:outline-none bg-white">
            <option value="size">Sort By Size</option>
            <option value="name">Sort By Name</option>
          </select>
        </div>

        {/* List Layout */}
        <div className="flex flex-col gap-3">
          {installedApps.length > 0 ? (
            installedApps.map((app) => (
              <div 
                key={app.id} 
                className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden border border-gray-50 p-2">
                    <img 
                      src={app.image} 
                      alt={app.title} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-[13px] font-black text-[#001931] mb-1">{app.title}</h3>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400">
                      <span className="flex items-center gap-1 text-[#27AE60] bg-[#F1FFF8] px-1.5 py-0.5 rounded">
                        <FaDownload size={8} /> {app.downloads}
                      </span>
                      <span className="flex items-center gap-1 text-[#F2994A] bg-[#FFF8F1] px-1.5 py-0.5 rounded">
                        <FaStar size={8} /> {app.ratingAvg}
                      </span>
                      <span className="ml-1 opacity-70 italic">{app.size || "253 MB"}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleUninstall(app.id, app.title)}
                  className="bg-[#00D391] hover:bg-red-500 text-white text-[10px] font-black uppercase px-5 py-2 rounded-lg transition-all duration-300 shadow-sm active:scale-95"
                >
                  Uninstall
                </button>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <div className="text-4xl mb-4 grayscale opacity-20">📦</div>
              <h3 className="text-gray-300 font-black uppercase italic tracking-widest">
                Your system is empty
              </h3>
              <p className="text-[10px] text-gray-400 mt-2 font-bold">Try installing some apps from the store</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Installation;