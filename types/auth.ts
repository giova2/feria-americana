import { Session } from "next-auth"

export type AuthSession = Session & {
  needsToCompleteProfile?: boolean // this flag is used to indicate if the profile need some extra data to be filled with
  sellerId?: string | null
}
