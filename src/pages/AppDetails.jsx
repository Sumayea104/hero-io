import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { FaStar, FaDownload, FaCommentDots } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import Swal from 'sweetalert2';

const AppDetails = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Loader start
        const res = await api.get("/apps.json");
        const foundApp = res.data.find((a) => String(a.id) === String(id));
        setApp(foundApp);

        const savedApps = JSON.parse(localStorage.getItem("installed-apps")) || [];
        const alreadyExists = savedApps.some((item) => String(item.id) === String(id));
        setIsInstalled(alreadyExists);

        // --- Artificial Delay 
        setTimeout(() => {
          setLoading(false);
        }, 1000);

      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleInstall = () => {
    if (!app) return;
    const savedApps = JSON.parse(localStorage.getItem("installed-apps")) || [];
    
    if (!isInstalled) {
      const updatedList = [...savedApps, app];
      localStorage.setItem("installed-apps", JSON.stringify(updatedList));
      setIsInstalled(true); 

      //  SweetAlert2 Notification
      Swal.fire({
        title: 'Success!',
        text: `${app.title} Installed Successfully`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        iconColor: '#00D391',
        borderRadius: '15px'
      });

      window.dispatchEvent(new Event("storage"));
    }
  };

  const dynamicChartData = app?.ratings?.map(r => ({
    name: r.name,
    value: r.count
  })).reverse() || [];

  // --- Premium Loader Component ---
  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#00D391] rounded-full animate-spin"></div>
        <p className="text-[#001931] font-bold animate-pulse uppercase tracking-widest text-xs">Loading App Details...</p>
      </div>
    );
  }

  if (!app) return <div className="text-center py-20 font-bold">App Not Found!</div>;

  return (
    <div className="bg-white min-h-screen pb-20 pt-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 items-start border-b pb-12">
          {/* App Image */}
          <div className="w-64 h-64 bg-white border rounded-3xl p-6 shadow-sm flex items-center justify-center">
            <img src={app.image} alt={app.title} className="w-full object-contain hover:scale-105 transition-transform" />
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-black text-[#001931] mb-1 uppercase italic tracking-tight">{app.title}</h1>
            <p className="text-sm text-blue-500 font-bold mb-8">Developed by {app.companyName}</p>
            
            <div className="flex flex-wrap gap-8 md:gap-12 mb-10">
              <div>
                <div className="flex items-center gap-1 text-[#27AE60] mb-1"><FaDownload size={12}/> <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Downloads</span></div>
                <p className="text-2xl font-black text-[#001931]">{app.downloads}</p>
              </div>
              <div className="md:border-x md:px-12 border-gray-100">
                <div className="flex items-center gap-1 text-orange-400 mb-1"><FaStar size={12}/> <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Ratings</span></div>
                <p className="text-2xl font-black text-[#001931]">{app.ratingAvg}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-purple-500 mb-1"><FaCommentDots size={12}/> <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Reviews</span></div>
                <p className="text-2xl font-black text-[#001931]">{app.reviews}</p>
              </div>
            </div>

            <button 
              onClick={handleInstall}
              disabled={isInstalled}
              className={`px-12 py-4 rounded-xl font-black text-[12px] uppercase tracking-[2px] transition-all shadow-lg ${
                isInstalled 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 shadow-none" 
                : "bg-[#00D391] text-white hover:bg-[#00b97e] shadow-green-100 active:scale-95"
              }`}
            >
              {isInstalled ? "✓ Installed" : `Install Now`}
            </button>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="py-12 border-b">
          <h2 className="text-lg font-black text-[#001931] mb-8 italic uppercase tracking-widest">Ratings Analysis</h2>
          <div className="h-64 w-full max-w-2xl bg-[#f9f9f9] p-6 rounded-2xl">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dynamicChartData} margin={{ left: 10 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold', fill: '#001931'}} width={70} />
                <Bar dataKey="value" fill="#FF8A00" radius={[0, 4, 4, 0]} barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Description Section */}
        <div className="py-12">
          <h2 className="text-lg font-black text-[#001931] mb-6 italic uppercase tracking-widest border-l-4 border-[#00D391] pl-4">Description</h2>
          <p className="text-gray-500 text-sm leading-[1.8] text-justify font-medium">{app.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AppDetails;