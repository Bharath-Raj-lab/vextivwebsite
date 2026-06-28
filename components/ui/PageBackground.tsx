import Image from "next/image";

export default function PageBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Image
        src="/assets/background for all.jpg"
        alt="Background"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center", opacity: 0.25 }}
      />
    </div>
  );
}
