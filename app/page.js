"use client";

import {
  Car,
  Wrench,
  Shield,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

import zipangautomotive from "../public/photos/zipangautomotive.png";
import Wof from "./_components/Wof";
import Service from "./_components/Service";
import Repaires from "./_components/Repaires";
import Tyres from "./_components/Tyres";
import FullService from "./_components/FullService";
import Diagnosis from "./_components/Diagnosis";
import PunctureRepairs from "./_components/PunctureRepairs";
import zipangautomotive_footer from "../public/photos/zipangautomotive_footer.png";
import facebook from "../public/photos/facebook.png";
import instagram from "../public/photos/instagram.png";
import whatsapp from "../public/photos/whatsapp.png";
import BookingPage from "./book/page";
import Image from "next/image";
import "./globals.css";
import { useRouter } from "next/navigation";

const AutomotiveLanding = () => {
  const router = useRouter();
  const services = [
    {
      icon: <Wof />,
      title: "WOF",
      description:
        "It will take about 40 minutes. It depends on the car model.",
    },
    {
      icon: <Service />,
      title: "Service",
      description:
        "You can choose between Semisynthetic oil or Full synthetic oil. We also stock engine oil specifically for DPF.",
    },
    {
      icon: <FullService />,
      title: "Full Service",
      description:
        "Change the engine oil and inspect the vehicle.Also inspect the spark plugs, alternator, brakes, drive belts,and battery test.(Not Hybrid Battery)",
    },
    {
      icon: <Repaires />,
      title: "Repair",
      description:
        "We perform general repairs.We do not install illegal modified parts.",
    },
    {
      icon: <Tyres />,
      title: "Tyre",
      description:
        "Tire replacement requires a tire order in advance. Wheel balancing is also available.",
    },
    {
      icon: <PunctureRepairs />,
      title: "Puncture Repair",
      description:
        "Puncture repairs will only be done to nails on the tread surface. Punctures on the sidewall or edges cannot be repaired.",
    },
    {
      icon: <Diagnosis />,
      title: "Diagnosis",
      description:
        "If the warning light comes on, use a diagnostic tester to find out the cause.",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "Arial",
        color: "#374151",
      }}
    >
      {/* Hero Section */}
      <section
        className="hero_section"
        style={{
          height: "520px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundImage: `url(${zipangautomotive.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // Ensures the image covers the entire element
          backgroundPosition: "center", // Centers the background image
          marginTop: "56px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: "50px",
            height: "100%",
          }}
        >
          <span className="heading">CERTIFIED WOF WORKSHOP</span>
          <span className="subheading">
            {`The WOF is carried out by experienced inspectors who have inspected
            over 20,000 vehicles at New Zealand's largest WOF site.`}
          </span>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        style={{
          padding: "4rem 2rem",
          background: "#231F20",
        }}
      >
        <div>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#e9e7e8",
                marginBottom: "1rem",
                fontFamily: "Oswald",
              }}
            >
              SERVICES
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(308px, 308px))",
              gap: "16px",
              justifyContent: "center",
            }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                style={{
                  width: "308px",
                  height: "270px",
                  border: "1px solid rgba(170, 170, 170, 0.3)",
                  background: "#231F20",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    margin: "10px 0",
                    width: "100%",
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "Inter",
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#FFFFFF",
                    marginBottom: "1rem",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "#FFFFFF",
                    lineHeight: "1.6",
                  }}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="booking"
        style={{
          padding: "4rem 2rem",
          background: "#EEEEEE",
        }}
      >
        <BookingPage />
      </section>
      {/* Contact Section */}
      <section
        id="shopInfo"
        style={{
          padding: "4rem 2rem",
          background: "#231F20",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#e9e7e8",
                  marginBottom: "1rem",
                  fontFamily: "Oswald",
                }}
              >
                SHOP INFO
              </h2>
            </div>
            <div
              style={{
                minHeight: "109px",
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <div style={{ width: "210px" }}>
                <div
                  style={{
                    color: "#AAAAAA",
                    marginBottom: "12px",
                    fontFamily: "Inter",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  Address
                </div>
                <div style={{ color: "#FFFFFF" }}>
                  8/74 Westpoint Drive. Hobsonville Auckland 0618
                </div>
              </div>
              <div
                className="shop_info"
                style={{
                  width: "210px",
                  borderLeft: "1px solid rgba(170, 170, 170, 0.3)",
                  paddingLeft: "20px",
                }}
              >
                <div
                  style={{
                    color: "#AAAAAA",
                    marginBottom: "12px",
                    fontFamily: "Inter",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  Contact
                </div>
                <div style={{ color: "#FFFFFF" }}>022 171 1078</div>
              </div>
              <div
                className="shop_info"
                style={{
                  width: "210px",
                  borderLeft: "1px solid rgba(170, 170, 170, 0.3)",
                  paddingLeft: "20px",
                }}
              >
                <div
                  style={{
                    color: "#AAAAAA",
                    marginBottom: "12px",
                    fontFamily: "Inter",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  Trading Hours
                </div>
                <div
                  style={{
                    color: "#FFFFFF",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "170px",
                  }}
                >
                  <span>Mon - Fri</span> <span>8:30-18:00</span>
                </div>
                <div
                  style={{
                    color: "#FFFFFF",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "170px",
                  }}
                >
                  <span>Sat</span> <span>9:00-15:00</span>
                </div>
              </div>
              <div
                className="shop_info"
                style={{
                  width: "210px",
                  borderLeft: "1px solid rgba(170, 170, 170, 0.3)",
                  paddingLeft: "20px",
                }}
              >
                <div
                  style={{
                    color: "#AAAAAA",
                    marginBottom: "12px",
                    fontFamily: "Inter",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  Payment Options
                </div>
                <div style={{ color: "#FFFFFF" }}>Eftposs</div>
                <div style={{ color: "#FFFFFF" }}>VISA MASTER</div>
                <div style={{ color: "#FFFFFF" }}>Cash</div>
              </div>
            </div>
            <div style={{ width: "960px", margin: "3rem 0" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.310823026452!2d174.62848077603869!3d-36.81107107224402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d3fbe1833bf5d%3A0xa181d49b0195d90a!2s8%2F74%20Westpoint%20Drive%2C%20Hobsonville%2C%20Auckland%200618!5e0!3m2!1sen!2snz!4v1750407911473!5m2!1sen!2snz"
                width="956"
                height="318"
                style={{ border: "none" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div
              style={{
                width: "960px",
                margin: "3rem 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image src={zipangautomotive_footer} alt="Zipang automotive" />
              <div
                style={{
                  display: "flex",
                  gap: "22px",
                  marginTop: "1.5rem",
                  alignItems: "center",
                }}
              >
                <Image src={facebook} alt="Zipang automotive facebook" />
                <Image src={instagram} alt="Zipang automotive instagram" />
                <Image src={whatsapp} alt="Zipang automotive whatsapp" />
              </div>
            </div>
            <span
              style={{
                color: "#AAAAAA",
                fontSize: "14px",
                fontFamily: "Oswald",
              }}
            >
              Zipang Automotive @ 2025. All rights reserved.
            </span>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Oswald&display=swap');

        .heading {
          font-family: Oswald;
          color: #FFF;
          font-size: 76px;
        }

        .subheading {
          font-family: Inter;
          color: #FFF;
          font-size: 16px;
          text-align: center;
          padding: 0 1rem;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          section > div {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }

          h1 {
            font-size: 2.2rem !important;
          }

          h2 {
            font-size: 2rem !important;
          }

          .heading {
            font-size: 50px;
            text-align: center;
            word-break: break-word;
            width: 100vw;
          }

          .shop_info {
            border-left: none !important;
            padding-left: 0 !important
          }
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  return <AutomotiveLanding />;
}
