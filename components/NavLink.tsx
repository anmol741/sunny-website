"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`group relative py-2 text-sm font-medium tracking-wide transition-colors ${className}`}
    >
      {children}
      <span
        className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 ${
          isActive ? "scale-x-100" : ""
        }`}
      />
    </Link>
  );
}
