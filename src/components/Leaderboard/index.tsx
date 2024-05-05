import React from 'react'
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

export default function Leaderboard() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(false);
  const [hackers, setHackers] = React.useState([]);

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
      console.log(data);
      setHackers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2 className="text-4xl text-center py-2 text-transparent bg-gradient-to-tr from-yellow-600 to-purple-600 bg-clip-text font-bold">
        {"Leaderboard"}
      </h2>
      {/* {hackers.map((index, hacker) => (
        <div key={index}>{hacker.name}</div>
      ))} */}
    </div>
  );
}
