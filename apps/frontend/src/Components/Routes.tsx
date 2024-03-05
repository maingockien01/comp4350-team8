import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";

// Screens
import LookUpScreen from '../Screens/LookUpScreen';
import CoursesScreen from '../Screens/CoursesScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import MainScreen from '../Screens/MainScreen';
import Calendar from '../Screens/Calendar';
import AddDropCourses from '../Screens/AddDropCourses';
import Roadmap from '../Screens/Roadmap/Roadmap';



const Routes = () => {
  const auth = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ]; // TODO: Error when no public routes - to be investigated

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <MainScreen />,
        },
        {
          path: "/home",
          element: <MainScreen />,
        },
        {
          path: "/lookup",
          element: <LookUpScreen />,
        },
        {
          path: "/courses",
          element: <CoursesScreen />,
        },
        {
          path: "/add-drop",
          element: <AddDropCourses />,
        },
        {
          path: "/calendar",
          element: <Calendar />,
        },
        {
          path: "/roadmap",
          element: <Roadmap />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <LoginScreen />,
    },
    {
      path: "/login",
      element: <LoginScreen />,
    },
    {
      path: "/signup",
      element: <SignupScreen />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!auth?.token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
