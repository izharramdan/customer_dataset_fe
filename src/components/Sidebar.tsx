"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../../public/higo-logo.png";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Customer", href: "/customer" },
    { label: "Summary", href: "/summary" },
  ];

  return (
    <aside className="w-full sm:w-64 h-screen sticky top-0 p-6 bg-blue-50 border-r border-blue-200 shadow-md">
      <div className="flex items-center gap-3 mb-8">
        <Image src={Logo} alt="Higo Logo" width={40} height={40} />
        <span className="text-xl font-semibold text-blue-800 tracking-wide">
          Dashboard
        </span>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 group
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-inner border-l-4 border-white"
                    : "text-blue-800 hover:bg-blue-100 hover:pl-5"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
