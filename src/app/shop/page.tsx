"use client";

// VS code was complaining so I imported it in the other format
//const NextUIProvider = require('@nextui-org/react');
import {
  CardFooter,
  CardHeader,
  Divider,
  NextUIProvider,
  Textarea,
} from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import Title from "@/components/HackathonTitle";
import React, { useEffect, useState } from "react";
import HackathonCard from "@/components/HackathonCard";
import Leaderboard from "@/components/Leaderboard";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import {
  Spinner,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import Events from "@/components/Events";
import Image from "next/image";
import addIcon from "@/public/Icons/add.svg";
import pointsIcon from "@/public/Icons/points.svg";
import { useRouter } from "next/navigation";

export default function Shop() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const router = useRouter();

  const handleOpen = () => {
    onOpen();
  };

  const userType = localStorage.getItem("userType");

  const addItem = async () => {
    // console.log(localStorage.getItem("selectedHackathonId"));
    const name = document.getElementById("name") as HTMLInputElement;
    const points = document.getElementById("points") as HTMLInputElement;
    const description = document.getElementById(
      "description"
    ) as HTMLInputElement;

    const res = await fetch("/api/shops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // email: user?.email || "",
        //@ts-ignore
        id: localStorage.getItem("selectedHackathonId"),
        name: name.value,
        points: points.value,
        description: description.value,
      }),
    });

    if (res.ok) {
      onClose();
      // refreshFunction();
      router.refresh();
    }
  };

  const deleteItem = async (itemName: any) => {
    try {
      const res = await fetch(`/api/shops`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("selectedHackathonId"),
          name: itemName,
        }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      onClose();
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchHackathons = async (cursor: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        cursor || `/api/hackathons?type=${localStorage.getItem("userType")}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log(data);
      setHackathons(data);
      setIsLoading(false);
      setHasMore(data.next !== null);
      if (selectedHackathon === null && data.length > 0) {
        setSelectedHackathon(data[0]);
      }
      return {
        items: data.results,
        cursor: data.next,
      };
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHackathons("");
  }, []);

  const handleCardClick = (hackathon: any) => {
    setSelectedHackathon(hackathon);
    console.log(hackathon._id);
    if (hackathon !== null) {
      localStorage.setItem("selectedHackathonId", hackathon._id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  return (
    <NextUIProvider>
      <Navbar />
      <main className="grid grid-cols-4 gap-4 mt-8">
        {isLoading ? (
          <div className="col-span-1 border-[#27272a] border-2 rounded-[15px] p-2 shadow-around flex items-center justify-center">
            <Spinner color="default" />
          </div>
        ) : (
          <div className="col-span-1 border-[#27272a] border-2 rounded-[15px] p-2 shadow-around relative">
            {hackathons.length > 0 ? (
              hackathons.map((hackathon, index) => (
                <div key={index} className="mb-2">
                  <HackathonCard
                    key={index}
                    data={hackathon}
                    onCardClick={() => handleCardClick(hackathon)}
                  />
                </div>
              ))
            ) : (
              <p className="text-center flex justify-center items-center h-full">
                No Hackathons
              </p>
            )}
            {/* <Card
              className="absolute bottom-2"
              isPressable
              isHoverable
              onPress={() => handleOpen()}
            >
              <CardBody>
                <Image src={addIcon} alt="add icon" height={20} width={20} />
              </CardBody>
            </Card> */}
          </div>
        )}
        {isLoading ? (
          <div className="col-span-3 border-2 border-[#27272a] rounded-[15px] p-2 shadow-around flex items-center justify-center">
            <Spinner color="default" />
          </div>
        ) : (
          <div className="col-span-3 border-2 border-[#27272a] rounded-[15px] p-2 shadow-around">
            <h2 className="text-transparent bg-gradient-to-tr from-yellow-600 to-purple-600 font-bold bg-clip-text text-6xl text-center pb-4">
              SHOP
            </h2>
            <div className="flex items-center text-center gap-3">
              {userType === "organizer" && (
                <Card
                  className="h-[50px] w-[50px]"
                  isPressable
                  isHoverable
                  onPress={() => handleOpen()}
                >
                  <CardBody>
                    <Image
                      src={addIcon}
                      alt="add icon"
                      height={30}
                      width={30}
                    />
                  </CardBody>
                </Card>
              )}
              {selectedHackathon !== null &&
                //@ts-ignore
                selectedHackathon.shop.map((item: any, index: number) => (
                  <Popover placement="bottom" showArrow={true} key={index}>
                    <PopoverTrigger>
                      <Card key={index} isPressable isHoverable>
                        <CardHeader>
                          <h3 className="text-transparent bg-gradient-to-tr from-yellow-600 to-purple-600 font-bold bg-clip-text text-xl text-center">
                            {item.name}
                          </h3>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                          <div className="flex items-center jusity-center">
                            <Image
                              src={pointsIcon}
                              alt="points"
                              height={25}
                              width={25}
                            />
                            <p>&nbsp;{item.points} points</p>
                          </div>
                        </CardBody>
                        {/* <CardFooter>
                    <p>{item.description}</p>
                  </CardFooter> */}
                      </Card>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="px-1 py-2 flex flex-col items-center justify-center">
                        <div className="text-tiny pb-2">
                          {item.description || "No description"}
                        </div>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={() => deleteItem(item.name)}
                          disabled={userType !== "organizer"}
                        >
                          Delete
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                ))}
            </div>
          </div>
        )}
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add Item
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-2">
                    <Input
                      id="name"
                      type="text"
                      label="Name"
                      placeholder="enter your item name"
                    />
                    <Input
                      id="points"
                      type="number"
                      label="Points"
                      defaultValue="0"
                    />
                    <Textarea
                      id="description"
                      label="Description"
                      placeholder="enter a description"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" variant="light" onPress={addItem}>
                    Add
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </main>
    </NextUIProvider>
  );
}
