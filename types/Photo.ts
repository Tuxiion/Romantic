
export interface Photo {
  id: string;
  uri: string;
  eventName: string;
  date: Date;
  frame: FrameType;
  createdAt: Date;
}

export type FrameType = 'hearts' | 'roses' | 'classic' | 'elegant' | 'vintage';

export interface FrameStyle {
  name: string;
  color: string;
  icon: string;
  borderStyle: 'solid' | 'dashed' | 'dotted';
}
