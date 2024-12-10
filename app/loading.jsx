"use client";
import { ClockLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="
        w-full
        h-screen
        flex
        flex-col
        items-center
        justify-center
        bg-black
        ">
            <ClockLoader
                color="#2309ac"
                size={202}
                speedMultiplier={1}
            />
        </div>
    )
}