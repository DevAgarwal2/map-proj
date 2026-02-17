export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  avatar: string;
  tags: string[];
  rating: number;
  usageCount: number;
  systemPrompt: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string; // base64 encoded
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  files?: UploadedFile[];
}