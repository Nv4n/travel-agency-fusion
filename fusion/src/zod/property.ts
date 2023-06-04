import * as z from "zod"
import * as imports from "../../prisma/null"
import { CompleteUser, RelatedUserModel, CompleteRoom, RelatedRoomModel, CompleteReview, RelatedReviewModel } from "./index"

export const PropertyModel = z.object({
  id: z.string(),
  description: z.string(),
  ownerId: z.string(),
})

export interface CompleteProperty extends z.infer<typeof PropertyModel> {
  owner: CompleteUser
  rooms: CompleteRoom[]
  reviews: CompleteReview[]
}

/**
 * RelatedPropertyModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPropertyModel: z.ZodSchema<CompleteProperty> = z.lazy(() => PropertyModel.extend({
  owner: RelatedUserModel,
  rooms: RelatedRoomModel.array(),
  reviews: RelatedReviewModel.array(),
}))
