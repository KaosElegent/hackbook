'use client'

import React, { useEffect, useState } from "react";
import HackathonCard from "./HackathonCard";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";

export default function Hackathons() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [hackathons, setHackathons] = useState([]);

  const fetchHackathons = async (cursor: string) => {
    console.log("fetching hackathons");
    try {
      const res = await fetch(cursor || "/api/hackathons?type=organizer");
      if (!res.ok) {
        console.error("fetch dont work");
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log(data);
      setHackathons(data);
      setIsLoading(false);
      setHasMore(data.next !== null);
      return {
        items: data.results,
        cursor: data.next,
      };
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchHackathons("");
  }, []);

  return (
    <div className="col-span-1 border-[#27272a] border-2 rounded-[15px] p-2">
      {hackathons.length > 0 ? (
        hackathons.map((hackathon, index) => (
          <div key={index} className="mb-2">
            <HackathonCard key={index} data={hackathon} />
          </div>
        ))
      ) : (
        <p className="text-center flex justify-center items-center h-full">No Hackathons</p>
      )}
    </div>
  );
}
