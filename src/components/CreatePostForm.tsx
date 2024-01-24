'use client';

import { createPostFormAction } from '@/actions/createPostFormAction';
import { State } from '@/types/types';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { SubmitButton } from './SubmitButton';

const initialState: State = {
  message: null,
};

export const CreatePostForm = () => {
  const [fileName, setFileName] = useState<string>('');
  const [state, formAction] = useFormState(createPostFormAction, initialState);

  useEffect(() => {
    if (fileName !== null) {
      console.log(fileName);
    }
  }, [fileName]);

  return (
    <div className="flex flex-col items-center mt-7">
      <div className="text-green-500">{state.message}</div>
      <form
        action={formAction}
        className="flex flex-col bg-[#E3DEDA] w-11/12 items-center rounded-xl"
      >
        <div className="w-5/6 mt-6 mb-8">
          <div className="mb-6">
            <p className="text-[#646767] opacity-50 text-xs">題名</p>
            <input
              className="border border-[#6E96A5] bg-transparent w-full rounded-md h-10 text-[#646767] text-xs focus:outline-none px-2"
              type="text"
              id="title"
              name="title"
              required
            />
          </div>
          <div className="mb-6">
            <p className="text-[#646767] opacity-50 text-xs">音声ファイル</p>
            <label
              htmlFor="musicFile"
              className=" w-full h-10 border border-[#6E96A5] rounded-md flex items-center justify-center"
            >
              {fileName === '' ? (
                <p className="text-[#646767] opacity-50 text-xs">
                  ＋ファイルを投稿してください
                </p>
              ) : (
                <p className="text-[#646767] text-xs">{fileName}</p>
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
              }}
              required
            />
          </div>
          <div className="mb-6">
            <p className="text-[#646767] opacity-50 text-xs">タグ</p>
            <input
              className="border border-[#6E96A5] bg-transparent w-full h-10 rounded-md  text-[#646767] text-xs focus:outline-none px-2"
              type="text"
              id="tags"
              name="tags"
              required
            />
          </div>
          <div className="mb-6">
            <p className="text-[#646767] opacity-50 text-xs">概要</p>
            <textarea
              className="border border-[#6E96A5] bg-transparent w-full h-24 rounded-md  text-[#646767] text-xs focus:outline-none px-2 py-1"
              name="content"
              id="content"
              cols={30}
              rows={10}
              required
            ></textarea>
          </div>

          <SubmitButton />
        </div>
      </form>
    </div>
  );
};
