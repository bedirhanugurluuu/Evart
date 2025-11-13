"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function Oran() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Ana Banner - About sayfasındaki gibi ama absolute yazı yok */}
      <section className="relative w-full h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden about-banner">
        {/* Banner Görseli */}
        <img
          src="/images/about-banner.jpg"
          alt="Evart Oran Banner"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </section>

      {/* Contact Form - Container içinde, resmin üstünde */}
      <div className="container-custom -mt-32 md:-mt-48 lg:-mt-64 relative z-20 pb-16">
        <ContactForm projectName="Evart Oran" />
      </div>

      <Footer />
    </main>
  );
}

