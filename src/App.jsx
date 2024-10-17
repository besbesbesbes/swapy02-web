import AppRouter from "./routes/AppRouter";
import axios from "axios";

function App() {
  // Axios interceptor to replace localhost with the desired IP
  axios.interceptors.request.use(
    (config) => {
      // Check if the request URL contains 'localhost:8000'
      if (config.url.includes("localhost:8000")) {
        config.url = config.url.replace("localhost:8000", "192.168.0.213:8000");
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return (
    <div className="w-full min-h-screen bg-my-bg ">
      <div className="w-10/12 mx-auto text-my-prim text-sm font-sans font-light">
        <AppRouter />
      </div>
    </div>
  );
}
export default App;
