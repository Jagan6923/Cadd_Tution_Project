import { NavLink } from "react-router-dom";
import {
  Users as UsersIcon,
  GraduationCap as GraduationCapIcon,
  Calendar as CalendarIcon,
  ClipboardList as ClipboardListIcon,
  Bell as BellIcon,
  UserCog as UserCogIcon,
  Home as HomeIcon,
} from "lucide-react";

const IconWrapper = (Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>) => {
  return ({ className }: { className: string }) => <Icon className={className} />;
};

const Users = IconWrapper(UsersIcon);
const GraduationCap = IconWrapper(GraduationCapIcon);
const Calendar = IconWrapper(CalendarIcon);
const ClipboardList = IconWrapper(ClipboardListIcon);
const Bell = IconWrapper(BellIcon);
const UserCog = IconWrapper(UserCogIcon);
const Home = IconWrapper(HomeIcon);
import { useAuthStore } from "../../lib/store";
import { useState, useEffect } from "react";

const navigationConfig = {
  admin: [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Student", href: "/studentslist", icon: Users },
    { name: "Courses", href: "/courses", icon: GraduationCap },
    { name: "Batches", href: "/batches", icon: Calendar },
    { name: "Staff", href: "/staff", icon: UserCog },
  ],
  staff: [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Leave Request", href: "/staff", icon: Calendar },
  ],
  user: [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "New Course", href: "/students", icon: ClipboardList },
  ],
};

export function Sidebar() {
  const user = useAuthStore((state) => state.user);
  type NavigationItem = { name: string; href: string; icon: ({ className }: { className: string }) => JSX.Element };
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);

  // Update navigation when the user logs in or role changes
  useEffect(() => {
    if (user?.role) {
      setNavigation(navigationConfig[user.role] || []);
    }
  }, [user]);

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center justify-center">
        <GraduationCap className="h-8 w-8 text-blue-500" />
        <span className="ml-2 text-xl font-bold text-white">EduAdmin</span>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
