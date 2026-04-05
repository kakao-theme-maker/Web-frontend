import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { IBoardWriteFormData } from '../../types/community/theme';

export function useBoardWriteForm() {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<IBoardWriteFormData>({
    defaultValues: { isPublic: true },
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    const trimmed = tagInput.trim().replace(/^#/, '');
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((prev) => [...prev, trimmed]);
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPreviewImage(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  return {
    register,
    rhfHandleSubmit: handleSubmit,
    watch,
    setValue,
    errors,
    formIsSubmitting: isSubmitting,
    tags,
    tagInput,
    setTagInput,
    handleAddTag,
    handleRemoveTag,
    previewImage,
    previewUrl,
    handleImageChange,
  };
}
