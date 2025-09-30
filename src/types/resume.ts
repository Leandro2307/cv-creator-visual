export interface PersonalInfo {
  name: string;
  birthDate: string;
  age: string;
  address: string;
  phone: string;
  email: string;
  additionalInfo: string;
  photo?: string;
}

export interface Education {
  id: string;
  institution: string;
  course: string;
  period: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
}

export interface Course {
  id: string;
  name: string;
  institution: string;
  year: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  courses: Course[];
  skills: string[];
  observations: string;
}
