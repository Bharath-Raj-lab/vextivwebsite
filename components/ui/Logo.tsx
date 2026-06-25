import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  imageSize?: number;
  priority?: boolean;
}

export default function Logo({
  className = "",
  imageClassName = "",
  textClassName = "",
  imageSize = 32,
  priority = false,
}: LogoProps) {
  return (
    <Link href="/" className={className} aria-label="VeXtiv Studio — home">
      <Image
        src="/logo.svg"
        alt="VeXtiv Studio"
        width={120}
        height={imageSize}
        style={{ width: "auto", height: `${imageSize}px` }}
        priority={priority}
        className={imageClassName}
      />
      <span className={textClassName}>
        Ve<span style={{ color: "var(--accent)" }}>X</span>tiv
      </span>
    </Link>
  );
}
