import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import './index.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    
      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'inherit',
            fontWeight: 'bold',
            fontSize: '12px',
          },
        }}
      />
      
      
      <RouterProvider router={router} />
    </>
  );
}

export default App;