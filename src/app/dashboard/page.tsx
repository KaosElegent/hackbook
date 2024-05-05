"use client";

// VS code was complaining so I imported it in the other format
//const NextUIProvider = require('@nextui-org/react');
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import Title from "@/components/HackathonTitle";
import React, { useEffect, useState } from "react";
import HackathonCard from "@/components/HackathonCard";
import Leaderboard from "@/components/Leaderboard";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { Spinner, Card, CardBody } from "@nextui-org/react";
import Events from "@/components/Events";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = React.useState();
  const [points, setPoints] = useState(0);

  const fetchPoints = async () => {
    if (selectedHackathon) {
      try {
        // @ts-ignore
        const res = await fetch(
          `/api/points?id=${selectedHackathon._id || ""}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log(data);
        setPoints(data);
      } catch (error) {
        console.error("Error:", error);
      }
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

  const handleCardClick = async (hackathon: any) => {
    setSelectedHackathon(hackathon);
    console.log(hackathon._id);
    localStorage.setItem("selectedHackathonId", hackathon._id);
    fetchPoints();
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
      <main className="grid sm:grid-cols-4 grid-cols-1 gap-4 mt-8">
        {isLoading ? (
          <div className="col-span-1 border-[#27272a] border-2 rounded-[15px] p-2 shadow-around flex items-center justify-center">
            <Spinner color="default" />
          </div>
        ) : (
          <div className="col-span-1 border-[#27272a] border-2 rounded-[15px] p-2 shadow-around">
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
          </div>
        )}
        {isLoading ? (
          <div className="sm:col-span-3 border-2 border-[#27272a] rounded-[15px] p-2 shadow-around flex items-center justify-center">
            <Spinner color="default" />
          </div>
        ) : (
          <div className="sm:col-span-3 border-2 border-[#27272a] rounded-[15px] p-2 shadow-around">
            {selectedHackathon && (
              <Title
                // @ts-ignore
                title={selectedHackathon.name || ""}
                // @ts-ignore
                location={selectedHackathon.location || ""}
                // @ts-ignore
                startDate={formatDate(selectedHackathon.startDate || "")}
                // @ts-ignore
                endDate={formatDate(selectedHackathon.endDate || "")}
                // @ts-ignore
                points={points}
                // @ts-ignore
                role={localStorage.getItem("userType") || ""}
                // @ts-ignore
                id={localStorage.getItem("selectedHackathonId") || ""}
              />
            )}
            {selectedHackathon && (
              <Events
                // @ts-ignore
                title={selectedHackathon.name || ""}
                // @ts-ignore
                events={selectedHackathon.events || ""}
                // @ts-ignore
                refreshFunction={fetchHackathons}
                // @ts-ignore
                hackathonID={selectedHackathon._id || ""}
              />
            )}
            {selectedHackathon && <Leaderboard />}
          </div>
        )}
      </main>
    </NextUIProvider>
  );
}
