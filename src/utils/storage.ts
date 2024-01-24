import { Failure, Result, Success } from '@/types/types';
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';

// ArrayBufferをBufferに変換する関数
export const fileToBuffer = async (file: File): Promise<Buffer> => {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

// S3クライアントの設定
const client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_ACCESS_KEY as string,
  },
});

// 画像をアップロードする関数
export const putImage = async (
  file: File,
  pathName: string,
): Promise<Result<string, Error>> => {
  try {
    const buffer = await fileToBuffer(file);

    // アップロードパラメータの設定
    const uploadParams: PutObjectCommandInput = {
      Bucket: 'mingle',
      Key: pathName,
      Body: buffer,
      ContentType: file.type || 'application/octet-stream', // 動的にコンテントタイプを設定
      ACL: 'public-read',
    };

    // コマンドの実行
    await client.send(new PutObjectCommand(uploadParams));

    // アップロードされた画像のURLを返す
    return new Success(`${process.env.IMAGE_HOST_URL}/${pathName}`);
  } catch (error) {
    return new Failure(
      error instanceof Error ? error : new Error('putImage failed'),
    );
  }
};

// MP3ファイルをアップロードする関数
export const putAudio = async (
  file: File,
  pathName: string,
): Promise<Result<string, Error>> => {
  try {
    const buffer = await fileToBuffer(file);

    const uploadParams: PutObjectCommandInput = {
      Bucket: 'mingle',
      Key: pathName,
      Body: buffer,
      ContentType: 'audio/mpeg',
      ACL: 'public-read',
    };

    await client.send(new PutObjectCommand(uploadParams));

    return new Success(`${process.env.IMAGE_HOST_URL}/${pathName}`);
  } catch (error) {
    return new Failure(
      error instanceof Error ? error : new Error('putAudio failed'),
    );
  }
};
