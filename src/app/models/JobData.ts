export interface JobData {
  id: number;
  title: string;
  company: string;
  type: string;    // e.g., 'Contract'
  location: string; // e.g., 'Los Angeles, CA'
  rate: string;    // e.g., '$650/day'
  postedTime: string; // e.g., '3h ago'
  description: string;
  skills: string[];
}