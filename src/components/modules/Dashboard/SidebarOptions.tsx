import { IoBagAddSharp } from "react-icons/io5";
import { MdManageAccounts, MdSettings } from "react-icons/md";
import { FaBookmark, FaHome, FaUserEdit, FaUserFriends } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the LinkItem type
export type LinkItem = {
  href: string;
  label: string;
  icon: keyof typeof iconMap;
};

type Props = {
  links: LinkItem[];
  closeSidebar?: () => void;
};

const iconMap = {
  IoBagAddSharp: IoBagAddSharp,
  MdManageAccounts: MdManageAccounts,
  MdSettings: MdSettings,
  FaHome: FaHome,
  FaUserFriends: FaUserFriends,
  BsGearFill: BsGearFill,
  FaBookmark: FaBookmark,
  FaUserEdit: FaUserEdit,
};

const SidebarOptions = ({ links, closeSidebar }: Props) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col mt-6">
      {links.map((link) => {
        const IconComponent = iconMap[link.icon];
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            className={`flex items-center px-4 py-2 transition-colors duration-300 transform ${
              isActive
                ? "bg-default-300 text-default-700 rounded-md"
                : "text-default-600 hover:bg-default-400 rounded-md"
            }`}
            href={link.href}
            onClick={closeSidebar}
          >
            <IconComponent className="w-6 h-6" />
            <span className="mx-4 font-medium">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarOptions;
