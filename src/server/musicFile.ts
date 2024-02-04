import { putAudio } from '@/utils/storage';
import 'server-only';

// 音声ファイルのアップロード
export const uploadMusicFile = async ({
  musicFile,
  title,
  userName,
}: {
  musicFile: File;
  title: string;
  userName: string;
}): Promise<string> => {
  try {
    // musicFileがmp3ファイルでない場合はエラーを投げる
    if (musicFile.type !== 'audio/mpeg') {
      throw new Error(
        'ERROR: 音声ファイルはmp3形式でアップロードしてください。',
      );
    }

    // ファイル名を作成
    const pathName = `/music/${encodeURIComponent(title)}_${encodeURIComponent(
      userName,
    )}_${Date.now()}.mp3`;

    // ファイルのアップロード
    const result = await putAudio(musicFile, pathName);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error('ERROR: 音声ファイルのアップロードに失敗しました。');
  }
};
