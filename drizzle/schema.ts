import { relations } from 'drizzle-orm';
import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  userName: text('user_name').notNull().unique(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  posts: many(posts),
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.id],
  }),
  comments: many(comments),
  follows: many(follows),
  following: one(follows, {
    fields: [users.id],
    references: [follows.followingUserId],
  }),
}));

export const posts = pgTable('posts', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
  musicFileUrl: text('music_file_url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  postTagRelations: many(postTagRelation),
  comments: many(comments),
  likes: many(likes),
}));

export const profiles = pgTable('profiles', {
  id: uuid('id')
    .notNull()
    .primaryKey()
    .references(() => users.id),
  displayName: text('display_name').notNull(),
  overview: text('overview').notNull(),
  avatarUrl: text('avatar_url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.id],
    references: [users.id],
  }),
}));

export const tags = pgTable('tags', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  postTagRelations: many(postTagRelation),
}));

export const postTagRelation = pgTable(
  'post_tag_relations',
  {
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id),
    tagId: uuid('tag_id')
      .notNull()
      .references(() => tags.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey(table.postId, table.tagId),
  }),
);

export const postTagRelationRelations = relations(
  postTagRelation,
  ({ one }) => ({
    post: one(posts, {
      fields: [postTagRelation.postId],
      references: [posts.id],
    }),
    tag: one(tags, {
      fields: [postTagRelation.tagId],
      references: [tags.id],
    }),
  }),
);

export const comments = pgTable('comments', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.id),
  comment: text('comment').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));

export const follows = pgTable('follows', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  // フォローするユーザー（フォロワー）
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  // フォローされるユーザー
  followingUserId: uuid('following_user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const followsRelations = relations(follows, ({ one }) => ({
  user: one(users, {
    fields: [follows.userId],
    references: [users.id],
  }),
  followingUser: one(users, {
    fields: [follows.followingUserId],
    references: [users.id],
  }),
}));

export const likes = pgTable('likes', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.id),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
}));
