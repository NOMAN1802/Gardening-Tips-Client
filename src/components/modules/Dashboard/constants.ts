import { LinkItem } from "./SidebarOptions";

export const adminLinks: LinkItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "MdManageAccounts",
  },

  {
    href: "/dashboard/manage-posts",
    label: "Manage Posts",
    icon: "IoBagAddSharp",
  },
  {
    href: "/dashboard/manage-users",
    label: "Manage Users",
    icon: "FaUserEdit",
  },
];

export const userLinks: LinkItem[] = [
  {
    href: "/profile",
    label: "My Account",
    icon: "MdManageAccounts",
  },
  {
    href: "/profile/my-posts",
    label: "My Posts",
    icon: "MdManageAccounts",
  },
  {
    href: "/profile/my-favorites",
    label: "My Favorites",
    icon: "FaBookmark",
  },
];
