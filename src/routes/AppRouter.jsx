import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import UserInfo from "../pages/UserInfo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Assets from "../pages/Assets";
import Shipping from "../pages/Shipping";
import NotFound from "../pages/NotFound";
import Offer from "../pages/Offer";
import Search from "../pages/Search";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: "/userinfo", element: <UserInfo /> },
      // { path: "/assets", element: <Assets /> },
      // { path: "/shipping", element: <Shipping /> },
      // { path: "/offer", element: <Offer /> },
      // { path: "/notfound", element: <NotFound /> },
      // { path: "/search", element: <Search /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
export default function AppRouter() {
  return <RouterProvider router={appRouter} />;
}
