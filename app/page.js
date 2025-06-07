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

import logo from "../public/photos/zipangautomotive.png";
import banner from "../public/photos/banner.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AutomotiveLanding = () => {
  const router = useRouter();
  const services = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Auto Repair",
      description:
        "Complete diagnostic and repair services for all vehicle makes and models",
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Maintenance",
      description:
        "Regular maintenance services to keep your vehicle running smoothly",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Guarantee",
      description: "All work backed by our warranty and satisfaction guarantee",
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
        style={{
          minHeight: "90vh",
          background: "#231c23",
          display: "flex",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <Image
              src={logo}
              alt="logo"
              height={200}
              width={500}
              style={{ border: "4px solid #fff" }}
            />
            <p
              style={{
                fontSize: "1.2rem",
                color: "#e9e7e8",
                lineHeight: "1.6",
                marginBottom: "2rem",
              }}
            >
              Professional automotive service with experienced technicians. From
              routine maintenance to major repairs, we keep your vehicle running
              reliably.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                style={{
                  padding: "0.75rem 2rem",
                  background: "#e9e7e8",
                  color: "#231c23",
                  border: "2px solid #e9e7e8",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/book")}
              >
                Book Now
              </button>
            </div>
          </div>

          <Image
            src={banner}
            alt="wof banner"
            height={200}
            width={500}
            style={{ border: "4px solid #e9e7e8", borderRadius: "1rem" }}
          />
        </div>
      </section>

      {/* Services Section */}
      <section
        style={{
          padding: "4rem 2rem",
          background: "#231c23",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#e9e7e8",
                marginBottom: "1rem",
              }}
            >
              Our Services
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#8c8c8c",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Professional automotive solutions for all your vehicle needs
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                style={{
                  padding: "2rem",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.47)",
                  background: "#fff",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "#8c848c",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#e9e7e8",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    color: "#231c23",
                    marginBottom: "1rem",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    color: "#231c23",
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

      {/* Contact Section */}
      <section
        style={{
          padding: "4rem 2rem",
          background: "#e9e7e8",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#231c23",
                  marginBottom: "1.5rem",
                }}
              >
                Get in Touch
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#231c23",
                  lineHeight: "1.6",
                  marginBottom: "2rem",
                }}
              >
                {`Schedule your appointment today. We're here to help keep your
                vehicle running smoothly.`}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Phone
                    style={{ color: "#231c23", width: "20px", height: "20px" }}
                  />
                  <span style={{ color: "#231c23" }}>022 171 1078</span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Mail
                    style={{ color: "#231c23", width: "20px", height: "20px" }}
                  />
                  <span style={{ color: "#231c23" }}>
                    zipangautomotive@gmail.com
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <MapPin
                    style={{ color: "#231c23", width: "20px", height: "20px" }}
                  />
                  <span style={{ color: "#231c23" }}>
                    8/74 Westpoint Drive Hobsonville, New Zealand 0618
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Clock
                    style={{ color: "#231c23", width: "20px", height: "20px" }}
                  />
                  <span style={{ color: "#231c23" }}>
                    Mon-Fri: 8:30AM-6:00PM, Sat: 9:00AM-3:00PM
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "2.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.47)",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  color: "#231c23",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Book Your Service
              </h3>
              <p
                style={{
                  color: "#231c23",
                  marginBottom: "2rem",
                  lineHeight: "1.6",
                }}
              >
                Ready to schedule your appointment? Contact us today for
                professional automotive service.
              </p>
              <button
                style={{
                  padding: "1rem 2rem",
                  background: "#231c23",
                  color: "#e9e7e8",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "100%",
                }}
                onClick={() => router.push("/book")}
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
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
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  return <AutomotiveLanding />;
}
