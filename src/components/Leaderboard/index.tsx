"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
} from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { use, useEffect, useState } from "react";

export default function Leaderboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [hackers, setHackers] = useState<Record<string, number>>({});

  // const [loaderRef, scrollerRef] = useInfiniteScroll({
  //   hasMore,
  //   onLoadMore: list.loadMore,
  // });

  const fetchHackers = async () => {
    try {
      const response = await fetch(
        `/api/hackers?id=${localStorage.getItem("selectedHackathonId")}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      let hackerDictionary: Record<string, number> = {};
      for (let hacker of data) {
        for (let hackathon of hacker.hackathons) {
          if (
            hackathon.hackathon == localStorage.getItem("selectedHackathonId")
          ) {
            hackerDictionary[hacker.name] = hackathon.points;
          }
        }
      }
      setHackers(hackerDictionary);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHackers();
  }, []);

  return (
    <div>
      <h2 className="text-4xl text-center py-2 text-transparent bg-gradient-to-tr from-yellow-600 to-purple-600 bg-clip-text font-bold">
        {"Leaderboard"}
      </h2>
      <Table>
        <TableHeader>
          <TableColumn>Rank</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Points</TableColumn>
        </TableHeader>
        <TableBody>
          {Object.entries(hackers)
            .sort(([, pointsA], [, pointsB]) => pointsB - pointsA)
            .map(([name, points], index) => (
              <TableRow key={name}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{points}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
