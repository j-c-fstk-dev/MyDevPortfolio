"use client";

import { useEffect, useState, useRef } from "react";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error">(
    "idle");
  const sectionRef = useRef<HTMLElement>(null);

  const contactMethods = [
  {
    label: "EMAIL_PROTOCOL",
    value: "dev@matrix.com",
    icon: "📧",
    command: "mailto:dev@matrix.com"
  },
  {
    label: "GITHUB_REPOSITORY",
    value: "github.com/matrixdev",
    icon: "🐙",
    command: "https://github.com/matrixdev"
  },
  {
    label: "LINKEDIN_NETWORK",
    value: "linkedin.com/in/matrixdev",
    icon: "💼",
    command: "https://linkedin.com/in/matrixdev"
  },
  {
    label: "TWITTER_FEED",
    value: "@matrix_dev",
    icon: "🐦",
    command: "https://twitter.com/matrix_dev"
  }];


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    }, 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="section-5"
      className="min-h-screen flex items-center justify-center py-20 relative"
      data-oid="itorjio">

      {/* Background Network */}
      <div className="absolute inset-0 opacity-10" data-oid="z_ha7vc">
        <svg className="w-full h-full" data-oid="-t5p3io">
          {Array.from({ length: 20 }).map((_, i) =>
          <g key={i} data-oid="tj:cshq">
              <circle
              cx={`${Math.random() * 100}%`}
              cy={`${Math.random() * 100}%`}
              r="2"
              fill="#00FF00"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
              data-oid="ywnqekm" />


              {Array.from({ length: 3 }).map((_, j) =>
            <line
              key={j}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="#00FF00"
              strokeWidth="0.5"
              className="animate-pulse"
              style={{ animationDelay: `${(i + j) * 0.1}s` }}
              data-oid="tp4v6tq" />

            )}
            </g>
          )}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10" data-oid="68hhgkt">
        {/* Section Header */}
        <div className="text-center mb-16" data-oid="40.fumi">
          <h2
            className="text-4xl md:text-6xl font-mono-matrix text-glow-green mb-4"
            data-oid="-i3iex6">

            CONTACT_INTERFACE
          </h2>
          <div
            className="text-xl font-mono-matrix text-matrix-electric-blue"
            data-oid="oq5qyo6">

            &gt; ESTABLISHING_CONNECTION...
          </div>
          <div
            className="w-32 h-1 bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue mx-auto mt-4"
            data-oid="_ywoqn9">
          </div>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
          data-oid="1dq-0l4">

          {/* Contact Methods */}
          <div
            className={`space-y-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            data-oid="y44_o0p">

            <h3
              className="font-mono-matrix text-2xl text-matrix-primary-green mb-8 text-glow-green"
              data-oid="iut2kg5">

              COMMUNICATION_PROTOCOLS
            </h3>

            {contactMethods.map((method, index) =>
            <div
              key={method.label}
              className={`bg-matrix-black/50 border border-matrix-primary-green/30 rounded-lg p-6 hover:border-matrix-primary-green hover:shadow-neon-green transition-all duration-500 cursor-pointer group`}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onClick={() => window.open(method.command, "_blank")}
              data-oid=":_3fa7a">

                <div className="flex items-center gap-4" data-oid="hgzifh:">
                  <span
                  className="text-2xl group-hover:scale-110 transition-transform"
                  data-oid="q5mb5zk">

                    {method.icon}
                  </span>
                  <div className="flex-1" data-oid="ow43fvm">
                    <div
                    className="font-mono-matrix text-matrix-electric-blue text-sm mb-1"
                    data-oid="1_.s-qe">

                      {method.label}
                    </div>
                    <div
                    className="font-mono-matrix text-matrix-light-gray group-hover:text-matrix-primary-green transition-colors"
                    data-oid="ghfcbwn">

                      {method.value}
                    </div>
                  </div>
                  <div
                  className="text-matrix-primary-green opacity-0 group-hover:opacity-100 transition-opacity"
                  data-oid="x0xyht_">

                    →
                  </div>
                </div>
              </div>
            )}

            {/* Terminal Status */}
            <div
              className="bg-matrix-black/70 border border-matrix-primary-green/30 rounded-lg p-4 mt-8"
              data-oid="dvzc7iy">

              <div
                className="font-mono-matrix text-sm space-y-1"
                data-oid="f_1zm0d">

                <div className="text-matrix-electric-blue" data-oid="pt-fo2r">
                  $ status --availability
                </div>
                <div className="text-matrix-primary-green" data-oid="ik086tk">
                  ● ONLINE - Available for new projects
                </div>
                <div className="text-matrix-light-gray" data-oid="16vin35">
                  Response time: &lt; 24 hours
                </div>
                <div
                  className="text-matrix-primary-green animate-pulse"
                  data-oid="qipck:3">

                  _
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            data-oid="xj9ysoc">

            <h3
              className="font-mono-matrix text-2xl text-matrix-primary-green mb-8 text-glow-green"
              data-oid="s3v2_iz">

              DIRECT_MESSAGE_SYSTEM
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              data-oid="5gsc0a8">

              {/* Name Input */}
              <div data-oid="o.3yo_8">
                <label
                  className="block font-mono-matrix text-matrix-electric-blue text-sm mb-2"
                  data-oid="e0i8azt">

                  NAME_INPUT:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-matrix-black/50 border-2 border-matrix-primary-green/30 rounded px-4 py-3 font-mono-matrix text-matrix-light-gray focus:border-matrix-primary-green focus:shadow-neon-green outline-none transition-all"
                  placeholder="Enter your name..."
                  data-oid="up9p0bt" />

              </div>

              {/* Email Input */}
              <div data-oid="dkso9bc">
                <label
                  className="block font-mono-matrix text-matrix-electric-blue text-sm mb-2"
                  data-oid="m0yjna:">

                  EMAIL_ADDRESS:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-matrix-black/50 border-2 border-matrix-primary-green/30 rounded px-4 py-3 font-mono-matrix text-matrix-light-gray focus:border-matrix-primary-green focus:shadow-neon-green outline-none transition-all"
                  placeholder="your.email@domain.com"
                  data-oid="s8-yjca" />

              </div>

              {/* Message Input */}
              <div data-oid="u4kl.zg">
                <label
                  className="block font-mono-matrix text-matrix-electric-blue text-sm mb-2"
                  data-oid="vahgpf-">

                  MESSAGE_CONTENT:
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-matrix-black/50 border-2 border-matrix-primary-green/30 rounded px-4 py-3 font-mono-matrix text-matrix-light-gray focus:border-matrix-primary-green focus:shadow-neon-green outline-none transition-all resize-none"
                  placeholder="Enter your message..."
                  data-oid="hkzge74" />

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 font-mono-matrix border-2 rounded transition-all duration-300 ${
                isSubmitting ?
                "bg-matrix-primary-green/10 border-matrix-primary-green/30 text-matrix-primary-green/50 cursor-not-allowed" :
                "bg-matrix-primary-green/20 border-matrix-primary-green text-matrix-primary-green hover:bg-matrix-primary-green/30 hover:shadow-neon-green"}`
                }
                data-oid="2.s4:gz">

                {isSubmitting ?
                <span
                  className="flex items-center justify-center gap-2"
                  data-oid="5yt2t.o">

                    <div
                    className="w-4 h-4 border-2 border-matrix-primary-green border-t-transparent rounded-full animate-spin"
                    data-oid="_8zjb77">
                  </div>
                    TRANSMITTING...
                  </span> :

                "&gt; SEND_MESSAGE"
                }
              </button>

              {/* Status Messages */}
              {submitStatus === "success" &&
              <div
                className="bg-matrix-primary-green/20 border border-matrix-primary-green rounded p-4"
                data-oid="ptxbklo">

                  <div
                  className="font-mono-matrix text-matrix-primary-green text-sm"
                  data-oid="0rwz.aa">

                    ✓ MESSAGE_TRANSMITTED_SUCCESSFULLY
                  </div>
                </div>
              }

              {submitStatus === "error" &&
              <div
                className="bg-red-500/20 border border-red-500 rounded p-4"
                data-oid="nhbt0c.">

                  <div
                  className="font-mono-matrix text-red-400 text-sm"
                  data-oid="xin23:7">

                    ✗ TRANSMISSION_FAILED - Please try again
                  </div>
                </div>
              }
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20" data-oid="tmj-401">
          <div
            className="bg-matrix-black/70 border border-matrix-primary-green/30 rounded-lg p-8 max-w-2xl mx-auto"
            data-oid="60ep6v6">

            <h4
              className="font-mono-matrix text-xl text-matrix-primary-green mb-4 text-glow-green"
              data-oid="u68egcq">

              END_OF_TRANSMISSION
            </h4>
            <p className="text-matrix-light-gray mb-6" data-oid="rze5iwq">
              Thank you for exploring my digital realm. Ready to collaborate on
              the next big project?
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              data-oid="hghf_zc">

              <button
                className="px-6 py-3 bg-matrix-primary-green/20 border-2 border-matrix-primary-green rounded font-mono-matrix text-matrix-primary-green hover:bg-matrix-primary-green/30 hover:shadow-neon-green transition-all duration-300"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                data-oid="36qsc-d">

                &gt; RESTART_SEQUENCE
              </button>
              <button
                className="px-6 py-3 bg-matrix-electric-blue/20 border-2 border-matrix-electric-blue rounded font-mono-matrix text-matrix-electric-blue hover:bg-matrix-electric-blue/30 hover:shadow-neon-blue transition-all duration-300"
                onClick={() => window.open("mailto:dev@matrix.com", "_blank")}
                data-oid="41l4mi3">

                &gt; HIRE_DEVELOPER
              </button>
            </div>

            {/* Copyright */}
            <div
              className="mt-8 pt-6 border-t border-matrix-primary-green/20"
              data-oid="s0tlfze">

              <div
                className="font-mono-matrix text-matrix-primary-green/50 text-sm"
                data-oid="q40dk24">

                © 2024 Matrix Developer | Built with React & TypeScript
              </div>
              <div
                className="font-mono-matrix text-matrix-primary-green/30 text-xs mt-2"
                data-oid="stzdgli">

                "There is no spoon" - The Matrix (1999)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}