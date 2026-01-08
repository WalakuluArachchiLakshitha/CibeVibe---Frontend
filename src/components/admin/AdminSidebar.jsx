import {
  CalendarIcon,
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState({
    name: "Admin User",
    email: "",
    imageUrl: assets.profile,
  });
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
  
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setAdminUser({
          name: user.name || "Admin User",
          email: user.email || "",
          imageUrl: assets.profile,
        });
      }
    } catch {
      // Error parsing user data
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const adminNavlinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Add Movie", path: "/admin/add-movies", icon: PlusSquareIcon },
    { name: "List Movies", path: "/admin/list-movies", icon: ListIcon },
    { name: "Add Shows", path: "/admin/add-shows", icon: CalendarIcon },
    { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
    {
      name: "List Bookings",
      path: "/admin/list-bookings",
      icon: ListCollapseIcon,
    },
  ];

  return (
    <>
     
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-20 left-4 z-50 p-2 bg-primary rounded-lg text-white shadow-lg"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

    
      <div className={`
        fixed md:relative
        h-[calc(100vh-64px)] 
        md:flex flex-col items-center pt-8 
        w-64 md:max-w-60 
        border-r border-gray-300/20 
        text-sm 
        bg-black
        transition-transform duration-300 ease-in-out
        z-40
        ${mobileMenuOpen
          ? 'translate-x-0'
          : '-translate-x-full md:translate-x-0'
        }
      `}>
        
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div
              className="cursor-pointer group"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              <div className="relative">
                <img
                  className="h-14 w-14 rounded-full mx-auto border-2 border-primary/30 group-hover:border-primary/50 transition"
                  src={adminUser.imageUrl}
                  alt="admin profile"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
              </div>
            </div>

           
            {profileMenuOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-[70px] w-56 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
               
                <div className="px-4 py-3 border-b border-white/10 bg-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        className="h-10 w-10 rounded-full border border-primary/30"
                        src={adminUser.imageUrl}
                        alt="profile"
                      />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-black"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{adminUser.name}</p>
                      <p className="text-xs text-gray-400 truncate">{adminUser.email}</p>
                    </div>
                  </div>
                </div>

              
                <div className="py-1">
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      toast('Profile settings coming soon!', { icon: '⚙️' });
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Account Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate('/');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition"
                  >
                    <User className="w-4 h-4" />
                    <span>View Customer Site</span>
                  </button>
                </div>

              
                <div className="border-t border-white/10 py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 text-center max-md:hidden">
            <p className="text-base font-semibold">
              {adminUser.name}
            </p>
            {adminUser.email && (
              <p className="text-xs text-gray-400 truncate max-w-[200px]">
                {adminUser.email}
              </p>
            )}
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="mt-2 flex items-center justify-center gap-1 text-xs text-gray-400 hover:text-primary transition mx-auto"
            >
              <span>Account</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

      
        <div className="w-full flex-1 overflow-y-auto">
          {adminNavlinks.map((link, index) => (
            <NavLink
              key={index} to={link.path} end
              className={({ isActive }) =>
                `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400 ${isActive && "bg-primary/15 text-primary group"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon className="w-5 h-5" />
                  <p className="">{link.name}</p>
                  <span
                    className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive && "bg-primary"
                      }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};
