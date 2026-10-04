import type { Metadata } from "next";
import VisitSection from "@/components/home/VisitSection";

export const metadata: Metadata = {
  title: "Contact | Papa Faru Bureau de Change",
  description: "Visit or contact Papa Faru Bureau de Change at Mayfair Plaza, Mwai Kibaki Rd, Dar es Salaam.",
};

export default function ContactPage() {
  return <VisitSection asPageTitle />;
}
