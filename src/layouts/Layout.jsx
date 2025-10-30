import { Outlet } from "react-router";
import Header from "../components/Header";

export default function Layout() {
  return (
    <>
      <Header />
      
      <main className="bg-gray-200 h-screen">
        <Outlet />
      </main>
    </>
  )
}
