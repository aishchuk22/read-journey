import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import MobileMenu from "../../components/MobileMenu/MobileMenu";

const MainLayout = () => {
  const location = useLocation();
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const isLoginOrRegister = ["/login", "/register"].includes(location.pathname);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      {isAuth && !isLoginOrRegister && (
        <>
          <Header toggleMenu={toggleMenu} />
          {isMenuOpen && <MobileMenu onClose={toggleMenu} />}
        </>
      )}

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
