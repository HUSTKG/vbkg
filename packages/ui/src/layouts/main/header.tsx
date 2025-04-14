import { Bell, Search } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  notificationCount: number;
  userName: string;
  userAvatar?: React.ReactNode;
}

export function Header({
  onSearch,
  onNotificationClick,
  notificationCount,
  userName,
  userAvatar,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };
  return (
        <header className="bg-white dark:bg-gray-800 shadow-sm h-16 fixed w-full z-10">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center">
              <form onSubmit={handleSearch} className="relative w-64">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search size={18} className="text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 text-sm bg-gray-100 dark:bg-gray-700 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={onNotificationClick}
                aria-label={`${notificationCount} unread notifications`}
              >
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </button>
              
              <div className="flex items-center space-x-2">
                {userAvatar || (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {userName.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium dark:text-gray-300">{userName}</span>
              </div>
            </div>
          </div>
        </header>
  );
}
