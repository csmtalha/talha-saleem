"use client";

import Script from "next/script";

export function LinkedInBadge() {
  return (
    <>
      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="lazyOnload"
      />
      <div
        className="badge-base LI-profile-badge inline-block"
        data-locale="en_US"
        data-size="large"
        data-theme="dark"
        data-type="HORIZONTAL"
        data-vanity="csmtalha"
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link"
          href="https://pk.linkedin.com/in/csmtalha?trk=profile-badge"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </div>
    </>
  );
}
