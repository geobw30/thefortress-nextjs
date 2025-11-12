"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Function to check if a link is active
  const isActive = (href) => {
    // For the home page, we want exact match
    if (href === "/") {
      return pathname === "/";
    }
    // For other pages, we want to match the start of the path
    // This allows for subpages to also highlight the main nav item
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  // Close mobile menu when resizing to larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll detection to show/hide header
  useEffect(() => {
    const updateHeaderVisibility = () => {
      // Always show header on non-home pages
      if (pathname !== "/") {
        setIsVisible(true);
        return;
      }

      // On home page, show header when scrolling down, hide when at top
      if (window.scrollY > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Set initial state
    updateHeaderVisibility();

    window.addEventListener("scroll", updateHeaderVisibility);

    return () => window.removeEventListener("scroll", updateHeaderVisibility);
  }, [pathname]);

  return (
    <header
      className={`bg-white shadow-md transition-all duration-300 ease-in-out fixed top-0 left-0 right-0 z-50 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              <span>
                <img
                  src="/images/logo.jpg"
                  width="120"
                  height="120"
                  alt="The
                Fortress"
                />
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`text-gray-800 hover:text-primary font-medium transition duration-300 ${
                isActive("/") ? "bg-[rgba(176,42,5,0.1)] px-3 py-1 rounded" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-gray-800 hover:text-primary font-medium transition duration-300 ${
                isActive("/about")
                  ? "bg-[rgba(176,42,5,0.1)] px-3 py-1 rounded"
                  : ""
              }`}
            >
              About
            </Link>
            <Link
              href="/programs"
              className={`text-gray-800 hover:text-primary font-medium transition duration-300 ${
                isActive("/programs")
                  ? "bg-[rgba(176,42,5,0.1)] px-3 py-1 rounded"
                  : ""
              }`}
            >
              Programs
            </Link>
            <Link
              href="/impact"
              className={`text-gray-800 hover:text-primary font-medium transition duration-300 ${
                isActive("/impact")
                  ? "bg-[rgba(176,42,5,0.1)] px-3 py-1 rounded"
                  : ""
              }`}
            >
              Impact
            </Link>
            <Link
              href="/gallery"
              className={`text-gray-800 hover:text-primary font-medium transition duration-300 ${
                isActive("/gallery")
                  ? "bg-[rgba(176,42,5,0.1)] px-3 py-1 rounded"
                  : ""
              }`}
            >
              Gallery
            </Link>
            <Link
              href="/stories"
              className={`text-gray-800 hover:text-primary font-medium transition duration-300 ${
                isActive("/stories")
                  ? "bg-[rgba(176,42,5,0.1)] px-3 py-1 rounded"
                  : ""
              }`}
            >
              Stories
            </Link>
            <Link
              href="/donate"
              onClick={() => setIsMenuOpen(false)}
              className={`inline-block bg-primary text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-primary/90 transition duration-300 ${
                isActive("/donate") ? "ring-1 ring-red-300 bg-secondary text-primary" : ""
              }`}
            >
              Donate
            </Link>
          </nav>

          {/* <div className="hidden md:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            ) : session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-800 hover:text-primary font-medium transition duration-300"
                >
                  Dashboard
                </Link>
                {session.user.isAdmin && (
                  <Link
                    href="/admin"
                    className="text-gray-800 hover:text-primary font-medium transition duration-300"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="text-gray-800 hover:text-primary font-medium transition duration-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-800 hover:text-primary font-medium transition duration-300"
                >
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div> */}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-primary focus:outline-none transition duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`text-gray-800 hover:text-primary font-medium transition duration-300 ${
                  isActive("/")
                    ? "bg-[rgba(176,42,5,0.1)] px-3 py-1 rounded"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-gray-800 hover:text-primary font-medium transition duration-300 ${
                  isActive("/about")
                    ? "bg-[rgba(176,42,5,0.1)] px-3 py-1 rounded"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/programs"
                className={`text-gray-800 hover:text-primary font-medium transition duration-300 ${
                  isActive("/programs")
                    ? "bg-[rgba(176,42,5,0.1)] px-3 py-1 rounded"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Programs
              </Link>
              <Link
                href="/impact"
                className={`text-gray-800 hover:text-primary font-medium transition duration-300 ${
                  isActive("/impact")
                    ? "bg-[rgba(176,42,5,0.1)] px-3 py-1 rounded"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Impact
              </Link>
              <Link
                href="/gallery"
                className={`text-gray-800 hover:text-primary font-medium transition duration-300 ${
                  isActive("/gallery")
                    ? "bg-[rgba(176,42,5,0.1)] px-3 py-1 rounded"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/stories"
                className={`text-gray-800 hover:text-primary font-medium transition duration-300 ${
                  isActive("/stories")
                    ? "bg-[rgba(176,42,5,0.1)] px-3 py-1 rounded"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Stories
              </Link>
              <Link
                href="/donate"
                onClick={() => setIsMenuOpen(false)}
                className={`inline-block bg-primary text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-primary/90 transition duration-300 ${
                  isActive("/donate") ? "ring-2 ring-primary" : ""
                }`}
              >
                Donate
              </Link>

              {/* <div className="pt-4 border-t">
                {status === "loading" ? (
                  <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                ) : session ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block text-gray-800 hover:text-primary font-medium mb-2 transition duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    {session.user.isAdmin && (
                      <Link
                        href="/admin"
                        className="block text-gray-800 hover:text-primary font-medium mb-2 transition duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="block text-gray-800 hover:text-primary font-medium transition duration-300"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block text-gray-800 hover:text-primary font-medium mb-2 transition duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="inline-block btn-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div> */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
