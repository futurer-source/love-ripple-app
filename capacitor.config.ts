import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e5d18e59c88840b495bfb4a16369eea6',
  appName: 'love-ripple-app',
  webDir: 'dist',
  server: {
    url: 'https://e5d18e59-c888-40b4-95bf-b4a16369eea6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    BluetoothLe: {
      displayStrings: {
        scanning: "Scanning for nearby users...",
        processing: "Processing...",
      }
    }
  }
};

export default config;
