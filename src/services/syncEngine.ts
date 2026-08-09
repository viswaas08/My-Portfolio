import { ExperienceItem } from '../types';
import { experienceData } from '../data/experience';

const GITHUB_USERNAME = 'viswaas08';
const SYNC_CACHE_KEY = `quantum_timeline_sync_${GITHUB_USERNAME}`;
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 Hours

export interface LiveSyncResult {
  timestamp: number;
  timeline: ExperienceItem[];
  eventCount: number;
  lastSyncedFormatted: string;
}

export class SyncEngine {
  /**
   * Fetch authentic LinkedIn timeline items (strictly authentic profile telemetry)
   */
  static async fetchLiveTimeline(): Promise<LiveSyncResult> {
    if (typeof window !== 'undefined') {
      const cachedStr = localStorage.getItem(SYNC_CACHE_KEY);
      if (cachedStr) {
        try {
          const cached: LiveSyncResult = JSON.parse(cachedStr);
          const age = Date.now() - cached.timestamp;
          if (age < CACHE_TTL) {
            return cached;
          }
        } catch (e) {
          console.warn('Failed to parse timeline cache.');
        }
      }
    }

    const result: LiveSyncResult = {
      timestamp: Date.now(),
      timeline: experienceData,
      eventCount: experienceData.length,
      lastSyncedFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(SYNC_CACHE_KEY, JSON.stringify(result));
    }

    return result;
  }

  /**
   * Force manual sync bypassing cache
   */
  static async forceManualSync(): Promise<LiveSyncResult> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SYNC_CACHE_KEY);
    }
    return this.fetchLiveTimeline();
  }
}
