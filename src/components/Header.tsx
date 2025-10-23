import Button from "../ui/Button";
import authServices from "../services/AuthServices";
import { routes } from "../utils/routes";
import PrimaryButton from "../ui/PrimaryButton";
import { menuItems } from "../utils/menu";
import Account from "./Account";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useIsMobile } from "../hooks/useIsMobile";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const authData = authServices.getLoginData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const isLoggedIn = useAuth();

  const handleLogout = () => {
    authServices.clearLoginData();
    window.location.reload();
  };

  const navigateTo = (link: string) => {
    window.location.href = link;
    setIsMobileMenuOpen(false); // Chiudi il menu mobile dopo la navigazione
  };

  // Chiudi il menu mobile quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Previeni lo scroll del body quando il menu è aperto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Header principale */}
      {isLoggedIn && (
        <div className="flex justify-between items-center py-4 px-4 md:py-6 md:px-20 bg-transparent text-white h-[15vh] absolute top-8 w-full z-10">
          <div className="bg-gray-900 border-2 border-gray-800 items-center w-full flex p-4 rounded-lg mx-auto max-w-7xl">
            {/* Logo a sinistra */}
            <div
              onClick={() => navigateTo(routes.HOME)}
              className="text-xl md:text-2xl text-orange-300 font-bold cursor-pointer"
            >
              Lifty
            </div>

            {/* Menu desktop - nascosto su mobile */}
            {!isMobile && (
              <div className="flex justify-center items-center w-full">
                <div className="flex w-full gap-10 justify-center items-center">
                  {menuItems.map((el) => (
                    <Button
                      key={el.label}
                      text={el.label}
                      classNames="bg-transparent text-white"
                      onClickHandler={() => navigateTo(el.href)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Login/Logout desktop - nascosto su mobile */}
            {!isMobile && (
              <div>
                {!authData ? (
                  <div className="flex gap-3">
                    <PrimaryButton
                      text="Login"
                      onClickHandler={() =>
                        (window.location.href = routes.LOGIN)
                      }
                    />
                    <PrimaryButton
                      text="Signup"
                      onClickHandler={() =>
                        (window.location.href = routes.SIGNUP)
                      }
                    />
                  </div>
                ) : (
                  <Account
                    onLogout={handleLogout}
                    onSettingsClick={() => console.log("settings")}
                  />
                )}
              </div>
            )}

            {/* Hamburger menu - visibile solo su mobile */}
            {isMobile && (
              <div className="ml-auto">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white hover:text-orange-300 transition-colors duration-200"
                >
                  {isMobileMenuOpen ? (
                    <FaTimes className="w-6 h-6" />
                  ) : (
                    <FaBars className="w-6 h-6" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay per mobile menu */}
      {isMobileMenuOpen && isMobile && isLoggedIn && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar mobile - si apre da destra */}
      {isMobile && isLoggedIn && (
        <div
          className={`fixed top-10 right-0 h-full w-80 bg-gray-900 border-l-2 border-gray-800 transform transition-transform duration-300 ease-in-out z-9999 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pb-20">
            {/* Header della sidebar */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-orange-300">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-orange-300 transition-colors duration-200"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            {/* Menu items */}
            <div className="flex-1 p-6">
              <div className="space-y-4">
                {menuItems.map((el) => (
                  <button
                    key={el.label}
                    onClick={() => navigateTo(el.href)}
                    className="block w-full text-left py-3 px-4 text-white hover:bg-gray-800 hover:text-orange-300 rounded-lg transition-colors duration-200"
                  >
                    {el.label || "Home"}
                  </button>
                ))}
              </div>
            </div>

            {/* Login/Logout nella sidebar */}
            <div className="p-6 border-t border-gray-700">
              {!authData ? (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      window.location.href = routes.LOGIN;
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = routes.SIGNUP;
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    Signup
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-white text-center py-2">
                    <p className="font-semibold">
                      {authData?.user.name} {authData?.user.surname}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      console.log("settings");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
