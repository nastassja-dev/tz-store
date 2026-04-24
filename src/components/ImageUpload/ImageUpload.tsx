import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import type { UseFormSetValue } from 'react-hook-form';
import type { Product } from '../../types/product';
import styles from './ImageUpload.module.scss';

interface ImageUploadProps {
  value?: string;
  setValue: UseFormSetValue<Omit<Product, 'id'>>;
}

export const ImageUpload = ({ value, setValue }: ImageUploadProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      setValue('image', result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleImageChange(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleImageChange(file);
      }
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setValue('image', url);
    if (url && isValidUrl(url)) {
      setPreview(url);
    }
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      {/* Drag & drop зона */}
      <div
        className={`${styles.dropZone} ${isDragActive ? styles.active : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Перетащите изображение или нажмите для выбора"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className={styles.hiddenInput}
          aria-hidden="true"
        />

        {preview ? (
          <img src={preview} alt="Предпросмотр" className={styles.preview} />
        ) : (
          <div className={styles.content}>
            <Upload size={40} />
            <p className={styles.text}>
              Перетащите изображение сюда
              <br />
              или нажмите для выбора
            </p>
          </div>
        )}
      </div>

      {/* URL поле */}
      <div className={styles.urlField}>
        <input
          type="url"
          placeholder="Или введите URL изображения"
          value={value || ''}
          onChange={handleUrlChange}
          className={styles.input}
          aria-label="URL изображения"
        />
      </div>
    </div>
  );
};
