import { Transaction } from '@/types/types';
import { eq } from 'drizzle-orm';
import { users } from 'drizzle/schema';
import 'server-only';
import { db } from './db';

// userIdを元にuserNameを取得する
export const getUserNameByUserId = async ({
  tx,
  userId,
}: {
  tx?: Transaction;
  userId: string;
}): Promise<string> => {
  let userName = '';

  try {
    const query = (tx || db)
      .select({ userName: users.userName })
      .from(users)
      .where(eq(users.id, userId));

    const result = await query;

    if (result.length > 0) {
      userName = result[0].userName;
    } else {
      throw new Error('ユーザーが見つかりませんでした。');
    }
  } catch (error) {
    console.log(error);
    throw new Error('ユーザー名を取得できませんでした。');
  }

  return userName;
};

// userNameを元にuserIdを取得する
export const getUserIdByUserName = async ({
  tx,
  userName,
}: {
  tx?: Transaction;
  userName: string;
}): Promise<string> => {
  try {
    const result = await (tx || db)
      .select({ id: users.id })
      .from(users)
      .where(eq(users.userName, userName));

    if (result.length < 0) {
      throw new Error('ERROR: ユーザーが見つかりませんでした。');
    }

    return result[0].id;
  } catch (error) {
    console.log(error);
    throw new Error('ERROR: ユーザーIDを取得できませんでした。');
  }
};

// userNameがすでに使われていないか検証する
export const getIsUserNameExists = async ({
  tx,
  userName,
}: {
  tx?: Transaction;
  userName: string;
}): Promise<boolean> => {
  try {
    const result = await (tx || db)
      .select({ userName: users.userName })
      .from(users)
      .where(eq(users.userName, userName));

    return result.length > 0;
  } catch (error) {
    console.error(error);
    // TODO エラーメッセージ
    throw new Error('ERROR: エラーが発生しました');
  }
};

// userIdがすでに使われていないか検証する
export const getIsUserIdExists = async ({
  tx,
  userId,
}: {
  tx?: Transaction;
  userId: string;
}): Promise<boolean> => {
  try {
    const result = await (tx || db)
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, userId));

    return result.length > 0;
  } catch (error) {
    console.error(error);
    // TODO エラーメッセージ
    throw new Error('ERROR: エラーが発生しました');
  }
};

// ユーザーを作成する
// この関数はusersテーブルに新しいユーザーを作成する
// サインアップ機能とは違う。また、オンボーディング時にuserNameを作成するために使う
// 関数名が適切ではないかも
export const createUser = async ({
  id,
  userName,
  email,
}: {
  id: string;
  userName: string;
  email: string;
}): Promise<void> => {
  try {
    await db.transaction(async (tx) => {
      // userNameがすでに使われていないか検証
      if (await getIsUserNameExists({ tx, userName })) {
        throw new Error('ERROR: そのユーザー名はすでに使われています。');
      }
      // userIdがすでに使われていないか検証
      if (await getIsUserIdExists({ tx, userId: id })) {
        throw new Error('ERROR: そのユーザーIDはすでに使われています。');
      }

      // ユーザーを作成
      await tx.insert(users).values({
        id,
        userName,
        email,
      });
    });
  } catch (error) {
    console.log(error);
    throw new Error('ERROR: ユーザーを作成できませんでした。');
  }
};
