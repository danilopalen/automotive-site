"use client";

import React, { useState } from "react";
import "./globals.css";
import { Menu, X } from "lucide-react";
import logo from "../public/nav-logo.svg";
import Image from "next/image";

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <html lang="en">
      <body>
        <div
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          <style>
            {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .header {
            background: #231F20;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
          }

          .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 56px;
          }

          .logo {
            display: flex;
            align-items: center;
            height: 56px;
            margin-right: 50px;
          }

          .nav-menu {
            display: flex;
            list-style: none;
            gap: 20px;
            align-items: center;
          }

          .nav-link {
            color: ##FFFFFF;
            font-family: Oswald;
            text-decoration: none;
            font-weight: 500;
            padding: 8px 16px;
            border-radius: 6px;
            transition: all 0.3s ease;
          }

          .nav-link:hover {
            color: #231F20;
            background: #f8f9fa;
          }

          .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            border-radius: 4px;
            transition: background 0.3s ease;
          }

          .mobile-menu-toggle:hover {
            color: #231F20;
            background: #f8f9fa;
          }

          .mobile-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            border-top: 1px solid #eee;
          }

          .mobile-menu.open {
            display: block;
          }

          .mobile-nav-menu {
            list-style: none;
            padding: 20px;
          }

          .mobile-nav-menu li {
            margin-bottom: 16px;
          }

          .mobile-nav-link {
            color: #555;
            font-family: Oswald;
            text-decoration: none;
            font-weight: 500;
            display: block;
            padding: 12px 16px;
            border-radius: 6px;
            transition: all 0.3s ease;
          }

          .mobile-nav-link:hover {
            color: #231F20;
            background: #f8f9fa;
          }

          .main-content {
            margin-top: 70px;
            min-height: calc(100vh - 70px);
          }

          @media (max-width: 768px) {
            .nav-menu {
              display: none;
            }

            .mobile-menu-toggle {
              display: block;
            }

            .nav-container {
              padding: 0 16px;
              justify-content: space-between;
            }

            .logo {
              font-size: 20px;
            }
          }

          @media (max-width: 480px) {
            .nav-container {
              height: 60px;
            }

            .main-content {
              margin-top: 60px;
              min-height: calc(100vh - 60px);
            }

            .logo {
              font-size: 18px;
            }
          }
        `}
          </style>

          <header className="header">
            <div className="nav-container">
              <a href="#" className="logo">
                <Image priority src={logo} alt="Zipang automotive" />
              </a>

              <nav className="nav-menu">
                <li>
                  <span
                    onClick={() => {
                      // Get the element by its ID
                      const element = document.getElementById("services");
                      // Check if the element exists before spanttempting to scroll
                      if (element) {
                        // Scroll the element into view
                        element.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    }}
                    className="nav-link"
                  >
                    SERVICES
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => {
                      // Get the element by its ID
                      const element = document.getElementById("booking");
                      // Check if the element exists before spanttempting to scroll
                      if (element) {
                        // Scroll the element into view
                        element.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    }}
                    className="nav-link"
                  >
                    BOOKING
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => {
                      // Get the element by its ID
                      const element = document.getElementById("shopInfo");
                      // Check if the element exists before spanttempting to scroll
                      if (element) {
                        // Scroll the element into view
                        element.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    }}
                    className="nav-link"
                  >
                    SHOP INFO
                  </span>
                </li>
              </nav>

              <button className="mobile-menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
              <ul className="mobile-nav-menu">
                <li>
                  <a
                    href="#"
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    SERVICES
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    BOOKING
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    SHOP INFO
                  </a>
                </li>
              </ul>
            </div>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
