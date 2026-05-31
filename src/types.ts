export interface Appointment {
  id: string;
  patientName: string;
  phoneNumber: string;
  service: string;
  date: string;
  timeSlot: string;
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  isLocal?: boolean;
}

export type SkinType = 'oily' | 'dry' | 'combination' | 'normal' | 'not-sure';
export type SkinConcern = 'acne' | 'hair-loss' | 'wrinkles' | 'pigmentation' | 'dryness' | 'routine';
