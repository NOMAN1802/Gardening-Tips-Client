// "use client";

import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/src/constants";
import { adminLinks, LinkItem, userLinks } from "./constant";
import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/AuthService";


const NavbarDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { user, setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push('/');
    }
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
