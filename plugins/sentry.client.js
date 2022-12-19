import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp;

  Sentry.init({
    app: [vueApp],
    dsn: 'https://a329c0ed448543d098d4c1956b6bffb4@sentry.paris-ias.io/13',
    environment: process.dev ? 'development' : 'production',
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(nuxtApp.$router)
      })
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    beforeSend (event, hint) {
      // Check if it is an exception, and if so, log it.
      if (event.exception) {
        // eslint-disable-next-line no-console
        console.error(`[Exeption handled by Sentry]: (${hint.originalException})`, { event, hint });
      }
      // Continue sending to Sentry
      return event;
    }
  });

  vueApp.mixin(Sentry.createTracingMixins({ trackComponents: true, timeout: 2000, hooks: ['activate', 'mount', 'update'] }));
  Sentry.attachErrorHandler(vueApp, { logErrors: false, attachProps: true, trackComponents: true, timeout: 2000, hooks: ['activate', 'mount', 'update'] });

  return {
    provide: {
      sentrySetContext: Sentry.setContext,
      sentrySetUser: Sentry.setUser,
      sentrySetTag: Sentry.setTag,
      sentryAddBreadcrumb: Sentry.addBreadcrumb,
      sentryCaptureException: Sentry.captureException
    }
  };
});