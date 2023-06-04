import * as z from "zod"
import * as imports from "../../prisma/null"
import { ChatType } from "@prisma/client"
import { CompleteChatUser, RelatedChatUserModel } from "./index"

export const ChatTicketModel = z.object({
  id: z.string(),
  type: z.nativeEnum(ChatType),
})

export interface CompleteChatTicket extends z.infer<typeof ChatTicketModel> {
  chatUsers: CompleteChatUser[]
}

/**
 * RelatedChatTicketModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedChatTicketModel: z.ZodSchema<CompleteChatTicket> = z.lazy(() => ChatTicketModel.extend({
  chatUsers: RelatedChatUserModel.array(),
}))
