import { createBrowserRouter } from "react-router";
import { App } from "./App.tsx";
import Home from "./pages/Home";
import SignupPage from './pages/Auth/SignupPage';
import LoginPage from './pages/Auth/LoginPage';
import PriceAlertDetail from "./components/PriceAlertDetail";
import LandingPage from "./components/LandingPage";

export const routes = createBrowserRouter([
    {
        path: "/tracker",
        Component: App,
        children: [
        {
            Component: Home,
            index: true
                
        }
    ]
    },
    {
        path: "/signup",
        Component: SignupPage
    },
    {
        path: "/login",
        Component: LoginPage
    },
    {
        path: "/pricealerts/:id",
        Component: PriceAlertDetail

    },
    {
        path: '/',
        Component: LandingPage
    }
]);