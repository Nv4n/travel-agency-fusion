import * as z from "zod"
import * as imports from "../../prisma/null"
import { CompleteRoom, RelatedRoomModel, CompleteUser, RelatedUserModel } from "./index"

export const ReservationModel = z.object({
  id: z.string(),
  price: z.number(),
  from: z.date(),
  to: z.date(),
  roomId: z.string(),
  userId: z.string(),
})

export interface CompleteReservation extends z.infer<typeof ReservationModel> {
  room: CompleteRoom
  user: CompleteUser
}

/**
 * RelatedReservationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedReservationModel: z.ZodSchema<CompleteReservation> = z.lazy(() => ReservationModel.extend({
  room: RelatedRoomModel,
  user: RelatedUserModel,
}))
