'use client';

import { formActionResult } from '@/types/types';
import { useFormState } from 'react-dom';
import { AvatarFileInput } from './AvatarFileInput';
import { DisplayNameInput } from './DisplayNameInput';
import { OverviewInput } from './OverviewInput';

type BaseProps = {
  formAction: (
    _prevState: formActionResult,
    formData: FormData,
  ) => Promise<formActionResult>;
  // プロフィールの作成か更新かを表すプロパティ
  actionType: 'create' | 'update';
};

type UpdateProps = BaseProps & {
  actionType: 'update';
  existingData: {
    // 既存のデータを表すプロパティ
    displayName: string;
    overview: string;
    avatarUrl: string;
  };
};

type CreateProps = BaseProps & {
  actionType: 'create';
};

// Propsの型はactionTypeによって異なるプロパティを持つ
type Props = CreateProps | UpdateProps;

const initialState: formActionResult = {
  success: false,
  message: '',
};

export function ProfileForm(props: Props) {
  const [state, formAction] = useFormState(props.formAction, initialState);

  // `actionType` が `update` の場合、`existingData` を使用
  // `create` の場合は `undefined` または空文字列を渡す
  const displayNameDefaultValue =
    props.actionType === 'update' ? props.existingData.displayName : '';
  const overviewDefaultValue =
    props.actionType === 'update' ? props.existingData.overview : '';
  const avatarUrlDefaultValue =
    props.actionType === 'update' ? props.existingData.avatarUrl : '';

  return (
    <div>
      <form action={formAction}>
        <DisplayNameInput currentDisplayName={displayNameDefaultValue} />
        <OverviewInput currentOverview={overviewDefaultValue} />
        <AvatarFileInput currentAvatarUrl={avatarUrlDefaultValue} />
        {/* create、updateでボタンのテキストを変える */}
        <button type="submit">
          {props.actionType === 'create' ? '作成' : '更新'}
        </button>
      </form>
      {state.success ? (
        <div className="text-green-500">投稿に成功しました</div>
      ) : (
        <div className="text-red-500">{state.message}</div>
      )}
    </div>
  );
}
