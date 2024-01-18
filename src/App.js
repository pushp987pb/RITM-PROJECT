import "./App.css";
import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider ,Navigate} from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import UserProfile from './components/UserProfile/UserProfile'
import EditProfile from "./components/EditProfile/EditProfile";
let Login = lazy(()=> import("./components/Login/Login"));

function App() {
  //create BrowserRouter object
  let browserRouter = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Suspense fallback = {<p className="display-1 text-danger">Loading Login component........</p>}>  <Login/> </Suspense>,
        },
        {
          path: "user-profile",
          element: <UserProfile />,
        },
        {
          path: "edit-profile",
          element: <EditProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={browserRouter} />;
}
export default App;
