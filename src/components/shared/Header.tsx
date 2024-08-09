"use client";
import CloseIcon from "@/icons/CloseIcon";
import MenuIcon from "@/icons/MenuIcon";
import { initialState, setUser } from "@/redux/features/user/userSlice";
import { useAppSelector } from "@/redux/hook";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Doctor" },
  { href: "/contact-us", label: "Contact Us" },
];

const Header: React.FC = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { _id, name, email } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const path = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogOut = () => {
    Cookies.remove("accessToken");

    dispatch(setUser(initialState));
    setNavOpen(false);
  };

  return (
    <div className={`sticky top-0 z-50 ${scrolled ? "bg-white" : "bg-transparent"} text-black transition-colors duration-300`}>
      <header className={``}>
        <nav className={`w-full shadow-md py-[20px] px-[10px] md:px-[40px] lg:px-[120px]`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[40px] lg:gap-[80px]">
              <div className="font-bold text-[16px] lg:text-[20px]">
                <Link href="/">DocCare</Link>
              </div>
            </div>
            <div className="md:flex items-center gap-[20px] lg:gap-[40px] hidden">
              <ul className="md:flex gap-[10px] lg:gap-[20px] hidden">
                {navItems.map(
                  (
                    { href, label }: { href: string; label: string },
                    i: number
                  ) => (
                    <li
                      key={i + "link"}
                      className={`text-[14px] lg:text-[18px] font-medium ${
                        path === href ? "activeLink" : ""
                      }`}
                    >
                      <Link href={href}>{label}</Link>
                    </li>
                  )
                )}
              </ul>
              <div className="flex items-center gap-[10px]">
                {!_id ? (
                  <Link href="/login" className="font-semibold text-[16px]">
                    SignIn
                  </Link>
                ) : (
                  <Link
                    href="/profile"
                    className="relative flex items-center gap-[5px] border rounded-md py-[2px] px-[5px]"
                  >
                    <CgProfile size={20} />
                    <p className="hidden lg:block">{name || "user"}</p>
                  </Link>
                )}
              </div>
            </div>
            <div className="flex md:hidden gap-[20px]">
              <div className="flex items-center gap-[10px]">
                {!_id ? (
                  <Link href="/login" className="font-semibold text-[16px]">
                    SignIn
                  </Link>
                ) : (
                  <Link
                    href="/profile"
                    className="relative flex items-center gap-[5px] border rounded-md py-[2px] px-[5px]"
                  >
                    <CgProfile size={20} />
                  </Link>
                )}
              </div>
              {navOpen ? (
                <div
                  onClick={() => setNavOpen(!navOpen)}
                  className="menuBtn center"
                >
                  <CloseIcon />
                </div>
              ) : (
                <div
                  onClick={() => setNavOpen(!navOpen)}
                  className="menuBtn center"
                >
                  <MenuIcon />
                </div>
              )}
            </div>
          </div>
        </nav>
        <div
          className={`md:hidden fixed top-0 bg-white w-full h-full z-50 transition-all ease-in ${
            navOpen ? "left-0" : "-left-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="focus:outline-none"
            >
              {navOpen ? (
                <CloseIcon color="black" />
              ) : (
                <MenuIcon color="black" />
              )}
            </button>
          </div>
          <div>
            <p className="text-[24px] font-bold text-orange500 px-[20px]">
              Hello {name || ""}
            </p>
          </div>
          <ul className="flex flex-col gap-4 mt-4 px-4 text-black">
            {navItems.map((item, index) => (
              <li
                key={index}
                onClick={() => setNavOpen(false)}
                className={`text-[18px] font-medium hover:bg-gray-200 py-[10px] rounded-md px-[20px] ${
                  path === item.href ? "bg-gray-200" : ""
                }`}
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-0 w-full text-center pb-4">
            <div className="flex items-center gap-[10px] text-black mb-[10px] px-4 rounded-md">
              {_id ? (
                <button
                  onClick={() => handleLogOut()}
                  className="relative flex justify-center items-center gap-[5px] border rounded-md px-[5px] py-[10px] w-full bg-borderColor hover:bg-borderDark hover:text-white transition-all ease-in font-semibold"
                >
                  Log Out
                </button>
              ) : (
                <Link
                  href="/login"
                  className="font-semibold text-[16px] md:hidden text-center py-[10px] w-full bg-borderColor hover:bg-borderDark hover:text-white transition-all ease-in"
                >
                  SignIn
                </Link>
              )}
            </div>
            <p className="text-sm text-gray-600">All rights reserved by NNC</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
