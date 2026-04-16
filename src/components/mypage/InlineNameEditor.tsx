import { useState, useEffect, useRef } from 'react';
import Text from '../common/Text';

interface IInlineNameEditorProps {
  name: string;
  isSaving: boolean;
  onNameChange: (newName: string) => Promise<unknown>;
}

export default function InlineNameEditor({
  name,
  isSaving,
  onNameChange,
}: IInlineNameEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(name);
  }, [name]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleConfirm = async () => {
    if (isSaving) return;
    const trimmed = draft.trim();
    if (!trimmed || trimmed === name) {
      setDraft(name);
      setIsEditing(false);
      return;
    }
    try {
      await onNameChange(trimmed);
      setIsEditing(false);
    } catch {
      // 저장 실패 시 편집 상태 유지 (사용자가 재시도 가능)
    }
  };

  const handleCancel = () => {
    setDraft(name);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleConfirm();
    if (e.key === 'Escape') handleCancel();
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-1">
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSaving}
          className="w-32 rounded border border-secondary-300 px-2 py-0.5 text-sm font-semibold text-center outline-none focus:border-primary"
        />
        <button
          onClick={handleConfirm}
          disabled={isSaving}
          className="text-xs text-primary font-medium disabled:opacity-50"
        >
          {isSaving ? (
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            '확인'
          )}
        </button>
        <button
          onClick={handleCancel}
          disabled={isSaving}
          className="text-xs text-secondary-400 font-medium disabled:opacity-50"
        >
          취소
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Text variant="SEMIBOLD_16">{name}</Text>
      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center text-secondary-400 hover:text-secondary-600"
        aria-label="이름 수정"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>
    </div>
  );
}
