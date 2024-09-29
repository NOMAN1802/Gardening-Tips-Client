// "use client";

import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/src/constants";
import { adminLinks, LinkItem, userLinks } from "./constant";


const NavbarDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();

      const user = {
      name: "Mir",
      token: "adsf asda",
      role: "ADMIN",
      profilePhoto: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fprofile-icon&psig=AOvVaw1LOvv6Oq8ZVQiNhW-cdf0o&ust=1727690354142000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNClrqDy54gDFQAAAAAdAAAAABAE'
       
    };

//   const user = undefined;

  const handleLogout = () => {
    // logout();
    // userLoading(true);
    // if (protectedRoutes.some((route) => pathname.match(route))) {
    //   router.push('/');
    // }

    console.log('logged out')
  };

  const handleNavigation = (path: string) => {
    router.push(path);  
  };

  // Determine the links based on user role
  const links: LinkItem[] = user?.role === "ADMIN" ? adminLinks : userLinks;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" src={user?.profilePhoto} />
      </DropdownTrigger>

      <DropdownMenu aria-label="Static Actions">
       
        {links?.map((link) => (
          <DropdownItem 
            key={link.path} 
            className="block w-full rounded-md px-3 py-2 hover:bg-default-200"
            onClick={() => handleNavigation(link.path)} 
          >
            {link.name}
          </DropdownItem>
        ))}
        <DropdownItem onClick={handleLogout} className="text-danger" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;
