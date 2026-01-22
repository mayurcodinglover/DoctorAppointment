import three from "../../assets/assets_frontend/group_profiles.png";
import arrow from "../../assets/assets_frontend/arrow_icon.svg";
import headerimage from "../../assets/assets_frontend/header_img.png";

const Dashboard = () => {
  return (
    <div className="w-[90%] mx-auto mt-4 bg-[#5f6fff] rounded-xl">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-10">

        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-6 md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-snug">
            Book Appointment with Trusted Doctors
          </h1>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <img src={three} alt="group profiles" className="w-20" />
            <p className="text-sm text-white/90 max-w-sm">
              Simply browse through our extensive list of trusted doctors and
              schedule your appointment hassle-free.
            </p>
          </div>

          <div>
            <button className="flex items-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-full font-medium hover:scale-105 transition">
              <span>Book Appointment</span>
              <img src={arrow} alt="arrow" className="w-4" />
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src={headerimage}
            alt="doctor"
            className="w-[280px] md:w-[380px]"
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
