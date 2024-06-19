import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Layout()
{
    return (
        <main>
            <header>
                <Navigation />
            </header>
            <Outlet />
        </main>
    )
}