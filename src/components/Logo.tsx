import Link from "next/link";

/**
 * Ishika Desale monogram — a sharp, angular "iD" mark (no rounded curves).
 */
export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="Ishika Desale — home"
      className="group flex items-center"
    >
      <svg
        viewBox="0 0 34 30"
        className="h-5 w-auto md:h-[1.4rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={8}
      >
        {/* i — square dot + stem */}
        <rect x="2.5" y="1.6" width="3.8" height="3.8" fill="currentColor" stroke="none" />
        <path d="M4.4 10 V25" />
        {/* D — sharp stem corners, curved bowl */}
        <path d="M14 25 V6 H20 A9.5 9.5 0 0 1 20 25 Z" />
      </svg>
    </Link>
  );
}
