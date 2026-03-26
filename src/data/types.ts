export interface ResumeData {
  personal: PersonalInfo
  experience: WorkEntry[]
  education: EduEntry[]
  skills: SkillGroup[]
  projects: Project[]
}

export interface PersonalInfo {
  name: string
  title: string
  location: string
  email: string
  github?: string
  linkedin?: string
  website?: string
}

export interface WorkEntry {
  id: string
  company: string
  role: string
  period: string
  location: string
  highlights: string[]
}

export interface EduEntry {
  id: string
  school: string
  degree: string
  period: string
  details?: string[]
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  github?: string
  demo?: string
}
