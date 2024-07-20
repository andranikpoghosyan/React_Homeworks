"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  href: string;
  name?: string;
  surname?: string;
  className?: string;
}
export const NavLink = ({
  children,
  href,
  name = "has-background-primary",
  className,
}: Props) => {
  const path = usePathname();
  if (path == href) {
    className += " " + name;
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
};
