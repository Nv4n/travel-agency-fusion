import * as z from "zod"
import * as imports from "../../prisma/null"
import { Category, Icon } from "@prisma/client"
import { CompleteRoom, RelatedRoomModel } from "./index"

export const FacilityModel = z.object({
  id: z.string(),
  description: z.string(),
  category: z.nativeEnum(Category),
  icon: z.nativeEnum(Icon),
})

export interface CompleteFacility extends z.infer<typeof FacilityModel> {
  rooms: CompleteRoom[]
}

/**
 * RelatedFacilityModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFacilityModel: z.ZodSchema<CompleteFacility> = z.lazy(() => FacilityModel.extend({
  rooms: RelatedRoomModel.array(),
}))
