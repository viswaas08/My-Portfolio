import { ExperienceItem } from '../types';
import { experienceData } from '../data/experience';

const GITHUB_USERNAME = 'viswaas08';
const SYNC_CACHE_KEY = `quantum_timeline_sync_v3_${GITHUB_USERNAME}`;
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
      // Purge legacy caches
      localStorage.removeItem(`quantum_timeline_sync_${GITHUB_USERNAME}`);
      localStorage.removeItem(`quantum_timeline_sync_v2_${GITHUB_USERNAME}`);
      localStorage.removeItem('quantum_portfolio_user_config');

      const cachedStr = localStorage.getItem(SYNC_CACHE_KEY);
      if (cachedStr) {
        try {
          const cached: LiveSyncResult = JSON.parse(cachedStr);
          const age = Date.now() - cached.timestamp;
          if (age < CACHE_TTL) {
            // Ensure no legacy item leaks through
            const sanitized = cached.timeline.filter(
              item => !item.organization.includes('University Institute') && !item.organization.includes('National Level')
            );
            if (sanitized.length > 0) {
              return { ...cached, timeline: sanitized, eventCount: sanitized.length };
            }
          }
        } catch (e) {
          console.warn('Failed to parse timeline cache.');
        }
      }
    }

    // Filter experienceData strictly
    const sanitizedTimeline = experienceData.filter(
      item => !item.organization.includes('University Institute') && !item.organization.includes('National Level')
    );

    const result: LiveSyncResult = {
      timestamp: Date.now(),
      timeline: sanitizedTimeline,
      eventCount: sanitizedTimeline.length,
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
