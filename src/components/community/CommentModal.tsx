import React, { useState } from "react";
import HeartIcon from "../icons/community-detail/heart.svg?react";
import type { IComment } from "../../types/community/post";
import Text from "../common/Text";

export default function CommentModal() {
  const [comments] = useState<IComment[]>([
    { id: 1, author: "강은성", text: "감사합니다", date: "3월 25일", isLiked: true },
    { id: 2, author: "강은성", text: "감사합니다", date: "3월 25일", isLiked: true },
    { id: 3, author: "강은성", text: "감사합니다", date: "3월 25일", isLiked: true },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setNewComment("");
  };

  return (
    <div className="flex h-[500px] w-full flex-col rounded-t-2xl bg-white shadow-xl">
      {/* 헤더 영역 */}
      <div className="flex items-center justify-center py-4">
        <Text variant="BOLD_16">댓글</Text>
      </div>

      {/* 댓글 리스트 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex-shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <Text variant="BOLD_12">{comment.author}</Text>
                </div>
                <div className="mt-[-5px]">
                  <Text variant="MEDIUM_12">{comment.text}</Text>
                </div>
                <div className="flex gap-2 text-xs text-gray-400">
                  <button className="hover:underline text-secondary-300">삭제</button>
                  <button className="hover:underline text-secondary-300">수정</button>
                </div>
              </div>
            </div>
            {/* 하트 아이콘 (isActive에 따른 색상 변경 적용) */}
            <button className={`${comment.isLiked ? "text-red-500" : "text-gray-300"}`}>
              <HeartIcon className="h-5 w-5 fill-currentColor" />
            </button>
          </div>
        ))}
      </div>

      {/* 댓글 입력 영역 (하단 고정) */}
      <div className="p-4 pb-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-300 flex-shrink-0" />
          <div className="relative flex-1">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글 달기"
              className="w-full rounded-2xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors"
            />
            <button type="submit" className="hidden">전송</button>
          </div>
        </form>
      </div>
    </div>
  );
}