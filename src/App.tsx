import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { ComponentRoute } from "./types/index";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const toastOpts: ToastContainerProps = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: false,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
  };
  
  return (
    <div className="App">
      <Routes>
        {routes.map((route: ComponentRoute, idx: number) => (
          <Route key={idx} path={route.path} element={<route.component />} />
        ))}
      </Routes>
      <ToastContainer {...toastOpts} />
    </div>
  );
}

export default App;
