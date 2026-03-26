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

  const chartData = [
    { name: "5 star", value: 10000 },
    { name: "4 star", value: 7000 },
    { name: "3 star", value: 3000 },
    { name: "2 star", value: 2000 },
    { name: "1 star", value: 1000 },
  ];

  // useEffect(() => {
  //   api.get("/apps.json").then((res) => {
  //     const foundApp = res.data.find((a) => String(a.id) === String(id));
  //     setApp(foundApp);

    
  //     const savedApps = JSON.parse(localStorage.getItem("installed-apps")) || [];
  //     const exists = savedApps.some((item) => String(item.id) === String(id));
  //     setIsInstalled(exists);
      
  //     setLoading(false);
  //   });
  // }, [id]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await api.get("/apps.json");
      const foundApp = res.data.find((a) => String(a.id) === String(id));
      setApp(foundApp);
    }
    catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
},[id]);


  const handleInstall = () => {
    if (!app) return;

    const savedApps = JSON.parse(localStorage.getItem("installed-apps")) || [];
    const alreadyExists = savedApps.some((item) => String(item.id) === String(app.id));

    if (!alreadyExists) {
      const updatedList = [...savedApps, app];
      localStorage.setItem("installed-apps", JSON.stringify(updatedList));

      
      setIsInstalled(true); 

      toast.success("Installation Successful!", {
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });

      window.dispatchEvent(new Event("storage"));
    }
  };

  if (loading) return <div className="text-center py-20 font-bold">Loading...</div>;
  if (!app) return <div className="text-center py-20 font-bold">App Not Found!</div>;

  return (
    <div className="bg-white min-h-screen pb-20 pt-10 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Section: App Info */}
        <div className="flex flex-col md:flex-row gap-10 items-start border-b pb-12">
          <div className="w-64 h-64 bg-white border rounded-3xl p-6 shadow-sm flex items-center justify-center">
             <img src={app.image} alt={app.title} className="w-full object-contain" />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-black text-[#001931] mb-1">{app.title}</h1>
            <p className="text-sm text-blue-500 font-bold mb-6">Developed by productive.io</p>
            
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
                <p className="text-2xl font-black">54K</p>
              </div>
            </div>

            <button 
              onClick={handleInstall}
              disabled={isInstalled}
              className={`px-8 py-3 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${
                isInstalled 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200" 
                : "bg-[#00D391] text-white hover:bg-[#00b37a] shadow-md active:scale-95"
              }`}
            >
              {isInstalled ? "✓ Installed" : `Install Now (${app.size || '251 MB'})`}
            </button>
          </div>
        </div>

        {/* Ratings Chart */}
        <div className="py-12 border-b">
          <h2 className="text-lg font-black text-[#001931] mb-8 italic">Ratings</h2>
          <div className="h-62.5 w-full max-w-2xl">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={chartData} margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold', fill: '#999'}} width={80} />
                <Bar dataKey="value" fill="#FF8A00" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Description Section */}
        <div className="py-12">
          <h2 className="text-lg font-black text-[#001931] mb-6 italic">Description</h2>
          <div className="text-gray-500 text-sm leading-relaxed space-y-6 text-justify">
            <p>This focus app takes the proven Pomodoro technique and makes it even more practical for modern lifestyles. Instead of just setting a timer, it builds a complete environment for deep work, minimizing distractions and maximizing concentration.</p>
            <p>A unique feature of this app is the integration of task lists with timers. You can assign each task to a specific Pomodoro session, making your schedule more structured.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AppDetails;