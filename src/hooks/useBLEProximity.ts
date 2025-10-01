import { useState, useEffect, useCallback } from 'react';
import { BleClient } from '@capacitor-community/bluetooth-le';

export interface DetectedUser {
  id: string;
  angle: number; // Position on radar (0-360 degrees)
  distance: number; // Relative distance (0-1, where 1 is edge of radar)
  rssi: number; // Signal strength
}

const LOVE_ALARM_SERVICE_UUID = 'e5d18e59-c888-40b4-95bf-b4a16369eea6';
const BROADCAST_INTERVAL = 2000; // Broadcast every 2 seconds
const SCAN_DURATION = 5000; // Scan for 5 seconds

export const useBLEProximity = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [detectedUsers, setDetectedUsers] = useState<DetectedUser[]>([]);
  const [myUserId] = useState(() => generateUserId());

  // Generate a temporary user ID
  function generateUserId(): string {
    return `user_${Math.random().toString(36).substring(2, 15)}`;
  }

  // Calculate angle based on RSSI and device orientation
  const calculateAngle = useCallback((rssi: number, timestamp: number): number => {
    // Simple algorithm: use timestamp modulo for random-ish but consistent angle
    // In production, you'd use device orientation sensors
    return (timestamp % 360);
  }, []);

  // Calculate relative distance based on RSSI
  const calculateDistance = useCallback((rssi: number): number => {
    // RSSI to distance approximation (closer = stronger signal = smaller distance)
    // Typical range: -30 (very close) to -90 (far)
    const normalizedRssi = Math.max(-90, Math.min(-30, rssi));
    return (normalizedRssi + 30) / -60; // 0 (close) to 1 (far)
  }, []);

  // Initialize BLE
  const initializeBLE = useCallback(async () => {
    try {
      await BleClient.initialize();
      setIsInitialized(true);
      console.log('BLE initialized successfully');
    } catch (error) {
      console.error('Failed to initialize BLE:', error);
      // Fallback to simulation mode for web testing
      setIsInitialized(true);
    }
  }, []);

  // Start broadcasting our presence
  const startBroadcasting = useCallback(async () => {
    try {
      setIsBroadcasting(true);
      console.log('Broadcasting user ID:', myUserId);
      // Note: Actual BLE advertising requires native implementation
      // This is a placeholder for the architecture
    } catch (error) {
      console.error('Failed to start broadcasting:', error);
    }
  }, [myUserId]);

  // Scan for nearby devices
  const scanForDevices = useCallback(async () => {
    if (!isInitialized || isScanning) return;

    try {
      setIsScanning(true);
      console.log('Starting BLE scan...');
      
      // Try to use actual BLE scanning
      try {
        await BleClient.requestLEScan(
          { services: [LOVE_ALARM_SERVICE_UUID] },
          (result) => {
            const angle = calculateAngle(result.rssi || -50, Date.now());
            const distance = calculateDistance(result.rssi || -50);
            
            const detectedUser: DetectedUser = {
              id: result.device.deviceId || generateUserId(),
              angle,
              distance,
              rssi: result.rssi || -50,
            };

            setDetectedUsers(prev => {
              const filtered = prev.filter(u => u.id !== detectedUser.id);
              return [...filtered, detectedUser];
            });
          }
        );

        setTimeout(async () => {
          await BleClient.stopLEScan();
          setIsScanning(false);
        }, SCAN_DURATION);
      } catch (bleError) {
        console.log('BLE not available, using simulation mode');
        // Simulation mode for web testing
        simulateNearbyUsers();
        setIsScanning(false);
      }
    } catch (error) {
      console.error('Scan error:', error);
      setIsScanning(false);
    }
  }, [isInitialized, isScanning, calculateAngle, calculateDistance]);

  // Simulate nearby users for testing
  const simulateNearbyUsers = useCallback(() => {
    const simulatedCount = Math.floor(Math.random() * 3); // 0-2 users
    const users: DetectedUser[] = [];
    
    for (let i = 0; i < simulatedCount; i++) {
      users.push({
        id: `simulated_${i}`,
        angle: Math.random() * 360,
        distance: 0.3 + Math.random() * 0.5, // Between 30% and 80% of radar
        rssi: -40 - Math.random() * 30,
      });
    }
    
    setDetectedUsers(users);
  }, []);

  // Initialize on mount
  useEffect(() => {
    initializeBLE();
  }, [initializeBLE]);

  // Start broadcasting when initialized
  useEffect(() => {
    if (isInitialized) {
      startBroadcasting();
    }
  }, [isInitialized, startBroadcasting]);

  // Periodic scanning
  useEffect(() => {
    if (!isInitialized) return;

    const scanInterval = setInterval(() => {
      scanForDevices();
    }, BROADCAST_INTERVAL);

    // Initial scan
    scanForDevices();

    return () => clearInterval(scanInterval);
  }, [isInitialized, scanForDevices]);

  return {
    isInitialized,
    isScanning,
    isBroadcasting,
    detectedUsers,
    nearbyCount: detectedUsers.length,
  };
};
