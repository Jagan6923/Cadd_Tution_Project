import { NavLink } from "react-router-dom";
import {
  Users as UsersIcon,
  GraduationCap as GraduationCapIcon,
  Calendar as CalendarIcon,
  ClipboardList as ClipboardListIcon,
  UserCog as UserCogIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";
import { useAuthStore } from "../../lib/store";
import { useState, useEffect } from "react";

const navigationConfig = {
  admin: [
    {
      name: "Dashboard",
      href: "/",
      icon: HomeIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
    {
      name: "Students",
      href: "/studentslist",
      icon: UsersIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
    {
      name: "Courses",
      href: "/courses",
      icon: GraduationCapIcon as React.ComponentType<
        React.SVGProps<SVGSVGElement>
      >,
    },
    {
      name: "Batches",
      href: "/batches",
      icon: CalendarIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
    {
      name: "Staff",
      href: "/staff",
      icon: UserCogIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
  ],
  staff: [
    {
      name: "Dashboard",
      href: "/",
      icon: HomeIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
    {
      name: "Leave Request",
      href: "/staff",
      icon: CalendarIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
    {
      name: "Course",
      href: "/works",
      icon: CalendarIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
  ],
  user: [
    {
      name: "Dashboard",
      href: "/",
      icon: HomeIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    },
    {
      name: "New Course",
      href: "/students",
      icon: ClipboardListIcon as React.ComponentType<
        React.SVGProps<SVGSVGElement>
      >,
    },
    {
      name: "My Course",
      href: "/mycourse",
      icon: GraduationCapIcon as React.ComponentType<
        React.SVGProps<SVGSVGElement>
      >,
    },
  ],
};

export function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const [navigation, setNavigation] = useState<
    {
      name: string;
      href: string;
      icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user?.role) {
      setNavigation(navigationConfig[user.role] || []);
    }
  }, [user]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 rounded-md bg-blue-600 p-2 text-white md:hidden"
      >
        {isOpen ? (
          <CloseIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 p-4 transition-transform md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-center">
          <GraduationCapIcon className="h-8 w-8 text-blue-500" />
          <span className="ml-2 text-xl font-bold text-white">Cadd Cae</span>
        </div>
        <nav className="mt-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Overlay to close sidebar on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
