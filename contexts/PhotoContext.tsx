
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Photo } from '@/types/Photo';

interface PhotoContextType {
  photos: Photo[];
  addPhoto: (photo: Photo) => void;
  deletePhoto: (id: string) => void;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export function PhotoProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const addPhoto = (photo: Photo) => {
    console.log('Adding photo:', photo.eventName);
    setPhotos(prev => [photo, ...prev]);
  };

  const deletePhoto = (id: string) => {
    console.log('Deleting photo:', id);
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PhotoContext.Provider value={{ photos, addPhoto, deletePhoto }}>
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotos() {
  const context = useContext(PhotoContext);
  if (context === undefined) {
    throw new Error('usePhotos must be used within a PhotoProvider');
  }
  return context;
}
