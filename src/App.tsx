import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Create } from "./pages/Create";
import { Update } from "./pages/Update";

const Layout = () => {
  return (
    <>
      <nav className="bg-orange-900 py-8 px-[3%]">
        <h1 className="text-[24px] font-black text-center text-white">
          Supa Smoothies
        </h1>
        <div className="flex justify-center gap-4 mt-4">
          <Link
            to="/"
            className="font-extralight text-[14px] bg-amber-200 px-4 py-2 rounded-md text-black"
          >
            Home
          </Link>
          <Link
            to="/create"
            className="font-extralight text-[14px] bg-amber-200 px-4 py-2 rounded-md text-black"
          >
            Create New Smoothie
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: ":id",
        element: <Update />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
