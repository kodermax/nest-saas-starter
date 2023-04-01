// ----------------------------------------------------------------------

export type IFileShared = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  permission: string;
};

export type IFolderManager = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  tags: string[];
  totalFiles?: number;
  isFavorited: boolean;
  shared: IFileShared[] | null;
  dateCreated: Date | number | string;
  dateModified: Date | number | string;
};

export type IFileManager = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  tags: string[];
  isFavorited: boolean;
  shared: IFileShared[] | null;
  dateCreated: Date | number | string;
  dateModified: Date | number | string;
};

export type IFile = IFileManager | IFolderManager;
