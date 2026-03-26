import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { FaStar, FaDownload, FaCommentDots } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import toast from "react-hot-toast";

const AppDetails = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/apps.json");
        const foundApp = res.data.find((a) => String(a.id) === String(id));
        setApp(foundApp);

        const savedApps = JSON.parse(localStorage.getItem("installed-apps")) || [];
        const alreadyExists = savedApps.some((item) => String(item.id) === String(id));
        setIsInstalled(alreadyExists);
      } catch (err) {
        console.error(err);
      } finally {
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
      toast.success("Installation Successful!");
      window.dispatchEvent(new Event("storage"));
    }
  };

  // Dynamic Chart Data mapping from JSON
  const dynamicChartData = app?.ratings?.map(r => ({
    name: r.name,
    value: r.count
  })).reverse() || [];

  if (loading) return <div className="text-center py-20 font-bold">Loading...</div>;
  if (!app) return <div className="text-center py-20 font-bold">App Not Found!</div>;

  return (
    <div className="bg-white min-h-screen pb-20 pt-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 items-start border-b pb-12">
          <div className="w-64 h-64 bg-white border rounded-3xl p-6 shadow-sm flex items-center justify-center">
            <img src={app.image} alt={app.title} className="w-full object-contain" />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-black text-[#001931] mb-1 uppercase italic">{app.title}</h1>
            <p className="text-sm text-blue-500 font-bold mb-6">Developed by {app.companyName}</p>
            
            <div className="flex gap-12 mb-8">
              <div>
                <div className="flex items-center gap-1 text-[#27AE60] mb-1"><FaDownload size={14}/> <span className="text-xs font-bold uppercase">Downloads</span></div>
                <p className="text-2xl font-black">{app.downloads}</p>
              </div>
              <div className="border-x px-12">
                <div className="flex items-center gap-1 text-orange-400 mb-1"><FaStar size={14}/> <span className="text-xs font-bold uppercase">Average Ratings</span></div>
                <p className="text-2xl font-black">{app.ratingAvg}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-purple-500 mb-1"><FaCommentDots size={14}/> <span className="text-xs font-bold uppercase">Total Reviews</span></div>
                <p className="text-2xl font-black">{app.reviews}</p>
              </div>
            </div>

            {/* Clean Install Button Logic */}
            <button 
              onClick={handleInstall}
              disabled={isInstalled}
              className={`px-10 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${
                isInstalled 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200" 
                : "bg-[#00D391] text-white hover:bg-[#00b97e] shadow-lg shadow-green-200 active:scale-95"
              }`}
            >
              {isInstalled ? "✓ Installed" : `Install Now`}
            </button>
          </div>
        </div>

        {/* Chart (Using dynamicChartData) */}
        <div className="py-12 border-b">
          <h2 className="text-lg font-black text-[#001931] mb-8 italic uppercase">Ratings Analysis</h2>
          <div className="h-64 w-full max-w-2xl">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={dynamicChartData} margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold'}} width={80} />
                <Bar dataKey="value" fill="#FF8A00" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="py-12">
          <h2 className="text-lg font-black text-[#001931] mb-6 italic uppercase">Description</h2>
          <p className="text-gray-500 text-sm leading-relaxed text-justify">{app.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AppDetails;