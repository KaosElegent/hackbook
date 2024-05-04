import React from 'react'
import HackathonCard from './HackathonCard'
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";

export default function Hackathons() {
  return (
    <div className="col-span-1 border-[#27272a] border-2 rounded-[15px] p-2">
      <HackathonCard />
    </div>
  );
}
