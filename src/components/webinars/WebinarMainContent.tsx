import { motion } from "framer-motion";
import UpcomingWebinarCard from "./UpcomingWebinarCard";
import WebinarAgenda from "./WebinarAgenda";
import PastWebinars from "./PastWebinars";

// Mock data - in production, this would come from GitHub
const upcomingWebinar = {
  id: "2026-01-ai-algo-masterclass",
  title: "Learn How to Code Algo Strategies using AI",
  subtitle: "Live Masterclass",
  date: "January 12, 2026",
  time: "6:00 PM – 7:00 PM IST",
  duration: "60 minutes",
  description:
    "A live masterclass on building algorithmic trading strategies using AI. Learn how to design strategies, connect to Trading APIs and WebSockets, and implement workflows using the Python SDK — all without risking real capital.",
  topics: [
    "Trading API",
    "WebSockets",
    "Strategies",
    "Python SDK"
  ],
  registrationUrl: "#register"
};

const agendaItems = [
  {
    time: "0:00 - 10:00",
    title: "Introduction to Algo Trading",
    description:
      "What algorithmic trading is, how it works in real markets, and how retail traders can get started with modern APIs."
  },
  {
    time: "10:00 - 20:00",
    title: "UAT vs Live Trading",
    description:
      "Understanding sandbox (UAT) vs live environments, capital safety, common mistakes, and best practices before going live."
  },
  {
    time: "20:00 - 30:00",
    title: "Streaming Market Data with WebSockets",
    description:
      "How to consume real-time market data using WebSockets, handle ticks efficiently, and build a live data pipeline."
  },
  {
    time: "30:00 - 45:00",
    title: "Building Trading Strategies using ChatGPT",
    description:
      "Using ChatGPT to ideate, code, and iterate multiple trading strategies quickly, with practical examples."
  },
  {
    time: "45:00 - 55:00",
    title: "Placing Trades using Trading APIs",
    description:
      "Executing trades programmatically using Trading APIs, order types, validations, and real-world execution flows."
  },
  {
    time: "55:00 - 60:00",
    title: "Analysing Trades in UAT",
    description:
      "Evaluating strategy performance, analysing executed trades, P&L insights, and preparing for live deployment."
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
