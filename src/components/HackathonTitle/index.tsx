import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Spinner,
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
  DatePicker,
  DatePickerProps,
} from "@nextui-org/react";
import locationIcon from "@/public/Icons/location.svg";
import personIcon from "@/public/Icons/person.svg";
import dateIcon from "@/public/Icons/date.svg";
import Image from "next/image";

interface TitleProps {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
}

export default function Title({
  title,
  location,
  startDate,
  endDate,
}: TitleProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userType = localStorage.getItem("userType");

  const handleOpen = () => {
    onOpen();
  };

  const addHacker = async () => {
    const email = document.getElementById("email") as HTMLInputElement;

    const res = await fetch("/api/organizers/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: localStorage.getItem("selectedHackathonId"),
        email: email.value,
      }),
    });

    if (res.ok) {
      onClose();
    }
  };

  return (
    <div>
      <div className="pb-3">
        <Card>
          <CardBody className="text-center text-2xl text-transparent bg-gradient-to-tr from-yellow-400 to-purple-600 font-bold bg-clip-text">
            {title}
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-3 pb-2">
        <Card>
          <CardBody className="text-center text-xl">
            <div className="flex items-center justify-center h-full">
              <Image src={locationIcon} alt="location" height={25} width={25} />
              &nbsp;
              <span className="text-transparent bg-gradient-to-tr from-yellow-600 to-purple-600 bg-clip-text font-bold">
                {location}
              </span>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center text-xl">
            <div className="flex items-center justify-center h-full">
              <Image src={dateIcon} alt="start date" height={25} width={25} />
              &nbsp;
              <span>
                <span className="text-transparent bg-gradient-to-tr from-yellow-600 to-purple-600 bg-clip-text font-bold">
                  {startDate}
                </span>
                {" to "}
                <span className="text-transparent bg-gradient-to-tr from-yellow-600 to-purple-600 bg-clip-text font-bold">
                  {endDate}
                </span>
              </span>
            </div>
          </CardBody>
        </Card>
        <Card
          isPressable={userType === "organizer"}
          isHoverable={userType === "organizer"}
          onPress={() => handleOpen()}
          isDisabled={userType !== "organizer"}
        >
          <CardBody className="text-center text-xl">
            <div className="flex items-center justify-center h-full">
              <Image src={personIcon} alt="hacker" height={25} width={25} />
              &nbsp;
              <span className="text-transparent bg-gradient-to-tr from-yellow-600 to-purple-600 bg-clip-text font-bold">
                Hackers
              </span>
            </div>
          </CardBody>
        </Card>
        <Card isDisabled>
          <CardBody className="text-center text-xl">
            <div className="flex items-center justify-center h-full">
              <Image src={personIcon} alt="organizer" height={25} width={25} />
              &nbsp;
              <span className="text-transparent bg-gradient-to-tr from-yellow-600 to-purple-600 bg-clip-text font-bold">
                Organizers
              </span>
            </div>
          </CardBody>
        </Card>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Hacker
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <Input
                    id="email"
                    type="text"
                    label="Hacker Email"
                    placeholder="Enter the google email of the hacker"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={addHacker}>
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
