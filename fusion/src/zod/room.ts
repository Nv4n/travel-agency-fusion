import * as z from "zod"
import * as imports from "../../prisma/null"
import { CompleteProperty, RelatedPropertyModel, CompleteReservation, RelatedReservationModel, CompleteFacility, RelatedFacilityModel } from "./index"

export const RoomModel = z.object({
  id: z.string(),
  quantity: z.number().int(),
  maxGuests: z.number().int(),
  price: z.number(),
  hotelId: z.string(),
})

export interface CompleteRoom extends z.infer<typeof RoomModel> {
  hotel: CompleteProperty
  reservations: CompleteReservation[]
  facilities: CompleteFacility[]
}

/**
 * RelatedRoomModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRoomModel: z.ZodSchema<CompleteRoom> = z.lazy(() => RoomModel.extend({
  hotel: RelatedPropertyModel,
  reservations: RelatedReservationModel.array(),
  facilities: RelatedFacilityModel.array(),
}))
