import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Papa Faru Bureau de Change"
      width={987}
      height={262}
      className={`h-11 w-auto sm:h-12 ${className}`}
      priority
    />
  );
}
