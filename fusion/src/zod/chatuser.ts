import * as z from "zod"
import * as imports from "../../prisma/null"
import { ChatRole } from "@prisma/client"
import { CompleteMessage, RelatedMessageModel, CompleteChatTicket, RelatedChatTicketModel, CompleteUser, RelatedUserModel } from "./index"

export const ChatUserModel = z.object({
  id: z.string(),
  chatRole: z.nativeEnum(ChatRole),
  chatTicketId: z.string(),
  userId: z.string(),
})

export interface CompleteChatUser extends z.infer<typeof ChatUserModel> {
  messages: CompleteMessage[]
  chatTicket: CompleteChatTicket
  user: CompleteUser
}

/**
 * RelatedChatUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedChatUserModel: z.ZodSchema<CompleteChatUser> = z.lazy(() => ChatUserModel.extend({
  messages: RelatedMessageModel.array(),
  chatTicket: RelatedChatTicketModel,
  user: RelatedUserModel,
}))
