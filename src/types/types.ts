import { ExtractTablesWithRelations, InferSelectModel } from 'drizzle-orm';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';
import { z } from 'zod';
import {
  posts,
  profiles,
  tags,
  users,
} from '/Users/kou12345/workspace/mingle-web/drizzle/schema';

export type Result<T, E> = Success<T, E> | Failure<T, E>;

export class Success<T, E> {
  constructor(readonly value: T) {}
  type = 'success' as const;
  isSuccess(): this is Success<T, E> {
    return true;
  }
  isFailure(): this is Failure<T, E> {
    return false;
  }
}

export class Failure<T, E> {
  constructor(readonly value: E) {}
  type = 'failure' as const;
  isSuccess(): this is Success<T, E> {
    return false;
  }
  isFailure(): this is Failure<T, E> {
    return true;
  }
}

export const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
});

export type Auth = z.infer<typeof AuthSchema>;

export type Transaction = PgTransaction<
  PostgresJsQueryResultHKT,
  typeof import('../../drizzle/schema'),
  ExtractTablesWithRelations<typeof import('../../drizzle/schema')>
>;

// 音声ファイルのvalidation
const musicFileSchema = z.custom<File>((file) => {
  if (!(file instanceof File)) {
    throw new Error('ファイルを選択してください');
  }

  if (file.type !== 'audio/mpeg') {
    throw new Error('mp3ファイルを選択してください');
  }

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (file.size > MAX_SIZE) {
    throw new Error('ファイルサイズは10MB以下にしてください');
  }

  return file;
});

// アバター画像のvalidation
const avatarFileSchema = z.custom<File>((file) => {
  if (!(file instanceof File)) {
    throw new Error('ファイルを選択してください');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('画像ファイルを選択してください');
  }

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
    throw new Error('ファイルサイズは5MB以下にしてください');
  }

  return file;
});

// createPostFormActionのvalidation
export const createPostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(300),
  musicFile: musicFileSchema,
  tags: z.array(z.string().min(1).max(20)),
});

// commentFormActionのvalidation
export const commentSchema = z.object({
  comment: z.string().min(1).max(100),
});

// profileFormActionのvalidation
export const profileSchema = z.object({
  userId: z.string().uuid(),
  displayName: z.string().min(1).max(20),
  overview: z.string().min(1).max(200),
  avatarFile: avatarFileSchema,
});

export type PostModel = InferSelectModel<typeof posts>;
export type TagModel = InferSelectModel<typeof tags>;
export type UserModel = InferSelectModel<typeof users>;
export type ProfileModel = InferSelectModel<typeof profiles>;

export type PostData = {
  id: string;
  title: string;
  content: string;
  musicFileUrl: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
};

export type PostDetail = {
  id: PostModel['id'];
  title: PostModel['title'];
  content: PostModel['content'];
  musicFileUrl: PostModel['musicFileUrl'];
  createdAt: PostModel['createdAt'];
  updatedAt: PostModel['updatedAt'];
  tags: TagModel['name'][];
  author: {
    userName: UserModel['userName'];
    displayName: ProfileModel['displayName'];
    avatarUrl: ProfileModel['avatarUrl'];
  };
};

export type Tag = {
  id: string;
  name: string;
};

export type Profile = {
  displayName: string;
  overview: string;
  avatarUrl: string;
};

export type User = {
  id: string;
  userName: string;
  email: string;
};

export type Comment = {
  comment: string;
  displayName: string;
  avatarUrl: string;
  userName: string;
  createdAt: Date;
};

export type formActionResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export type State = {
  message: string | null;
};

export const validationEmail =  z.string().max(20).min(1)
export const validationOverView =  z.string().max(100).min(1)
export const validationMusicName =  z.string().max(30).min(1, {
  message: `Input must be at least characters long`,
})
export const validationMusicDescription =  z.string().max(100).min(0)