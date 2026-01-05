import { motion } from "framer-motion";
import UpcomingWebinarCard from "./UpcomingWebinarCard";
import WebinarAgenda from "./WebinarAgenda";
import PastWebinars from "./PastWebinars";

// Mock data - in production, this would come from GitHub
const upcomingWebinar = {
  id: "2025-01-nubra-api",
  title: "Nubra APIs Deep Dive",
  subtitle: "Market data, Flexi Orders, margin & portfolio intelligence",
  date: "January 15, 2025",
  time: "2:00 PM IST",
  duration: "90 minutes",
  description: "A comprehensive technical walkthrough of Nubra's trading infrastructure — from real-time market data feeds to advanced order types, margin calculations, and portfolio analytics.",
  topics: ["Trading API", "WebSockets", "Risk Management", "Python SDK", "Flexi Orders"],
  registrationUrl: "#register"
};

const agendaItems = [
  {
    time: "0:00 - 15:00",
    title: "Trading API Internals",
    description: "Architecture overview, authentication flows, and rate limiting strategies"
  },
  {
    time: "15:00 - 35:00",
    title: "Multi-basket & Flexi Orders",
    description: "Advanced order types, basket execution, and partial fills handling"
  },
  {
    time: "35:00 - 55:00",
    title: "Hedge-aware Margin Logic",
    description: "Real-time margin calculations, hedging offsets, and risk parameters"
  },
  {
    time: "55:00 - 70:00",
    title: "Portfolio & Reporting APIs",
    description: "Position tracking, P&L computation, and historical data access"
  },
  {
    time: "70:00 - 90:00",
    title: "Python SDK Workflows",
    description: "Live coding session: building an algo trading bot with Nubra SDK"
  }
];

const pastWebinars = [
  {
    id: "2024-12-websockets",
    title: "Real-time Greeks via WebSockets",
    date: "December 10, 2024",
    duration: "75 minutes",
    hasRecording: true,
    topics: ["WebSockets", "Greeks", "Options"]
  },
  {
    id: "2024-11-margin",
    title: "Understanding Margin & Risk APIs",
    date: "November 22, 2024",
    duration: "60 minutes",
    hasRecording: true,
    topics: ["Risk", "Margin", "API"]
  }
];

const WebinarMainContent = () => {
  return (
    <div className="space-y-12">
      <section id="upcoming-webinar">
        <UpcomingWebinarCard webinar={upcomingWebinar} />
      </section>

      <section id="webinar-agenda" className="scroll-mt-24">
        <WebinarAgenda items={agendaItems} />
      </section>

      <section id="past-webinars">
        <PastWebinars webinars={pastWebinars} />
      </section>
    </div>
  );
};

export default WebinarMainContent;
