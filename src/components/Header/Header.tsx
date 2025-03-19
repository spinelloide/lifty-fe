import Button from "../../ui/Button";
import authServices from "../../services/AuthServices";
import { routes } from "../../utils/routes/routes";
import PrimaryButton from "../../ui/PrimaryButton";

const Header = () => {
  const authData = authServices.getLoginData();

  const handleLogout = () => {
    authServices.clearLoginData();
    window.location.reload();
  };

  const navigateTo = (link: string) => {
    window.location.href = link;
  };

  return (
    <div className="flex justify-between items-center py-6 px-20 bg-transparent text-white h-[15vh] absolute top-0 w-screen  ">
      <div className="bg-gray-900 border-2 border-gray-800 items-center w-full flex p-4 rounded-lg mx-auto max-w-7xl">
        {/* Logo a sinistra */}
        <div
          onClick={() => navigateTo(routes.HOME)}
          className="text-xl font-bold cursor-pointer text-white"
        >
          Lifty
        </div>
        {/* Menu centrale */}
        <div className="flex justify-center items-center w-full">
          <div className="flex w-full gap-10 justify-center items-center">
            <Button
              text="Home"
              classNames="bg-transparent  text-white"
              onClickHandler={() => navigateTo(routes.HOME)}
            />
            <Button
              text="About"
              classNames="bg-transparent  text-white"
              onClickHandler={() => navigateTo(routes.ABOUT)}
            />
            <Button
              text="Services"
              classNames="bg-transparent  text-white"
              onClickHandler={() => navigateTo(routes.HOME)}
            />
          </div>
        </div>
        {/* Login/Logout a destra */}
        <div>
          {!authData ? (
            <PrimaryButton
              text="Login"
              onClickHandler={() => (window.location.href = routes.LOGIN)}
            />
          ) : (
            <PrimaryButton onClickHandler={handleLogout} text="Logout" />
          )}
        </div>{" "}
      </div>
    </div>
  );
};

export default Header;
