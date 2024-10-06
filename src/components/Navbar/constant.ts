export interface LinkItem {
  name: string;
  path: string;
}

export const adminLinks: LinkItem[] = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Settings", path: "/dashboard/settings" },
];

export const userLinks: LinkItem[] = [
  { name: "Profile", path: "/profile" },
  { name: "My Posts", path: "/profile/my-posts" },
  { name: "Settings", path: "/profile/settings" },
];
