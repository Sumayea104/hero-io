import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* 404 Illustration with Text */}
      <div className="max-w-md w-full mb-8">
        <img 
          src="/404-illustration.png" // আপনার public ফোল্ডারে এই ছবিটি রাখুন
          alt="404 Illustration" 
          className="w-full h-auto"
        />
      </div>

      {/* Message Section */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-black text-[#001931] mb-2">
          Oops, page not found!
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          The page you are looking for is not available.
        </p>

        {/* Go Back Button */}
        <Link 
          to="/" 
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-2.5 rounded-lg text-xs font-bold transition-all"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;