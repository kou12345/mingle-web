'use client';

import { createPostFormAction } from '@/actions/createPostFormAction';
import { formActionResult } from '@/types/types';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { SubmitButton } from './SubmitButton';
import { validationMusicName } from '@/types/types';
import { validationMusicDescription } from '@/types/types';
import { TagForm } from './ui/TagForm';

const initialState: formActionResult = {
  success: false,
  message: '',
};

export const CreatePostForm = () => {
  const [fileName, setFileName] = useState<string>('');
  const [state, formAction] = useFormState(createPostFormAction, initialState);
  const [isValidationCheck, setIsValidationCheck] = useState<boolean>(false);

  const validation = (validationTarget: string, textLength: number, text?: string) => {
    try {
      if (text) {
        validationMusicName.parse(text);
      }
      setIsValidationCheck(true);
    } catch {
      alert(`${validationTarget}の値が不正です。1文字以上${textLength}文字以内で入力してください`);
      setIsValidationCheck(false);
    }
  };

  return (
    <div className="mt-7 flex flex-col items-center">
      {state.success ? (
        <div className="text-green-500">投稿に成功しました</div>
      ) : (
        <div className="text-red-500">{state.message}</div>
      )}
      <form
        action={formAction}
        className="flex w-11/12 flex-col items-center rounded-xl bg-[#E3DEDA]"
      >
        <div className="mb-8 mt-6 w-5/6">
          <div className="mb-6">
            <p className="text-xs text-[#646767] opacity-50">題名</p>
            <input
              className="h-10 w-full rounded-md border border-[#6E96A5] bg-transparent px-2 text-xs text-[#646767] focus:outline-none"
              type="text"
              id="title"
              name="title"
              required
              onChange={(e) => validation("題名", 30, e.target.value)}
            />
          </div>
          <div className="mb-6">
            <p className="text-xs text-[#646767] opacity-50">音声ファイル</p>
            <label
              htmlFor="musicFile"
              className=" flex h-10 w-full items-center justify-center rounded-md border border-[#6E96A5]"
            >
              {fileName === '' ? (
                <p className="text-xs text-[#646767] opacity-50">
                  ＋ファイルを投稿してください
                </p>
              ) : (
                <p className="text-xs text-[#646767]">{fileName}</p>
              )}
            </label>
            <input
              type="file"
              className="hidden"
              accept=".mp3"
              id="musicFile"
              name="musicFile"
              onChange={(e) => {
                if (
                  e.target.files !== null &&
                  e.target.files[0] !== undefined
                ) {
                  setFileName(e.target.files[0].name);
                }
                validation("概要", 100, e.target.value);
              }}
              required
            />
          </div>
          <TagForm />
          <div className="mb-6">
            <p className="text-xs text-[#646767] opacity-50">概要</p>
            <textarea
              className="h-24 w-full rounded-md border border-[#6E96A5] bg-transparent  px-2 py-2 text-xs text-[#646767] focus:outline-none"
              name="content"
              id="content"
              cols={30}
              rows={10}
              required
            ></textarea>
          </div>

          <SubmitButton isValidationCheck={isValidationCheck} />
        </div>
      </form>
    </div>
  );
};
