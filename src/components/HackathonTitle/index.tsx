import React from "react";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import locationIcon from "@/public/Icons/location.svg";
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
  return (
    <div>
      <div className="pb-2">
        <Card>
          <CardBody className="text-center text-2xl text-transparent bg-gradient-to-tr from-yellow-400 to-purple-600 font-bold bg-clip-text">
            {title}
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-4 pb-2">
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
      </div>
    </div>
  );
}
