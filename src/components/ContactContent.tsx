"use client";

import { useState } from "react";

interface ContactMethod {
  type: string;
  value: string;
  icon: string;
  color: string;
  available: boolean;
}

const contactMethods: ContactMethod[] = [
{
  type: "Email",
  value: "aidan@matrix-dev.io",
  icon: "📧",
  color: "#00FF00",
  available: true
},
{
  type: "LinkedIn",
  value: "/in/aidan-mcgrath-dev",
  icon: "💼",
  color: "#00FFFF",
  available: true
},
{
  type: "GitHub",
  value: "/aidan-mcgrath",
  icon: "🐙",
  color: "#00FF00",
  available: true
},
{
  type: "Discord",
  value: "AidanDev#1337",
  icon: "🎮",
  color: "#00FFFF",
  available: true
}];


export default function ContactContent() {
  const [selectedMethod, setSelectedMethod] = useState<ContactMethod | null>(
    null
  );
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
  "> Initializing contact protocols...",
  "> Scanning available channels...",
  "> Ready for communication."]
  );

  const handleContactClick = (method: ContactMethod) => {
    setSelectedMethod(method);
    setTerminalOutput((prev) => [
    ...prev,
    `> Connecting to ${method.type}...`,
    `> Channel: ${method.value}`,
    `> Status: ${method.available ? "ONLINE" : "OFFLINE"}`,
    "> Connection established."]
    );
  };

  const clearTerminal = () => {
    setTerminalOutput(["> Terminal cleared.", "> Ready for new commands."]);
    setSelectedMethod(null);
  };

  return (
    <div
      className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 h-full"
      data-oid="is6ba_z">

      {/* Contact Methods */}
      <div className="space-y-6" data-oid="atec1l3">
        <h3
          className="text-2xl font-mono-matrix text-glow-green mb-6"
          data-oid="fic2hst">

          CONTACT_CHANNELS.list
        </h3>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          data-oid="1p5dqnn">

          {contactMethods.map((method, index) =>
          <div
            key={method.type}
            onClick={() => handleContactClick(method)}
            className={`pixel-border p-4 rounded-lg cursor-pointer transition-all hover:bg-matrix-primary-green/10 matrix-loading ${
            selectedMethod?.type === method.type ?
            "bg-matrix-primary-green/20 border-matrix-primary-green" :
            "bg-matrix-black/50 border-matrix-primary-green/30"}`
            }
            style={{ animationDelay: `${index * 0.1}s` }}
            data-oid="uv5v.gd">

              <div className="flex items-center gap-3 mb-2" data-oid="indo57:">
                <span className="text-2xl" data-oid=".0::4:d">
                  {method.icon}
                </span>
                <div className="flex-1" data-oid="elnz637">
                  <h4
                  className="font-mono-matrix text-matrix-light-gray"
                  data-oid="83l5mgi">

                    {method.type}
                  </h4>
                  <div className="flex items-center gap-2" data-oid="s.p1q1h">
                    <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{
                      backgroundColor: method.available ?
                      method.color :
                      "#666",
                      boxShadow: method.available ?
                      `0 0 5px ${method.color}` :
                      "none"
                    }}
                    data-oid=".7vptxo" />


                    <span
                    className="text-xs text-matrix-primary-green"
                    data-oid="g5:s5fv">

                      {method.available ? "ONLINE" : "OFFLINE"}
                    </span>
                  </div>
                </div>
              </div>
              <div
              className="font-mono-matrix text-sm text-matrix-light-gray truncate"
              data-oid="h.ag:yz">

                {method.value}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3" data-oid="bb0rbnl">
          <h4
            className="font-mono-matrix text-matrix-electric-blue"
            data-oid="1i75_gy">

            QUICK_ACTIONS.exe
          </h4>

          <div className="flex flex-wrap gap-2" data-oid="-5b9c-e">
            <button
              className="px-4 py-2 bg-matrix-primary-green/20 border border-matrix-primary-green/50 rounded font-mono-matrix text-sm text-matrix-primary-green hover:bg-matrix-primary-green/30 transition-all"
              data-oid="k1u3n4b">

              Schedule Call
            </button>
            <button
              className="px-4 py-2 bg-matrix-electric-blue/20 border border-matrix-electric-blue/50 rounded font-mono-matrix text-sm text-matrix-electric-blue hover:bg-matrix-electric-blue/30 transition-all"
              data-oid="fcbuo8p">

              Send Message
            </button>
            <button
              className="px-4 py-2 bg-matrix-primary-green/20 border border-matrix-primary-green/50 rounded font-mono-matrix text-sm text-matrix-primary-green hover:bg-matrix-primary-green/30 transition-all"
              data-oid=".aicfrj">

              View Resume
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Interface */}
      <div className="flex flex-col h-full" data-oid="clt4li0">
        <div
          className="pixel-border bg-matrix-black/80 rounded-lg flex-1 flex flex-col"
          data-oid="2bb1lsf">

          {/* Terminal Header */}
          <div
            className="flex items-center gap-2 p-4 border-b border-matrix-primary-green/30"
            data-oid="6kl127v">

            <div
              className="w-3 h-3 rounded-full bg-red-500"
              data-oid="m603evw">
            </div>
            <div
              className="w-3 h-3 rounded-full bg-yellow-500"
              data-oid="t4exboi">
            </div>
            <div
              className="w-3 h-3 rounded-full bg-matrix-primary-green"
              data-oid="26aprgv">
            </div>
            <span
              className="ml-4 font-mono-matrix text-matrix-primary-green text-sm"
              data-oid="y0vc3b0">

              ~/contact/terminal.sh
            </span>
            <button
              onClick={clearTerminal}
              className="ml-auto text-matrix-primary-green hover:text-matrix-secondary-green text-sm"
              data-oid="gb0kizc">

              clear
            </button>
          </div>

          {/* Terminal Content */}
          <div
            className="flex-1 p-4 font-mono-matrix text-sm overflow-y-auto"
            data-oid="_i0tk_y">

            {terminalOutput.map((line, index) =>
            <div
              key={index}
              className="text-matrix-primary-green mb-1 matrix-loading"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-oid="ihpv7hw">

                {line}
              </div>
            )}

            {/* Cursor */}
            <div className="flex items-center mt-4" data-oid="8wdw1za">
              <span
                className="text-matrix-electric-blue mr-2"
                data-oid="w-2wjjh">

                $
              </span>
              <span className="animate-pulse" data-oid="wewzdf4">
                _
              </span>
            </div>
          </div>
        </div>

        {/* Status Panel */}
        <div
          className="mt-4 pixel-border bg-matrix-black/50 p-4 rounded-lg"
          data-oid="fg.oizp">

          <div
            className="grid grid-cols-2 gap-4 text-center"
            data-oid="tcz7av8">

            <div data-oid="v7xfdbo">
              <div
                className="text-2xl font-bold text-glow-green"
                data-oid="n9y2pbj">

                24/7
              </div>
              <div
                className="text-xs text-matrix-light-gray font-mono-matrix"
                data-oid=":up63_2">

                RESPONSE TIME
              </div>
            </div>
            <div data-oid="s:7mb_u">
              <div
                className="text-2xl font-bold text-glow-blue"
                data-oid="g2rs7_e">

                100%
              </div>
              <div
                className="text-xs text-matrix-light-gray font-mono-matrix"
                data-oid="mbnnxnx">

                AVAILABILITY
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}