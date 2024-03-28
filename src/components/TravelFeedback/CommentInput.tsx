import { usePostTravelCommentMutation } from '@/store/travel/travelFeedbackApi.slice';
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from '@heroicons/react/16/solid';
import React, { useRef, useState } from 'react';

type Props = {
  scheduleId: number;
};

export default function CommentInput({ scheduleId }: Props) {
  const [commentInputIsOpen, setCommentInputIsOpen] = useState(false);
  const [postComment] = usePostTravelCommentMutation();
  const textAreaInput = useRef('');
  return (
    <div className="flex flex-col sticky bottom-0 bg-primary rounded-t-xl px-5 py-3">
      <div className="flex justify-between items-center text-white">
        <p className="text-xl font-bold">댓글</p>
        <button type="button" aria-label="show-comment">
          {commentInputIsOpen ? (
            <ChevronDoubleDownIcon
              className="w-8"
              onClick={() => setCommentInputIsOpen((pre) => !pre)}
            />
          ) : (
            <ChevronDoubleUpIcon
              className="w-8"
              onClick={() => setCommentInputIsOpen((pre) => !pre)}
            />
          )}
        </button>
      </div>
      {commentInputIsOpen && (
        <>
          <div className="mt-5">
            <textarea
              className="text-black w-full h-20 p-2"
              name=""
              id=""
              cols={30}
              rows={10}
              onChange={(e) => {
                textAreaInput.current = e.target.value;
              }}
            />
          </div>
          <button
            type="button"
            className="bg-white text-primary rounded-xl px-3 py-2 self-end mt-3 font-bold"
            onClick={() => {
              postComment({
                scheduleId,
                comment: textAreaInput.current,
              });

              setCommentInputIsOpen(false);
            }}
          >
            댓글 작성
          </button>
        </>
      )}
    </div>
  );
}
