export interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  price?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}
