import Script from "next/script";

const GA_MEASUREMENT_ID = "G-HSYQSGV4ZB";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        id="google-consent-default"
        strategy="beforeInteractive"
        data-cookieconsent="ignore"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag("consent", "default", {
            ad_personalization: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            analytics_storage: "denied",
            functionality_storage: "denied",
            personalization_storage: "denied",
            security_storage: "granted",
            wait_for_update: 500,
          });
          gtag("set", "ads_data_redaction", true);
          gtag("set", "url_passthrough", false);
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
