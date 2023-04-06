// ----------------------------------------------------------------------

export type IMailLabel = {
  id: string;
  type: string;
  name: string;
  unreadCount?: number;
  color?: string;
};

export type IMailSender = {
  name: string;
  email: string;
  avatar: null | string;
};

export type IMailAttachment = {
  name: string;
  size: number;
  type: string;
  path: string;
  preview: string;
  dateCreated: Date;
  dateModified: Date;
};

export type IMail = {
  id: string;
  labelIds: string[];
  folder: string | undefined;
  isImportant: boolean;
  isStarred: boolean;
  isUnread: boolean;
  subject: string;
  message: string;
  createdAt: Date | string | number;
  attachments: IMailAttachment[];
  from: IMailSender;
  to: IMailSender[];
};

// ----------------------------------------------------------------------

export type IMailListState = {
  byId: Record<string, IMail>;
  allIds: string[];
};

export type IMailState = {
  isLoading: boolean;
  error: Error | string | null;
  mails: IMailListState;
  labels: IMailLabel[];
};
