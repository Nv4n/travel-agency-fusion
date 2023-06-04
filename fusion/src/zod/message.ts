import * as z from "zod"
import * as imports from "../../prisma/null"
import { CompleteChatUser, RelatedChatUserModel } from "./index"

export const MessageModel = z.object({
  id: z.string(),
  content: z.string(),
  chatUserId: z.string(),
})

export interface CompleteMessage extends z.infer<typeof MessageModel> {
  chatUser: CompleteChatUser
}

/**
 * RelatedMessageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMessageModel: z.ZodSchema<CompleteMessage> = z.lazy(() => MessageModel.extend({
  chatUser: RelatedChatUserModel,
}))
