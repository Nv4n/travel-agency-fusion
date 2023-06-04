import * as z from "zod"
import * as imports from "../../prisma/null"
import { Role } from "@prisma/client"
import { CompletePassword, RelatedPasswordModel, CompleteReservation, RelatedReservationModel, CompleteProperty, RelatedPropertyModel, CompleteChatUser, RelatedChatUserModel, CompleteReview, RelatedReviewModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  roles: z.nativeEnum(Role).array(),
  fname: z.string(),
  lname: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  password?: CompletePassword | null
  reservations: CompleteReservation[]
  properties: CompleteProperty[]
  chatUsers: CompleteChatUser[]
  reviews: CompleteReview[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  password: RelatedPasswordModel.nullish(),
  reservations: RelatedReservationModel.array(),
  properties: RelatedPropertyModel.array(),
  chatUsers: RelatedChatUserModel.array(),
  reviews: RelatedReviewModel.array(),
}))
