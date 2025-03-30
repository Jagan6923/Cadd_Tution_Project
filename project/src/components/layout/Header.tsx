import { Bell, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../lib/store';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">
              {user?.name} ({user?.role})
            </span>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <User className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}