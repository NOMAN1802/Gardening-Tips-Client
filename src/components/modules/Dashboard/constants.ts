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
  {
    href: "/dashboard/payment",
    label: "Payment History",
    icon: "GiMoneyStack",
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
  {
    href: "/profile/change-password",
    label: "Password Change",
    icon: "FaShieldAlt",
  },
];
