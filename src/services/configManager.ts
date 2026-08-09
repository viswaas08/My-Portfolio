import { personalData } from '../data/personal';
import { skillsData } from '../data/skills';
import { projectsData } from '../data/projects';
import { experienceData } from '../data/experience';
import { certificatesData } from '../data/certificates';
import { achievementsData } from '../data/achievements';
import { blogsData } from '../data/blogs';
import { PersonalInfo, SkillItem, ProjectItem, ExperienceItem, CertificateItem, AchievementItem, BlogPost } from '../types';

const CONFIG_CACHE_KEY = 'quantum_portfolio_user_config_v3';

export interface PortfolioConfig {
  personal: PersonalInfo;
  skills: SkillItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  certificates: CertificateItem[];
  achievements: AchievementItem[];
  blogs: BlogPost[];
}

export class ConfigManager {
  /**
   * Load active config (combines local storage overrides with code defaults)
   */
  static getConfig(): PortfolioConfig {
    const cleanExperience = experienceData.filter(
      item => !item.organization.includes('University Institute') && !item.organization.includes('National Level')
    );

    if (typeof window === 'undefined') {
      return {
        personal: personalData,
        skills: skillsData,
        projects: projectsData,
        experience: cleanExperience,
        certificates: certificatesData,
        achievements: achievementsData,
        blogs: blogsData
      };
    }

    // Purge legacy cache key
    localStorage.removeItem('quantum_portfolio_user_config');

    const saved = localStorage.getItem(CONFIG_CACHE_KEY);
    if (saved) {
      try {
        const parsed: PortfolioConfig = JSON.parse(saved);
        const filteredExp = (parsed.experience || cleanExperience).filter(
          item => !item.organization.includes('University Institute') && !item.organization.includes('National Level')
        );
        return {
          personal: { ...personalData, ...parsed.personal },
          skills: parsed.skills || skillsData,
          projects: parsed.projects || projectsData,
          experience: filteredExp.length > 0 ? filteredExp : cleanExperience,
          certificates: parsed.certificates || certificatesData,
          achievements: parsed.achievements || achievementsData,
          blogs: parsed.blogs || blogsData
        };
      } catch (e) {
        console.warn('Failed to parse user portfolio config from localStorage.');
      }
    }

    return {
      personal: personalData,
      skills: skillsData,
      projects: projectsData,
      experience: cleanExperience,
      certificates: certificatesData,
      achievements: achievementsData,
      blogs: blogsData
    };
  }

  /**
   * Save config overrides to local storage
   */
  static saveConfig(newConfig: PortfolioConfig): void {
    try {
      localStorage.setItem(CONFIG_CACHE_KEY, JSON.stringify(newConfig));
      window.dispatchEvent(new Event('portfolio-config-updated'));
    } catch (e) {
      console.error('Error saving portfolio config:', e);
    }
  }

  /**
   * Export configuration as JSON file
   */
  static exportConfigJSON(): void {
    const config = this.getConfig();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `viswaa_portfolio_config_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  /**
   * Import configuration from JSON string
   */
  static importConfigJSON(jsonStr: string): boolean {
    try {
      const parsed: PortfolioConfig = JSON.parse(jsonStr);
      if (parsed.personal && Array.isArray(parsed.projects)) {
        this.saveConfig(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON configuration import:', e);
    }
    return false;
  }

  /**
   * Reset config to code defaults
   */
  static resetToDefaults(): void {
    localStorage.removeItem(CONFIG_CACHE_KEY);
    localStorage.removeItem('quantum_portfolio_user_config');
    window.dispatchEvent(new Event('portfolio-config-updated'));
  }
}
