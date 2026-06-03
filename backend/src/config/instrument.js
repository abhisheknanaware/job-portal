import * as Sentry from "@sentry/node";
Sentry.init({
  dsn: "https://482fb81859dd399b735005f142a1a1d1@o4511501583515648.ingest.us.sentry.io/4511501587709952",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [Sentry.mongooseIntegration()],
});