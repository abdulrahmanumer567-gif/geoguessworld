import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.countryguess',
  appName: 'Country Guess',
  webDir: 'dist',
  server: {
    // Load the live Lovable app so server functions keep working.
    // Replace with your published URL after publishing.
    url: 'https://project--0bc773bb-ac22-4fa1-90e8-b585b20e434d.lovable.app',
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
