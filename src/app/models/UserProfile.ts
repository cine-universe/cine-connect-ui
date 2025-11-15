import { Achievements } from "./Achievements";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  primarySkills: string[];
  skills: string[];
  projectsCount: number;
  bio: string;
  achievements: Achievements[];
}
