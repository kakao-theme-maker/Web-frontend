import { useRef } from 'react';

interface IProfileImageEditorProps {
  profileImage: string | undefined;
  isLoading: boolean;
  isUploading: boolean;
  onImageChange: (file: File) => void;
}

export default function ProfileImageEditor({
  profileImage,
  isLoading,
  isUploading,
  onImageChange,
}: IProfileImageEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onImageChange(file);
    e.target.value = '';
  };

  if (isLoading) {
    return <div className="h-20 w-20 rounded-full bg-secondary-200 animate-pulse" />;
  }

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      {profileImage ? (
        <img
          src={profileImage}
          alt="프로필 이미지"
          className="h-20 w-20 rounded-full object-cover"
        />
      ) : (
        <div className="h-20 w-20 rounded-full bg-secondary-300" />
      )}

      {/* 카메라 아이콘 오버레이 */}
      <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md border border-secondary-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5 text-secondary-600"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </div>

      {/* 업로드 중 스피너 오버레이 */}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
