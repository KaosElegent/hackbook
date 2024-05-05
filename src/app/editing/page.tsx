"use client";

// VS code was complaining so I imported it in the other format
//const NextUIProvider = require('@nextui-org/react');
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import Title from "@/components/HackathonTitle";
import React, { useEffect, useState } from "react";
import HackathonCard from "@/components/HackathonCard";
import Leaderboard from "@/components/Leaderboard";
import { useUser } from '@auth0/nextjs-auth0/client';
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
} from "@nextui-org/react";
import Events from "@/components/Events";
import Image from "next/image";
import addIcon from "@/public/Icons/add.svg";

export default function Editing() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();

  const handleOpen = () => {
    onOpen();
  };

  const addHackathon = async () => {
    const name = document.getElementById("name") as HTMLInputElement;
    const location = document.getElementById("location") as HTMLInputElement;
    const startDate = document.getElementById("startDate") as HTMLInputElement;
    const endDate = document.getElementById("endDate") as HTMLInputElement;

    const res = await fetch("/api/hackathons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user?.email || "",
        name: name.value,
        location: location.value,
        startDate: startDate.value,
        endDate: endDate.value,
      }),
    });

    if (res.ok) {
      onClose();
      fetchHackathons("");
    }
  }

  const fetchHackathons = async (cursor: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(cursor || "/api/hackathons?type=organizer");
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
  },[]);

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
            <Card
              className="absolute bottom-2"
              isPressable
              isHoverable
              onPress={() => handleOpen()}
            >
              <CardBody>
                <Image src={addIcon} alt="add icon" height={20} width={20} />
              </CardBody>
            </Card>
          </div>
        )}
        {isLoading ? (
          <div className="col-span-3 border-2 border-[#27272a] rounded-[15px] p-2 shadow-around flex items-center justify-center">
            <Spinner color="default" />
          </div>
        ) : (
          <div className="col-span-3 border-2 border-[#27272a] rounded-[15px] p-2 shadow-around">
            {selectedHackathon !== null && (
              <Title
                // @ts-ignore
                title={selectedHackathon.name}
                // @ts-ignore
                location={selectedHackathon.location}
                // @ts-ignore
                startDate={formatDate(selectedHackathon.startDate)}
                // @ts-ignore
                endDate={formatDate(selectedHackathon.endDate)}
              />
            )}
            {selectedHackathon !== null && (
              <Events
                // @ts-ignore
                title={selectedHackathon.name}
                // @ts-ignore
                events={selectedHackathon.events}
                // @ts-ignore
                refreshFunction={fetchHackathons}
                // @ts-ignore
                hackathonID={selectedHackathon._id}
              />
            )}
            <Leaderboard />
          </div>
        )}
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add  Hackathon
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-2">
                    <Input id="name" type="text" label="Name" placeholder="enter your hackathon name" />
                    <Input id="location" type="text" label="Location" placeholder="enter hackathon location" />
                    <Input id="startDate" type="date" label="Start Date" />
                    <Input id="endDate" type="date" label="End Date" />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Delete
                  </Button>
                  <Button color="primary" onPress={addHackathon}>
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
