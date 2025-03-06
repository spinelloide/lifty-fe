import Button from "../../ui/Button";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-6 bg-zinc-900 text-white h-[15vh] border-b">
      {/* Logo a sinistra */}
      <div className="text-xl font-bold">Logo</div>

      {/* Menu centrale */}
      <div className="flex justify-center items-center w-full">
        <div className="flex w-full gap-5 justify-center items-center">
          <a
            href="/"
            className="hover:text-gray-400">
            Home
          </a>
          <a
            href="/about"
            className="hover:text-gray-400">
            About
          </a>
          <a
            href="/services"
            className="hover:text-gray-400">
            Services
          </a>{" "}
        </div>
      </div>

      {/* Login/Logout a destra */}
      <div>
        <Button
          onClickHandler={() => (window.location.href = "/login")}
          text="Login"
        />
      </div>
    </div>
  );
};

export default Header;
