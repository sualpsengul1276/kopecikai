import { useState, useRef, useCallback, useEffect } from 'react';
import * as Location from 'expo-location';

export interface WalkPoint {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface WalkStats {
  distance: number; // km
  duration: number; // seconds
  pace: number; // min/km
  calories: number;
  points: WalkPoint[];
}

function haversineDistance(a: WalkPoint, b: WalkPoint): number {
  const R = 6371;
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
  const lat1 = (a.latitude * Math.PI) / 180;
  const lat2 = (b.latitude * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(h));
}

export function useGPSWalk() {
  const [isTracking, setIsTracking] = useState(false);
  const [stats, setStats] = useState<WalkStats>({
    distance: 0,
    duration: 0,
    pace: 0,
    calories: 0,
    points: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const pointsRef = useRef<WalkPoint[]>([]);
  const distanceRef = useRef<number>(0);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then(({ status }) => {
      setHasPermission(status === 'granted');
    });
    return () => { stopTracking(); };
  }, []);

  const startTracking = useCallback(async () => {
    if (!hasPermission) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Konum izni gerekli');
        return;
      }
      setHasPermission(true);
    }

    pointsRef.current = [];
    distanceRef.current = 0;
    startTimeRef.current = Date.now();
    setStats({ distance: 0, duration: 0, pace: 0, calories: 0, points: [] });
    setIsTracking(true);
    setError(null);

    subscriptionRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 5,
        timeInterval: 3000,
      },
      (location) => {
        const point: WalkPoint = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          timestamp: location.timestamp,
        };

        const prev = pointsRef.current[pointsRef.current.length - 1];
        if (prev) {
          distanceRef.current += haversineDistance(prev, point);
        }
        pointsRef.current.push(point);

        const duration = (Date.now() - startTimeRef.current) / 1000;
        const pace = distanceRef.current > 0 ? duration / 60 / distanceRef.current : 0;
        const calories = Math.round(distanceRef.current * 65);

        setStats({
          distance: distanceRef.current,
          duration,
          pace,
          calories,
          points: [...pointsRef.current],
        });
      }
    );

    timerRef.current = setInterval(() => {
      const duration = (Date.now() - startTimeRef.current) / 1000;
      setStats((prev) => ({ ...prev, duration }));
    }, 1000);
  }, [hasPermission]);

  const stopTracking = useCallback((): WalkStats | null => {
    subscriptionRef.current?.remove();
    subscriptionRef.current = null;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setIsTracking(false);

    if (pointsRef.current.length === 0) return null;

    const finalStats: WalkStats = {
      distance: distanceRef.current,
      duration: (Date.now() - startTimeRef.current) / 1000,
      pace: distanceRef.current > 0 ? ((Date.now() - startTimeRef.current) / 1000 / 60) / distanceRef.current : 0,
      calories: Math.round(distanceRef.current * 65),
      points: [...pointsRef.current],
    };
    return finalStats;
  }, []);

  return { isTracking, stats, error, hasPermission, startTracking, stopTracking };
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
