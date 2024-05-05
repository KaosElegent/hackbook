"use client";

import React, { useEffect, useState } from "react";
import { Button, User } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

const StartHere: React.FC = () => {
  const { user } = useUser();

  const router = useRouter();

  const connectAndContinueHack = async () => {
    await fetch("/api/connectMongo");
    router.push("/dashboard");
  };

  const connectAndContinueOrg = async () => {
    await fetch("/api/connectMongo");
    router.push("/editing");
  };

  const routeOrganizer = async () => {
    localStorage.setItem("userType", "organizer");
    await fetch("/api/connectMongo");
    router.push("/api/auth/login");
  };
  const routeHacker = async () => {
    localStorage.setItem("userType", "hacker");
    await fetch("/api/connectMongo");
    router.push("/api/auth/login");
  };

  const createHacker = async () => {
    try {
      const response = await fetch("/api/hackers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const createOrganizer = async () => {
    try {
      const response = await fetch("/api/organizers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    if (user) {
      if (localStorage.getItem("userType") === "organizer") {
        createOrganizer();
        connectAndContinueOrg();
      } else {
        createHacker();
        connectAndContinueHack();
      }
    }
  }, [user]);

  return (
    <section id="start">
      <h3 className="text-4xl text-center pb-24 font-bold">
        What describes{" "}
        <span className="text-transparent bg-gradient-to-tr from-yellow-600 to-purple-600 font-bold bg-clip-text">
          YOU
        </span>{" "}
        best?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 pb-32">
        <Card className="bg-transparent ring-1 ring-[#27272a]">
          <CardHeader className="flex flex-col items-center justify-center px-6">
            <h3 className="max-w-2xl mb-4 text-4xl tracking-tight leading-none md:text-5xl dark:text-white ">
              <span className="text-transparent bg-gradient-to-tr from-yellow-600 to-purple-600 font-bold bg-clip-text">
                Hacker
              </span>
            </h3>
            <Divider />
            <p className="max-w-2xl pt-4 mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              You are a new or seasoned hacker and have signed up for upcoming
              hackathons. You want to actively take part in the hackathons and
              discover insights on your hackathon points, swag available, and
              leaderboard.{" "}
            </p>
          </CardHeader>
          <CardBody>
            <Button color="default" onClick={routeHacker}>
              <span className="font-bold text-lg">Hacker</span>
            </Button>
          </CardBody>
        </Card>
        <Card className="bg-transparent ring-1 ring-[#27272a]">
          <CardHeader className="flex flex-col items-center justify-center px-6">
            <h3 className="max-w-2xl mb-4 text-4xl tracking-tight leading-none md:text-5xl dark:text-white">
              <span className="text-transparent bg-gradient-to-tr from-yellow-600 to-purple-600 font-bold bg-clip-text">
                Organiser
              </span>
            </h3>
            <Divider />
            <p className="max-w-2xl pt-4 mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              You are an organisation/school/institute who is a new or exisiting
              hackathon organizer. You are looking to take advantage of the Live
              Hackathon Management Platform (LHMP) to effectively and
              efficiently run your event.{" "}
            </p>
          </CardHeader>
          <CardBody>
            <Button color="default" onClick={routeOrganizer}>
              <span className="font-bold text-lg">Organizer</span>
            </Button>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default StartHere;
