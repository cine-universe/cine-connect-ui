import { Achievements } from "./Achievements";
import { Experience } from "./Experience";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  primarySkills: string[];
  skills: string[];
  projectsCount: number;
  bio: string;
  links: number;
  achievements: Achievements[];
  experiences: Experience[];
}
