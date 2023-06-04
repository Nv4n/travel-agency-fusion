import * as z from "zod"
import * as imports from "../../prisma/null"
import { CompleteProperty, RelatedPropertyModel, CompleteUser, RelatedUserModel } from "./index"

export const ReviewModel = z.object({
  id: z.string(),
  rating: z.number().int(),
  content: z.string(),
  createdAt: z.date(),
  propertyId: z.string(),
  userId: z.string(),
})

export interface CompleteReview extends z.infer<typeof ReviewModel> {
  property: CompleteProperty
  user: CompleteUser
}

/**
 * RelatedReviewModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedReviewModel: z.ZodSchema<CompleteReview> = z.lazy(() => ReviewModel.extend({
  property: RelatedPropertyModel,
  user: RelatedUserModel,
}))
