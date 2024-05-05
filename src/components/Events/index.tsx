import React, { useState } from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { SearchIcon } from './SearchIcon';
import EventCard from './EventCard';
import addIcon from "@/public/Icons/add.svg";
import Image from 'next/image';

interface Event {
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  points: number;
  attendees: string[];
}

interface EventsProps {
  title: string;
  events: Event[];
}

export default function Events({ title, events }: EventsProps) {
  const [search, setSearch] = useState("");
  
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <div className="border-2 border-[#27272a] rounded-[15px] p-2">
      <Card>
        <CardBody className="text-2xl pb-0">
          <div className="flex">
            <span>{"Events @ "}</span>
            <span className="text-transparent bg-gradient-to-tr from-yellow-600 to-purple-600 font-bold bg-clip-text">
              &nbsp; {title}
            </span>
          </div>
        </CardBody>
        <CardFooter>
          <Input
            label="Search For An Event"
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search ..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            className="w-full"
          />
        </CardFooter>
      </Card>
      <div className="flex items-center">
        <Card
          className="mt-3"
          isPressable
          isHoverable
          onPress={() => handleOpen()}
        >
          <CardBody>
            <Image src={addIcon} alt="add icon" height={20} width={20} />
          </CardBody>
        </Card>
        {filteredEvents
          .sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          )
          .map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Event
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <Input
                    type="text"
                    label="Name"
                    placeholder="enter your hackathon name"
                  />
                  <Input
                    type="text"
                    label="Location"
                    placeholder="enter hackathon location"
                  />
                  <Input type="date" label="Start Date" />
                  <Input type="date" label="End Date" />
                  <Input type="number" label="Points" defaultValue='0' />
                  <Textarea label="Description" placeholder="enter event description" />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Delete
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
