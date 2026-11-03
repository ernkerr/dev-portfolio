import type { Metadata } from "next";
import { Lead } from "@/components/site/prose";
import SiteShell from "@/components/site/SiteShell";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send Erin Kerr a message.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="max-w-measure pb-12 pt-16 md:pt-20">
        <h1 className="font-serif text-display-sm md:text-display">
          Let’s build something together.
        </h1>
        <div className="mt-6">
          <Lead>
            Reach out if you’re looking for a developer, have a question, or
            just want to connect.
          </Lead>
        </div>
        <div className="mt-10">
          <ContactForm />
        </div>
      </section>
    </SiteShell>
  );
}
