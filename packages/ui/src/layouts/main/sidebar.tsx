import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { MenuItem } from ".";

interface SidebarProps {
  menuItems?: MenuItem[];
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (isOpen: boolean) => void;
}

const Sidebar = ({
  menuItems = [],
  isSidebarOpen = true,
  setIsSidebarOpen = () => {},
}: SidebarProps) => {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {},
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubmenu = (title: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div
      className={cn(
        "h-screen bg-white dark:bg-gray-800 shadow-lg fixed transition-all duration-300",
        isSidebarOpen ? "w-64" : "w-20",
      )}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        {isSidebarOpen && (
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            KnowledgeGraph
          </h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="py-4">
        <nav aria-label="Main Navigation">
          {menuItems.map((item, idx) => (
            <div key={idx} className="mb-1">
              {item.submenu ? (
                <button
                  onClick={() => toggleSubmenu(item.title)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md mx-2"
                  aria-expanded={expandedMenus[item.title]}
                  aria-controls={`submenu-${idx}`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    {isSidebarOpen && (
                      <span className="ml-3">{item.title}</span>
                    )}
                  </div>
                  {isSidebarOpen && (
                    <ChevronDown
                      size={16}
                      className={cn(
                        "transition-transform duration-200",
                        expandedMenus[item.title] ? "rotate-180" : "",
                      )}
                    />
                  )}
                </button>
              ) : item.path ? (
                <a
                  href={item.path}
                  className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md mx-2"
                >
                  {item.icon}
                  {isSidebarOpen && <span className="ml-3">{item.title}</span>}
                </a>
              ) : null}

              {/* Submenu */}

              {isSidebarOpen && expandedMenus[item.title] && (
                <div id={`submenu-${idx}`} className="pl-10 pr-4 mt-1">
                  {item.submenu?.map((subItem, subIdx) => (
                    <a
                      key={subIdx}
                      href={subItem.path}
                      className="flex items-center py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {subItem.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
