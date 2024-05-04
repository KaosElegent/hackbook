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
import { Spinner } from "@nextui-org/react";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = useState(null);

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
  }, []);

  const handleCardClick = (hackathon: React.SetStateAction<null>) => {
    setSelectedHackathon(hackathon);
  };
  return (
    <NextUIProvider>
      <Navbar />
      <main className="grid grid-cols-4 gap-4 mt-8">
        {isLoading ? (
          <Spinner color="default" />
        ) : (
          <>
            <div className="col-span-1 border-[#27272a] border-2 rounded-[15px] p-2">
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
              <div className="col-span-3 border-2 border-[#27272a]  rounded-[15px] p-2">
                {selectedHackathon !== null && <Title title={selectedHackathon.name} />}
                <Leaderboard />
              </div>
          </>
        )}
      </main>
    </NextUIProvider>
  );
}
