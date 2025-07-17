import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";

import { refreshUser } from "../../redux/auth/authOperations";
import {
  selectIsRefreshing,
  selectIsLoggedIn,
} from "../../redux/auth/authSelectors";

const AppContent = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <>
      {!hideHeader && isLoggedIn && <Header />}
      <Routes>
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
          }
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/" component={<LoginPage />} />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute redirectTo="/login" component={<div>HomePage</div>} />
          }
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default AppContent;
