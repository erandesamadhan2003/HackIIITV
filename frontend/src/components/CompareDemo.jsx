import React from "react";
import { Compare } from "@/components/ui/compare";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export function CompareDemo() {
  const navigate = useNavigate();
  return (
    <div className="p-4 border bg-gray-300 border-neutral-200 dark:border-neutral-800 px-4 flex gap-3">
      <Compare
        firstImage="https://assets.aceternity.com/code-problem.png"
        secondImage="https://assets.aceternity.com/code-solution.png"
        firstImageClassName="object-cover object-left-top"
        secondImageClassName="object-cover object-left-top"
        className="ml-10 my-7 h-[250px] w-[200px] md:h-[500px] md:w-[500px]"
        slideMode="hover"
      />
      <div className="w-[60%] py-6 mr-10 flex flex-col items-end">
  <p className="text-5xl text-right">
    Debugging alone is character-building.
  </p>
  <p className="text-3xl text-right text-zinc-600 py-4">
    But also… ew. Code with your crew instead.
  </p>
  <p className="text-l text-right text-zinc-600 py-10">
    Tired of sending 200 screenshots just to explain one bug? Same.<br />
    Welcome to the future of coding—where you and your chaos crew <br />
    can hop into a room, write (or break) code together in real time,<br />
    and pretend you know what you're doing. Whether you're building <br />
    the next big thing or just fixing that one semicolon, our online compiler’s <br />
    got you. No setup. No judgment. Just vibes, bugs, and instant <br />
    collab energy. Compile, cry, repeat—with friends.
  </p>
  <Button className="ml-auto mt-4 text-l px-6 py-4" variant="outline" onClick={()=>navigate('/joinroom')}>
    Get started
  </Button>
</div>

    </div>
  );
}