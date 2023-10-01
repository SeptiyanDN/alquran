import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: "https://d62632e9b81636e5ac4693c30be11576@o4505392868753408.ingest.sentry.io/4505747155582976",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});
export default Sentry;
