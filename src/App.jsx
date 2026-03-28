import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import './index.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="relative"> 
      <Toaster 
  position="bottom-center" 
  containerStyle={{
    bottom: 40,
    zIndex: 9999999,
  }}
  toastOptions={{
    duration: 5000, 
    style: {
      background: '#333',
      color: '#fff',
      fontSize: '16px',
      padding: '16px',
    },
  }}
/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;