import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/users/users";
import Vehicles from "./pages/vehicles/vehicles";
import Trips from "./pages/trips/trips";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import RegisterVehicle from "./components/RegisterVehicle/RegisterVehicle";
import TripDetails from "./pages/tripDetails/tripDetails";
import EditVehicle from "./pages/editVehicle/editVehicle";

export const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/users",
    children: [
      {
        path: "",
        element: <Users />,
      },
      {
        path: "register",
        element: <RegisterUser />,
      },
    ],
  },
  {
    path: "/vehicles",
    children: [
      {
        path: "",
        element: <Vehicles />,
      },
      {
        path: "register",
        element: <RegisterVehicle />,
      },
      {
        path: "/vehicles/:vehicleId/:ownerId",
        element: <EditVehicle />,
      },
    ],
  },
  {
    path: "/trips",
    children: [
      {
        path: "",
        element: <Trips />,
      },
      {
        path: "/trips/:ownerId/:vehicleId/:tripId",
        element: <TripDetails />,
      },
    ],
  },
];

export const authRoutes = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
];
