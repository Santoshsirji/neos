'use client';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return ( 
        <Link
        href={'/'}
        onClick={() => router.refresh()}
        className="
        hover:opacity-80
        flex
        flex-row
        items-center
        cursor-pointer
        "
        >
            <Image src={'/logo.jpeg'} width={80} height={100} alt="Logo" className="cursor-pointer"/>
            <div>
                <h1 className="text-gray-200 opcaity-60 text-2xl font-semibold">Cosmic Watchers</h1>
            </div>
        </Link>
     );
}
 
export default Logo;