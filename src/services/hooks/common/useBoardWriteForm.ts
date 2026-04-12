import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { IBoardWriteFormData } from '../../../types/community/theme';

interface IBoardWriteFormInitialValues {
  title?: string;
  content?: string;
  isPublic?: boolean;
  tags?: string[];
  previewUrl?: string | null;
}

export function useBoardWriteForm(initialValues?: IBoardWriteFormInitialValues) {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<IBoardWriteFormData>({
    defaultValues: {
      isPublic: initialValues?.isPublic ?? true,
      title: initialValues?.title ?? '',
      content: initialValues?.content ?? '',
    },
  });

  const [tags, setTags] = useState<string[]>(initialValues?.tags ?? []);
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialValues?.previewUrl ?? null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
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
