// ----------------------------------------------------------------------

export type IBlogPostComment = {
  id: string;
  name: string;
  avatarUrl: string;
  message: string;
  postedAt: Date;
  users: {
    id: string;
    name: string;
    avatarUrl: string;
  }[];
  replyComment: {
    id: string;
    userId: string;
    message: string;
    postedAt: Date;
    tagUser?: string;
  }[];
};

export type IBlogPost = {
  id: string;
  cover: string;
  title: string;
  description: string;
  createdAt: Date | string | number;
  view: number;
  comment: number;
  share: number;
  favorite: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  tags: string[];
  body: string;
  favoritePerson: {
    name: string;
    avatarUrl: string;
  }[];
  comments: IBlogPostComment[];
};
