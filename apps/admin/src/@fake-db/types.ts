// Type Imports
import { ThemeColor } from 'src/@core/layouts/types'
import {
  CardStatsCharacterProps,
  CardStatsHorizontalProps,
  CardStatsVerticalProps
} from 'src/@core/components/card-statistics/types'

// Template Search
//----------------
export type AppBarSearchType = {
  id: number
  url: string
  icon: string
  title: string
  category: string
}
export type AutocompleteType = {
  year: number
  title: string
}

// Faq Page
//-------------------
export type FaqQAndAType = {
  id: string
  answer: string
  question: string
}
export type FaqType = {
  [key: string]: {
    id: string
    icon: string
    title: string
    subtitle: string
    qandA: FaqQAndAType[]
  }
}

// Card Statistics Page
//-------------------------------
export type CardStatsType = {
  statsVertical: CardStatsVerticalProps[]
  statsCharacter: CardStatsCharacterProps[]
  statsHorizontal: CardStatsHorizontalProps[]
}

// User Profile pages
//-------------------
export type ProjectTableRowType = {
  id: number
  date: string
  name: string
  leader: string
  status: number
  avatar?: string
  avatarGroup: string[]
  avatarColor?: ThemeColor
}
export type ProfileHeaderType = {
  fullName: string
  coverImg: string
  location: string
  profileImg: string
  joiningDate: string
  designation: string
  designationIcon?: string
}
export type ProfileAvatarGroupType = {
  name: string
  avatar: string
}
export type ProfileChipType = {
  title: string
  color: ThemeColor
}
export type ProfileTabCommonType = {
  icon: string
  value: string
  property: string
}
export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }
export type ProfileConnectionsType = {
  name: string
  avatar: string
  isFriend: boolean
  connections: string
}
export type ProfileTeamsTechType = {
  title: string
  avatar: string
  members: number
  chipText: string
  ChipColor: ThemeColor
}
export type TeamsTabType = {
  title: string
  avatar: string
  description: string
  extraMembers: number
  chips: ProfileChipType[]
  avatarGroup: ProfileAvatarGroupType[]
}
export type ProjectsTabType = {
  hours: string
  tasks: string
  title: string
  budget: string
  client: string
  avatar: string
  members: string
  daysLeft: number
  comments: number
  deadline: string
  startDate: string
  totalTask: number
  budgetSpent: string
  description: string
  chipColor: ThemeColor
  completedTask: number
  avatarColor?: ThemeColor
  avatarGroup: ProfileAvatarGroupType[]
}
export type ConnectionsTabType = {
  name: string
  tasks: string
  avatar: string
  projects: string
  connections: string
  designation: string
  isConnected: boolean
  chips: ProfileChipType[]
}
export type ProfileTabType = {
  teams: ProfileTeamsType[]
  about: ProfileTabCommonType[]
  contacts: ProfileTabCommonType[]
  overview: ProfileTabCommonType[]
  teamsTech: ProfileTeamsTechType[]
  connections: ProfileConnectionsType[]
}
export type UserProfileActiveTab = ProfileTabType | TeamsTabType[] | ProjectsTabType[] | ConnectionsTabType[]

// Data Grid page
//---------------
export type DataGridRowType = {
  id: number
  age: string
  post: string
  city: string
  email: string
  salary: number
  status: number
  avatar: string
  full_name: string
  start_date: string
  experience: string
}

// Help Center
//------------
export type HelpCenterSubcategoryArticlesType = {
  slug: string
  title: string
  content: string
}
export type HelpCenterSubcategoriesType = {
  icon: string
  slug: string
  title: string
  articles: HelpCenterSubcategoryArticlesType[]
}
export type HelpCenterCategoriesType = {
  icon: string
  slug: string
  title: string
  avatarColor: ThemeColor
  subCategories: HelpCenterSubcategoriesType[]
}
export type HelpCenterArticlesOverviewType = {
  img: string
  slug: string
  title: string
  subtitle: string
}
