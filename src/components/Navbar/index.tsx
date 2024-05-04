import React from "react";
import { useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  User,
  DropdownMenu
} from "@nextui-org/react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from 'next/navigation'
var QRCode = require('qrcode');

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    "Home",
    "Profile",
    "Log Out",
  ];

  const { user } = useUser();
  const [src, setSrc] = useState<string>('');
  QRCode.toDataURL(user?.email || '').then(setSrc);
  const pathname = usePathname();

  return (
    <div>
      <NextUINavbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">HackBook</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/qr">Scan QR</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <img src={src} />
          </NavbarItem>
          <NavbarItem>
            {user && pathname!=='/' ? (
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: user.picture || undefined,
                    }}
                    className="transition-transform"
                    description={`@${user.nickname}`}
                    name={user.name}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">@{user.nickname}</p>
                  </DropdownItem>
                  <DropdownItem key="logout">
                    <Link href="/api/auth/logout">
                      <Button color="danger">Log Out</Button>
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (<></>)}
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NextUINavbar>
    </div>
  );
}
