import React, { useState, useRef } from "react";
import HeartIcon from "../icons/community-detail/heart.svg?react";
import Text from "../common/Text";
import { useAuthStore } from "../../stores/authStore";
import { useOutsideClick } from "../../services/hooks/common/useOutsideClick";
import { useCreateComment } from "../../services/hooks/common/useCreateComment";
import { useComments } from "../../services/hooks/common/useComments";
import type { ICommentRaw } from "../../types/community/theme";

interface ICommentModalProps {
  boardId: number;
  onRequestDelete: (commentId: number) => void;
  onRequestEdit: (commentId: number, content: string) => void;
}

export default function CommentModal({ boardId, onRequestDelete, onRequestEdit }: ICommentModalProps) {
  const { comments } = useComments(boardId);
  const userEmail = useAuthStore((state) => state.userEmail);

  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const editInputRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(editInputRef, () => {
    if (editingId !== null) setEditingId(null);
  });

  const { createComment } = useCreateComment(boardId, () => setNewComment(""));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    createComment(newComment);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent, comment: ICommentRaw) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const content = editText.trim();
      if (!content) return;
      setEditingId(null);
      onRequestEdit(comment.commentId, content);
    }
  };

  return (
    <div className="flex h-[500px] w-full flex-col rounded-t-2xl bg-white shadow-xl">
      {/* 헤더 */}
      <div className="flex items-center justify-center py-4">
        <Text variant="BOLD_16">댓글</Text>
      </div>

      {/* 댓글 리스트 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.commentId} className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex-shrink-0" />
              <div>
                <Text variant="BOLD_12">{comment.userEmail}</Text>
                <div className="mt-[-5px]">
                  {editingId === comment.commentId ? (
                    <div ref={editInputRef}>
                      <input
                        autoFocus
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => handleEditKeyDown(e, comment)}
                        className="rounded border border-gray-300 px-2 py-1 text-xs outline-none focus:border-blue-400"
                      />
                    </div>
                  ) : (
                    <Text variant="MEDIUM_12">{comment.content}</Text>
                  )}
                </div>
                {userEmail === comment.userEmail && (
                  <div className="flex gap-2">
                    <button
                      className="text-xs text-secondary-300 hover:underline"
                      onClick={() => onRequestDelete(comment.commentId)}
                    >
                      삭제
                    </button>
                    <button
                      className="text-xs text-secondary-300 hover:underline"
                      onClick={() => { setEditingId(comment.commentId); setEditText(comment.content); }}
                    >
                      수정
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button className="text-gray-300">
              <HeartIcon className="h-5 w-5 fill-currentColor" />
            </button>
          </div>
        ))}
      </div>

      {/* 댓글 입력 */}
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
