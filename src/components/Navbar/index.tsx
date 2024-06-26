"use client";

import React from "react";
import { useState, useEffect } from "react";
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
  DropdownMenu,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.svg";
import Image from "next/image";
// var QRCode = require('qrcode');
import QRCode from "qrcode";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [userType, setUserType] = useState<string>("");
  const menuItems = ["Home", "Show QR"];

  const pathname = usePathname();
  const { user } = useUser();
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    setUserType(localStorage.getItem("userType") || "");
    if (user?.email) {
      QRCode.toDataURL(user?.email || "").then(setSrc);
    }
  }, [user?.email]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <div>
      <NextUINavbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Image
              src={logo}
              alt="logo"
              height={50}
              width={50}
              className="rounded-lg"
            />{" "}
            <span className="px-4 text-lg font-bold">{"HackBook"}</span>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {user && (
            <NavbarItem isActive>
              <Link
                color="foreground"
                href={userType === "organizer" ? "/editing" : "/dashboard"}
              >
                <Button className="bg-gradient-to-tr from-yellow-700 to-purple-700 shadow-around">
                  <span className="text-lg font-bold">Dashboard</span>
                </Button>
              </Link>
            </NavbarItem>
          )}
          {user &&
            (userType === "organizer" ? (
              <></>
            ) : (
              <NavbarItem>
                <Button
                  color="default"
                  className="shadow-around"
                  onPress={() => handleOpen()}
                >
                  Show QR
                </Button>
              </NavbarItem>
            ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            {user && pathname !== "/" ? (
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
                <DropdownMenu
                  aria-label="User Actions"
                  variant="flat"
                  className="shadow-around rounded-xl"
                >
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in as {userType}</p>
                    <p className="font-bold">@{user.nickname}</p>
                  </DropdownItem>
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <Link href="/shop">
                      <Button>Shop</Button>
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="logout">
                    <Link href="/api/auth/logout">
                      <Button color="danger" variant="light">
                        Log Out
                      </Button>
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <></>
            )}
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem>
            <Link className="w-full" href="/">
              Home
            </Link>
          </NavbarMenuItem>

          {user &&
            (userType === "organizer" ? (
              <></>
            ) : (
              <NavbarMenuItem onClick={() => handleOpen()}>
                Show QR
              </NavbarMenuItem>
            ))}
        </NavbarMenu>
      </NextUINavbar>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                {src && (
                  <Image src={src} alt="qr code" height={300} width={300} />
                )}
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
