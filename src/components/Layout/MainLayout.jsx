import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import MobileMenu from "../MobileMenu/MobileMenu";

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main>
        <Outlet />
      </main>
      {isMenuOpen && <MobileMenu onClose={toggleMenu} />}
    </>
  );
};

export default MainLayout;
