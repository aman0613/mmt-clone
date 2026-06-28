"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  clearAuthData,
  getCurrentUser,
  type AuthUser,
} from "@/services/authService";

export default function Navbar() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    clearAuthData();

    setUser(null);

    window.location.href = "/";
  };

  return (
    <nav className="bg-[#0B2239] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left */}

        <div className="flex items-center gap-8">
          <Link href="/">
            <h1 className="cursor-pointer text-2xl font-bold">MMT</h1>
          </Link>

          <div className="hidden gap-6 text-sm md:flex">
            <p>Flights</p>

            <p>Hotels</p>

            <p>Homestays</p>

            <p>Holiday Packages</p>

            <p>Trains</p>

            <p>Buses</p>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-5">
          {!user ? (
            <>
              <Link href="/login">
                <button className="rounded-lg bg-blue-500 px-4 py-2">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="rounded-lg border border-white px-4 py-2">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm">Hi, {user.name}</p>

              <Link href="/my-trips">
                <button className="rounded-lg bg-blue-500 px-4 py-2">
                  My Trips
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-white px-4 py-2"
              >
                Logout
              </button>
            </>
          )}

          <p className="text-sm">India | ENG</p>
        </div>
      </div>
    </nav>
  );
}
