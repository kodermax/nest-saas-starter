// ** Types
import { Dispatch } from 'redux'
import { ReactElement, SyntheticEvent } from 'react'

export type MailLabelType = 'personal' | 'company' | 'important' | 'private'

export type MailFolderType = 'inbox' | 'sent' | 'draft' | 'starred' | 'spam' | 'trash'

export type RouteParams = {
  label?: string
  folder?: string
}

export type MailLayoutType = RouteParams & {}

export type MailAttachmentType = {
  url: string
  size: string
  fileName: string
  thumbnail: string
}

export type FieldMenuItems = {
  src: string
  name: string
  value: string
}

export type FetchMailParamsType = { q: string; folder: MailFolderType; label: MailLabelType }

export type PaginateMailParamsType = { dir: 'next' | 'previous'; emailId: number }

export type UpdateMailParamsType = {
  emailIds: number[] | number | []
  dataToUpdate: { folder?: MailFolderType; isStarred?: boolean; isRead?: boolean; label?: MailLabelType }
}

export type UpdateMailLabelType = {
  label: MailLabelType
  emailIds: number[] | number | []
}

export type MailFromType = {
  name: string
  email: string
  avatar: string
}

export type MailToType = {
  name: string
  email: string
}

export type MailMetaType = {
  spam: number
  inbox: number
  draft: number
}

export type MailType = {
  id: number
  message: string
  subject: string
  isRead: boolean
  to: MailToType[]
  cc: string[] | []
  isStarred: boolean
  bcc: string[] | []
  from: MailFromType
  time: Date | string
  replies: MailType[]
  hasNextMail?: boolean
  folder: MailFolderType
  labels: MailLabelType[]
  hasPreviousMail?: boolean
  attachments: MailAttachmentType[]
}

export type MailFoldersArrType = {
  icon: ReactElement
  name: MailFolderType
}
export type MailFoldersObjType = {
  [key: string]: any[]
}

export type MailStore = {
  mails: MailType[] | null
  selectedMails: number[]
  currentMail: null | MailType
  mailMeta: null | MailMetaType
  filter: {
    q: string
    label: string
    folder: string
  }
}

export type MailLabelColors = {
  personal: string
  company: string
  private: string
  important: string
}

export type MailSidebarType = {
  hidden: boolean
  store: MailStore
  lgAbove: boolean
  dispatch: Dispatch<any>
  leftSidebarOpen: boolean
  leftSidebarWidth: number
  mailDetailsOpen: boolean
  toggleComposeOpen: () => void
  handleLeftSidebarToggle: () => void
  setMailDetailsOpen: (val: boolean) => void
  handleSelectAllMail: (val: boolean) => void
}

export type MailLogType = {
  query: string
  hidden: boolean
  store: MailStore
  lgAbove: boolean
  dispatch: Dispatch<any>
  direction: 'ltr' | 'rtl'
  mailDetailsOpen: boolean
  routeParams: RouteParams
  labelColors: MailLabelColors
  setQuery: (val: string) => void
  handleLeftSidebarToggle: () => void
  getCurrentMail: (id: number) => void
  handleSelectMail: (id: number) => void
  setMailDetailsOpen: (val: boolean) => void
  handleSelectAllMail: (val: boolean) => void
  updateMail: (data: UpdateMailParamsType) => void
  updateMailLabel: (data: UpdateMailLabelType) => void
  paginateMail: (data: PaginateMailParamsType) => void
}

export type MailDetailsType = {
  mail: MailType
  hidden: boolean
  dispatch: Dispatch<any>
  direction: 'ltr' | 'rtl'
  mailDetailsOpen: boolean
  routeParams: RouteParams
  labelColors: MailLabelColors
  folders: MailFoldersArrType[]
  foldersObj: MailFoldersObjType
  setMailDetailsOpen: (val: boolean) => void
  updateMail: (data: UpdateMailParamsType) => void
  paginateMail: (data: PaginateMailParamsType) => void
  handleStarMail: (e: SyntheticEvent, id: number, value: boolean) => void
  handleLabelUpdate: (id: number | number[], label: MailLabelType) => void
  handleFolderUpdate: (id: number | number[], folder: MailFolderType) => void
}

export type MailComposeType = {
  mdAbove: boolean
  composeOpen: boolean
  toggleComposeOpen: () => void
  composePopupWidth: number | string
}
