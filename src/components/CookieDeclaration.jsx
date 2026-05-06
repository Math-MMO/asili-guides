"use client";

import { useEffect, useRef } from "react";

const CBID = "b52f9b39-1566-4b51-a6ef-86a2a54b6edb";

export default function CookieDeclaration() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.querySelector("script#CookieDeclaration")) return;

    const script = document.createElement("script");
    script.id = "CookieDeclaration";
    script.src = `https://consent.cookiebot.com/${CBID}/cd.js`;
    script.type = "text/javascript";
    script.async = true;
    container.appendChild(script);
  }, []);

  return <div ref={containerRef} />;
}
