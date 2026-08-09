import { GithubEvent } from '../types/github';
import { ExperienceItem } from '../types';
import { experienceData } from '../data/experience';

const GITHUB_USERNAME = 'viswaas08';
const LINKEDIN_URL = 'https://www.linkedin.com/in/viswaa-s-69a49a1ba';
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
   * Fetch and synthesize dynamic live timeline from GitHub events and LinkedIn telemetry
   */
  static async fetchLiveTimeline(): Promise<LiveSyncResult> {
    // 1. Check local storage cache
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

    // 2. Fetch live events from GitHub REST API
    let liveGithubEvents: ExperienceItem[] = [];
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=30`);
      if (res.ok) {
        const events: GithubEvent[] = await res.json();
        liveGithubEvents = this.transformGithubEventsToTimeline(events);
      }
    } catch (e) {
      console.warn('GitHub events sync deferred due to network/rate limit:', e);
    }

    // 3. Merge LinkedIn career milestones & GitHub events into unified timeline
    const mergedTimeline = [...liveGithubEvents, ...experienceData];

    const result: LiveSyncResult = {
      timestamp: Date.now(),
      timeline: mergedTimeline,
      eventCount: mergedTimeline.length,
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

  /**
   * Transform raw GitHub API events into timeline items
   */
  private static transformGithubEventsToTimeline(events: GithubEvent[]): ExperienceItem[] {
    const items: ExperienceItem[] = [];

    events.forEach((evt, idx) => {
      const repoName = evt.repo.name.replace(`${GITHUB_USERNAME}/`, '');
      const dateStr = new Date(evt.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      if (evt.type === 'PushEvent') {
        const commitMsg = evt.payload?.commits?.[0]?.message || 'Code commit and repository update';
        items.push({
          id: `gh-push-${evt.id || idx}`,
          type: 'Work',
          role: `GitHub Commit: ${repoName}`,
          organization: 'GitHub Live Feed',
          period: dateStr,
          location: 'Live Ingestion',
          description: [
            `Pushed commit: "${commitMsg}"`,
            `Repository: ${evt.repo.name}`
          ],
          technologies: ['Git', 'GitHub API', 'CI/CD'],
          link: `https://github.com/${evt.repo.name}`
        });
      } else if (evt.type === 'CreateEvent') {
        items.push({
          id: `gh-create-${evt.id || idx}`,
          type: 'Work',
          role: `Created Repository: ${repoName}`,
          organization: 'GitHub Open Source',
          period: dateStr,
          location: 'Live Ingestion',
          description: [
            `Initialized new public repository ${evt.repo.name} on GitHub.`,
            `Automated live telemetry ingestion.`
          ],
          technologies: ['GitHub API', 'Open Source'],
          link: `https://github.com/${evt.repo.name}`
        });
      } else if (evt.type === 'ReleaseEvent') {
        items.push({
          id: `gh-release-${evt.id || idx}`,
          type: 'Work',
          role: `Shipped Production Release: ${repoName}`,
          organization: 'GitHub Releases',
          period: dateStr,
          location: 'Live Ingestion',
          description: [
            `Published new software release for ${repoName}.`
          ],
          technologies: ['Release Management', 'CI/CD'],
          link: `https://github.com/${evt.repo.name}`
        });
      }
    });

    return items.slice(0, 5); // Keep top 5 latest live GitHub events
  }
}
