"use client";
import Logo from "@/components/Logo";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav
            className="
        w-full
        h-22
        fixed
        z-20
        no-select
        "
        >
            <div
                className="
            bg-gradinet-to-r
            from-black
            to-zinc-900/10
            
            "
            >
                <div
                    className="
                px-2
                sm:px-4
                md:px-8
                lg:px-16
                xl:px-24
                2xl:px-32
                max-w-screen-2xl
                "
                >
                    <div
                        className="
                    flex
                    flex-row
                    items-center
                    justify-between
                    "
                    >
                        <Logo />
                        <div
                            className="
                        flex
                        flex-row
                        justify-between
                        "
                        >
                            <Link href={'/about'} className="hover:opacity-70">
                                <div className="text-xl font-semibold text-white">
                                    About
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );

}

export default Navbar;