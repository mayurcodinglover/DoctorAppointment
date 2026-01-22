import Dashboard from "./Dashboard";
import logo from "../../assets/assets_frontend/logo.svg";

const UserLayout = () => {
  return (
    <div className="flex flex-col items-center w-full">

      {/* NAVBAR */}
      <div className="flex justify-between items-center w-[90%] py-4">

        {/* LOGO */}
        <div>
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-6 font-medium">

          {[
            { label: "Home", width: "w-[30px]" },
            { label: "All Doctor", width: "w-[60px]" },
            { label: "About", width: "w-[40px]" },
            { label: "Contact", width: "w-[40px]" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer group"
            >
              <span className="text-gray-700 group-hover:text-[#5f6fff]">
                {item.label}
              </span>
              <div
                className={`h-[3px] ${item.width} bg-[#5f6fff] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
              />
            </div>
          ))}

        </div>

        {/* BUTTON */}
        <div>
          <button className="px-5 py-2 rounded-full bg-[#5f6fff] text-white font-medium hover:bg-[#4a59e0] transition">
            Create Account
          </button>
        </div>
      </div>

      {/* DASHBOARD */}
      <Dashboard />

    </div>
  );
};

export default UserLayout;
