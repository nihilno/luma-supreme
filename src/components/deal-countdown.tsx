"use client";

import { TARGET_DATE } from "@/lib/constants/consts";
import { calculateTimeLeft } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import ViewAll from "./buttons/view-all";
import Statbox from "./statbox";

function DealCountdown() {
  const [time, setTime] = useState<ReturnType<typeof calculateTimeLeft>>();
  useEffect(() => {
    //eslint-disable-next-line
    setTime(calculateTimeLeft(TARGET_DATE));
    const timerInterval = setInterval(() => {
      const newTime = calculateTimeLeft(TARGET_DATE);
      setTime(newTime);

      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(timerInterval);
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  if (!time) {
    return (
      <section className="grid grid-cols-1 gap-8 py-32 sm:grid-cols-2">
        <div className="flex flex-col justify-center gap-3">
          <h3 className="text-2xl font-semibold sm:text-3xl">
            Loading countdown...
          </h3>
        </div>
      </section>
    );
  }

  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    return (
      <section className="grid grid-cols-1 gap-8 py-32 sm:grid-cols-2">
        <div className="flex flex-col justify-center gap-3">
          <h3 className="text-2xl font-semibold sm:text-3xl">Deal has ended</h3>
          <p>
            This deal is no longer available. Check out our latest promotions.
          </p>

          <div className="my-8 text-center">
            <ViewAll />
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/promo.jpg"
            alt="Promotional Image"
            width={300}
            height={200}
            className="overflow-hidden rounded-xl"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-8 py-32">
      <div className="flex flex-col justify-center gap-5">
        <h3 className="text-2xl font-semibold sm:text-3xl md:text-5xl">
          Deal of the month
        </h3>
        <p className="max-w-[60ch]">
          Get ready for shopping like never before! Every purchase comes with
          exclusive perks and offers, making this month a memorable one.
          Don&apos;t miss out.
        </p>
        <ul className="grid grid-cols-4">
          <Statbox label="Days" value={time.days} />
          <Statbox label="Hours" value={time.hours} />
          <Statbox label="Minutes" value={time.minutes} />
          <Statbox label="Seconds" value={time.seconds} />
        </ul>
        <div className="my-8 text-center">
          <ViewAll />
        </div>
      </div>
    </section>
  );
}

export default DealCountdown;
