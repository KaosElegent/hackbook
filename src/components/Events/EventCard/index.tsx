import React from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  CardHeader,
  Link,
} from "@nextui-org/react";
import Image from "next/image";
import locationIcon from "@/public/Icons/location.svg";
import pointsIcon from "@/public/Icons/points.svg";
import personIcon from "@/public/Icons/person.svg";
import { useRouter } from "next/navigation";

interface Event {
  hackathonID: string;
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
  points: number;
  attendees: string[];
}

export default function EventCard({
  hackathonID,
  name,
  startDate,
  endDate,
  location,
  description,
  points,
  attendees,
}: Event) {
  const router = useRouter();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatDatetime = (dateString: string) => {
    const date = new Date((dateString));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    localStorage.setItem("selectedEventName", name);
    console.log(name)
    onOpen();
  };

  const userType = localStorage.getItem("userType");

  const scanQR = async () => {
    onClose();
    router.push(`/qr?id=${hackathonID}?event=${name}`);
  }
  
  return (
    <div className="pt-3 px-2">
      <Card isPressable isHoverable onPress={() => handleOpen()}>
        <CardBody>
          <span className="text-center text-transparent bg-gradient-to-tr from-yellow-400 to-purple-600 bg-clip-text">
            {name}
          </span>
        </CardBody>
      </Card>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="shadow-around">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="text-center text-xl text-transparent bg-gradient-to-tr from-yellow-400 to-purple-600 font-bold bg-clip-text">
                  {name}
                </span>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 gap-2">
                  <Card isPressable>
                    <CardHeader className="pb-0 text-sm">
                      Start Datetime
                    </CardHeader>
                    <CardBody>{formatDatetime(String(startDate))}</CardBody>
                  </Card>
                  <Card isPressable>
                    <CardHeader className="pb-0 text-sm">
                      End Datetime
                    </CardHeader>
                    <CardBody>{formatDatetime(String(endDate))}</CardBody>
                  </Card>
                </div>
                <Card isPressable>
                  <CardBody>
                    <div className="flex">
                      <Image
                        src={locationIcon}
                        alt="location"
                        height={20}
                        width={20}
                      />
                      &nbsp;{location}
                    </div>
                  </CardBody>
                </Card>
                <Link href="/shop">
                  <Card isPressable className="w-full">
                    <CardBody>
                      <div className="flex">
                        <Image
                          src={pointsIcon}
                          alt="points"
                          height={20}
                          width={20}
                        />
                        &nbsp;{`${points} points`}
                      </div>
                    </CardBody>
                  </Card>
                </Link>
                <Card isPressable>
                  <CardBody>
                    <div className="flex">
                      <Image
                        src={personIcon}
                        alt="points"
                        height={20}
                        width={20}
                      />
                      &nbsp;{`${attendees.length} attendees`}
                    </div>
                  </CardBody>
                </Card>
                <Card isPressable>
                  <CardBody>
                    <div className="flex">
                      {description ? description : "No description"}
                    </div>
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={scanQR}
                  isDisabled={userType !== "organizer"}
                >
                  Scan Hacker QR
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
