import { HiOutlineMail, HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../contexts/AuthContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { success } = useSnackbar();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111827] p-4 font-sans">
      <div className="w-full max-w-[400px] rounded-lg bg-[#1e2532] p-8 shadow-2xl">
        <div className="mb-8">
          <h1 className="mb-1 text-2xl font-semibold text-white">Account</h1>
          <p className="text-sm text-gray-400">Your account information</p>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Email address
            </label>
            <div className="flex items-center gap-3.5 rounded-md bg-[#151b26] py-3 px-4 text-sm text-white border border-transparent transition-colors hover:border-gray-700">
              <HiOutlineMail className="h-5 w-5 text-gray-500" />
              <span>{user ? user.email : "undefined"}</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer flex items-center justify-center gap-2 rounded-full bg-red-500/10 border border-red-500/20 px-7 py-2.5 text-sm font-semibold text-red-500 transition-all hover:bg-red-500 hover:text-white active:scale-95"
            >
              Logout <HiOutlineLogout className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
