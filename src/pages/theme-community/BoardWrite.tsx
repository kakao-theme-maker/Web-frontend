import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBoardWrite } from '../../services/hooks/useBoardWrite';
import Button from '../../components/common/Button';
import Text from '../../components/common/Text';
import type { IUserTheme } from '../../types/community/theme';

interface IBoardWriteLocationState {
  selectedTheme: IUserTheme;
}

export default function BoardWrite() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as IBoardWriteLocationState | null;

  useEffect(() => {
    if (!state?.selectedTheme) {
      navigate('/community/write', { replace: true });
    }
  }, [state, navigate]);

  const selectedTheme = state?.selectedTheme;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageCount = selectedTheme?.images.length ?? 1;

  const { register, handleSubmit, watch, setValue, errors, isSubmitting } = useBoardWrite(
    selectedTheme!,
  );

  const isPublic = watch('isPublic');

  if (!selectedTheme) return null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col px-4 py-5">
      {/* 테마 이미지 캐러셀 */}
      <div className="mb-5 flex flex-col items-center">
        <div className="flex h-44 w-full items-center justify-center rounded-xl bg-secondary-200">
          <Text variant="REGULAR_14" className="text-secondary-400">
            {selectedTheme.themeName}
          </Text>
        </div>

        {imageCount > 1 && (
          <div className="mt-2 flex gap-1.5">
            {Array.from({ length: imageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentImageIndex(i)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === currentImageIndex ? 'bg-primary' : 'bg-secondary-300'
                }`}
              />
            ))}
          </div>
        )}
        {imageCount <= 1 && (
          <div className="mt-2 flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-secondary-300'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 글제목 */}
      <div className="mb-4">
        <Text variant="SEMIBOLD_14" as="label" className="mb-1 block text-black">
          글제목
        </Text>
        <input
          {...register('title', { required: '제목을 입력해주세요.' })}
          placeholder="테마 이름을 입력해주세요."
          className="w-full rounded-lg border border-secondary-200 px-3 py-2 text-sm outline-none placeholder:text-secondary-300 focus:border-primary"
        />
        {errors.title && (
          <Text variant="REGULAR_12" as="p" className="mt-1 text-red-500">
            {errors.title.message}
          </Text>
        )}
      </div>

      {/* 내용 */}
      <div className="mb-4">
        <Text variant="SEMIBOLD_14" as="label" className="mb-1 block text-black">
          내용
        </Text>
        <textarea
          {...register('content', { required: '내용을 입력해주세요.' })}
          placeholder="내용을 입력해주세요."
          rows={4}
          className="w-full resize-none rounded-lg border border-secondary-200 px-3 py-2 text-sm outline-none placeholder:text-secondary-300 focus:border-primary"
        />
        {errors.content && (
          <Text variant="REGULAR_12" as="p" className="mt-1 text-red-500">
            {errors.content.message}
          </Text>
        )}
      </div>

      {/* 커뮤니티 공개여부 */}
      <div className="mb-6">
        <Text variant="SEMIBOLD_14" as="p" className="mb-2 text-black">
          커뮤니티 공개여부
        </Text>
        <div className="flex gap-4">
          <label className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={isPublic === true}
              onChange={() => setValue('isPublic', true)}
              className="h-4 w-4 accent-primary"
            />
            <Text variant="REGULAR_14">예</Text>
          </label>
          <label className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={isPublic === false}
              onChange={() => setValue('isPublic', false)}
              className="h-4 w-4 accent-primary"
            />
            <Text variant="REGULAR_14">아니오</Text>
          </label>
        </div>
      </div>

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? '등록 중...' : '작성완료'}
      </Button>
    </form>
  );
}
