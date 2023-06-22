import { z } from "zod";
import type { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
	"ReadUncommitted",
	"ReadCommitted",
	"RepeatableRead",
	"Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum([
	"id",
	"email",
	"roles",
	"fname",
	"lname",
	"createdAt",
	"updatedAt",
]);

export const PasswordScalarFieldEnumSchema = z.enum(["hash", "userId"]);

export const ChatScalarFieldEnumSchema = z.enum(["id"]);

export const MessageScalarFieldEnumSchema = z.enum([
	"id",
	"content",
	"chatId",
	"userId",
]);

export const ReviewScalarFieldEnumSchema = z.enum([
	"id",
	"rating",
	"content",
	"createdAt",
	"propertyId",
	"userId",
]);

export const ReservationScalarFieldEnumSchema = z.enum([
	"id",
	"price",
	"from",
	"to",
	"roomId",
	"userId",
]);

export const PropertyScalarFieldEnumSchema = z.enum([
	"id",
	"description",
	"ownerId",
]);

export const RoomScalarFieldEnumSchema = z.enum([
	"id",
	"quantity",
	"maxGuests",
	"price",
	"hotelId",
]);

export const FacilityScalarFieldEnumSchema = z.enum([
	"id",
	"description",
	"category",
	"icon",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const RoleSchema = z.enum(["USER", "SUPPORT"]);

export type RoleType = `${z.infer<typeof RoleSchema>}`;

export const CategorySchema = z.enum([
	"ROOM",
	"FOOD",
	"WELLNESS",
	"MISCELLANEOUS",
]);

export type CategoryType = `${z.infer<typeof CategorySchema>}`;

export const IconSchema = z.enum([
	"BED",
	"WIFI",
	"FITNESS",
	"RESTAURANT",
	"NOSMOKE",
	"SOUNDPROOF",
	"BAR",
	"AC",
	"PARKING",
	"SPA",
	"BREAKFAST",
	"FRIDGE",
	"KITCHEN",
]);

export type IconType = `${z.infer<typeof IconSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
	roles: RoleSchema.array(),
	id: z.string().cuid(),
	email: z.string(),
	fname: z.string(),
	lname: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// PASSWORD SCHEMA
/////////////////////////////////////////

export const PasswordSchema = z.object({
	hash: z.string(),
	userId: z.string(),
});

export type Password = z.infer<typeof PasswordSchema>;

/////////////////////////////////////////
// CHAT SCHEMA
/////////////////////////////////////////

export const ChatSchema = z.object({
	id: z.string().cuid(),
});

export type Chat = z.infer<typeof ChatSchema>;

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
	id: z.string().cuid(),
	content: z.string(),
	chatId: z.string(),
	userId: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;

/////////////////////////////////////////
// REVIEW SCHEMA
/////////////////////////////////////////

export const ReviewSchema = z.object({
	id: z.string().uuid(),
	rating: z.number().int(),
	content: z.string(),
	createdAt: z.coerce.date(),
	propertyId: z.string(),
	userId: z.string(),
});

export type Review = z.infer<typeof ReviewSchema>;

/////////////////////////////////////////
// RESERVATION SCHEMA
/////////////////////////////////////////

export const ReservationSchema = z.object({
	id: z.string().cuid(),
	price: z.number(),
	from: z.coerce.date(),
	to: z.coerce.date(),
	roomId: z.string(),
	userId: z.string(),
});

export type Reservation = z.infer<typeof ReservationSchema>;

/////////////////////////////////////////
// PROPERTY SCHEMA
/////////////////////////////////////////

export const PropertySchema = z.object({
	id: z.string().cuid(),
	description: z.string(),
	ownerId: z.string(),
});

export type Property = z.infer<typeof PropertySchema>;

/////////////////////////////////////////
// ROOM SCHEMA
/////////////////////////////////////////

export const RoomSchema = z.object({
	id: z.string().cuid(),
	quantity: z.number().int(),
	maxGuests: z.number().int(),
	price: z.number(),
	hotelId: z.string(),
});

export type Room = z.infer<typeof RoomSchema>;

/////////////////////////////////////////
// FACILITY SCHEMA
/////////////////////////////////////////

export const FacilitySchema = z.object({
	category: CategorySchema,
	icon: IconSchema,
	id: z.string().cuid(),
	description: z.string(),
});

export type Facility = z.infer<typeof FacilitySchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
	.object({
		password: z
			.union([z.boolean(), z.lazy(() => PasswordArgsSchema)])
			.optional(),
		reservations: z
			.union([z.boolean(), z.lazy(() => ReservationFindManyArgsSchema)])
			.optional(),
		properties: z
			.union([z.boolean(), z.lazy(() => PropertyFindManyArgsSchema)])
			.optional(),
		messages: z
			.union([z.boolean(), z.lazy(() => MessageFindManyArgsSchema)])
			.optional(),
		reviews: z
			.union([z.boolean(), z.lazy(() => ReviewFindManyArgsSchema)])
			.optional(),
		Chat: z
			.union([z.boolean(), z.lazy(() => ChatFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z
	.object({
		select: z.lazy(() => UserSelectSchema).optional(),
		include: z.lazy(() => UserIncludeSchema).optional(),
	})
	.strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> =
	z
		.object({
			select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
	z
		.object({
			reservations: z.boolean().optional(),
			properties: z.boolean().optional(),
			messages: z.boolean().optional(),
			reviews: z.boolean().optional(),
			Chat: z.boolean().optional(),
		})
		.strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
	.object({
		id: z.boolean().optional(),
		email: z.boolean().optional(),
		roles: z.boolean().optional(),
		fname: z.boolean().optional(),
		lname: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		password: z
			.union([z.boolean(), z.lazy(() => PasswordArgsSchema)])
			.optional(),
		reservations: z
			.union([z.boolean(), z.lazy(() => ReservationFindManyArgsSchema)])
			.optional(),
		properties: z
			.union([z.boolean(), z.lazy(() => PropertyFindManyArgsSchema)])
			.optional(),
		messages: z
			.union([z.boolean(), z.lazy(() => MessageFindManyArgsSchema)])
			.optional(),
		reviews: z
			.union([z.boolean(), z.lazy(() => ReviewFindManyArgsSchema)])
			.optional(),
		Chat: z
			.union([z.boolean(), z.lazy(() => ChatFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

// PASSWORD
//------------------------------------------------------

export const PasswordIncludeSchema: z.ZodType<Prisma.PasswordInclude> = z
	.object({
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
	})
	.strict();

export const PasswordArgsSchema: z.ZodType<Prisma.PasswordArgs> = z
	.object({
		select: z.lazy(() => PasswordSelectSchema).optional(),
		include: z.lazy(() => PasswordIncludeSchema).optional(),
	})
	.strict();

export const PasswordSelectSchema: z.ZodType<Prisma.PasswordSelect> = z
	.object({
		hash: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
	})
	.strict();

// CHAT
//------------------------------------------------------

export const ChatIncludeSchema: z.ZodType<Prisma.ChatInclude> = z
	.object({
		messages: z
			.union([z.boolean(), z.lazy(() => MessageFindManyArgsSchema)])
			.optional(),
		participants: z
			.union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => ChatCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

export const ChatArgsSchema: z.ZodType<Prisma.ChatArgs> = z
	.object({
		select: z.lazy(() => ChatSelectSchema).optional(),
		include: z.lazy(() => ChatIncludeSchema).optional(),
	})
	.strict();

export const ChatCountOutputTypeArgsSchema: z.ZodType<Prisma.ChatCountOutputTypeArgs> =
	z
		.object({
			select: z.lazy(() => ChatCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const ChatCountOutputTypeSelectSchema: z.ZodType<Prisma.ChatCountOutputTypeSelect> =
	z
		.object({
			messages: z.boolean().optional(),
			participants: z.boolean().optional(),
		})
		.strict();

export const ChatSelectSchema: z.ZodType<Prisma.ChatSelect> = z
	.object({
		id: z.boolean().optional(),
		messages: z
			.union([z.boolean(), z.lazy(() => MessageFindManyArgsSchema)])
			.optional(),
		participants: z
			.union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => ChatCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

// MESSAGE
//------------------------------------------------------

export const MessageIncludeSchema: z.ZodType<Prisma.MessageInclude> = z
	.object({
		chat: z.union([z.boolean(), z.lazy(() => ChatArgsSchema)]).optional(),
		User: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
	})
	.strict();

export const MessageArgsSchema: z.ZodType<Prisma.MessageArgs> = z
	.object({
		select: z.lazy(() => MessageSelectSchema).optional(),
		include: z.lazy(() => MessageIncludeSchema).optional(),
	})
	.strict();

export const MessageSelectSchema: z.ZodType<Prisma.MessageSelect> = z
	.object({
		id: z.boolean().optional(),
		content: z.boolean().optional(),
		chatId: z.boolean().optional(),
		userId: z.boolean().optional(),
		chat: z.union([z.boolean(), z.lazy(() => ChatArgsSchema)]).optional(),
		User: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
	})
	.strict();

// REVIEW
//------------------------------------------------------

export const ReviewIncludeSchema: z.ZodType<Prisma.ReviewInclude> = z
	.object({
		property: z
			.union([z.boolean(), z.lazy(() => PropertyArgsSchema)])
			.optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
	})
	.strict();

export const ReviewArgsSchema: z.ZodType<Prisma.ReviewArgs> = z
	.object({
		select: z.lazy(() => ReviewSelectSchema).optional(),
		include: z.lazy(() => ReviewIncludeSchema).optional(),
	})
	.strict();

export const ReviewSelectSchema: z.ZodType<Prisma.ReviewSelect> = z
	.object({
		id: z.boolean().optional(),
		rating: z.boolean().optional(),
		content: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		propertyId: z.boolean().optional(),
		userId: z.boolean().optional(),
		property: z
			.union([z.boolean(), z.lazy(() => PropertyArgsSchema)])
			.optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
	})
	.strict();

// RESERVATION
//------------------------------------------------------

export const ReservationIncludeSchema: z.ZodType<Prisma.ReservationInclude> = z
	.object({
		room: z.union([z.boolean(), z.lazy(() => RoomArgsSchema)]).optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
	})
	.strict();

export const ReservationArgsSchema: z.ZodType<Prisma.ReservationArgs> = z
	.object({
		select: z.lazy(() => ReservationSelectSchema).optional(),
		include: z.lazy(() => ReservationIncludeSchema).optional(),
	})
	.strict();

export const ReservationSelectSchema: z.ZodType<Prisma.ReservationSelect> = z
	.object({
		id: z.boolean().optional(),
		price: z.boolean().optional(),
		from: z.boolean().optional(),
		to: z.boolean().optional(),
		roomId: z.boolean().optional(),
		userId: z.boolean().optional(),
		room: z.union([z.boolean(), z.lazy(() => RoomArgsSchema)]).optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
	})
	.strict();

// PROPERTY
//------------------------------------------------------

export const PropertyIncludeSchema: z.ZodType<Prisma.PropertyInclude> = z
	.object({
		owner: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		rooms: z
			.union([z.boolean(), z.lazy(() => RoomFindManyArgsSchema)])
			.optional(),
		reviews: z
			.union([z.boolean(), z.lazy(() => ReviewFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([
				z.boolean(),
				z.lazy(() => PropertyCountOutputTypeArgsSchema),
			])
			.optional(),
	})
	.strict();

export const PropertyArgsSchema: z.ZodType<Prisma.PropertyArgs> = z
	.object({
		select: z.lazy(() => PropertySelectSchema).optional(),
		include: z.lazy(() => PropertyIncludeSchema).optional(),
	})
	.strict();

export const PropertyCountOutputTypeArgsSchema: z.ZodType<Prisma.PropertyCountOutputTypeArgs> =
	z
		.object({
			select: z.lazy(() => PropertyCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const PropertyCountOutputTypeSelectSchema: z.ZodType<Prisma.PropertyCountOutputTypeSelect> =
	z
		.object({
			rooms: z.boolean().optional(),
			reviews: z.boolean().optional(),
		})
		.strict();

export const PropertySelectSchema: z.ZodType<Prisma.PropertySelect> = z
	.object({
		id: z.boolean().optional(),
		description: z.boolean().optional(),
		ownerId: z.boolean().optional(),
		owner: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		rooms: z
			.union([z.boolean(), z.lazy(() => RoomFindManyArgsSchema)])
			.optional(),
		reviews: z
			.union([z.boolean(), z.lazy(() => ReviewFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([
				z.boolean(),
				z.lazy(() => PropertyCountOutputTypeArgsSchema),
			])
			.optional(),
	})
	.strict();

// ROOM
//------------------------------------------------------

export const RoomIncludeSchema: z.ZodType<Prisma.RoomInclude> = z
	.object({
		hotel: z
			.union([z.boolean(), z.lazy(() => PropertyArgsSchema)])
			.optional(),
		reservations: z
			.union([z.boolean(), z.lazy(() => ReservationFindManyArgsSchema)])
			.optional(),
		facilities: z
			.union([z.boolean(), z.lazy(() => FacilityFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => RoomCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

export const RoomArgsSchema: z.ZodType<Prisma.RoomArgs> = z
	.object({
		select: z.lazy(() => RoomSelectSchema).optional(),
		include: z.lazy(() => RoomIncludeSchema).optional(),
	})
	.strict();

export const RoomCountOutputTypeArgsSchema: z.ZodType<Prisma.RoomCountOutputTypeArgs> =
	z
		.object({
			select: z.lazy(() => RoomCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const RoomCountOutputTypeSelectSchema: z.ZodType<Prisma.RoomCountOutputTypeSelect> =
	z
		.object({
			reservations: z.boolean().optional(),
			facilities: z.boolean().optional(),
		})
		.strict();

export const RoomSelectSchema: z.ZodType<Prisma.RoomSelect> = z
	.object({
		id: z.boolean().optional(),
		quantity: z.boolean().optional(),
		maxGuests: z.boolean().optional(),
		price: z.boolean().optional(),
		hotelId: z.boolean().optional(),
		hotel: z
			.union([z.boolean(), z.lazy(() => PropertyArgsSchema)])
			.optional(),
		reservations: z
			.union([z.boolean(), z.lazy(() => ReservationFindManyArgsSchema)])
			.optional(),
		facilities: z
			.union([z.boolean(), z.lazy(() => FacilityFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => RoomCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

// FACILITY
//------------------------------------------------------

export const FacilityIncludeSchema: z.ZodType<Prisma.FacilityInclude> = z
	.object({
		rooms: z
			.union([z.boolean(), z.lazy(() => RoomFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([
				z.boolean(),
				z.lazy(() => FacilityCountOutputTypeArgsSchema),
			])
			.optional(),
	})
	.strict();

export const FacilityArgsSchema: z.ZodType<Prisma.FacilityArgs> = z
	.object({
		select: z.lazy(() => FacilitySelectSchema).optional(),
		include: z.lazy(() => FacilityIncludeSchema).optional(),
	})
	.strict();

export const FacilityCountOutputTypeArgsSchema: z.ZodType<Prisma.FacilityCountOutputTypeArgs> =
	z
		.object({
			select: z.lazy(() => FacilityCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const FacilityCountOutputTypeSelectSchema: z.ZodType<Prisma.FacilityCountOutputTypeSelect> =
	z
		.object({
			rooms: z.boolean().optional(),
		})
		.strict();

export const FacilitySelectSchema: z.ZodType<Prisma.FacilitySelect> = z
	.object({
		id: z.boolean().optional(),
		description: z.boolean().optional(),
		category: z.boolean().optional(),
		icon: z.boolean().optional(),
		rooms: z
			.union([z.boolean(), z.lazy(() => RoomFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([
				z.boolean(),
				z.lazy(() => FacilityCountOutputTypeArgsSchema),
			])
			.optional(),
	})
	.strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => UserWhereInputSchema),
				z.lazy(() => UserWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => UserWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => UserWhereInputSchema),
				z.lazy(() => UserWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		email: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		roles: z.lazy(() => EnumRoleNullableListFilterSchema).optional(),
		fname: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		lname: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		password: z
			.union([
				z.lazy(() => PasswordRelationFilterSchema),
				z.lazy(() => PasswordWhereInputSchema),
			])
			.optional()
			.nullable(),
		reservations: z
			.lazy(() => ReservationListRelationFilterSchema)
			.optional(),
		properties: z.lazy(() => PropertyListRelationFilterSchema).optional(),
		messages: z.lazy(() => MessageListRelationFilterSchema).optional(),
		reviews: z.lazy(() => ReviewListRelationFilterSchema).optional(),
		Chat: z.lazy(() => ChatListRelationFilterSchema).optional(),
	})
	.strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			roles: z.lazy(() => SortOrderSchema).optional(),
			fname: z.lazy(() => SortOrderSchema).optional(),
			lname: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			password: z
				.lazy(() => PasswordOrderByWithRelationInputSchema)
				.optional(),
			reservations: z
				.lazy(() => ReservationOrderByRelationAggregateInputSchema)
				.optional(),
			properties: z
				.lazy(() => PropertyOrderByRelationAggregateInputSchema)
				.optional(),
			messages: z
				.lazy(() => MessageOrderByRelationAggregateInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewOrderByRelationAggregateInputSchema)
				.optional(),
			Chat: z
				.lazy(() => ChatOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string().optional(),
		})
		.strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			roles: z.lazy(() => SortOrderSchema).optional(),
			fname: z.lazy(() => SortOrderSchema).optional(),
			lname: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => UserCountOrderByAggregateInputSchema)
				.optional(),
			_max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => UserScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => UserScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => UserScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			email: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			roles: z.lazy(() => EnumRoleNullableListFilterSchema).optional(),
			fname: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			lname: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
		})
		.strict();

export const PasswordWhereInputSchema: z.ZodType<Prisma.PasswordWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => PasswordWhereInputSchema),
				z.lazy(() => PasswordWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => PasswordWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => PasswordWhereInputSchema),
				z.lazy(() => PasswordWhereInputSchema).array(),
			])
			.optional(),
		hash: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		userId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		user: z
			.union([
				z.lazy(() => UserRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional(),
	})
	.strict();

export const PasswordOrderByWithRelationInputSchema: z.ZodType<Prisma.PasswordOrderByWithRelationInput> =
	z
		.object({
			hash: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
		})
		.strict();

export const PasswordWhereUniqueInputSchema: z.ZodType<Prisma.PasswordWhereUniqueInput> =
	z
		.object({
			userId: z.string().optional(),
		})
		.strict();

export const PasswordOrderByWithAggregationInputSchema: z.ZodType<Prisma.PasswordOrderByWithAggregationInput> =
	z
		.object({
			hash: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => PasswordCountOrderByAggregateInputSchema)
				.optional(),
			_max: z
				.lazy(() => PasswordMaxOrderByAggregateInputSchema)
				.optional(),
			_min: z
				.lazy(() => PasswordMinOrderByAggregateInputSchema)
				.optional(),
		})
		.strict();

export const PasswordScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PasswordScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => PasswordScalarWhereWithAggregatesInputSchema),
					z
						.lazy(
							() => PasswordScalarWhereWithAggregatesInputSchema
						)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => PasswordScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => PasswordScalarWhereWithAggregatesInputSchema),
					z
						.lazy(
							() => PasswordScalarWhereWithAggregatesInputSchema
						)
						.array(),
				])
				.optional(),
			hash: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			userId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
		})
		.strict();

export const ChatWhereInputSchema: z.ZodType<Prisma.ChatWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => ChatWhereInputSchema),
				z.lazy(() => ChatWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => ChatWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => ChatWhereInputSchema),
				z.lazy(() => ChatWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		messages: z.lazy(() => MessageListRelationFilterSchema).optional(),
		participants: z.lazy(() => UserListRelationFilterSchema).optional(),
	})
	.strict();

export const ChatOrderByWithRelationInputSchema: z.ZodType<Prisma.ChatOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			messages: z
				.lazy(() => MessageOrderByRelationAggregateInputSchema)
				.optional(),
			participants: z
				.lazy(() => UserOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const ChatWhereUniqueInputSchema: z.ZodType<Prisma.ChatWhereUniqueInput> =
	z
		.object({
			id: z.string().cuid().optional(),
		})
		.strict();

export const ChatOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChatOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => ChatCountOrderByAggregateInputSchema)
				.optional(),
			_max: z.lazy(() => ChatMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => ChatMinOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const ChatScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChatScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => ChatScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => ChatScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => ChatScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => ChatScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => ChatScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
		})
		.strict();

export const MessageWhereInputSchema: z.ZodType<Prisma.MessageWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => MessageWhereInputSchema),
				z.lazy(() => MessageWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => MessageWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => MessageWhereInputSchema),
				z.lazy(() => MessageWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		content: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		chatId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		userId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		chat: z
			.union([
				z.lazy(() => ChatRelationFilterSchema),
				z.lazy(() => ChatWhereInputSchema),
			])
			.optional(),
		User: z
			.union([
				z.lazy(() => UserRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional(),
	})
	.strict();

export const MessageOrderByWithRelationInputSchema: z.ZodType<Prisma.MessageOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			chatId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			chat: z.lazy(() => ChatOrderByWithRelationInputSchema).optional(),
			User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
		})
		.strict();

export const MessageWhereUniqueInputSchema: z.ZodType<Prisma.MessageWhereUniqueInput> =
	z
		.object({
			id: z.string().cuid().optional(),
		})
		.strict();

export const MessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.MessageOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			chatId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => MessageCountOrderByAggregateInputSchema)
				.optional(),
			_max: z
				.lazy(() => MessageMaxOrderByAggregateInputSchema)
				.optional(),
			_min: z
				.lazy(() => MessageMinOrderByAggregateInputSchema)
				.optional(),
		})
		.strict();

export const MessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MessageScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => MessageScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => MessageScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => MessageScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			content: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			chatId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			userId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
		})
		.strict();

export const ReviewWhereInputSchema: z.ZodType<Prisma.ReviewWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => ReviewWhereInputSchema),
				z.lazy(() => ReviewWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => ReviewWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => ReviewWhereInputSchema),
				z.lazy(() => ReviewWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		rating: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
		content: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		propertyId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		userId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		property: z
			.union([
				z.lazy(() => PropertyRelationFilterSchema),
				z.lazy(() => PropertyWhereInputSchema),
			])
			.optional(),
		user: z
			.union([
				z.lazy(() => UserRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional(),
	})
	.strict();

export const ReviewOrderByWithRelationInputSchema: z.ZodType<Prisma.ReviewOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			rating: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			propertyId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			property: z
				.lazy(() => PropertyOrderByWithRelationInputSchema)
				.optional(),
			user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
		})
		.strict();

export const ReviewWhereUniqueInputSchema: z.ZodType<Prisma.ReviewWhereUniqueInput> =
	z
		.object({
			id: z.string().uuid().optional(),
		})
		.strict();

export const ReviewOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReviewOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			rating: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			propertyId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => ReviewCountOrderByAggregateInputSchema)
				.optional(),
			_avg: z.lazy(() => ReviewAvgOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => ReviewMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => ReviewMinOrderByAggregateInputSchema).optional(),
			_sum: z.lazy(() => ReviewSumOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const ReviewScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReviewScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => ReviewScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => ReviewScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => ReviewScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			rating: z
				.union([
					z.lazy(() => IntWithAggregatesFilterSchema),
					z.number(),
				])
				.optional(),
			content: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			propertyId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			userId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
		})
		.strict();

export const ReservationWhereInputSchema: z.ZodType<Prisma.ReservationWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => ReservationWhereInputSchema),
					z.lazy(() => ReservationWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => ReservationWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => ReservationWhereInputSchema),
					z.lazy(() => ReservationWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			price: z
				.union([z.lazy(() => FloatFilterSchema), z.number()])
				.optional(),
			from: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			to: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			roomId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			userId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			room: z
				.union([
					z.lazy(() => RoomRelationFilterSchema),
					z.lazy(() => RoomWhereInputSchema),
				])
				.optional(),
			user: z
				.union([
					z.lazy(() => UserRelationFilterSchema),
					z.lazy(() => UserWhereInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReservationOrderByWithRelationInputSchema: z.ZodType<Prisma.ReservationOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			price: z.lazy(() => SortOrderSchema).optional(),
			from: z.lazy(() => SortOrderSchema).optional(),
			to: z.lazy(() => SortOrderSchema).optional(),
			roomId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			room: z.lazy(() => RoomOrderByWithRelationInputSchema).optional(),
			user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
		})
		.strict();

export const ReservationWhereUniqueInputSchema: z.ZodType<Prisma.ReservationWhereUniqueInput> =
	z
		.object({
			id: z.string().cuid().optional(),
		})
		.strict();

export const ReservationOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReservationOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			price: z.lazy(() => SortOrderSchema).optional(),
			from: z.lazy(() => SortOrderSchema).optional(),
			to: z.lazy(() => SortOrderSchema).optional(),
			roomId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => ReservationCountOrderByAggregateInputSchema)
				.optional(),
			_avg: z
				.lazy(() => ReservationAvgOrderByAggregateInputSchema)
				.optional(),
			_max: z
				.lazy(() => ReservationMaxOrderByAggregateInputSchema)
				.optional(),
			_min: z
				.lazy(() => ReservationMinOrderByAggregateInputSchema)
				.optional(),
			_sum: z
				.lazy(() => ReservationSumOrderByAggregateInputSchema)
				.optional(),
		})
		.strict();

export const ReservationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReservationScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(
						() => ReservationScalarWhereWithAggregatesInputSchema
					),
					z
						.lazy(
							() =>
								ReservationScalarWhereWithAggregatesInputSchema
						)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => ReservationScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(
						() => ReservationScalarWhereWithAggregatesInputSchema
					),
					z
						.lazy(
							() =>
								ReservationScalarWhereWithAggregatesInputSchema
						)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			price: z
				.union([
					z.lazy(() => FloatWithAggregatesFilterSchema),
					z.number(),
				])
				.optional(),
			from: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			to: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			roomId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			userId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
		})
		.strict();

export const PropertyWhereInputSchema: z.ZodType<Prisma.PropertyWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => PropertyWhereInputSchema),
				z.lazy(() => PropertyWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => PropertyWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => PropertyWhereInputSchema),
				z.lazy(() => PropertyWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		description: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		ownerId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		owner: z
			.union([
				z.lazy(() => UserRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional(),
		rooms: z.lazy(() => RoomListRelationFilterSchema).optional(),
		reviews: z.lazy(() => ReviewListRelationFilterSchema).optional(),
	})
	.strict();

export const PropertyOrderByWithRelationInputSchema: z.ZodType<Prisma.PropertyOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			ownerId: z.lazy(() => SortOrderSchema).optional(),
			owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
			rooms: z
				.lazy(() => RoomOrderByRelationAggregateInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const PropertyWhereUniqueInputSchema: z.ZodType<Prisma.PropertyWhereUniqueInput> =
	z
		.object({
			id: z.string().cuid().optional(),
		})
		.strict();

export const PropertyOrderByWithAggregationInputSchema: z.ZodType<Prisma.PropertyOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			ownerId: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => PropertyCountOrderByAggregateInputSchema)
				.optional(),
			_max: z
				.lazy(() => PropertyMaxOrderByAggregateInputSchema)
				.optional(),
			_min: z
				.lazy(() => PropertyMinOrderByAggregateInputSchema)
				.optional(),
		})
		.strict();

export const PropertyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PropertyScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => PropertyScalarWhereWithAggregatesInputSchema),
					z
						.lazy(
							() => PropertyScalarWhereWithAggregatesInputSchema
						)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => PropertyScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => PropertyScalarWhereWithAggregatesInputSchema),
					z
						.lazy(
							() => PropertyScalarWhereWithAggregatesInputSchema
						)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			description: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			ownerId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
		})
		.strict();

export const RoomWhereInputSchema: z.ZodType<Prisma.RoomWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => RoomWhereInputSchema),
				z.lazy(() => RoomWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => RoomWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => RoomWhereInputSchema),
				z.lazy(() => RoomWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		quantity: z
			.union([z.lazy(() => IntFilterSchema), z.number()])
			.optional(),
		maxGuests: z
			.union([z.lazy(() => IntFilterSchema), z.number()])
			.optional(),
		price: z
			.union([z.lazy(() => FloatFilterSchema), z.number()])
			.optional(),
		hotelId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		hotel: z
			.union([
				z.lazy(() => PropertyRelationFilterSchema),
				z.lazy(() => PropertyWhereInputSchema),
			])
			.optional(),
		reservations: z
			.lazy(() => ReservationListRelationFilterSchema)
			.optional(),
		facilities: z.lazy(() => FacilityListRelationFilterSchema).optional(),
	})
	.strict();

export const RoomOrderByWithRelationInputSchema: z.ZodType<Prisma.RoomOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			quantity: z.lazy(() => SortOrderSchema).optional(),
			maxGuests: z.lazy(() => SortOrderSchema).optional(),
			price: z.lazy(() => SortOrderSchema).optional(),
			hotelId: z.lazy(() => SortOrderSchema).optional(),
			hotel: z
				.lazy(() => PropertyOrderByWithRelationInputSchema)
				.optional(),
			reservations: z
				.lazy(() => ReservationOrderByRelationAggregateInputSchema)
				.optional(),
			facilities: z
				.lazy(() => FacilityOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const RoomWhereUniqueInputSchema: z.ZodType<Prisma.RoomWhereUniqueInput> =
	z
		.object({
			id: z.string().cuid().optional(),
		})
		.strict();

export const RoomOrderByWithAggregationInputSchema: z.ZodType<Prisma.RoomOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			quantity: z.lazy(() => SortOrderSchema).optional(),
			maxGuests: z.lazy(() => SortOrderSchema).optional(),
			price: z.lazy(() => SortOrderSchema).optional(),
			hotelId: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => RoomCountOrderByAggregateInputSchema)
				.optional(),
			_avg: z.lazy(() => RoomAvgOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => RoomMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => RoomMinOrderByAggregateInputSchema).optional(),
			_sum: z.lazy(() => RoomSumOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const RoomScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RoomScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => RoomScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => RoomScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => RoomScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => RoomScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => RoomScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			quantity: z
				.union([
					z.lazy(() => IntWithAggregatesFilterSchema),
					z.number(),
				])
				.optional(),
			maxGuests: z
				.union([
					z.lazy(() => IntWithAggregatesFilterSchema),
					z.number(),
				])
				.optional(),
			price: z
				.union([
					z.lazy(() => FloatWithAggregatesFilterSchema),
					z.number(),
				])
				.optional(),
			hotelId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
		})
		.strict();

export const FacilityWhereInputSchema: z.ZodType<Prisma.FacilityWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => FacilityWhereInputSchema),
				z.lazy(() => FacilityWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => FacilityWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => FacilityWhereInputSchema),
				z.lazy(() => FacilityWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		description: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		category: z
			.union([
				z.lazy(() => EnumCategoryFilterSchema),
				z.lazy(() => CategorySchema),
			])
			.optional(),
		icon: z
			.union([
				z.lazy(() => EnumIconFilterSchema),
				z.lazy(() => IconSchema),
			])
			.optional(),
		rooms: z.lazy(() => RoomListRelationFilterSchema).optional(),
	})
	.strict();

export const FacilityOrderByWithRelationInputSchema: z.ZodType<Prisma.FacilityOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			category: z.lazy(() => SortOrderSchema).optional(),
			icon: z.lazy(() => SortOrderSchema).optional(),
			rooms: z
				.lazy(() => RoomOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const FacilityWhereUniqueInputSchema: z.ZodType<Prisma.FacilityWhereUniqueInput> =
	z
		.object({
			id: z.string().cuid().optional(),
		})
		.strict();

export const FacilityOrderByWithAggregationInputSchema: z.ZodType<Prisma.FacilityOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			category: z.lazy(() => SortOrderSchema).optional(),
			icon: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => FacilityCountOrderByAggregateInputSchema)
				.optional(),
			_max: z
				.lazy(() => FacilityMaxOrderByAggregateInputSchema)
				.optional(),
			_min: z
				.lazy(() => FacilityMinOrderByAggregateInputSchema)
				.optional(),
		})
		.strict();

export const FacilityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FacilityScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => FacilityScalarWhereWithAggregatesInputSchema),
					z
						.lazy(
							() => FacilityScalarWhereWithAggregatesInputSchema
						)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => FacilityScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => FacilityScalarWhereWithAggregatesInputSchema),
					z
						.lazy(
							() => FacilityScalarWhereWithAggregatesInputSchema
						)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			description: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			category: z
				.union([
					z.lazy(() => EnumCategoryWithAggregatesFilterSchema),
					z.lazy(() => CategorySchema),
				])
				.optional(),
			icon: z
				.union([
					z.lazy(() => EnumIconWithAggregatesFilterSchema),
					z.lazy(() => IconSchema),
				])
				.optional(),
		})
		.strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		email: z.string(),
		roles: z
			.union([
				z.lazy(() => UserCreaterolesInputSchema),
				z.lazy(() => RoleSchema).array(),
			])
			.optional(),
		fname: z.string(),
		lname: z.string(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		password: z
			.lazy(() => PasswordCreateNestedOneWithoutUserInputSchema)
			.optional(),
		reservations: z
			.lazy(() => ReservationCreateNestedManyWithoutUserInputSchema)
			.optional(),
		properties: z
			.lazy(() => PropertyCreateNestedManyWithoutOwnerInputSchema)
			.optional(),
		messages: z
			.lazy(() => MessageCreateNestedManyWithoutUserInputSchema)
			.optional(),
		reviews: z
			.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema)
			.optional(),
		Chat: z
			.lazy(() => ChatCreateNestedManyWithoutParticipantsInputSchema)
			.optional(),
	})
	.strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string(),
			roles: z
				.union([
					z.lazy(() => UserCreaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z.string(),
			lname: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			password: z
				.lazy(
					() => PasswordUncheckedCreateNestedOneWithoutUserInputSchema
				)
				.optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			properties: z
				.lazy(
					() =>
						PropertyUncheckedCreateNestedManyWithoutOwnerInputSchema
				)
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			Chat: z
				.lazy(
					() =>
						ChatUncheckedCreateNestedManyWithoutParticipantsInputSchema
				)
				.optional(),
		})
		.strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
	.object({
		id: z
			.union([
				z.string().cuid(),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		email: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		roles: z
			.union([
				z.lazy(() => UserUpdaterolesInputSchema),
				z.lazy(() => RoleSchema).array(),
			])
			.optional(),
		fname: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lname: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		password: z
			.lazy(() => PasswordUpdateOneWithoutUserNestedInputSchema)
			.optional(),
		reservations: z
			.lazy(() => ReservationUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		properties: z
			.lazy(() => PropertyUpdateManyWithoutOwnerNestedInputSchema)
			.optional(),
		messages: z
			.lazy(() => MessageUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		reviews: z
			.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		Chat: z
			.lazy(() => ChatUpdateManyWithoutParticipantsNestedInputSchema)
			.optional(),
	})
	.strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			password: z
				.lazy(
					() => PasswordUncheckedUpdateOneWithoutUserNestedInputSchema
				)
				.optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			properties: z
				.lazy(
					() =>
						PropertyUncheckedUpdateManyWithoutOwnerNestedInputSchema
				)
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			Chat: z
				.lazy(
					() =>
						ChatUncheckedUpdateManyWithoutParticipantsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string(),
			roles: z
				.union([
					z.lazy(() => UserCreaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z.string(),
			lname: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const PasswordCreateInputSchema: z.ZodType<Prisma.PasswordCreateInput> =
	z
		.object({
			hash: z.string(),
			user: z.lazy(() => UserCreateNestedOneWithoutPasswordInputSchema),
		})
		.strict();

export const PasswordUncheckedCreateInputSchema: z.ZodType<Prisma.PasswordUncheckedCreateInput> =
	z
		.object({
			hash: z.string(),
			userId: z.string(),
		})
		.strict();

export const PasswordUpdateInputSchema: z.ZodType<Prisma.PasswordUpdateInput> =
	z
		.object({
			hash: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			user: z
				.lazy(
					() => UserUpdateOneRequiredWithoutPasswordNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const PasswordUncheckedUpdateInputSchema: z.ZodType<Prisma.PasswordUncheckedUpdateInput> =
	z
		.object({
			hash: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const PasswordCreateManyInputSchema: z.ZodType<Prisma.PasswordCreateManyInput> =
	z
		.object({
			hash: z.string(),
			userId: z.string(),
		})
		.strict();

export const PasswordUpdateManyMutationInputSchema: z.ZodType<Prisma.PasswordUpdateManyMutationInput> =
	z
		.object({
			hash: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const PasswordUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PasswordUncheckedUpdateManyInput> =
	z
		.object({
			hash: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ChatCreateInputSchema: z.ZodType<Prisma.ChatCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		messages: z
			.lazy(() => MessageCreateNestedManyWithoutChatInputSchema)
			.optional(),
		participants: z
			.lazy(() => UserCreateNestedManyWithoutChatInputSchema)
			.optional(),
	})
	.strict();

export const ChatUncheckedCreateInputSchema: z.ZodType<Prisma.ChatUncheckedCreateInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			messages: z
				.lazy(
					() => MessageUncheckedCreateNestedManyWithoutChatInputSchema
				)
				.optional(),
			participants: z
				.lazy(() => UserUncheckedCreateNestedManyWithoutChatInputSchema)
				.optional(),
		})
		.strict();

export const ChatUpdateInputSchema: z.ZodType<Prisma.ChatUpdateInput> = z
	.object({
		id: z
			.union([
				z.string().cuid(),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		messages: z
			.lazy(() => MessageUpdateManyWithoutChatNestedInputSchema)
			.optional(),
		participants: z
			.lazy(() => UserUpdateManyWithoutChatNestedInputSchema)
			.optional(),
	})
	.strict();

export const ChatUncheckedUpdateInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedUpdateManyWithoutChatNestedInputSchema
				)
				.optional(),
			participants: z
				.lazy(() => UserUncheckedUpdateManyWithoutChatNestedInputSchema)
				.optional(),
		})
		.strict();

export const ChatCreateManyInputSchema: z.ZodType<Prisma.ChatCreateManyInput> =
	z
		.object({
			id: z.string().cuid().optional(),
		})
		.strict();

export const ChatUpdateManyMutationInputSchema: z.ZodType<Prisma.ChatUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ChatUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const MessageCreateInputSchema: z.ZodType<Prisma.MessageCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		content: z.string(),
		chat: z.lazy(() => ChatCreateNestedOneWithoutMessagesInputSchema),
		User: z.lazy(() => UserCreateNestedOneWithoutMessagesInputSchema),
	})
	.strict();

export const MessageUncheckedCreateInputSchema: z.ZodType<Prisma.MessageUncheckedCreateInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			content: z.string(),
			chatId: z.string(),
			userId: z.string(),
		})
		.strict();

export const MessageUpdateInputSchema: z.ZodType<Prisma.MessageUpdateInput> = z
	.object({
		id: z
			.union([
				z.string().cuid(),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		content: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		chat: z
			.lazy(() => ChatUpdateOneRequiredWithoutMessagesNestedInputSchema)
			.optional(),
		User: z
			.lazy(() => UserUpdateOneRequiredWithoutMessagesNestedInputSchema)
			.optional(),
	})
	.strict();

export const MessageUncheckedUpdateInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			chatId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const MessageCreateManyInputSchema: z.ZodType<Prisma.MessageCreateManyInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			content: z.string(),
			chatId: z.string(),
			userId: z.string(),
		})
		.strict();

export const MessageUpdateManyMutationInputSchema: z.ZodType<Prisma.MessageUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const MessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			chatId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReviewCreateInputSchema: z.ZodType<Prisma.ReviewCreateInput> = z
	.object({
		id: z.string().uuid().optional(),
		rating: z.number().int().optional(),
		content: z.string(),
		createdAt: z.coerce.date().optional(),
		property: z.lazy(
			() => PropertyCreateNestedOneWithoutReviewsInputSchema
		),
		user: z.lazy(() => UserCreateNestedOneWithoutReviewsInputSchema),
	})
	.strict();

export const ReviewUncheckedCreateInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateInput> =
	z
		.object({
			id: z.string().uuid().optional(),
			rating: z.number().int().optional(),
			content: z.string(),
			createdAt: z.coerce.date().optional(),
			propertyId: z.string(),
			userId: z.string(),
		})
		.strict();

export const ReviewUpdateInputSchema: z.ZodType<Prisma.ReviewUpdateInput> = z
	.object({
		id: z
			.union([
				z.string().uuid(),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		rating: z
			.union([
				z.number().int(),
				z.lazy(() => IntFieldUpdateOperationsInputSchema),
			])
			.optional(),
		content: z
			.union([
				z.string(),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		property: z
			.lazy(
				() => PropertyUpdateOneRequiredWithoutReviewsNestedInputSchema
			)
			.optional(),
		user: z
			.lazy(() => UserUpdateOneRequiredWithoutReviewsNestedInputSchema)
			.optional(),
	})
	.strict();

export const ReviewUncheckedUpdateInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string().uuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rating: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			propertyId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReviewCreateManyInputSchema: z.ZodType<Prisma.ReviewCreateManyInput> =
	z
		.object({
			id: z.string().uuid().optional(),
			rating: z.number().int().optional(),
			content: z.string(),
			createdAt: z.coerce.date().optional(),
			propertyId: z.string(),
			userId: z.string(),
		})
		.strict();

export const ReviewUpdateManyMutationInputSchema: z.ZodType<Prisma.ReviewUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string().uuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rating: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReviewUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string().uuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rating: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			propertyId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReservationCreateInputSchema: z.ZodType<Prisma.ReservationCreateInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			price: z.number(),
			from: z.coerce.date(),
			to: z.coerce.date(),
			room: z.lazy(
				() => RoomCreateNestedOneWithoutReservationsInputSchema
			),
			user: z.lazy(
				() => UserCreateNestedOneWithoutReservationsInputSchema
			),
		})
		.strict();

export const ReservationUncheckedCreateInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			price: z.number(),
			from: z.coerce.date(),
			to: z.coerce.date(),
			roomId: z.string(),
			userId: z.string(),
		})
		.strict();

export const ReservationUpdateInputSchema: z.ZodType<Prisma.ReservationUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			from: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			to: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			room: z
				.lazy(
					() =>
						RoomUpdateOneRequiredWithoutReservationsNestedInputSchema
				)
				.optional(),
			user: z
				.lazy(
					() =>
						UserUpdateOneRequiredWithoutReservationsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const ReservationUncheckedUpdateInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			from: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			to: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roomId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReservationCreateManyInputSchema: z.ZodType<Prisma.ReservationCreateManyInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			price: z.number(),
			from: z.coerce.date(),
			to: z.coerce.date(),
			roomId: z.string(),
			userId: z.string(),
		})
		.strict();

export const ReservationUpdateManyMutationInputSchema: z.ZodType<Prisma.ReservationUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			from: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			to: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReservationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			from: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			to: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roomId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const PropertyCreateInputSchema: z.ZodType<Prisma.PropertyCreateInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
			owner: z.lazy(
				() => UserCreateNestedOneWithoutPropertiesInputSchema
			),
			rooms: z
				.lazy(() => RoomCreateNestedManyWithoutHotelInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewCreateNestedManyWithoutPropertyInputSchema)
				.optional(),
		})
		.strict();

export const PropertyUncheckedCreateInputSchema: z.ZodType<Prisma.PropertyUncheckedCreateInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
			ownerId: z.string(),
			rooms: z
				.lazy(
					() => RoomUncheckedCreateNestedManyWithoutHotelInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() =>
						ReviewUncheckedCreateNestedManyWithoutPropertyInputSchema
				)
				.optional(),
		})
		.strict();

export const PropertyUpdateInputSchema: z.ZodType<Prisma.PropertyUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			owner: z
				.lazy(
					() =>
						UserUpdateOneRequiredWithoutPropertiesNestedInputSchema
				)
				.optional(),
			rooms: z
				.lazy(() => RoomUpdateManyWithoutHotelNestedInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewUpdateManyWithoutPropertyNestedInputSchema)
				.optional(),
		})
		.strict();

export const PropertyUncheckedUpdateInputSchema: z.ZodType<Prisma.PropertyUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			ownerId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rooms: z
				.lazy(
					() => RoomUncheckedUpdateManyWithoutHotelNestedInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() =>
						ReviewUncheckedUpdateManyWithoutPropertyNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const PropertyCreateManyInputSchema: z.ZodType<Prisma.PropertyCreateManyInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
			ownerId: z.string(),
		})
		.strict();

export const PropertyUpdateManyMutationInputSchema: z.ZodType<Prisma.PropertyUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const PropertyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PropertyUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			ownerId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const RoomCreateInputSchema: z.ZodType<Prisma.RoomCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		quantity: z.number().int(),
		maxGuests: z.number().int(),
		price: z.number(),
		hotel: z.lazy(() => PropertyCreateNestedOneWithoutRoomsInputSchema),
		reservations: z
			.lazy(() => ReservationCreateNestedManyWithoutRoomInputSchema)
			.optional(),
		facilities: z
			.lazy(() => FacilityCreateNestedManyWithoutRoomsInputSchema)
			.optional(),
	})
	.strict();

export const RoomUncheckedCreateInputSchema: z.ZodType<Prisma.RoomUncheckedCreateInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			quantity: z.number().int(),
			maxGuests: z.number().int(),
			price: z.number(),
			hotelId: z.string(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedCreateNestedManyWithoutRoomInputSchema
				)
				.optional(),
			facilities: z
				.lazy(
					() =>
						FacilityUncheckedCreateNestedManyWithoutRoomsInputSchema
				)
				.optional(),
		})
		.strict();

export const RoomUpdateInputSchema: z.ZodType<Prisma.RoomUpdateInput> = z
	.object({
		id: z
			.union([
				z.string().cuid(),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		quantity: z
			.union([
				z.number().int(),
				z.lazy(() => IntFieldUpdateOperationsInputSchema),
			])
			.optional(),
		maxGuests: z
			.union([
				z.number().int(),
				z.lazy(() => IntFieldUpdateOperationsInputSchema),
			])
			.optional(),
		price: z
			.union([
				z.number(),
				z.lazy(() => FloatFieldUpdateOperationsInputSchema),
			])
			.optional(),
		hotel: z
			.lazy(() => PropertyUpdateOneRequiredWithoutRoomsNestedInputSchema)
			.optional(),
		reservations: z
			.lazy(() => ReservationUpdateManyWithoutRoomNestedInputSchema)
			.optional(),
		facilities: z
			.lazy(() => FacilityUpdateManyWithoutRoomsNestedInputSchema)
			.optional(),
	})
	.strict();

export const RoomUncheckedUpdateInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			quantity: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			maxGuests: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			hotelId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedUpdateManyWithoutRoomNestedInputSchema
				)
				.optional(),
			facilities: z
				.lazy(
					() =>
						FacilityUncheckedUpdateManyWithoutRoomsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const RoomCreateManyInputSchema: z.ZodType<Prisma.RoomCreateManyInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			quantity: z.number().int(),
			maxGuests: z.number().int(),
			price: z.number(),
			hotelId: z.string(),
		})
		.strict();

export const RoomUpdateManyMutationInputSchema: z.ZodType<Prisma.RoomUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			quantity: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			maxGuests: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const RoomUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			quantity: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			maxGuests: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			hotelId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const FacilityCreateInputSchema: z.ZodType<Prisma.FacilityCreateInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
			category: z.lazy(() => CategorySchema),
			icon: z.lazy(() => IconSchema),
			rooms: z
				.lazy(() => RoomCreateNestedManyWithoutFacilitiesInputSchema)
				.optional(),
		})
		.strict();

export const FacilityUncheckedCreateInputSchema: z.ZodType<Prisma.FacilityUncheckedCreateInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
			category: z.lazy(() => CategorySchema),
			icon: z.lazy(() => IconSchema),
			rooms: z
				.lazy(
					() =>
						RoomUncheckedCreateNestedManyWithoutFacilitiesInputSchema
				)
				.optional(),
		})
		.strict();

export const FacilityUpdateInputSchema: z.ZodType<Prisma.FacilityUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			category: z
				.union([
					z.lazy(() => CategorySchema),
					z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema),
				])
				.optional(),
			icon: z
				.union([
					z.lazy(() => IconSchema),
					z.lazy(() => EnumIconFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rooms: z
				.lazy(() => RoomUpdateManyWithoutFacilitiesNestedInputSchema)
				.optional(),
		})
		.strict();

export const FacilityUncheckedUpdateInputSchema: z.ZodType<Prisma.FacilityUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			category: z
				.union([
					z.lazy(() => CategorySchema),
					z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema),
				])
				.optional(),
			icon: z
				.union([
					z.lazy(() => IconSchema),
					z.lazy(() => EnumIconFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rooms: z
				.lazy(
					() =>
						RoomUncheckedUpdateManyWithoutFacilitiesNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const FacilityCreateManyInputSchema: z.ZodType<Prisma.FacilityCreateManyInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
			category: z.lazy(() => CategorySchema),
			icon: z.lazy(() => IconSchema),
		})
		.strict();

export const FacilityUpdateManyMutationInputSchema: z.ZodType<Prisma.FacilityUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			category: z
				.union([
					z.lazy(() => CategorySchema),
					z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema),
				])
				.optional(),
			icon: z
				.union([
					z.lazy(() => IconSchema),
					z.lazy(() => EnumIconFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const FacilityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FacilityUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			category: z
				.union([
					z.lazy(() => CategorySchema),
					z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema),
				])
				.optional(),
			icon: z
				.union([
					z.lazy(() => IconSchema),
					z.lazy(() => EnumIconFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
	.object({
		equals: z.string().optional(),
		in: z.union([z.string().array(), z.string()]).optional(),
		notIn: z.union([z.string().array(), z.string()]).optional(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		mode: z.lazy(() => QueryModeSchema).optional(),
		not: z
			.union([z.string(), z.lazy(() => NestedStringFilterSchema)])
			.optional(),
	})
	.strict();

export const EnumRoleNullableListFilterSchema: z.ZodType<Prisma.EnumRoleNullableListFilter> =
	z
		.object({
			equals: z
				.lazy(() => RoleSchema)
				.array()
				.optional()
				.nullable(),
			has: z
				.lazy(() => RoleSchema)
				.optional()
				.nullable(),
			hasEvery: z
				.lazy(() => RoleSchema)
				.array()
				.optional(),
			hasSome: z
				.lazy(() => RoleSchema)
				.array()
				.optional(),
			isEmpty: z.boolean().optional(),
		})
		.strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
	.object({
		equals: z.coerce.date().optional(),
		in: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
		notIn: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z
			.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
			.optional(),
	})
	.strict();

export const PasswordRelationFilterSchema: z.ZodType<Prisma.PasswordRelationFilter> =
	z
		.object({
			is: z
				.lazy(() => PasswordWhereInputSchema)
				.optional()
				.nullable(),
			isNot: z
				.lazy(() => PasswordWhereInputSchema)
				.optional()
				.nullable(),
		})
		.strict();

export const ReservationListRelationFilterSchema: z.ZodType<Prisma.ReservationListRelationFilter> =
	z
		.object({
			every: z.lazy(() => ReservationWhereInputSchema).optional(),
			some: z.lazy(() => ReservationWhereInputSchema).optional(),
			none: z.lazy(() => ReservationWhereInputSchema).optional(),
		})
		.strict();

export const PropertyListRelationFilterSchema: z.ZodType<Prisma.PropertyListRelationFilter> =
	z
		.object({
			every: z.lazy(() => PropertyWhereInputSchema).optional(),
			some: z.lazy(() => PropertyWhereInputSchema).optional(),
			none: z.lazy(() => PropertyWhereInputSchema).optional(),
		})
		.strict();

export const MessageListRelationFilterSchema: z.ZodType<Prisma.MessageListRelationFilter> =
	z
		.object({
			every: z.lazy(() => MessageWhereInputSchema).optional(),
			some: z.lazy(() => MessageWhereInputSchema).optional(),
			none: z.lazy(() => MessageWhereInputSchema).optional(),
		})
		.strict();

export const ReviewListRelationFilterSchema: z.ZodType<Prisma.ReviewListRelationFilter> =
	z
		.object({
			every: z.lazy(() => ReviewWhereInputSchema).optional(),
			some: z.lazy(() => ReviewWhereInputSchema).optional(),
			none: z.lazy(() => ReviewWhereInputSchema).optional(),
		})
		.strict();

export const ChatListRelationFilterSchema: z.ZodType<Prisma.ChatListRelationFilter> =
	z
		.object({
			every: z.lazy(() => ChatWhereInputSchema).optional(),
			some: z.lazy(() => ChatWhereInputSchema).optional(),
			none: z.lazy(() => ChatWhereInputSchema).optional(),
		})
		.strict();

export const ReservationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReservationOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const PropertyOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PropertyOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const MessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MessageOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ReviewOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReviewOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ChatOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ChatOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			roles: z.lazy(() => SortOrderSchema).optional(),
			fname: z.lazy(() => SortOrderSchema).optional(),
			lname: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			fname: z.lazy(() => SortOrderSchema).optional(),
			lname: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			fname: z.lazy(() => SortOrderSchema).optional(),
			lname: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
	z
		.object({
			equals: z.string().optional(),
			in: z.union([z.string().array(), z.string()]).optional(),
			notIn: z.union([z.string().array(), z.string()]).optional(),
			lt: z.string().optional(),
			lte: z.string().optional(),
			gt: z.string().optional(),
			gte: z.string().optional(),
			contains: z.string().optional(),
			startsWith: z.string().optional(),
			endsWith: z.string().optional(),
			mode: z.lazy(() => QueryModeSchema).optional(),
			not: z
				.union([
					z.string(),
					z.lazy(() => NestedStringWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedStringFilterSchema).optional(),
			_max: z.lazy(() => NestedStringFilterSchema).optional(),
		})
		.strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
	z
		.object({
			equals: z.coerce.date().optional(),
			in: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
			notIn: z
				.union([z.coerce.date().array(), z.coerce.date()])
				.optional(),
			lt: z.coerce.date().optional(),
			lte: z.coerce.date().optional(),
			gt: z.coerce.date().optional(),
			gte: z.coerce.date().optional(),
			not: z
				.union([
					z.coerce.date(),
					z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
			_max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
		})
		.strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z
	.object({
		is: z
			.lazy(() => UserWhereInputSchema)
			.optional()
			.nullable(),
		isNot: z
			.lazy(() => UserWhereInputSchema)
			.optional()
			.nullable(),
	})
	.strict();

export const PasswordCountOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordCountOrderByAggregateInput> =
	z
		.object({
			hash: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const PasswordMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordMaxOrderByAggregateInput> =
	z
		.object({
			hash: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const PasswordMinOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordMinOrderByAggregateInput> =
	z
		.object({
			hash: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> =
	z
		.object({
			every: z.lazy(() => UserWhereInputSchema).optional(),
			some: z.lazy(() => UserWhereInputSchema).optional(),
			none: z.lazy(() => UserWhereInputSchema).optional(),
		})
		.strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ChatCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChatCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ChatMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ChatMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ChatRelationFilterSchema: z.ZodType<Prisma.ChatRelationFilter> = z
	.object({
		is: z
			.lazy(() => ChatWhereInputSchema)
			.optional()
			.nullable(),
		isNot: z
			.lazy(() => ChatWhereInputSchema)
			.optional()
			.nullable(),
	})
	.strict();

export const MessageCountOrderByAggregateInputSchema: z.ZodType<Prisma.MessageCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			chatId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const MessageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			chatId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const MessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			chatId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
	.object({
		equals: z.number().optional(),
		in: z.union([z.number().array(), z.number()]).optional(),
		notIn: z.union([z.number().array(), z.number()]).optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedIntFilterSchema)])
			.optional(),
	})
	.strict();

export const PropertyRelationFilterSchema: z.ZodType<Prisma.PropertyRelationFilter> =
	z
		.object({
			is: z
				.lazy(() => PropertyWhereInputSchema)
				.optional()
				.nullable(),
			isNot: z
				.lazy(() => PropertyWhereInputSchema)
				.optional()
				.nullable(),
		})
		.strict();

export const ReviewCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			rating: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			propertyId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ReviewAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewAvgOrderByAggregateInput> =
	z
		.object({
			rating: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ReviewMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			rating: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			propertyId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ReviewMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			rating: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			propertyId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ReviewSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewSumOrderByAggregateInput> =
	z
		.object({
			rating: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
	z
		.object({
			equals: z.number().optional(),
			in: z.union([z.number().array(), z.number()]).optional(),
			notIn: z.union([z.number().array(), z.number()]).optional(),
			lt: z.number().optional(),
			lte: z.number().optional(),
			gt: z.number().optional(),
			gte: z.number().optional(),
			not: z
				.union([
					z.number(),
					z.lazy(() => NestedIntWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_avg: z.lazy(() => NestedFloatFilterSchema).optional(),
			_sum: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedIntFilterSchema).optional(),
			_max: z.lazy(() => NestedIntFilterSchema).optional(),
		})
		.strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z
	.object({
		equals: z.number().optional(),
		in: z.union([z.number().array(), z.number()]).optional(),
		notIn: z.union([z.number().array(), z.number()]).optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
			.optional(),
	})
	.strict();

export const RoomRelationFilterSchema: z.ZodType<Prisma.RoomRelationFilter> = z
	.object({
		is: z
			.lazy(() => RoomWhereInputSchema)
			.optional()
			.nullable(),
		isNot: z
			.lazy(() => RoomWhereInputSchema)
			.optional()
			.nullable(),
	})
	.strict();

export const ReservationCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			price: z.lazy(() => SortOrderSchema).optional(),
			from: z.lazy(() => SortOrderSchema).optional(),
			to: z.lazy(() => SortOrderSchema).optional(),
			roomId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ReservationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationAvgOrderByAggregateInput> =
	z
		.object({
			price: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ReservationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			price: z.lazy(() => SortOrderSchema).optional(),
			from: z.lazy(() => SortOrderSchema).optional(),
			to: z.lazy(() => SortOrderSchema).optional(),
			roomId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ReservationMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			price: z.lazy(() => SortOrderSchema).optional(),
			from: z.lazy(() => SortOrderSchema).optional(),
			to: z.lazy(() => SortOrderSchema).optional(),
			roomId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ReservationSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationSumOrderByAggregateInput> =
	z
		.object({
			price: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> =
	z
		.object({
			equals: z.number().optional(),
			in: z.union([z.number().array(), z.number()]).optional(),
			notIn: z.union([z.number().array(), z.number()]).optional(),
			lt: z.number().optional(),
			lte: z.number().optional(),
			gt: z.number().optional(),
			gte: z.number().optional(),
			not: z
				.union([
					z.number(),
					z.lazy(() => NestedFloatWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_avg: z.lazy(() => NestedFloatFilterSchema).optional(),
			_sum: z.lazy(() => NestedFloatFilterSchema).optional(),
			_min: z.lazy(() => NestedFloatFilterSchema).optional(),
			_max: z.lazy(() => NestedFloatFilterSchema).optional(),
		})
		.strict();

export const RoomListRelationFilterSchema: z.ZodType<Prisma.RoomListRelationFilter> =
	z
		.object({
			every: z.lazy(() => RoomWhereInputSchema).optional(),
			some: z.lazy(() => RoomWhereInputSchema).optional(),
			none: z.lazy(() => RoomWhereInputSchema).optional(),
		})
		.strict();

export const RoomOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RoomOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const PropertyCountOrderByAggregateInputSchema: z.ZodType<Prisma.PropertyCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			ownerId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const PropertyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PropertyMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			ownerId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const PropertyMinOrderByAggregateInputSchema: z.ZodType<Prisma.PropertyMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			ownerId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const FacilityListRelationFilterSchema: z.ZodType<Prisma.FacilityListRelationFilter> =
	z
		.object({
			every: z.lazy(() => FacilityWhereInputSchema).optional(),
			some: z.lazy(() => FacilityWhereInputSchema).optional(),
			none: z.lazy(() => FacilityWhereInputSchema).optional(),
		})
		.strict();

export const FacilityOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FacilityOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const RoomCountOrderByAggregateInputSchema: z.ZodType<Prisma.RoomCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			quantity: z.lazy(() => SortOrderSchema).optional(),
			maxGuests: z.lazy(() => SortOrderSchema).optional(),
			price: z.lazy(() => SortOrderSchema).optional(),
			hotelId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const RoomAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RoomAvgOrderByAggregateInput> =
	z
		.object({
			quantity: z.lazy(() => SortOrderSchema).optional(),
			maxGuests: z.lazy(() => SortOrderSchema).optional(),
			price: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const RoomMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RoomMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			quantity: z.lazy(() => SortOrderSchema).optional(),
			maxGuests: z.lazy(() => SortOrderSchema).optional(),
			price: z.lazy(() => SortOrderSchema).optional(),
			hotelId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const RoomMinOrderByAggregateInputSchema: z.ZodType<Prisma.RoomMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			quantity: z.lazy(() => SortOrderSchema).optional(),
			maxGuests: z.lazy(() => SortOrderSchema).optional(),
			price: z.lazy(() => SortOrderSchema).optional(),
			hotelId: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const RoomSumOrderByAggregateInputSchema: z.ZodType<Prisma.RoomSumOrderByAggregateInput> =
	z
		.object({
			quantity: z.lazy(() => SortOrderSchema).optional(),
			maxGuests: z.lazy(() => SortOrderSchema).optional(),
			price: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const EnumCategoryFilterSchema: z.ZodType<Prisma.EnumCategoryFilter> = z
	.object({
		equals: z.lazy(() => CategorySchema).optional(),
		in: z
			.union([
				z.lazy(() => CategorySchema).array(),
				z.lazy(() => CategorySchema),
			])
			.optional(),
		notIn: z
			.union([
				z.lazy(() => CategorySchema).array(),
				z.lazy(() => CategorySchema),
			])
			.optional(),
		not: z
			.union([
				z.lazy(() => CategorySchema),
				z.lazy(() => NestedEnumCategoryFilterSchema),
			])
			.optional(),
	})
	.strict();

export const EnumIconFilterSchema: z.ZodType<Prisma.EnumIconFilter> = z
	.object({
		equals: z.lazy(() => IconSchema).optional(),
		in: z
			.union([z.lazy(() => IconSchema).array(), z.lazy(() => IconSchema)])
			.optional(),
		notIn: z
			.union([z.lazy(() => IconSchema).array(), z.lazy(() => IconSchema)])
			.optional(),
		not: z
			.union([
				z.lazy(() => IconSchema),
				z.lazy(() => NestedEnumIconFilterSchema),
			])
			.optional(),
	})
	.strict();

export const FacilityCountOrderByAggregateInputSchema: z.ZodType<Prisma.FacilityCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			category: z.lazy(() => SortOrderSchema).optional(),
			icon: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const FacilityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FacilityMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			category: z.lazy(() => SortOrderSchema).optional(),
			icon: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const FacilityMinOrderByAggregateInputSchema: z.ZodType<Prisma.FacilityMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			category: z.lazy(() => SortOrderSchema).optional(),
			icon: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const EnumCategoryWithAggregatesFilterSchema: z.ZodType<Prisma.EnumCategoryWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => CategorySchema).optional(),
			in: z
				.union([
					z.lazy(() => CategorySchema).array(),
					z.lazy(() => CategorySchema),
				])
				.optional(),
			notIn: z
				.union([
					z.lazy(() => CategorySchema).array(),
					z.lazy(() => CategorySchema),
				])
				.optional(),
			not: z
				.union([
					z.lazy(() => CategorySchema),
					z.lazy(() => NestedEnumCategoryWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumCategoryFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumCategoryFilterSchema).optional(),
		})
		.strict();

export const EnumIconWithAggregatesFilterSchema: z.ZodType<Prisma.EnumIconWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => IconSchema).optional(),
			in: z
				.union([
					z.lazy(() => IconSchema).array(),
					z.lazy(() => IconSchema),
				])
				.optional(),
			notIn: z
				.union([
					z.lazy(() => IconSchema).array(),
					z.lazy(() => IconSchema),
				])
				.optional(),
			not: z
				.union([
					z.lazy(() => IconSchema),
					z.lazy(() => NestedEnumIconWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumIconFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumIconFilterSchema).optional(),
		})
		.strict();

export const UserCreaterolesInputSchema: z.ZodType<Prisma.UserCreaterolesInput> =
	z
		.object({
			set: z.lazy(() => RoleSchema).array(),
		})
		.strict();

export const PasswordCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.PasswordCreateNestedOneWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PasswordCreateWithoutUserInputSchema),
					z.lazy(() => PasswordUncheckedCreateWithoutUserInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => PasswordCreateOrConnectWithoutUserInputSchema)
				.optional(),
			connect: z.lazy(() => PasswordWhereUniqueInputSchema).optional(),
		})
		.strict();

export const ReservationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReservationCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReservationCreateWithoutUserInputSchema),
					z
						.lazy(() => ReservationCreateWithoutUserInputSchema)
						.array(),
					z.lazy(
						() => ReservationUncheckedCreateWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUncheckedCreateWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ReservationCreateOrConnectWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReservationCreateOrConnectWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReservationCreateManyUserInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const PropertyCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.PropertyCreateNestedManyWithoutOwnerInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PropertyCreateWithoutOwnerInputSchema),
					z.lazy(() => PropertyCreateWithoutOwnerInputSchema).array(),
					z.lazy(
						() => PropertyUncheckedCreateWithoutOwnerInputSchema
					),
					z
						.lazy(
							() => PropertyUncheckedCreateWithoutOwnerInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => PropertyCreateOrConnectWithoutOwnerInputSchema
					),
					z
						.lazy(
							() => PropertyCreateOrConnectWithoutOwnerInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => PropertyCreateManyOwnerInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => PropertyWhereUniqueInputSchema),
					z.lazy(() => PropertyWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MessageCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MessageCreateWithoutUserInputSchema),
					z.lazy(() => MessageCreateWithoutUserInputSchema).array(),
					z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema),
					z
						.lazy(
							() => MessageUncheckedCreateWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MessageCreateOrConnectWithoutUserInputSchema),
					z
						.lazy(
							() => MessageCreateOrConnectWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MessageCreateManyUserInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ReviewCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReviewCreateWithoutUserInputSchema),
					z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),
					z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),
					z
						.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),
					z
						.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReviewCreateManyUserInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ChatCreateNestedManyWithoutParticipantsInputSchema: z.ZodType<Prisma.ChatCreateNestedManyWithoutParticipantsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ChatCreateWithoutParticipantsInputSchema),
					z
						.lazy(() => ChatCreateWithoutParticipantsInputSchema)
						.array(),
					z.lazy(
						() => ChatUncheckedCreateWithoutParticipantsInputSchema
					),
					z
						.lazy(
							() =>
								ChatUncheckedCreateWithoutParticipantsInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ChatCreateOrConnectWithoutParticipantsInputSchema
					),
					z
						.lazy(
							() =>
								ChatCreateOrConnectWithoutParticipantsInputSchema
						)
						.array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ChatWhereUniqueInputSchema),
					z.lazy(() => ChatWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const PasswordUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.PasswordUncheckedCreateNestedOneWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PasswordCreateWithoutUserInputSchema),
					z.lazy(() => PasswordUncheckedCreateWithoutUserInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => PasswordCreateOrConnectWithoutUserInputSchema)
				.optional(),
			connect: z.lazy(() => PasswordWhereUniqueInputSchema).optional(),
		})
		.strict();

export const ReservationUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReservationCreateWithoutUserInputSchema),
					z
						.lazy(() => ReservationCreateWithoutUserInputSchema)
						.array(),
					z.lazy(
						() => ReservationUncheckedCreateWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUncheckedCreateWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ReservationCreateOrConnectWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReservationCreateOrConnectWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReservationCreateManyUserInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const PropertyUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.PropertyUncheckedCreateNestedManyWithoutOwnerInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PropertyCreateWithoutOwnerInputSchema),
					z.lazy(() => PropertyCreateWithoutOwnerInputSchema).array(),
					z.lazy(
						() => PropertyUncheckedCreateWithoutOwnerInputSchema
					),
					z
						.lazy(
							() => PropertyUncheckedCreateWithoutOwnerInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => PropertyCreateOrConnectWithoutOwnerInputSchema
					),
					z
						.lazy(
							() => PropertyCreateOrConnectWithoutOwnerInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => PropertyCreateManyOwnerInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => PropertyWhereUniqueInputSchema),
					z.lazy(() => PropertyWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MessageUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MessageCreateWithoutUserInputSchema),
					z.lazy(() => MessageCreateWithoutUserInputSchema).array(),
					z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema),
					z
						.lazy(
							() => MessageUncheckedCreateWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MessageCreateOrConnectWithoutUserInputSchema),
					z
						.lazy(
							() => MessageCreateOrConnectWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MessageCreateManyUserInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ReviewUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReviewCreateWithoutUserInputSchema),
					z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),
					z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),
					z
						.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),
					z
						.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReviewCreateManyUserInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ChatUncheckedCreateNestedManyWithoutParticipantsInputSchema: z.ZodType<Prisma.ChatUncheckedCreateNestedManyWithoutParticipantsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ChatCreateWithoutParticipantsInputSchema),
					z
						.lazy(() => ChatCreateWithoutParticipantsInputSchema)
						.array(),
					z.lazy(
						() => ChatUncheckedCreateWithoutParticipantsInputSchema
					),
					z
						.lazy(
							() =>
								ChatUncheckedCreateWithoutParticipantsInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ChatCreateOrConnectWithoutParticipantsInputSchema
					),
					z
						.lazy(
							() =>
								ChatCreateOrConnectWithoutParticipantsInputSchema
						)
						.array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ChatWhereUniqueInputSchema),
					z.lazy(() => ChatWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
	z
		.object({
			set: z.string().optional(),
		})
		.strict();

export const UserUpdaterolesInputSchema: z.ZodType<Prisma.UserUpdaterolesInput> =
	z
		.object({
			set: z
				.lazy(() => RoleSchema)
				.array()
				.optional(),
			push: z
				.union([
					z.lazy(() => RoleSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
		})
		.strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
	z
		.object({
			set: z.coerce.date().optional(),
		})
		.strict();

export const PasswordUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.PasswordUpdateOneWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PasswordCreateWithoutUserInputSchema),
					z.lazy(() => PasswordUncheckedCreateWithoutUserInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => PasswordCreateOrConnectWithoutUserInputSchema)
				.optional(),
			upsert: z
				.lazy(() => PasswordUpsertWithoutUserInputSchema)
				.optional(),
			disconnect: z.boolean().optional(),
			delete: z.boolean().optional(),
			connect: z.lazy(() => PasswordWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => PasswordUpdateWithoutUserInputSchema),
					z.lazy(() => PasswordUncheckedUpdateWithoutUserInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReservationUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReservationUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReservationCreateWithoutUserInputSchema),
					z
						.lazy(() => ReservationCreateWithoutUserInputSchema)
						.array(),
					z.lazy(
						() => ReservationUncheckedCreateWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUncheckedCreateWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ReservationCreateOrConnectWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReservationCreateOrConnectWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							ReservationUpsertWithWhereUniqueWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUpsertWithWhereUniqueWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReservationCreateManyUserInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							ReservationUpdateWithWhereUniqueWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUpdateWithWhereUniqueWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							ReservationUpdateManyWithWhereWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUpdateManyWithWhereWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ReservationScalarWhereInputSchema),
					z.lazy(() => ReservationScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const PropertyUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.PropertyUpdateManyWithoutOwnerNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PropertyCreateWithoutOwnerInputSchema),
					z.lazy(() => PropertyCreateWithoutOwnerInputSchema).array(),
					z.lazy(
						() => PropertyUncheckedCreateWithoutOwnerInputSchema
					),
					z
						.lazy(
							() => PropertyUncheckedCreateWithoutOwnerInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => PropertyCreateOrConnectWithoutOwnerInputSchema
					),
					z
						.lazy(
							() => PropertyCreateOrConnectWithoutOwnerInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							PropertyUpsertWithWhereUniqueWithoutOwnerInputSchema
					),
					z
						.lazy(
							() =>
								PropertyUpsertWithWhereUniqueWithoutOwnerInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => PropertyCreateManyOwnerInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => PropertyWhereUniqueInputSchema),
					z.lazy(() => PropertyWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => PropertyWhereUniqueInputSchema),
					z.lazy(() => PropertyWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => PropertyWhereUniqueInputSchema),
					z.lazy(() => PropertyWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => PropertyWhereUniqueInputSchema),
					z.lazy(() => PropertyWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							PropertyUpdateWithWhereUniqueWithoutOwnerInputSchema
					),
					z
						.lazy(
							() =>
								PropertyUpdateWithWhereUniqueWithoutOwnerInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => PropertyUpdateManyWithWhereWithoutOwnerInputSchema
					),
					z
						.lazy(
							() =>
								PropertyUpdateManyWithWhereWithoutOwnerInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => PropertyScalarWhereInputSchema),
					z.lazy(() => PropertyScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MessageUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MessageCreateWithoutUserInputSchema),
					z.lazy(() => MessageCreateWithoutUserInputSchema).array(),
					z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema),
					z
						.lazy(
							() => MessageUncheckedCreateWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MessageCreateOrConnectWithoutUserInputSchema),
					z
						.lazy(
							() => MessageCreateOrConnectWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => MessageUpsertWithWhereUniqueWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								MessageUpsertWithWhereUniqueWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MessageCreateManyUserInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => MessageUpdateWithWhereUniqueWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								MessageUpdateWithWhereUniqueWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => MessageUpdateManyWithWhereWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								MessageUpdateManyWithWhereWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => MessageScalarWhereInputSchema),
					z.lazy(() => MessageScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ReviewUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReviewCreateWithoutUserInputSchema),
					z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),
					z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),
					z
						.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),
					z
						.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUpsertWithWhereUniqueWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReviewCreateManyUserInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUpdateWithWhereUniqueWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => ReviewUpdateManyWithWhereWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUpdateManyWithWhereWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ReviewScalarWhereInputSchema),
					z.lazy(() => ReviewScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ChatUpdateManyWithoutParticipantsNestedInputSchema: z.ZodType<Prisma.ChatUpdateManyWithoutParticipantsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ChatCreateWithoutParticipantsInputSchema),
					z
						.lazy(() => ChatCreateWithoutParticipantsInputSchema)
						.array(),
					z.lazy(
						() => ChatUncheckedCreateWithoutParticipantsInputSchema
					),
					z
						.lazy(
							() =>
								ChatUncheckedCreateWithoutParticipantsInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ChatCreateOrConnectWithoutParticipantsInputSchema
					),
					z
						.lazy(
							() =>
								ChatCreateOrConnectWithoutParticipantsInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							ChatUpsertWithWhereUniqueWithoutParticipantsInputSchema
					),
					z
						.lazy(
							() =>
								ChatUpsertWithWhereUniqueWithoutParticipantsInputSchema
						)
						.array(),
				])
				.optional(),
			set: z
				.union([
					z.lazy(() => ChatWhereUniqueInputSchema),
					z.lazy(() => ChatWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ChatWhereUniqueInputSchema),
					z.lazy(() => ChatWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ChatWhereUniqueInputSchema),
					z.lazy(() => ChatWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ChatWhereUniqueInputSchema),
					z.lazy(() => ChatWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							ChatUpdateWithWhereUniqueWithoutParticipantsInputSchema
					),
					z
						.lazy(
							() =>
								ChatUpdateWithWhereUniqueWithoutParticipantsInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							ChatUpdateManyWithWhereWithoutParticipantsInputSchema
					),
					z
						.lazy(
							() =>
								ChatUpdateManyWithWhereWithoutParticipantsInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ChatScalarWhereInputSchema),
					z.lazy(() => ChatScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const PasswordUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.PasswordUncheckedUpdateOneWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PasswordCreateWithoutUserInputSchema),
					z.lazy(() => PasswordUncheckedCreateWithoutUserInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => PasswordCreateOrConnectWithoutUserInputSchema)
				.optional(),
			upsert: z
				.lazy(() => PasswordUpsertWithoutUserInputSchema)
				.optional(),
			disconnect: z.boolean().optional(),
			delete: z.boolean().optional(),
			connect: z.lazy(() => PasswordWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => PasswordUpdateWithoutUserInputSchema),
					z.lazy(() => PasswordUncheckedUpdateWithoutUserInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReservationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReservationCreateWithoutUserInputSchema),
					z
						.lazy(() => ReservationCreateWithoutUserInputSchema)
						.array(),
					z.lazy(
						() => ReservationUncheckedCreateWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUncheckedCreateWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ReservationCreateOrConnectWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReservationCreateOrConnectWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							ReservationUpsertWithWhereUniqueWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUpsertWithWhereUniqueWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReservationCreateManyUserInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							ReservationUpdateWithWhereUniqueWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUpdateWithWhereUniqueWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							ReservationUpdateManyWithWhereWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUpdateManyWithWhereWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ReservationScalarWhereInputSchema),
					z.lazy(() => ReservationScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const PropertyUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.PropertyUncheckedUpdateManyWithoutOwnerNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PropertyCreateWithoutOwnerInputSchema),
					z.lazy(() => PropertyCreateWithoutOwnerInputSchema).array(),
					z.lazy(
						() => PropertyUncheckedCreateWithoutOwnerInputSchema
					),
					z
						.lazy(
							() => PropertyUncheckedCreateWithoutOwnerInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => PropertyCreateOrConnectWithoutOwnerInputSchema
					),
					z
						.lazy(
							() => PropertyCreateOrConnectWithoutOwnerInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							PropertyUpsertWithWhereUniqueWithoutOwnerInputSchema
					),
					z
						.lazy(
							() =>
								PropertyUpsertWithWhereUniqueWithoutOwnerInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => PropertyCreateManyOwnerInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => PropertyWhereUniqueInputSchema),
					z.lazy(() => PropertyWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => PropertyWhereUniqueInputSchema),
					z.lazy(() => PropertyWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => PropertyWhereUniqueInputSchema),
					z.lazy(() => PropertyWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => PropertyWhereUniqueInputSchema),
					z.lazy(() => PropertyWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							PropertyUpdateWithWhereUniqueWithoutOwnerInputSchema
					),
					z
						.lazy(
							() =>
								PropertyUpdateWithWhereUniqueWithoutOwnerInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => PropertyUpdateManyWithWhereWithoutOwnerInputSchema
					),
					z
						.lazy(
							() =>
								PropertyUpdateManyWithWhereWithoutOwnerInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => PropertyScalarWhereInputSchema),
					z.lazy(() => PropertyScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MessageUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MessageCreateWithoutUserInputSchema),
					z.lazy(() => MessageCreateWithoutUserInputSchema).array(),
					z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema),
					z
						.lazy(
							() => MessageUncheckedCreateWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MessageCreateOrConnectWithoutUserInputSchema),
					z
						.lazy(
							() => MessageCreateOrConnectWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => MessageUpsertWithWhereUniqueWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								MessageUpsertWithWhereUniqueWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MessageCreateManyUserInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => MessageUpdateWithWhereUniqueWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								MessageUpdateWithWhereUniqueWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => MessageUpdateManyWithWhereWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								MessageUpdateManyWithWhereWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => MessageScalarWhereInputSchema),
					z.lazy(() => MessageScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ReviewUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReviewCreateWithoutUserInputSchema),
					z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),
					z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),
					z
						.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),
					z
						.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUpsertWithWhereUniqueWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReviewCreateManyUserInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUpdateWithWhereUniqueWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => ReviewUpdateManyWithWhereWithoutUserInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUpdateManyWithWhereWithoutUserInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ReviewScalarWhereInputSchema),
					z.lazy(() => ReviewScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ChatUncheckedUpdateManyWithoutParticipantsNestedInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateManyWithoutParticipantsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ChatCreateWithoutParticipantsInputSchema),
					z
						.lazy(() => ChatCreateWithoutParticipantsInputSchema)
						.array(),
					z.lazy(
						() => ChatUncheckedCreateWithoutParticipantsInputSchema
					),
					z
						.lazy(
							() =>
								ChatUncheckedCreateWithoutParticipantsInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ChatCreateOrConnectWithoutParticipantsInputSchema
					),
					z
						.lazy(
							() =>
								ChatCreateOrConnectWithoutParticipantsInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							ChatUpsertWithWhereUniqueWithoutParticipantsInputSchema
					),
					z
						.lazy(
							() =>
								ChatUpsertWithWhereUniqueWithoutParticipantsInputSchema
						)
						.array(),
				])
				.optional(),
			set: z
				.union([
					z.lazy(() => ChatWhereUniqueInputSchema),
					z.lazy(() => ChatWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ChatWhereUniqueInputSchema),
					z.lazy(() => ChatWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ChatWhereUniqueInputSchema),
					z.lazy(() => ChatWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ChatWhereUniqueInputSchema),
					z.lazy(() => ChatWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							ChatUpdateWithWhereUniqueWithoutParticipantsInputSchema
					),
					z
						.lazy(
							() =>
								ChatUpdateWithWhereUniqueWithoutParticipantsInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							ChatUpdateManyWithWhereWithoutParticipantsInputSchema
					),
					z
						.lazy(
							() =>
								ChatUpdateManyWithWhereWithoutParticipantsInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ChatScalarWhereInputSchema),
					z.lazy(() => ChatScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const UserCreateNestedOneWithoutPasswordInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPasswordInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutPasswordInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutPasswordInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutPasswordInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		})
		.strict();

export const UserUpdateOneRequiredWithoutPasswordNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPasswordNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutPasswordInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutPasswordInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutPasswordInputSchema)
				.optional(),
			upsert: z
				.lazy(() => UserUpsertWithoutPasswordInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateWithoutPasswordInputSchema),
					z.lazy(() => UserUncheckedUpdateWithoutPasswordInputSchema),
				])
				.optional(),
		})
		.strict();

export const MessageCreateNestedManyWithoutChatInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutChatInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MessageCreateWithoutChatInputSchema),
					z.lazy(() => MessageCreateWithoutChatInputSchema).array(),
					z.lazy(() => MessageUncheckedCreateWithoutChatInputSchema),
					z
						.lazy(
							() => MessageUncheckedCreateWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MessageCreateOrConnectWithoutChatInputSchema),
					z
						.lazy(
							() => MessageCreateOrConnectWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MessageCreateManyChatInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const UserCreateNestedManyWithoutChatInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutChatInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutChatInputSchema),
					z.lazy(() => UserCreateWithoutChatInputSchema).array(),
					z.lazy(() => UserUncheckedCreateWithoutChatInputSchema),
					z
						.lazy(() => UserUncheckedCreateWithoutChatInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => UserCreateOrConnectWithoutChatInputSchema),
					z
						.lazy(() => UserCreateOrConnectWithoutChatInputSchema)
						.array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => UserWhereUniqueInputSchema),
					z.lazy(() => UserWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MessageUncheckedCreateNestedManyWithoutChatInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutChatInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MessageCreateWithoutChatInputSchema),
					z.lazy(() => MessageCreateWithoutChatInputSchema).array(),
					z.lazy(() => MessageUncheckedCreateWithoutChatInputSchema),
					z
						.lazy(
							() => MessageUncheckedCreateWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MessageCreateOrConnectWithoutChatInputSchema),
					z
						.lazy(
							() => MessageCreateOrConnectWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MessageCreateManyChatInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const UserUncheckedCreateNestedManyWithoutChatInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutChatInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutChatInputSchema),
					z.lazy(() => UserCreateWithoutChatInputSchema).array(),
					z.lazy(() => UserUncheckedCreateWithoutChatInputSchema),
					z
						.lazy(() => UserUncheckedCreateWithoutChatInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => UserCreateOrConnectWithoutChatInputSchema),
					z
						.lazy(() => UserCreateOrConnectWithoutChatInputSchema)
						.array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => UserWhereUniqueInputSchema),
					z.lazy(() => UserWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MessageUpdateManyWithoutChatNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutChatNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MessageCreateWithoutChatInputSchema),
					z.lazy(() => MessageCreateWithoutChatInputSchema).array(),
					z.lazy(() => MessageUncheckedCreateWithoutChatInputSchema),
					z
						.lazy(
							() => MessageUncheckedCreateWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MessageCreateOrConnectWithoutChatInputSchema),
					z
						.lazy(
							() => MessageCreateOrConnectWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => MessageUpsertWithWhereUniqueWithoutChatInputSchema
					),
					z
						.lazy(
							() =>
								MessageUpsertWithWhereUniqueWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MessageCreateManyChatInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => MessageUpdateWithWhereUniqueWithoutChatInputSchema
					),
					z
						.lazy(
							() =>
								MessageUpdateWithWhereUniqueWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => MessageUpdateManyWithWhereWithoutChatInputSchema
					),
					z
						.lazy(
							() =>
								MessageUpdateManyWithWhereWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => MessageScalarWhereInputSchema),
					z.lazy(() => MessageScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const UserUpdateManyWithoutChatNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutChatNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutChatInputSchema),
					z.lazy(() => UserCreateWithoutChatInputSchema).array(),
					z.lazy(() => UserUncheckedCreateWithoutChatInputSchema),
					z
						.lazy(() => UserUncheckedCreateWithoutChatInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => UserCreateOrConnectWithoutChatInputSchema),
					z
						.lazy(() => UserCreateOrConnectWithoutChatInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => UserUpsertWithWhereUniqueWithoutChatInputSchema
					),
					z
						.lazy(
							() =>
								UserUpsertWithWhereUniqueWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			set: z
				.union([
					z.lazy(() => UserWhereUniqueInputSchema),
					z.lazy(() => UserWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => UserWhereUniqueInputSchema),
					z.lazy(() => UserWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => UserWhereUniqueInputSchema),
					z.lazy(() => UserWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => UserWhereUniqueInputSchema),
					z.lazy(() => UserWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => UserUpdateWithWhereUniqueWithoutChatInputSchema
					),
					z
						.lazy(
							() =>
								UserUpdateWithWhereUniqueWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => UserUpdateManyWithWhereWithoutChatInputSchema),
					z
						.lazy(
							() => UserUpdateManyWithWhereWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => UserScalarWhereInputSchema),
					z.lazy(() => UserScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const MessageUncheckedUpdateManyWithoutChatNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutChatNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => MessageCreateWithoutChatInputSchema),
					z.lazy(() => MessageCreateWithoutChatInputSchema).array(),
					z.lazy(() => MessageUncheckedCreateWithoutChatInputSchema),
					z
						.lazy(
							() => MessageUncheckedCreateWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MessageCreateOrConnectWithoutChatInputSchema),
					z
						.lazy(
							() => MessageCreateOrConnectWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => MessageUpsertWithWhereUniqueWithoutChatInputSchema
					),
					z
						.lazy(
							() =>
								MessageUpsertWithWhereUniqueWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MessageCreateManyChatInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputSchema),
					z.lazy(() => MessageWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => MessageUpdateWithWhereUniqueWithoutChatInputSchema
					),
					z
						.lazy(
							() =>
								MessageUpdateWithWhereUniqueWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => MessageUpdateManyWithWhereWithoutChatInputSchema
					),
					z
						.lazy(
							() =>
								MessageUpdateManyWithWhereWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => MessageScalarWhereInputSchema),
					z.lazy(() => MessageScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateManyWithoutChatNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutChatNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutChatInputSchema),
					z.lazy(() => UserCreateWithoutChatInputSchema).array(),
					z.lazy(() => UserUncheckedCreateWithoutChatInputSchema),
					z
						.lazy(() => UserUncheckedCreateWithoutChatInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => UserCreateOrConnectWithoutChatInputSchema),
					z
						.lazy(() => UserCreateOrConnectWithoutChatInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => UserUpsertWithWhereUniqueWithoutChatInputSchema
					),
					z
						.lazy(
							() =>
								UserUpsertWithWhereUniqueWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			set: z
				.union([
					z.lazy(() => UserWhereUniqueInputSchema),
					z.lazy(() => UserWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => UserWhereUniqueInputSchema),
					z.lazy(() => UserWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => UserWhereUniqueInputSchema),
					z.lazy(() => UserWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => UserWhereUniqueInputSchema),
					z.lazy(() => UserWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => UserUpdateWithWhereUniqueWithoutChatInputSchema
					),
					z
						.lazy(
							() =>
								UserUpdateWithWhereUniqueWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => UserUpdateManyWithWhereWithoutChatInputSchema),
					z
						.lazy(
							() => UserUpdateManyWithWhereWithoutChatInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => UserScalarWhereInputSchema),
					z.lazy(() => UserScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ChatCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.ChatCreateNestedOneWithoutMessagesInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ChatCreateWithoutMessagesInputSchema),
					z.lazy(() => ChatUncheckedCreateWithoutMessagesInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => ChatCreateOrConnectWithoutMessagesInputSchema)
				.optional(),
			connect: z.lazy(() => ChatWhereUniqueInputSchema).optional(),
		})
		.strict();

export const UserCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMessagesInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutMessagesInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutMessagesInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutMessagesInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		})
		.strict();

export const ChatUpdateOneRequiredWithoutMessagesNestedInputSchema: z.ZodType<Prisma.ChatUpdateOneRequiredWithoutMessagesNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ChatCreateWithoutMessagesInputSchema),
					z.lazy(() => ChatUncheckedCreateWithoutMessagesInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => ChatCreateOrConnectWithoutMessagesInputSchema)
				.optional(),
			upsert: z
				.lazy(() => ChatUpsertWithoutMessagesInputSchema)
				.optional(),
			connect: z.lazy(() => ChatWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => ChatUpdateWithoutMessagesInputSchema),
					z.lazy(() => ChatUncheckedUpdateWithoutMessagesInputSchema),
				])
				.optional(),
		})
		.strict();

export const UserUpdateOneRequiredWithoutMessagesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMessagesNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutMessagesInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutMessagesInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutMessagesInputSchema)
				.optional(),
			upsert: z
				.lazy(() => UserUpsertWithoutMessagesInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateWithoutMessagesInputSchema),
					z.lazy(() => UserUncheckedUpdateWithoutMessagesInputSchema),
				])
				.optional(),
		})
		.strict();

export const PropertyCreateNestedOneWithoutReviewsInputSchema: z.ZodType<Prisma.PropertyCreateNestedOneWithoutReviewsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PropertyCreateWithoutReviewsInputSchema),
					z.lazy(
						() => PropertyUncheckedCreateWithoutReviewsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => PropertyCreateOrConnectWithoutReviewsInputSchema)
				.optional(),
			connect: z.lazy(() => PropertyWhereUniqueInputSchema).optional(),
		})
		.strict();

export const UserCreateNestedOneWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReviewsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutReviewsInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutReviewsInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		})
		.strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
	z
		.object({
			set: z.number().optional(),
			increment: z.number().optional(),
			decrement: z.number().optional(),
			multiply: z.number().optional(),
			divide: z.number().optional(),
		})
		.strict();

export const PropertyUpdateOneRequiredWithoutReviewsNestedInputSchema: z.ZodType<Prisma.PropertyUpdateOneRequiredWithoutReviewsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PropertyCreateWithoutReviewsInputSchema),
					z.lazy(
						() => PropertyUncheckedCreateWithoutReviewsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => PropertyCreateOrConnectWithoutReviewsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => PropertyUpsertWithoutReviewsInputSchema)
				.optional(),
			connect: z.lazy(() => PropertyWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => PropertyUpdateWithoutReviewsInputSchema),
					z.lazy(
						() => PropertyUncheckedUpdateWithoutReviewsInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const UserUpdateOneRequiredWithoutReviewsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutReviewsInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutReviewsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => UserUpsertWithoutReviewsInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateWithoutReviewsInputSchema),
					z.lazy(() => UserUncheckedUpdateWithoutReviewsInputSchema),
				])
				.optional(),
		})
		.strict();

export const RoomCreateNestedOneWithoutReservationsInputSchema: z.ZodType<Prisma.RoomCreateNestedOneWithoutReservationsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutReservationsInputSchema),
					z.lazy(
						() => RoomUncheckedCreateWithoutReservationsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => RoomCreateOrConnectWithoutReservationsInputSchema)
				.optional(),
			connect: z.lazy(() => RoomWhereUniqueInputSchema).optional(),
		})
		.strict();

export const UserCreateNestedOneWithoutReservationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReservationsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutReservationsInputSchema),
					z.lazy(
						() => UserUncheckedCreateWithoutReservationsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutReservationsInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		})
		.strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> =
	z
		.object({
			set: z.number().optional(),
			increment: z.number().optional(),
			decrement: z.number().optional(),
			multiply: z.number().optional(),
			divide: z.number().optional(),
		})
		.strict();

export const RoomUpdateOneRequiredWithoutReservationsNestedInputSchema: z.ZodType<Prisma.RoomUpdateOneRequiredWithoutReservationsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutReservationsInputSchema),
					z.lazy(
						() => RoomUncheckedCreateWithoutReservationsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => RoomCreateOrConnectWithoutReservationsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => RoomUpsertWithoutReservationsInputSchema)
				.optional(),
			connect: z.lazy(() => RoomWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => RoomUpdateWithoutReservationsInputSchema),
					z.lazy(
						() => RoomUncheckedUpdateWithoutReservationsInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const UserUpdateOneRequiredWithoutReservationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReservationsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutReservationsInputSchema),
					z.lazy(
						() => UserUncheckedCreateWithoutReservationsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutReservationsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => UserUpsertWithoutReservationsInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateWithoutReservationsInputSchema),
					z.lazy(
						() => UserUncheckedUpdateWithoutReservationsInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const UserCreateNestedOneWithoutPropertiesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPropertiesInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutPropertiesInputSchema),
					z.lazy(
						() => UserUncheckedCreateWithoutPropertiesInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutPropertiesInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		})
		.strict();

export const RoomCreateNestedManyWithoutHotelInputSchema: z.ZodType<Prisma.RoomCreateNestedManyWithoutHotelInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutHotelInputSchema),
					z.lazy(() => RoomCreateWithoutHotelInputSchema).array(),
					z.lazy(() => RoomUncheckedCreateWithoutHotelInputSchema),
					z
						.lazy(() => RoomUncheckedCreateWithoutHotelInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => RoomCreateOrConnectWithoutHotelInputSchema),
					z
						.lazy(() => RoomCreateOrConnectWithoutHotelInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => RoomCreateManyHotelInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ReviewCreateNestedManyWithoutPropertyInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutPropertyInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReviewCreateWithoutPropertyInputSchema),
					z
						.lazy(() => ReviewCreateWithoutPropertyInputSchema)
						.array(),
					z.lazy(
						() => ReviewUncheckedCreateWithoutPropertyInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUncheckedCreateWithoutPropertyInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ReviewCreateOrConnectWithoutPropertyInputSchema
					),
					z
						.lazy(
							() =>
								ReviewCreateOrConnectWithoutPropertyInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReviewCreateManyPropertyInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const RoomUncheckedCreateNestedManyWithoutHotelInputSchema: z.ZodType<Prisma.RoomUncheckedCreateNestedManyWithoutHotelInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutHotelInputSchema),
					z.lazy(() => RoomCreateWithoutHotelInputSchema).array(),
					z.lazy(() => RoomUncheckedCreateWithoutHotelInputSchema),
					z
						.lazy(() => RoomUncheckedCreateWithoutHotelInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => RoomCreateOrConnectWithoutHotelInputSchema),
					z
						.lazy(() => RoomCreateOrConnectWithoutHotelInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => RoomCreateManyHotelInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ReviewUncheckedCreateNestedManyWithoutPropertyInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutPropertyInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReviewCreateWithoutPropertyInputSchema),
					z
						.lazy(() => ReviewCreateWithoutPropertyInputSchema)
						.array(),
					z.lazy(
						() => ReviewUncheckedCreateWithoutPropertyInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUncheckedCreateWithoutPropertyInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ReviewCreateOrConnectWithoutPropertyInputSchema
					),
					z
						.lazy(
							() =>
								ReviewCreateOrConnectWithoutPropertyInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReviewCreateManyPropertyInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const UserUpdateOneRequiredWithoutPropertiesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPropertiesNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutPropertiesInputSchema),
					z.lazy(
						() => UserUncheckedCreateWithoutPropertiesInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => UserCreateOrConnectWithoutPropertiesInputSchema)
				.optional(),
			upsert: z
				.lazy(() => UserUpsertWithoutPropertiesInputSchema)
				.optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateWithoutPropertiesInputSchema),
					z.lazy(
						() => UserUncheckedUpdateWithoutPropertiesInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const RoomUpdateManyWithoutHotelNestedInputSchema: z.ZodType<Prisma.RoomUpdateManyWithoutHotelNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutHotelInputSchema),
					z.lazy(() => RoomCreateWithoutHotelInputSchema).array(),
					z.lazy(() => RoomUncheckedCreateWithoutHotelInputSchema),
					z
						.lazy(() => RoomUncheckedCreateWithoutHotelInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => RoomCreateOrConnectWithoutHotelInputSchema),
					z
						.lazy(() => RoomCreateOrConnectWithoutHotelInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => RoomUpsertWithWhereUniqueWithoutHotelInputSchema
					),
					z
						.lazy(
							() =>
								RoomUpsertWithWhereUniqueWithoutHotelInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => RoomCreateManyHotelInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => RoomUpdateWithWhereUniqueWithoutHotelInputSchema
					),
					z
						.lazy(
							() =>
								RoomUpdateWithWhereUniqueWithoutHotelInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => RoomUpdateManyWithWhereWithoutHotelInputSchema
					),
					z
						.lazy(
							() => RoomUpdateManyWithWhereWithoutHotelInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => RoomScalarWhereInputSchema),
					z.lazy(() => RoomScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ReviewUpdateManyWithoutPropertyNestedInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithoutPropertyNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReviewCreateWithoutPropertyInputSchema),
					z
						.lazy(() => ReviewCreateWithoutPropertyInputSchema)
						.array(),
					z.lazy(
						() => ReviewUncheckedCreateWithoutPropertyInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUncheckedCreateWithoutPropertyInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ReviewCreateOrConnectWithoutPropertyInputSchema
					),
					z
						.lazy(
							() =>
								ReviewCreateOrConnectWithoutPropertyInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							ReviewUpsertWithWhereUniqueWithoutPropertyInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUpsertWithWhereUniqueWithoutPropertyInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReviewCreateManyPropertyInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							ReviewUpdateWithWhereUniqueWithoutPropertyInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUpdateWithWhereUniqueWithoutPropertyInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							ReviewUpdateManyWithWhereWithoutPropertyInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUpdateManyWithWhereWithoutPropertyInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ReviewScalarWhereInputSchema),
					z.lazy(() => ReviewScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const RoomUncheckedUpdateManyWithoutHotelNestedInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyWithoutHotelNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutHotelInputSchema),
					z.lazy(() => RoomCreateWithoutHotelInputSchema).array(),
					z.lazy(() => RoomUncheckedCreateWithoutHotelInputSchema),
					z
						.lazy(() => RoomUncheckedCreateWithoutHotelInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => RoomCreateOrConnectWithoutHotelInputSchema),
					z
						.lazy(() => RoomCreateOrConnectWithoutHotelInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => RoomUpsertWithWhereUniqueWithoutHotelInputSchema
					),
					z
						.lazy(
							() =>
								RoomUpsertWithWhereUniqueWithoutHotelInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => RoomCreateManyHotelInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => RoomUpdateWithWhereUniqueWithoutHotelInputSchema
					),
					z
						.lazy(
							() =>
								RoomUpdateWithWhereUniqueWithoutHotelInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => RoomUpdateManyWithWhereWithoutHotelInputSchema
					),
					z
						.lazy(
							() => RoomUpdateManyWithWhereWithoutHotelInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => RoomScalarWhereInputSchema),
					z.lazy(() => RoomScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ReviewUncheckedUpdateManyWithoutPropertyNestedInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutPropertyNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReviewCreateWithoutPropertyInputSchema),
					z
						.lazy(() => ReviewCreateWithoutPropertyInputSchema)
						.array(),
					z.lazy(
						() => ReviewUncheckedCreateWithoutPropertyInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUncheckedCreateWithoutPropertyInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ReviewCreateOrConnectWithoutPropertyInputSchema
					),
					z
						.lazy(
							() =>
								ReviewCreateOrConnectWithoutPropertyInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							ReviewUpsertWithWhereUniqueWithoutPropertyInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUpsertWithWhereUniqueWithoutPropertyInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReviewCreateManyPropertyInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReviewWhereUniqueInputSchema),
					z.lazy(() => ReviewWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							ReviewUpdateWithWhereUniqueWithoutPropertyInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUpdateWithWhereUniqueWithoutPropertyInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							ReviewUpdateManyWithWhereWithoutPropertyInputSchema
					),
					z
						.lazy(
							() =>
								ReviewUpdateManyWithWhereWithoutPropertyInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ReviewScalarWhereInputSchema),
					z.lazy(() => ReviewScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const PropertyCreateNestedOneWithoutRoomsInputSchema: z.ZodType<Prisma.PropertyCreateNestedOneWithoutRoomsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PropertyCreateWithoutRoomsInputSchema),
					z.lazy(
						() => PropertyUncheckedCreateWithoutRoomsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => PropertyCreateOrConnectWithoutRoomsInputSchema)
				.optional(),
			connect: z.lazy(() => PropertyWhereUniqueInputSchema).optional(),
		})
		.strict();

export const ReservationCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.ReservationCreateNestedManyWithoutRoomInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReservationCreateWithoutRoomInputSchema),
					z
						.lazy(() => ReservationCreateWithoutRoomInputSchema)
						.array(),
					z.lazy(
						() => ReservationUncheckedCreateWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUncheckedCreateWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ReservationCreateOrConnectWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								ReservationCreateOrConnectWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReservationCreateManyRoomInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const FacilityCreateNestedManyWithoutRoomsInputSchema: z.ZodType<Prisma.FacilityCreateNestedManyWithoutRoomsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => FacilityCreateWithoutRoomsInputSchema),
					z.lazy(() => FacilityCreateWithoutRoomsInputSchema).array(),
					z.lazy(
						() => FacilityUncheckedCreateWithoutRoomsInputSchema
					),
					z
						.lazy(
							() => FacilityUncheckedCreateWithoutRoomsInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => FacilityCreateOrConnectWithoutRoomsInputSchema
					),
					z
						.lazy(
							() => FacilityCreateOrConnectWithoutRoomsInputSchema
						)
						.array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => FacilityWhereUniqueInputSchema),
					z.lazy(() => FacilityWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ReservationUncheckedCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateNestedManyWithoutRoomInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReservationCreateWithoutRoomInputSchema),
					z
						.lazy(() => ReservationCreateWithoutRoomInputSchema)
						.array(),
					z.lazy(
						() => ReservationUncheckedCreateWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUncheckedCreateWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ReservationCreateOrConnectWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								ReservationCreateOrConnectWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReservationCreateManyRoomInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const FacilityUncheckedCreateNestedManyWithoutRoomsInputSchema: z.ZodType<Prisma.FacilityUncheckedCreateNestedManyWithoutRoomsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => FacilityCreateWithoutRoomsInputSchema),
					z.lazy(() => FacilityCreateWithoutRoomsInputSchema).array(),
					z.lazy(
						() => FacilityUncheckedCreateWithoutRoomsInputSchema
					),
					z
						.lazy(
							() => FacilityUncheckedCreateWithoutRoomsInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => FacilityCreateOrConnectWithoutRoomsInputSchema
					),
					z
						.lazy(
							() => FacilityCreateOrConnectWithoutRoomsInputSchema
						)
						.array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => FacilityWhereUniqueInputSchema),
					z.lazy(() => FacilityWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const PropertyUpdateOneRequiredWithoutRoomsNestedInputSchema: z.ZodType<Prisma.PropertyUpdateOneRequiredWithoutRoomsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => PropertyCreateWithoutRoomsInputSchema),
					z.lazy(
						() => PropertyUncheckedCreateWithoutRoomsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => PropertyCreateOrConnectWithoutRoomsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => PropertyUpsertWithoutRoomsInputSchema)
				.optional(),
			connect: z.lazy(() => PropertyWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => PropertyUpdateWithoutRoomsInputSchema),
					z.lazy(
						() => PropertyUncheckedUpdateWithoutRoomsInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const ReservationUpdateManyWithoutRoomNestedInputSchema: z.ZodType<Prisma.ReservationUpdateManyWithoutRoomNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReservationCreateWithoutRoomInputSchema),
					z
						.lazy(() => ReservationCreateWithoutRoomInputSchema)
						.array(),
					z.lazy(
						() => ReservationUncheckedCreateWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUncheckedCreateWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ReservationCreateOrConnectWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								ReservationCreateOrConnectWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							ReservationUpsertWithWhereUniqueWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUpsertWithWhereUniqueWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReservationCreateManyRoomInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							ReservationUpdateWithWhereUniqueWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUpdateWithWhereUniqueWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							ReservationUpdateManyWithWhereWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUpdateManyWithWhereWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ReservationScalarWhereInputSchema),
					z.lazy(() => ReservationScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const FacilityUpdateManyWithoutRoomsNestedInputSchema: z.ZodType<Prisma.FacilityUpdateManyWithoutRoomsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => FacilityCreateWithoutRoomsInputSchema),
					z.lazy(() => FacilityCreateWithoutRoomsInputSchema).array(),
					z.lazy(
						() => FacilityUncheckedCreateWithoutRoomsInputSchema
					),
					z
						.lazy(
							() => FacilityUncheckedCreateWithoutRoomsInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => FacilityCreateOrConnectWithoutRoomsInputSchema
					),
					z
						.lazy(
							() => FacilityCreateOrConnectWithoutRoomsInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							FacilityUpsertWithWhereUniqueWithoutRoomsInputSchema
					),
					z
						.lazy(
							() =>
								FacilityUpsertWithWhereUniqueWithoutRoomsInputSchema
						)
						.array(),
				])
				.optional(),
			set: z
				.union([
					z.lazy(() => FacilityWhereUniqueInputSchema),
					z.lazy(() => FacilityWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => FacilityWhereUniqueInputSchema),
					z.lazy(() => FacilityWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => FacilityWhereUniqueInputSchema),
					z.lazy(() => FacilityWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => FacilityWhereUniqueInputSchema),
					z.lazy(() => FacilityWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							FacilityUpdateWithWhereUniqueWithoutRoomsInputSchema
					),
					z
						.lazy(
							() =>
								FacilityUpdateWithWhereUniqueWithoutRoomsInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => FacilityUpdateManyWithWhereWithoutRoomsInputSchema
					),
					z
						.lazy(
							() =>
								FacilityUpdateManyWithWhereWithoutRoomsInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => FacilityScalarWhereInputSchema),
					z.lazy(() => FacilityScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ReservationUncheckedUpdateManyWithoutRoomNestedInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyWithoutRoomNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ReservationCreateWithoutRoomInputSchema),
					z
						.lazy(() => ReservationCreateWithoutRoomInputSchema)
						.array(),
					z.lazy(
						() => ReservationUncheckedCreateWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUncheckedCreateWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ReservationCreateOrConnectWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								ReservationCreateOrConnectWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							ReservationUpsertWithWhereUniqueWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUpsertWithWhereUniqueWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ReservationCreateManyRoomInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ReservationWhereUniqueInputSchema),
					z.lazy(() => ReservationWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							ReservationUpdateWithWhereUniqueWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUpdateWithWhereUniqueWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							ReservationUpdateManyWithWhereWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								ReservationUpdateManyWithWhereWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ReservationScalarWhereInputSchema),
					z.lazy(() => ReservationScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const FacilityUncheckedUpdateManyWithoutRoomsNestedInputSchema: z.ZodType<Prisma.FacilityUncheckedUpdateManyWithoutRoomsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => FacilityCreateWithoutRoomsInputSchema),
					z.lazy(() => FacilityCreateWithoutRoomsInputSchema).array(),
					z.lazy(
						() => FacilityUncheckedCreateWithoutRoomsInputSchema
					),
					z
						.lazy(
							() => FacilityUncheckedCreateWithoutRoomsInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => FacilityCreateOrConnectWithoutRoomsInputSchema
					),
					z
						.lazy(
							() => FacilityCreateOrConnectWithoutRoomsInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							FacilityUpsertWithWhereUniqueWithoutRoomsInputSchema
					),
					z
						.lazy(
							() =>
								FacilityUpsertWithWhereUniqueWithoutRoomsInputSchema
						)
						.array(),
				])
				.optional(),
			set: z
				.union([
					z.lazy(() => FacilityWhereUniqueInputSchema),
					z.lazy(() => FacilityWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => FacilityWhereUniqueInputSchema),
					z.lazy(() => FacilityWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => FacilityWhereUniqueInputSchema),
					z.lazy(() => FacilityWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => FacilityWhereUniqueInputSchema),
					z.lazy(() => FacilityWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							FacilityUpdateWithWhereUniqueWithoutRoomsInputSchema
					),
					z
						.lazy(
							() =>
								FacilityUpdateWithWhereUniqueWithoutRoomsInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => FacilityUpdateManyWithWhereWithoutRoomsInputSchema
					),
					z
						.lazy(
							() =>
								FacilityUpdateManyWithWhereWithoutRoomsInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => FacilityScalarWhereInputSchema),
					z.lazy(() => FacilityScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const RoomCreateNestedManyWithoutFacilitiesInputSchema: z.ZodType<Prisma.RoomCreateNestedManyWithoutFacilitiesInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutFacilitiesInputSchema),
					z
						.lazy(() => RoomCreateWithoutFacilitiesInputSchema)
						.array(),
					z.lazy(
						() => RoomUncheckedCreateWithoutFacilitiesInputSchema
					),
					z
						.lazy(
							() =>
								RoomUncheckedCreateWithoutFacilitiesInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => RoomCreateOrConnectWithoutFacilitiesInputSchema
					),
					z
						.lazy(
							() =>
								RoomCreateOrConnectWithoutFacilitiesInputSchema
						)
						.array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const RoomUncheckedCreateNestedManyWithoutFacilitiesInputSchema: z.ZodType<Prisma.RoomUncheckedCreateNestedManyWithoutFacilitiesInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutFacilitiesInputSchema),
					z
						.lazy(() => RoomCreateWithoutFacilitiesInputSchema)
						.array(),
					z.lazy(
						() => RoomUncheckedCreateWithoutFacilitiesInputSchema
					),
					z
						.lazy(
							() =>
								RoomUncheckedCreateWithoutFacilitiesInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => RoomCreateOrConnectWithoutFacilitiesInputSchema
					),
					z
						.lazy(
							() =>
								RoomCreateOrConnectWithoutFacilitiesInputSchema
						)
						.array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const EnumCategoryFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumCategoryFieldUpdateOperationsInput> =
	z
		.object({
			set: z.lazy(() => CategorySchema).optional(),
		})
		.strict();

export const EnumIconFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumIconFieldUpdateOperationsInput> =
	z
		.object({
			set: z.lazy(() => IconSchema).optional(),
		})
		.strict();

export const RoomUpdateManyWithoutFacilitiesNestedInputSchema: z.ZodType<Prisma.RoomUpdateManyWithoutFacilitiesNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutFacilitiesInputSchema),
					z
						.lazy(() => RoomCreateWithoutFacilitiesInputSchema)
						.array(),
					z.lazy(
						() => RoomUncheckedCreateWithoutFacilitiesInputSchema
					),
					z
						.lazy(
							() =>
								RoomUncheckedCreateWithoutFacilitiesInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => RoomCreateOrConnectWithoutFacilitiesInputSchema
					),
					z
						.lazy(
							() =>
								RoomCreateOrConnectWithoutFacilitiesInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							RoomUpsertWithWhereUniqueWithoutFacilitiesInputSchema
					),
					z
						.lazy(
							() =>
								RoomUpsertWithWhereUniqueWithoutFacilitiesInputSchema
						)
						.array(),
				])
				.optional(),
			set: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							RoomUpdateWithWhereUniqueWithoutFacilitiesInputSchema
					),
					z
						.lazy(
							() =>
								RoomUpdateWithWhereUniqueWithoutFacilitiesInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							RoomUpdateManyWithWhereWithoutFacilitiesInputSchema
					),
					z
						.lazy(
							() =>
								RoomUpdateManyWithWhereWithoutFacilitiesInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => RoomScalarWhereInputSchema),
					z.lazy(() => RoomScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const RoomUncheckedUpdateManyWithoutFacilitiesNestedInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyWithoutFacilitiesNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutFacilitiesInputSchema),
					z
						.lazy(() => RoomCreateWithoutFacilitiesInputSchema)
						.array(),
					z.lazy(
						() => RoomUncheckedCreateWithoutFacilitiesInputSchema
					),
					z
						.lazy(
							() =>
								RoomUncheckedCreateWithoutFacilitiesInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => RoomCreateOrConnectWithoutFacilitiesInputSchema
					),
					z
						.lazy(
							() =>
								RoomCreateOrConnectWithoutFacilitiesInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							RoomUpsertWithWhereUniqueWithoutFacilitiesInputSchema
					),
					z
						.lazy(
							() =>
								RoomUpsertWithWhereUniqueWithoutFacilitiesInputSchema
						)
						.array(),
				])
				.optional(),
			set: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							RoomUpdateWithWhereUniqueWithoutFacilitiesInputSchema
					),
					z
						.lazy(
							() =>
								RoomUpdateWithWhereUniqueWithoutFacilitiesInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							RoomUpdateManyWithWhereWithoutFacilitiesInputSchema
					),
					z
						.lazy(
							() =>
								RoomUpdateManyWithWhereWithoutFacilitiesInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => RoomScalarWhereInputSchema),
					z.lazy(() => RoomScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
	.object({
		equals: z.string().optional(),
		in: z.union([z.string().array(), z.string()]).optional(),
		notIn: z.union([z.string().array(), z.string()]).optional(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		not: z
			.union([z.string(), z.lazy(() => NestedStringFilterSchema)])
			.optional(),
	})
	.strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
	z
		.object({
			equals: z.coerce.date().optional(),
			in: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
			notIn: z
				.union([z.coerce.date().array(), z.coerce.date()])
				.optional(),
			lt: z.coerce.date().optional(),
			lte: z.coerce.date().optional(),
			gt: z.coerce.date().optional(),
			gte: z.coerce.date().optional(),
			not: z
				.union([
					z.coerce.date(),
					z.lazy(() => NestedDateTimeFilterSchema),
				])
				.optional(),
		})
		.strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
	z
		.object({
			equals: z.string().optional(),
			in: z.union([z.string().array(), z.string()]).optional(),
			notIn: z.union([z.string().array(), z.string()]).optional(),
			lt: z.string().optional(),
			lte: z.string().optional(),
			gt: z.string().optional(),
			gte: z.string().optional(),
			contains: z.string().optional(),
			startsWith: z.string().optional(),
			endsWith: z.string().optional(),
			not: z
				.union([
					z.string(),
					z.lazy(() => NestedStringWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedStringFilterSchema).optional(),
			_max: z.lazy(() => NestedStringFilterSchema).optional(),
		})
		.strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
	.object({
		equals: z.number().optional(),
		in: z.union([z.number().array(), z.number()]).optional(),
		notIn: z.union([z.number().array(), z.number()]).optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedIntFilterSchema)])
			.optional(),
	})
	.strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
	z
		.object({
			equals: z.coerce.date().optional(),
			in: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
			notIn: z
				.union([z.coerce.date().array(), z.coerce.date()])
				.optional(),
			lt: z.coerce.date().optional(),
			lte: z.coerce.date().optional(),
			gt: z.coerce.date().optional(),
			gte: z.coerce.date().optional(),
			not: z
				.union([
					z.coerce.date(),
					z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
			_max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
		})
		.strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
	z
		.object({
			equals: z.number().optional(),
			in: z.union([z.number().array(), z.number()]).optional(),
			notIn: z.union([z.number().array(), z.number()]).optional(),
			lt: z.number().optional(),
			lte: z.number().optional(),
			gt: z.number().optional(),
			gte: z.number().optional(),
			not: z
				.union([
					z.number(),
					z.lazy(() => NestedIntWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_avg: z.lazy(() => NestedFloatFilterSchema).optional(),
			_sum: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedIntFilterSchema).optional(),
			_max: z.lazy(() => NestedIntFilterSchema).optional(),
		})
		.strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
	.object({
		equals: z.number().optional(),
		in: z.union([z.number().array(), z.number()]).optional(),
		notIn: z.union([z.number().array(), z.number()]).optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
			.optional(),
	})
	.strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> =
	z
		.object({
			equals: z.number().optional(),
			in: z.union([z.number().array(), z.number()]).optional(),
			notIn: z.union([z.number().array(), z.number()]).optional(),
			lt: z.number().optional(),
			lte: z.number().optional(),
			gt: z.number().optional(),
			gte: z.number().optional(),
			not: z
				.union([
					z.number(),
					z.lazy(() => NestedFloatWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_avg: z.lazy(() => NestedFloatFilterSchema).optional(),
			_sum: z.lazy(() => NestedFloatFilterSchema).optional(),
			_min: z.lazy(() => NestedFloatFilterSchema).optional(),
			_max: z.lazy(() => NestedFloatFilterSchema).optional(),
		})
		.strict();

export const NestedEnumCategoryFilterSchema: z.ZodType<Prisma.NestedEnumCategoryFilter> =
	z
		.object({
			equals: z.lazy(() => CategorySchema).optional(),
			in: z
				.union([
					z.lazy(() => CategorySchema).array(),
					z.lazy(() => CategorySchema),
				])
				.optional(),
			notIn: z
				.union([
					z.lazy(() => CategorySchema).array(),
					z.lazy(() => CategorySchema),
				])
				.optional(),
			not: z
				.union([
					z.lazy(() => CategorySchema),
					z.lazy(() => NestedEnumCategoryFilterSchema),
				])
				.optional(),
		})
		.strict();

export const NestedEnumIconFilterSchema: z.ZodType<Prisma.NestedEnumIconFilter> =
	z
		.object({
			equals: z.lazy(() => IconSchema).optional(),
			in: z
				.union([
					z.lazy(() => IconSchema).array(),
					z.lazy(() => IconSchema),
				])
				.optional(),
			notIn: z
				.union([
					z.lazy(() => IconSchema).array(),
					z.lazy(() => IconSchema),
				])
				.optional(),
			not: z
				.union([
					z.lazy(() => IconSchema),
					z.lazy(() => NestedEnumIconFilterSchema),
				])
				.optional(),
		})
		.strict();

export const NestedEnumCategoryWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumCategoryWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => CategorySchema).optional(),
			in: z
				.union([
					z.lazy(() => CategorySchema).array(),
					z.lazy(() => CategorySchema),
				])
				.optional(),
			notIn: z
				.union([
					z.lazy(() => CategorySchema).array(),
					z.lazy(() => CategorySchema),
				])
				.optional(),
			not: z
				.union([
					z.lazy(() => CategorySchema),
					z.lazy(() => NestedEnumCategoryWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumCategoryFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumCategoryFilterSchema).optional(),
		})
		.strict();

export const NestedEnumIconWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumIconWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => IconSchema).optional(),
			in: z
				.union([
					z.lazy(() => IconSchema).array(),
					z.lazy(() => IconSchema),
				])
				.optional(),
			notIn: z
				.union([
					z.lazy(() => IconSchema).array(),
					z.lazy(() => IconSchema),
				])
				.optional(),
			not: z
				.union([
					z.lazy(() => IconSchema),
					z.lazy(() => NestedEnumIconWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumIconFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumIconFilterSchema).optional(),
		})
		.strict();

export const PasswordCreateWithoutUserInputSchema: z.ZodType<Prisma.PasswordCreateWithoutUserInput> =
	z
		.object({
			hash: z.string(),
		})
		.strict();

export const PasswordUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PasswordUncheckedCreateWithoutUserInput> =
	z
		.object({
			hash: z.string(),
		})
		.strict();

export const PasswordCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PasswordCreateOrConnectWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => PasswordWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => PasswordCreateWithoutUserInputSchema),
				z.lazy(() => PasswordUncheckedCreateWithoutUserInputSchema),
			]),
		})
		.strict();

export const ReservationCreateWithoutUserInputSchema: z.ZodType<Prisma.ReservationCreateWithoutUserInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			price: z.number(),
			from: z.coerce.date(),
			to: z.coerce.date(),
			room: z.lazy(
				() => RoomCreateNestedOneWithoutReservationsInputSchema
			),
		})
		.strict();

export const ReservationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateWithoutUserInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			price: z.number(),
			from: z.coerce.date(),
			to: z.coerce.date(),
			roomId: z.string(),
		})
		.strict();

export const ReservationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReservationCreateOrConnectWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => ReservationWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => ReservationCreateWithoutUserInputSchema),
				z.lazy(() => ReservationUncheckedCreateWithoutUserInputSchema),
			]),
		})
		.strict();

export const ReservationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReservationCreateManyUserInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => ReservationCreateManyUserInputSchema),
				z.lazy(() => ReservationCreateManyUserInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const PropertyCreateWithoutOwnerInputSchema: z.ZodType<Prisma.PropertyCreateWithoutOwnerInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
			rooms: z
				.lazy(() => RoomCreateNestedManyWithoutHotelInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewCreateNestedManyWithoutPropertyInputSchema)
				.optional(),
		})
		.strict();

export const PropertyUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.PropertyUncheckedCreateWithoutOwnerInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
			rooms: z
				.lazy(
					() => RoomUncheckedCreateNestedManyWithoutHotelInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() =>
						ReviewUncheckedCreateNestedManyWithoutPropertyInputSchema
				)
				.optional(),
		})
		.strict();

export const PropertyCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.PropertyCreateOrConnectWithoutOwnerInput> =
	z
		.object({
			where: z.lazy(() => PropertyWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => PropertyCreateWithoutOwnerInputSchema),
				z.lazy(() => PropertyUncheckedCreateWithoutOwnerInputSchema),
			]),
		})
		.strict();

export const PropertyCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.PropertyCreateManyOwnerInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => PropertyCreateManyOwnerInputSchema),
				z.lazy(() => PropertyCreateManyOwnerInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const MessageCreateWithoutUserInputSchema: z.ZodType<Prisma.MessageCreateWithoutUserInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			content: z.string(),
			chat: z.lazy(() => ChatCreateNestedOneWithoutMessagesInputSchema),
		})
		.strict();

export const MessageUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutUserInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			content: z.string(),
			chatId: z.string(),
		})
		.strict();

export const MessageCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => MessageWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => MessageCreateWithoutUserInputSchema),
				z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema),
			]),
		})
		.strict();

export const MessageCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyUserInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => MessageCreateManyUserInputSchema),
				z.lazy(() => MessageCreateManyUserInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const ReviewCreateWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateWithoutUserInput> =
	z
		.object({
			id: z.string().uuid().optional(),
			rating: z.number().int().optional(),
			content: z.string(),
			createdAt: z.coerce.date().optional(),
			property: z.lazy(
				() => PropertyCreateNestedOneWithoutReviewsInputSchema
			),
		})
		.strict();

export const ReviewUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutUserInput> =
	z
		.object({
			id: z.string().uuid().optional(),
			rating: z.number().int().optional(),
			content: z.string(),
			createdAt: z.coerce.date().optional(),
			propertyId: z.string(),
		})
		.strict();

export const ReviewCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => ReviewWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => ReviewCreateWithoutUserInputSchema),
				z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),
			]),
		})
		.strict();

export const ReviewCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyUserInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => ReviewCreateManyUserInputSchema),
				z.lazy(() => ReviewCreateManyUserInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const ChatCreateWithoutParticipantsInputSchema: z.ZodType<Prisma.ChatCreateWithoutParticipantsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			messages: z
				.lazy(() => MessageCreateNestedManyWithoutChatInputSchema)
				.optional(),
		})
		.strict();

export const ChatUncheckedCreateWithoutParticipantsInputSchema: z.ZodType<Prisma.ChatUncheckedCreateWithoutParticipantsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			messages: z
				.lazy(
					() => MessageUncheckedCreateNestedManyWithoutChatInputSchema
				)
				.optional(),
		})
		.strict();

export const ChatCreateOrConnectWithoutParticipantsInputSchema: z.ZodType<Prisma.ChatCreateOrConnectWithoutParticipantsInput> =
	z
		.object({
			where: z.lazy(() => ChatWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => ChatCreateWithoutParticipantsInputSchema),
				z.lazy(() => ChatUncheckedCreateWithoutParticipantsInputSchema),
			]),
		})
		.strict();

export const PasswordUpsertWithoutUserInputSchema: z.ZodType<Prisma.PasswordUpsertWithoutUserInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => PasswordUpdateWithoutUserInputSchema),
				z.lazy(() => PasswordUncheckedUpdateWithoutUserInputSchema),
			]),
			create: z.union([
				z.lazy(() => PasswordCreateWithoutUserInputSchema),
				z.lazy(() => PasswordUncheckedCreateWithoutUserInputSchema),
			]),
		})
		.strict();

export const PasswordUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasswordUpdateWithoutUserInput> =
	z
		.object({
			hash: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const PasswordUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasswordUncheckedUpdateWithoutUserInput> =
	z
		.object({
			hash: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReservationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReservationUpsertWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => ReservationWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => ReservationUpdateWithoutUserInputSchema),
				z.lazy(() => ReservationUncheckedUpdateWithoutUserInputSchema),
			]),
			create: z.union([
				z.lazy(() => ReservationCreateWithoutUserInputSchema),
				z.lazy(() => ReservationUncheckedCreateWithoutUserInputSchema),
			]),
		})
		.strict();

export const ReservationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReservationUpdateWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => ReservationWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => ReservationUpdateWithoutUserInputSchema),
				z.lazy(() => ReservationUncheckedUpdateWithoutUserInputSchema),
			]),
		})
		.strict();

export const ReservationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ReservationUpdateManyWithWhereWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => ReservationScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => ReservationUpdateManyMutationInputSchema),
				z.lazy(
					() =>
						ReservationUncheckedUpdateManyWithoutReservationsInputSchema
				),
			]),
		})
		.strict();

export const ReservationScalarWhereInputSchema: z.ZodType<Prisma.ReservationScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => ReservationScalarWhereInputSchema),
					z.lazy(() => ReservationScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => ReservationScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => ReservationScalarWhereInputSchema),
					z.lazy(() => ReservationScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			price: z
				.union([z.lazy(() => FloatFilterSchema), z.number()])
				.optional(),
			from: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			to: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			roomId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			userId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const PropertyUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.PropertyUpsertWithWhereUniqueWithoutOwnerInput> =
	z
		.object({
			where: z.lazy(() => PropertyWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => PropertyUpdateWithoutOwnerInputSchema),
				z.lazy(() => PropertyUncheckedUpdateWithoutOwnerInputSchema),
			]),
			create: z.union([
				z.lazy(() => PropertyCreateWithoutOwnerInputSchema),
				z.lazy(() => PropertyUncheckedCreateWithoutOwnerInputSchema),
			]),
		})
		.strict();

export const PropertyUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.PropertyUpdateWithWhereUniqueWithoutOwnerInput> =
	z
		.object({
			where: z.lazy(() => PropertyWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => PropertyUpdateWithoutOwnerInputSchema),
				z.lazy(() => PropertyUncheckedUpdateWithoutOwnerInputSchema),
			]),
		})
		.strict();

export const PropertyUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.PropertyUpdateManyWithWhereWithoutOwnerInput> =
	z
		.object({
			where: z.lazy(() => PropertyScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => PropertyUpdateManyMutationInputSchema),
				z.lazy(
					() =>
						PropertyUncheckedUpdateManyWithoutPropertiesInputSchema
				),
			]),
		})
		.strict();

export const PropertyScalarWhereInputSchema: z.ZodType<Prisma.PropertyScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => PropertyScalarWhereInputSchema),
					z.lazy(() => PropertyScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => PropertyScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => PropertyScalarWhereInputSchema),
					z.lazy(() => PropertyScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			description: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			ownerId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const MessageUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => MessageWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => MessageUpdateWithoutUserInputSchema),
				z.lazy(() => MessageUncheckedUpdateWithoutUserInputSchema),
			]),
			create: z.union([
				z.lazy(() => MessageCreateWithoutUserInputSchema),
				z.lazy(() => MessageUncheckedCreateWithoutUserInputSchema),
			]),
		})
		.strict();

export const MessageUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => MessageWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => MessageUpdateWithoutUserInputSchema),
				z.lazy(() => MessageUncheckedUpdateWithoutUserInputSchema),
			]),
		})
		.strict();

export const MessageUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => MessageScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => MessageUpdateManyMutationInputSchema),
				z.lazy(
					() => MessageUncheckedUpdateManyWithoutMessagesInputSchema
				),
			]),
		})
		.strict();

export const MessageScalarWhereInputSchema: z.ZodType<Prisma.MessageScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => MessageScalarWhereInputSchema),
					z.lazy(() => MessageScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => MessageScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => MessageScalarWhereInputSchema),
					z.lazy(() => MessageScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			content: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			chatId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			userId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const ReviewUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => ReviewWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => ReviewUpdateWithoutUserInputSchema),
				z.lazy(() => ReviewUncheckedUpdateWithoutUserInputSchema),
			]),
			create: z.union([
				z.lazy(() => ReviewCreateWithoutUserInputSchema),
				z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),
			]),
		})
		.strict();

export const ReviewUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => ReviewWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => ReviewUpdateWithoutUserInputSchema),
				z.lazy(() => ReviewUncheckedUpdateWithoutUserInputSchema),
			]),
		})
		.strict();

export const ReviewUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => ReviewScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => ReviewUpdateManyMutationInputSchema),
				z.lazy(
					() => ReviewUncheckedUpdateManyWithoutReviewsInputSchema
				),
			]),
		})
		.strict();

export const ReviewScalarWhereInputSchema: z.ZodType<Prisma.ReviewScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => ReviewScalarWhereInputSchema),
					z.lazy(() => ReviewScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => ReviewScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => ReviewScalarWhereInputSchema),
					z.lazy(() => ReviewScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			rating: z
				.union([z.lazy(() => IntFilterSchema), z.number()])
				.optional(),
			content: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			propertyId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			userId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const ChatUpsertWithWhereUniqueWithoutParticipantsInputSchema: z.ZodType<Prisma.ChatUpsertWithWhereUniqueWithoutParticipantsInput> =
	z
		.object({
			where: z.lazy(() => ChatWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => ChatUpdateWithoutParticipantsInputSchema),
				z.lazy(() => ChatUncheckedUpdateWithoutParticipantsInputSchema),
			]),
			create: z.union([
				z.lazy(() => ChatCreateWithoutParticipantsInputSchema),
				z.lazy(() => ChatUncheckedCreateWithoutParticipantsInputSchema),
			]),
		})
		.strict();

export const ChatUpdateWithWhereUniqueWithoutParticipantsInputSchema: z.ZodType<Prisma.ChatUpdateWithWhereUniqueWithoutParticipantsInput> =
	z
		.object({
			where: z.lazy(() => ChatWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => ChatUpdateWithoutParticipantsInputSchema),
				z.lazy(() => ChatUncheckedUpdateWithoutParticipantsInputSchema),
			]),
		})
		.strict();

export const ChatUpdateManyWithWhereWithoutParticipantsInputSchema: z.ZodType<Prisma.ChatUpdateManyWithWhereWithoutParticipantsInput> =
	z
		.object({
			where: z.lazy(() => ChatScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => ChatUpdateManyMutationInputSchema),
				z.lazy(() => ChatUncheckedUpdateManyWithoutChatInputSchema),
			]),
		})
		.strict();

export const ChatScalarWhereInputSchema: z.ZodType<Prisma.ChatScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => ChatScalarWhereInputSchema),
					z.lazy(() => ChatScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => ChatScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => ChatScalarWhereInputSchema),
					z.lazy(() => ChatScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const UserCreateWithoutPasswordInputSchema: z.ZodType<Prisma.UserCreateWithoutPasswordInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string(),
			roles: z
				.union([
					z.lazy(() => UserCreaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z.string(),
			lname: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			reservations: z
				.lazy(() => ReservationCreateNestedManyWithoutUserInputSchema)
				.optional(),
			properties: z
				.lazy(() => PropertyCreateNestedManyWithoutOwnerInputSchema)
				.optional(),
			messages: z
				.lazy(() => MessageCreateNestedManyWithoutUserInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema)
				.optional(),
			Chat: z
				.lazy(() => ChatCreateNestedManyWithoutParticipantsInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedCreateWithoutPasswordInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPasswordInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string(),
			roles: z
				.union([
					z.lazy(() => UserCreaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z.string(),
			lname: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			properties: z
				.lazy(
					() =>
						PropertyUncheckedCreateNestedManyWithoutOwnerInputSchema
				)
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			Chat: z
				.lazy(
					() =>
						ChatUncheckedCreateNestedManyWithoutParticipantsInputSchema
				)
				.optional(),
		})
		.strict();

export const UserCreateOrConnectWithoutPasswordInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPasswordInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutPasswordInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutPasswordInputSchema),
			]),
		})
		.strict();

export const UserUpsertWithoutPasswordInputSchema: z.ZodType<Prisma.UserUpsertWithoutPasswordInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutPasswordInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutPasswordInputSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutPasswordInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutPasswordInputSchema),
			]),
		})
		.strict();

export const UserUpdateWithoutPasswordInputSchema: z.ZodType<Prisma.UserUpdateWithoutPasswordInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			reservations: z
				.lazy(() => ReservationUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			properties: z
				.lazy(() => PropertyUpdateManyWithoutOwnerNestedInputSchema)
				.optional(),
			messages: z
				.lazy(() => MessageUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			Chat: z
				.lazy(() => ChatUpdateManyWithoutParticipantsNestedInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateWithoutPasswordInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPasswordInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			properties: z
				.lazy(
					() =>
						PropertyUncheckedUpdateManyWithoutOwnerNestedInputSchema
				)
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			Chat: z
				.lazy(
					() =>
						ChatUncheckedUpdateManyWithoutParticipantsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const MessageCreateWithoutChatInputSchema: z.ZodType<Prisma.MessageCreateWithoutChatInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			content: z.string(),
			User: z.lazy(() => UserCreateNestedOneWithoutMessagesInputSchema),
		})
		.strict();

export const MessageUncheckedCreateWithoutChatInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutChatInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			content: z.string(),
			userId: z.string(),
		})
		.strict();

export const MessageCreateOrConnectWithoutChatInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutChatInput> =
	z
		.object({
			where: z.lazy(() => MessageWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => MessageCreateWithoutChatInputSchema),
				z.lazy(() => MessageUncheckedCreateWithoutChatInputSchema),
			]),
		})
		.strict();

export const MessageCreateManyChatInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyChatInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => MessageCreateManyChatInputSchema),
				z.lazy(() => MessageCreateManyChatInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const UserCreateWithoutChatInputSchema: z.ZodType<Prisma.UserCreateWithoutChatInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string(),
			roles: z
				.union([
					z.lazy(() => UserCreaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z.string(),
			lname: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			password: z
				.lazy(() => PasswordCreateNestedOneWithoutUserInputSchema)
				.optional(),
			reservations: z
				.lazy(() => ReservationCreateNestedManyWithoutUserInputSchema)
				.optional(),
			properties: z
				.lazy(() => PropertyCreateNestedManyWithoutOwnerInputSchema)
				.optional(),
			messages: z
				.lazy(() => MessageCreateNestedManyWithoutUserInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedCreateWithoutChatInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutChatInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string(),
			roles: z
				.union([
					z.lazy(() => UserCreaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z.string(),
			lname: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			password: z
				.lazy(
					() => PasswordUncheckedCreateNestedOneWithoutUserInputSchema
				)
				.optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			properties: z
				.lazy(
					() =>
						PropertyUncheckedCreateNestedManyWithoutOwnerInputSchema
				)
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
		})
		.strict();

export const UserCreateOrConnectWithoutChatInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutChatInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutChatInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutChatInputSchema),
			]),
		})
		.strict();

export const MessageUpsertWithWhereUniqueWithoutChatInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutChatInput> =
	z
		.object({
			where: z.lazy(() => MessageWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => MessageUpdateWithoutChatInputSchema),
				z.lazy(() => MessageUncheckedUpdateWithoutChatInputSchema),
			]),
			create: z.union([
				z.lazy(() => MessageCreateWithoutChatInputSchema),
				z.lazy(() => MessageUncheckedCreateWithoutChatInputSchema),
			]),
		})
		.strict();

export const MessageUpdateWithWhereUniqueWithoutChatInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutChatInput> =
	z
		.object({
			where: z.lazy(() => MessageWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => MessageUpdateWithoutChatInputSchema),
				z.lazy(() => MessageUncheckedUpdateWithoutChatInputSchema),
			]),
		})
		.strict();

export const MessageUpdateManyWithWhereWithoutChatInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutChatInput> =
	z
		.object({
			where: z.lazy(() => MessageScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => MessageUpdateManyMutationInputSchema),
				z.lazy(
					() => MessageUncheckedUpdateManyWithoutMessagesInputSchema
				),
			]),
		})
		.strict();

export const UserUpsertWithWhereUniqueWithoutChatInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutChatInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => UserUpdateWithoutChatInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutChatInputSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutChatInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutChatInputSchema),
			]),
		})
		.strict();

export const UserUpdateWithWhereUniqueWithoutChatInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutChatInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => UserUpdateWithoutChatInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutChatInputSchema),
			]),
		})
		.strict();

export const UserUpdateManyWithWhereWithoutChatInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutChatInput> =
	z
		.object({
			where: z.lazy(() => UserScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => UserUpdateManyMutationInputSchema),
				z.lazy(
					() => UserUncheckedUpdateManyWithoutParticipantsInputSchema
				),
			]),
		})
		.strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => UserScalarWhereInputSchema),
					z.lazy(() => UserScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => UserScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => UserScalarWhereInputSchema),
					z.lazy(() => UserScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			email: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			roles: z.lazy(() => EnumRoleNullableListFilterSchema).optional(),
			fname: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			lname: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
		})
		.strict();

export const ChatCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ChatCreateWithoutMessagesInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			participants: z
				.lazy(() => UserCreateNestedManyWithoutChatInputSchema)
				.optional(),
		})
		.strict();

export const ChatUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ChatUncheckedCreateWithoutMessagesInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			participants: z
				.lazy(() => UserUncheckedCreateNestedManyWithoutChatInputSchema)
				.optional(),
		})
		.strict();

export const ChatCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.ChatCreateOrConnectWithoutMessagesInput> =
	z
		.object({
			where: z.lazy(() => ChatWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => ChatCreateWithoutMessagesInputSchema),
				z.lazy(() => ChatUncheckedCreateWithoutMessagesInputSchema),
			]),
		})
		.strict();

export const UserCreateWithoutMessagesInputSchema: z.ZodType<Prisma.UserCreateWithoutMessagesInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string(),
			roles: z
				.union([
					z.lazy(() => UserCreaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z.string(),
			lname: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			password: z
				.lazy(() => PasswordCreateNestedOneWithoutUserInputSchema)
				.optional(),
			reservations: z
				.lazy(() => ReservationCreateNestedManyWithoutUserInputSchema)
				.optional(),
			properties: z
				.lazy(() => PropertyCreateNestedManyWithoutOwnerInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema)
				.optional(),
			Chat: z
				.lazy(() => ChatCreateNestedManyWithoutParticipantsInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMessagesInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string(),
			roles: z
				.union([
					z.lazy(() => UserCreaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z.string(),
			lname: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			password: z
				.lazy(
					() => PasswordUncheckedCreateNestedOneWithoutUserInputSchema
				)
				.optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			properties: z
				.lazy(
					() =>
						PropertyUncheckedCreateNestedManyWithoutOwnerInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			Chat: z
				.lazy(
					() =>
						ChatUncheckedCreateNestedManyWithoutParticipantsInputSchema
				)
				.optional(),
		})
		.strict();

export const UserCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMessagesInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutMessagesInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutMessagesInputSchema),
			]),
		})
		.strict();

export const ChatUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.ChatUpsertWithoutMessagesInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => ChatUpdateWithoutMessagesInputSchema),
				z.lazy(() => ChatUncheckedUpdateWithoutMessagesInputSchema),
			]),
			create: z.union([
				z.lazy(() => ChatCreateWithoutMessagesInputSchema),
				z.lazy(() => ChatUncheckedCreateWithoutMessagesInputSchema),
			]),
		})
		.strict();

export const ChatUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ChatUpdateWithoutMessagesInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			participants: z
				.lazy(() => UserUpdateManyWithoutChatNestedInputSchema)
				.optional(),
		})
		.strict();

export const ChatUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateWithoutMessagesInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			participants: z
				.lazy(() => UserUncheckedUpdateManyWithoutChatNestedInputSchema)
				.optional(),
		})
		.strict();

export const UserUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.UserUpsertWithoutMessagesInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutMessagesInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutMessagesInputSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutMessagesInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutMessagesInputSchema),
			]),
		})
		.strict();

export const UserUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.UserUpdateWithoutMessagesInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			password: z
				.lazy(() => PasswordUpdateOneWithoutUserNestedInputSchema)
				.optional(),
			reservations: z
				.lazy(() => ReservationUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			properties: z
				.lazy(() => PropertyUpdateManyWithoutOwnerNestedInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			Chat: z
				.lazy(() => ChatUpdateManyWithoutParticipantsNestedInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMessagesInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			password: z
				.lazy(
					() => PasswordUncheckedUpdateOneWithoutUserNestedInputSchema
				)
				.optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			properties: z
				.lazy(
					() =>
						PropertyUncheckedUpdateManyWithoutOwnerNestedInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			Chat: z
				.lazy(
					() =>
						ChatUncheckedUpdateManyWithoutParticipantsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const PropertyCreateWithoutReviewsInputSchema: z.ZodType<Prisma.PropertyCreateWithoutReviewsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
			owner: z.lazy(
				() => UserCreateNestedOneWithoutPropertiesInputSchema
			),
			rooms: z
				.lazy(() => RoomCreateNestedManyWithoutHotelInputSchema)
				.optional(),
		})
		.strict();

export const PropertyUncheckedCreateWithoutReviewsInputSchema: z.ZodType<Prisma.PropertyUncheckedCreateWithoutReviewsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
			ownerId: z.string(),
			rooms: z
				.lazy(
					() => RoomUncheckedCreateNestedManyWithoutHotelInputSchema
				)
				.optional(),
		})
		.strict();

export const PropertyCreateOrConnectWithoutReviewsInputSchema: z.ZodType<Prisma.PropertyCreateOrConnectWithoutReviewsInput> =
	z
		.object({
			where: z.lazy(() => PropertyWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => PropertyCreateWithoutReviewsInputSchema),
				z.lazy(() => PropertyUncheckedCreateWithoutReviewsInputSchema),
			]),
		})
		.strict();

export const UserCreateWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateWithoutReviewsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string(),
			roles: z
				.union([
					z.lazy(() => UserCreaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z.string(),
			lname: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			password: z
				.lazy(() => PasswordCreateNestedOneWithoutUserInputSchema)
				.optional(),
			reservations: z
				.lazy(() => ReservationCreateNestedManyWithoutUserInputSchema)
				.optional(),
			properties: z
				.lazy(() => PropertyCreateNestedManyWithoutOwnerInputSchema)
				.optional(),
			messages: z
				.lazy(() => MessageCreateNestedManyWithoutUserInputSchema)
				.optional(),
			Chat: z
				.lazy(() => ChatCreateNestedManyWithoutParticipantsInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedCreateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReviewsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string(),
			roles: z
				.union([
					z.lazy(() => UserCreaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z.string(),
			lname: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			password: z
				.lazy(
					() => PasswordUncheckedCreateNestedOneWithoutUserInputSchema
				)
				.optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			properties: z
				.lazy(
					() =>
						PropertyUncheckedCreateNestedManyWithoutOwnerInputSchema
				)
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			Chat: z
				.lazy(
					() =>
						ChatUncheckedCreateNestedManyWithoutParticipantsInputSchema
				)
				.optional(),
		})
		.strict();

export const UserCreateOrConnectWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReviewsInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutReviewsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema),
			]),
		})
		.strict();

export const PropertyUpsertWithoutReviewsInputSchema: z.ZodType<Prisma.PropertyUpsertWithoutReviewsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => PropertyUpdateWithoutReviewsInputSchema),
				z.lazy(() => PropertyUncheckedUpdateWithoutReviewsInputSchema),
			]),
			create: z.union([
				z.lazy(() => PropertyCreateWithoutReviewsInputSchema),
				z.lazy(() => PropertyUncheckedCreateWithoutReviewsInputSchema),
			]),
		})
		.strict();

export const PropertyUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.PropertyUpdateWithoutReviewsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			owner: z
				.lazy(
					() =>
						UserUpdateOneRequiredWithoutPropertiesNestedInputSchema
				)
				.optional(),
			rooms: z
				.lazy(() => RoomUpdateManyWithoutHotelNestedInputSchema)
				.optional(),
		})
		.strict();

export const PropertyUncheckedUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.PropertyUncheckedUpdateWithoutReviewsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			ownerId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rooms: z
				.lazy(
					() => RoomUncheckedUpdateManyWithoutHotelNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const UserUpsertWithoutReviewsInputSchema: z.ZodType<Prisma.UserUpsertWithoutReviewsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutReviewsInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutReviewsInputSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutReviewsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema),
			]),
		})
		.strict();

export const UserUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUpdateWithoutReviewsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			password: z
				.lazy(() => PasswordUpdateOneWithoutUserNestedInputSchema)
				.optional(),
			reservations: z
				.lazy(() => ReservationUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			properties: z
				.lazy(() => PropertyUpdateManyWithoutOwnerNestedInputSchema)
				.optional(),
			messages: z
				.lazy(() => MessageUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			Chat: z
				.lazy(() => ChatUpdateManyWithoutParticipantsNestedInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReviewsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			password: z
				.lazy(
					() => PasswordUncheckedUpdateOneWithoutUserNestedInputSchema
				)
				.optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			properties: z
				.lazy(
					() =>
						PropertyUncheckedUpdateManyWithoutOwnerNestedInputSchema
				)
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			Chat: z
				.lazy(
					() =>
						ChatUncheckedUpdateManyWithoutParticipantsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const RoomCreateWithoutReservationsInputSchema: z.ZodType<Prisma.RoomCreateWithoutReservationsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			quantity: z.number().int(),
			maxGuests: z.number().int(),
			price: z.number(),
			hotel: z.lazy(() => PropertyCreateNestedOneWithoutRoomsInputSchema),
			facilities: z
				.lazy(() => FacilityCreateNestedManyWithoutRoomsInputSchema)
				.optional(),
		})
		.strict();

export const RoomUncheckedCreateWithoutReservationsInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutReservationsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			quantity: z.number().int(),
			maxGuests: z.number().int(),
			price: z.number(),
			hotelId: z.string(),
			facilities: z
				.lazy(
					() =>
						FacilityUncheckedCreateNestedManyWithoutRoomsInputSchema
				)
				.optional(),
		})
		.strict();

export const RoomCreateOrConnectWithoutReservationsInputSchema: z.ZodType<Prisma.RoomCreateOrConnectWithoutReservationsInput> =
	z
		.object({
			where: z.lazy(() => RoomWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => RoomCreateWithoutReservationsInputSchema),
				z.lazy(() => RoomUncheckedCreateWithoutReservationsInputSchema),
			]),
		})
		.strict();

export const UserCreateWithoutReservationsInputSchema: z.ZodType<Prisma.UserCreateWithoutReservationsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string(),
			roles: z
				.union([
					z.lazy(() => UserCreaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z.string(),
			lname: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			password: z
				.lazy(() => PasswordCreateNestedOneWithoutUserInputSchema)
				.optional(),
			properties: z
				.lazy(() => PropertyCreateNestedManyWithoutOwnerInputSchema)
				.optional(),
			messages: z
				.lazy(() => MessageCreateNestedManyWithoutUserInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema)
				.optional(),
			Chat: z
				.lazy(() => ChatCreateNestedManyWithoutParticipantsInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedCreateWithoutReservationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReservationsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string(),
			roles: z
				.union([
					z.lazy(() => UserCreaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z.string(),
			lname: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			password: z
				.lazy(
					() => PasswordUncheckedCreateNestedOneWithoutUserInputSchema
				)
				.optional(),
			properties: z
				.lazy(
					() =>
						PropertyUncheckedCreateNestedManyWithoutOwnerInputSchema
				)
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			Chat: z
				.lazy(
					() =>
						ChatUncheckedCreateNestedManyWithoutParticipantsInputSchema
				)
				.optional(),
		})
		.strict();

export const UserCreateOrConnectWithoutReservationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReservationsInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutReservationsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutReservationsInputSchema),
			]),
		})
		.strict();

export const RoomUpsertWithoutReservationsInputSchema: z.ZodType<Prisma.RoomUpsertWithoutReservationsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => RoomUpdateWithoutReservationsInputSchema),
				z.lazy(() => RoomUncheckedUpdateWithoutReservationsInputSchema),
			]),
			create: z.union([
				z.lazy(() => RoomCreateWithoutReservationsInputSchema),
				z.lazy(() => RoomUncheckedCreateWithoutReservationsInputSchema),
			]),
		})
		.strict();

export const RoomUpdateWithoutReservationsInputSchema: z.ZodType<Prisma.RoomUpdateWithoutReservationsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			quantity: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			maxGuests: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			hotel: z
				.lazy(
					() => PropertyUpdateOneRequiredWithoutRoomsNestedInputSchema
				)
				.optional(),
			facilities: z
				.lazy(() => FacilityUpdateManyWithoutRoomsNestedInputSchema)
				.optional(),
		})
		.strict();

export const RoomUncheckedUpdateWithoutReservationsInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateWithoutReservationsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			quantity: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			maxGuests: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			hotelId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			facilities: z
				.lazy(
					() =>
						FacilityUncheckedUpdateManyWithoutRoomsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const UserUpsertWithoutReservationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutReservationsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutReservationsInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutReservationsInputSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutReservationsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutReservationsInputSchema),
			]),
		})
		.strict();

export const UserUpdateWithoutReservationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutReservationsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			password: z
				.lazy(() => PasswordUpdateOneWithoutUserNestedInputSchema)
				.optional(),
			properties: z
				.lazy(() => PropertyUpdateManyWithoutOwnerNestedInputSchema)
				.optional(),
			messages: z
				.lazy(() => MessageUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			Chat: z
				.lazy(() => ChatUpdateManyWithoutParticipantsNestedInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateWithoutReservationsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReservationsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			password: z
				.lazy(
					() => PasswordUncheckedUpdateOneWithoutUserNestedInputSchema
				)
				.optional(),
			properties: z
				.lazy(
					() =>
						PropertyUncheckedUpdateManyWithoutOwnerNestedInputSchema
				)
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			Chat: z
				.lazy(
					() =>
						ChatUncheckedUpdateManyWithoutParticipantsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const UserCreateWithoutPropertiesInputSchema: z.ZodType<Prisma.UserCreateWithoutPropertiesInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string(),
			roles: z
				.union([
					z.lazy(() => UserCreaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z.string(),
			lname: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			password: z
				.lazy(() => PasswordCreateNestedOneWithoutUserInputSchema)
				.optional(),
			reservations: z
				.lazy(() => ReservationCreateNestedManyWithoutUserInputSchema)
				.optional(),
			messages: z
				.lazy(() => MessageCreateNestedManyWithoutUserInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema)
				.optional(),
			Chat: z
				.lazy(() => ChatCreateNestedManyWithoutParticipantsInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedCreateWithoutPropertiesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPropertiesInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			email: z.string(),
			roles: z
				.union([
					z.lazy(() => UserCreaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z.string(),
			lname: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			password: z
				.lazy(
					() => PasswordUncheckedCreateNestedOneWithoutUserInputSchema
				)
				.optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema
				)
				.optional(),
			Chat: z
				.lazy(
					() =>
						ChatUncheckedCreateNestedManyWithoutParticipantsInputSchema
				)
				.optional(),
		})
		.strict();

export const UserCreateOrConnectWithoutPropertiesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPropertiesInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutPropertiesInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutPropertiesInputSchema),
			]),
		})
		.strict();

export const RoomCreateWithoutHotelInputSchema: z.ZodType<Prisma.RoomCreateWithoutHotelInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			quantity: z.number().int(),
			maxGuests: z.number().int(),
			price: z.number(),
			reservations: z
				.lazy(() => ReservationCreateNestedManyWithoutRoomInputSchema)
				.optional(),
			facilities: z
				.lazy(() => FacilityCreateNestedManyWithoutRoomsInputSchema)
				.optional(),
		})
		.strict();

export const RoomUncheckedCreateWithoutHotelInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutHotelInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			quantity: z.number().int(),
			maxGuests: z.number().int(),
			price: z.number(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedCreateNestedManyWithoutRoomInputSchema
				)
				.optional(),
			facilities: z
				.lazy(
					() =>
						FacilityUncheckedCreateNestedManyWithoutRoomsInputSchema
				)
				.optional(),
		})
		.strict();

export const RoomCreateOrConnectWithoutHotelInputSchema: z.ZodType<Prisma.RoomCreateOrConnectWithoutHotelInput> =
	z
		.object({
			where: z.lazy(() => RoomWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => RoomCreateWithoutHotelInputSchema),
				z.lazy(() => RoomUncheckedCreateWithoutHotelInputSchema),
			]),
		})
		.strict();

export const RoomCreateManyHotelInputEnvelopeSchema: z.ZodType<Prisma.RoomCreateManyHotelInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => RoomCreateManyHotelInputSchema),
				z.lazy(() => RoomCreateManyHotelInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const ReviewCreateWithoutPropertyInputSchema: z.ZodType<Prisma.ReviewCreateWithoutPropertyInput> =
	z
		.object({
			id: z.string().uuid().optional(),
			rating: z.number().int().optional(),
			content: z.string(),
			createdAt: z.coerce.date().optional(),
			user: z.lazy(() => UserCreateNestedOneWithoutReviewsInputSchema),
		})
		.strict();

export const ReviewUncheckedCreateWithoutPropertyInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutPropertyInput> =
	z
		.object({
			id: z.string().uuid().optional(),
			rating: z.number().int().optional(),
			content: z.string(),
			createdAt: z.coerce.date().optional(),
			userId: z.string(),
		})
		.strict();

export const ReviewCreateOrConnectWithoutPropertyInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutPropertyInput> =
	z
		.object({
			where: z.lazy(() => ReviewWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => ReviewCreateWithoutPropertyInputSchema),
				z.lazy(() => ReviewUncheckedCreateWithoutPropertyInputSchema),
			]),
		})
		.strict();

export const ReviewCreateManyPropertyInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyPropertyInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => ReviewCreateManyPropertyInputSchema),
				z.lazy(() => ReviewCreateManyPropertyInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const UserUpsertWithoutPropertiesInputSchema: z.ZodType<Prisma.UserUpsertWithoutPropertiesInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutPropertiesInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutPropertiesInputSchema),
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutPropertiesInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutPropertiesInputSchema),
			]),
		})
		.strict();

export const UserUpdateWithoutPropertiesInputSchema: z.ZodType<Prisma.UserUpdateWithoutPropertiesInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			password: z
				.lazy(() => PasswordUpdateOneWithoutUserNestedInputSchema)
				.optional(),
			reservations: z
				.lazy(() => ReservationUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			messages: z
				.lazy(() => MessageUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			Chat: z
				.lazy(() => ChatUpdateManyWithoutParticipantsNestedInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateWithoutPropertiesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPropertiesInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			password: z
				.lazy(
					() => PasswordUncheckedUpdateOneWithoutUserNestedInputSchema
				)
				.optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			Chat: z
				.lazy(
					() =>
						ChatUncheckedUpdateManyWithoutParticipantsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const RoomUpsertWithWhereUniqueWithoutHotelInputSchema: z.ZodType<Prisma.RoomUpsertWithWhereUniqueWithoutHotelInput> =
	z
		.object({
			where: z.lazy(() => RoomWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => RoomUpdateWithoutHotelInputSchema),
				z.lazy(() => RoomUncheckedUpdateWithoutHotelInputSchema),
			]),
			create: z.union([
				z.lazy(() => RoomCreateWithoutHotelInputSchema),
				z.lazy(() => RoomUncheckedCreateWithoutHotelInputSchema),
			]),
		})
		.strict();

export const RoomUpdateWithWhereUniqueWithoutHotelInputSchema: z.ZodType<Prisma.RoomUpdateWithWhereUniqueWithoutHotelInput> =
	z
		.object({
			where: z.lazy(() => RoomWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => RoomUpdateWithoutHotelInputSchema),
				z.lazy(() => RoomUncheckedUpdateWithoutHotelInputSchema),
			]),
		})
		.strict();

export const RoomUpdateManyWithWhereWithoutHotelInputSchema: z.ZodType<Prisma.RoomUpdateManyWithWhereWithoutHotelInput> =
	z
		.object({
			where: z.lazy(() => RoomScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => RoomUpdateManyMutationInputSchema),
				z.lazy(() => RoomUncheckedUpdateManyWithoutRoomsInputSchema),
			]),
		})
		.strict();

export const RoomScalarWhereInputSchema: z.ZodType<Prisma.RoomScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => RoomScalarWhereInputSchema),
					z.lazy(() => RoomScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => RoomScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => RoomScalarWhereInputSchema),
					z.lazy(() => RoomScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			quantity: z
				.union([z.lazy(() => IntFilterSchema), z.number()])
				.optional(),
			maxGuests: z
				.union([z.lazy(() => IntFilterSchema), z.number()])
				.optional(),
			price: z
				.union([z.lazy(() => FloatFilterSchema), z.number()])
				.optional(),
			hotelId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
		})
		.strict();

export const ReviewUpsertWithWhereUniqueWithoutPropertyInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutPropertyInput> =
	z
		.object({
			where: z.lazy(() => ReviewWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => ReviewUpdateWithoutPropertyInputSchema),
				z.lazy(() => ReviewUncheckedUpdateWithoutPropertyInputSchema),
			]),
			create: z.union([
				z.lazy(() => ReviewCreateWithoutPropertyInputSchema),
				z.lazy(() => ReviewUncheckedCreateWithoutPropertyInputSchema),
			]),
		})
		.strict();

export const ReviewUpdateWithWhereUniqueWithoutPropertyInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutPropertyInput> =
	z
		.object({
			where: z.lazy(() => ReviewWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => ReviewUpdateWithoutPropertyInputSchema),
				z.lazy(() => ReviewUncheckedUpdateWithoutPropertyInputSchema),
			]),
		})
		.strict();

export const ReviewUpdateManyWithWhereWithoutPropertyInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutPropertyInput> =
	z
		.object({
			where: z.lazy(() => ReviewScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => ReviewUpdateManyMutationInputSchema),
				z.lazy(
					() => ReviewUncheckedUpdateManyWithoutReviewsInputSchema
				),
			]),
		})
		.strict();

export const PropertyCreateWithoutRoomsInputSchema: z.ZodType<Prisma.PropertyCreateWithoutRoomsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
			owner: z.lazy(
				() => UserCreateNestedOneWithoutPropertiesInputSchema
			),
			reviews: z
				.lazy(() => ReviewCreateNestedManyWithoutPropertyInputSchema)
				.optional(),
		})
		.strict();

export const PropertyUncheckedCreateWithoutRoomsInputSchema: z.ZodType<Prisma.PropertyUncheckedCreateWithoutRoomsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
			ownerId: z.string(),
			reviews: z
				.lazy(
					() =>
						ReviewUncheckedCreateNestedManyWithoutPropertyInputSchema
				)
				.optional(),
		})
		.strict();

export const PropertyCreateOrConnectWithoutRoomsInputSchema: z.ZodType<Prisma.PropertyCreateOrConnectWithoutRoomsInput> =
	z
		.object({
			where: z.lazy(() => PropertyWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => PropertyCreateWithoutRoomsInputSchema),
				z.lazy(() => PropertyUncheckedCreateWithoutRoomsInputSchema),
			]),
		})
		.strict();

export const ReservationCreateWithoutRoomInputSchema: z.ZodType<Prisma.ReservationCreateWithoutRoomInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			price: z.number(),
			from: z.coerce.date(),
			to: z.coerce.date(),
			user: z.lazy(
				() => UserCreateNestedOneWithoutReservationsInputSchema
			),
		})
		.strict();

export const ReservationUncheckedCreateWithoutRoomInputSchema: z.ZodType<Prisma.ReservationUncheckedCreateWithoutRoomInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			price: z.number(),
			from: z.coerce.date(),
			to: z.coerce.date(),
			userId: z.string(),
		})
		.strict();

export const ReservationCreateOrConnectWithoutRoomInputSchema: z.ZodType<Prisma.ReservationCreateOrConnectWithoutRoomInput> =
	z
		.object({
			where: z.lazy(() => ReservationWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => ReservationCreateWithoutRoomInputSchema),
				z.lazy(() => ReservationUncheckedCreateWithoutRoomInputSchema),
			]),
		})
		.strict();

export const ReservationCreateManyRoomInputEnvelopeSchema: z.ZodType<Prisma.ReservationCreateManyRoomInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => ReservationCreateManyRoomInputSchema),
				z.lazy(() => ReservationCreateManyRoomInputSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const FacilityCreateWithoutRoomsInputSchema: z.ZodType<Prisma.FacilityCreateWithoutRoomsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
			category: z.lazy(() => CategorySchema),
			icon: z.lazy(() => IconSchema),
		})
		.strict();

export const FacilityUncheckedCreateWithoutRoomsInputSchema: z.ZodType<Prisma.FacilityUncheckedCreateWithoutRoomsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
			category: z.lazy(() => CategorySchema),
			icon: z.lazy(() => IconSchema),
		})
		.strict();

export const FacilityCreateOrConnectWithoutRoomsInputSchema: z.ZodType<Prisma.FacilityCreateOrConnectWithoutRoomsInput> =
	z
		.object({
			where: z.lazy(() => FacilityWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => FacilityCreateWithoutRoomsInputSchema),
				z.lazy(() => FacilityUncheckedCreateWithoutRoomsInputSchema),
			]),
		})
		.strict();

export const PropertyUpsertWithoutRoomsInputSchema: z.ZodType<Prisma.PropertyUpsertWithoutRoomsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => PropertyUpdateWithoutRoomsInputSchema),
				z.lazy(() => PropertyUncheckedUpdateWithoutRoomsInputSchema),
			]),
			create: z.union([
				z.lazy(() => PropertyCreateWithoutRoomsInputSchema),
				z.lazy(() => PropertyUncheckedCreateWithoutRoomsInputSchema),
			]),
		})
		.strict();

export const PropertyUpdateWithoutRoomsInputSchema: z.ZodType<Prisma.PropertyUpdateWithoutRoomsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			owner: z
				.lazy(
					() =>
						UserUpdateOneRequiredWithoutPropertiesNestedInputSchema
				)
				.optional(),
			reviews: z
				.lazy(() => ReviewUpdateManyWithoutPropertyNestedInputSchema)
				.optional(),
		})
		.strict();

export const PropertyUncheckedUpdateWithoutRoomsInputSchema: z.ZodType<Prisma.PropertyUncheckedUpdateWithoutRoomsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			ownerId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			reviews: z
				.lazy(
					() =>
						ReviewUncheckedUpdateManyWithoutPropertyNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const ReservationUpsertWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.ReservationUpsertWithWhereUniqueWithoutRoomInput> =
	z
		.object({
			where: z.lazy(() => ReservationWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => ReservationUpdateWithoutRoomInputSchema),
				z.lazy(() => ReservationUncheckedUpdateWithoutRoomInputSchema),
			]),
			create: z.union([
				z.lazy(() => ReservationCreateWithoutRoomInputSchema),
				z.lazy(() => ReservationUncheckedCreateWithoutRoomInputSchema),
			]),
		})
		.strict();

export const ReservationUpdateWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.ReservationUpdateWithWhereUniqueWithoutRoomInput> =
	z
		.object({
			where: z.lazy(() => ReservationWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => ReservationUpdateWithoutRoomInputSchema),
				z.lazy(() => ReservationUncheckedUpdateWithoutRoomInputSchema),
			]),
		})
		.strict();

export const ReservationUpdateManyWithWhereWithoutRoomInputSchema: z.ZodType<Prisma.ReservationUpdateManyWithWhereWithoutRoomInput> =
	z
		.object({
			where: z.lazy(() => ReservationScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => ReservationUpdateManyMutationInputSchema),
				z.lazy(
					() =>
						ReservationUncheckedUpdateManyWithoutReservationsInputSchema
				),
			]),
		})
		.strict();

export const FacilityUpsertWithWhereUniqueWithoutRoomsInputSchema: z.ZodType<Prisma.FacilityUpsertWithWhereUniqueWithoutRoomsInput> =
	z
		.object({
			where: z.lazy(() => FacilityWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => FacilityUpdateWithoutRoomsInputSchema),
				z.lazy(() => FacilityUncheckedUpdateWithoutRoomsInputSchema),
			]),
			create: z.union([
				z.lazy(() => FacilityCreateWithoutRoomsInputSchema),
				z.lazy(() => FacilityUncheckedCreateWithoutRoomsInputSchema),
			]),
		})
		.strict();

export const FacilityUpdateWithWhereUniqueWithoutRoomsInputSchema: z.ZodType<Prisma.FacilityUpdateWithWhereUniqueWithoutRoomsInput> =
	z
		.object({
			where: z.lazy(() => FacilityWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => FacilityUpdateWithoutRoomsInputSchema),
				z.lazy(() => FacilityUncheckedUpdateWithoutRoomsInputSchema),
			]),
		})
		.strict();

export const FacilityUpdateManyWithWhereWithoutRoomsInputSchema: z.ZodType<Prisma.FacilityUpdateManyWithWhereWithoutRoomsInput> =
	z
		.object({
			where: z.lazy(() => FacilityScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => FacilityUpdateManyMutationInputSchema),
				z.lazy(
					() =>
						FacilityUncheckedUpdateManyWithoutFacilitiesInputSchema
				),
			]),
		})
		.strict();

export const FacilityScalarWhereInputSchema: z.ZodType<Prisma.FacilityScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => FacilityScalarWhereInputSchema),
					z.lazy(() => FacilityScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => FacilityScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => FacilityScalarWhereInputSchema),
					z.lazy(() => FacilityScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			description: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			category: z
				.union([
					z.lazy(() => EnumCategoryFilterSchema),
					z.lazy(() => CategorySchema),
				])
				.optional(),
			icon: z
				.union([
					z.lazy(() => EnumIconFilterSchema),
					z.lazy(() => IconSchema),
				])
				.optional(),
		})
		.strict();

export const RoomCreateWithoutFacilitiesInputSchema: z.ZodType<Prisma.RoomCreateWithoutFacilitiesInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			quantity: z.number().int(),
			maxGuests: z.number().int(),
			price: z.number(),
			hotel: z.lazy(() => PropertyCreateNestedOneWithoutRoomsInputSchema),
			reservations: z
				.lazy(() => ReservationCreateNestedManyWithoutRoomInputSchema)
				.optional(),
		})
		.strict();

export const RoomUncheckedCreateWithoutFacilitiesInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutFacilitiesInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			quantity: z.number().int(),
			maxGuests: z.number().int(),
			price: z.number(),
			hotelId: z.string(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedCreateNestedManyWithoutRoomInputSchema
				)
				.optional(),
		})
		.strict();

export const RoomCreateOrConnectWithoutFacilitiesInputSchema: z.ZodType<Prisma.RoomCreateOrConnectWithoutFacilitiesInput> =
	z
		.object({
			where: z.lazy(() => RoomWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => RoomCreateWithoutFacilitiesInputSchema),
				z.lazy(() => RoomUncheckedCreateWithoutFacilitiesInputSchema),
			]),
		})
		.strict();

export const RoomUpsertWithWhereUniqueWithoutFacilitiesInputSchema: z.ZodType<Prisma.RoomUpsertWithWhereUniqueWithoutFacilitiesInput> =
	z
		.object({
			where: z.lazy(() => RoomWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => RoomUpdateWithoutFacilitiesInputSchema),
				z.lazy(() => RoomUncheckedUpdateWithoutFacilitiesInputSchema),
			]),
			create: z.union([
				z.lazy(() => RoomCreateWithoutFacilitiesInputSchema),
				z.lazy(() => RoomUncheckedCreateWithoutFacilitiesInputSchema),
			]),
		})
		.strict();

export const RoomUpdateWithWhereUniqueWithoutFacilitiesInputSchema: z.ZodType<Prisma.RoomUpdateWithWhereUniqueWithoutFacilitiesInput> =
	z
		.object({
			where: z.lazy(() => RoomWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => RoomUpdateWithoutFacilitiesInputSchema),
				z.lazy(() => RoomUncheckedUpdateWithoutFacilitiesInputSchema),
			]),
		})
		.strict();

export const RoomUpdateManyWithWhereWithoutFacilitiesInputSchema: z.ZodType<Prisma.RoomUpdateManyWithWhereWithoutFacilitiesInput> =
	z
		.object({
			where: z.lazy(() => RoomScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => RoomUpdateManyMutationInputSchema),
				z.lazy(() => RoomUncheckedUpdateManyWithoutRoomsInputSchema),
			]),
		})
		.strict();

export const ReservationCreateManyUserInputSchema: z.ZodType<Prisma.ReservationCreateManyUserInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			price: z.number(),
			from: z.coerce.date(),
			to: z.coerce.date(),
			roomId: z.string(),
		})
		.strict();

export const PropertyCreateManyOwnerInputSchema: z.ZodType<Prisma.PropertyCreateManyOwnerInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			description: z.string(),
		})
		.strict();

export const MessageCreateManyUserInputSchema: z.ZodType<Prisma.MessageCreateManyUserInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			content: z.string(),
			chatId: z.string(),
		})
		.strict();

export const ReviewCreateManyUserInputSchema: z.ZodType<Prisma.ReviewCreateManyUserInput> =
	z
		.object({
			id: z.string().uuid().optional(),
			rating: z.number().int().optional(),
			content: z.string(),
			createdAt: z.coerce.date().optional(),
			propertyId: z.string(),
		})
		.strict();

export const ReservationUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReservationUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			from: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			to: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			room: z
				.lazy(
					() =>
						RoomUpdateOneRequiredWithoutReservationsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const ReservationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			from: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			to: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roomId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReservationUncheckedUpdateManyWithoutReservationsInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateManyWithoutReservationsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			from: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			to: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roomId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const PropertyUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.PropertyUpdateWithoutOwnerInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rooms: z
				.lazy(() => RoomUpdateManyWithoutHotelNestedInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewUpdateManyWithoutPropertyNestedInputSchema)
				.optional(),
		})
		.strict();

export const PropertyUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.PropertyUncheckedUpdateWithoutOwnerInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rooms: z
				.lazy(
					() => RoomUncheckedUpdateManyWithoutHotelNestedInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() =>
						ReviewUncheckedUpdateManyWithoutPropertyNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const PropertyUncheckedUpdateManyWithoutPropertiesInputSchema: z.ZodType<Prisma.PropertyUncheckedUpdateManyWithoutPropertiesInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const MessageUpdateWithoutUserInputSchema: z.ZodType<Prisma.MessageUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			chat: z
				.lazy(
					() => ChatUpdateOneRequiredWithoutMessagesNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const MessageUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			chatId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const MessageUncheckedUpdateManyWithoutMessagesInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutMessagesInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			chatId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReviewUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string().uuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rating: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			property: z
				.lazy(
					() =>
						PropertyUpdateOneRequiredWithoutReviewsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const ReviewUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([
					z.string().uuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rating: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			propertyId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReviewUncheckedUpdateManyWithoutReviewsInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutReviewsInput> =
	z
		.object({
			id: z
				.union([
					z.string().uuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rating: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			propertyId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ChatUpdateWithoutParticipantsInputSchema: z.ZodType<Prisma.ChatUpdateWithoutParticipantsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			messages: z
				.lazy(() => MessageUpdateManyWithoutChatNestedInputSchema)
				.optional(),
		})
		.strict();

export const ChatUncheckedUpdateWithoutParticipantsInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateWithoutParticipantsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedUpdateManyWithoutChatNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const ChatUncheckedUpdateManyWithoutChatInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateManyWithoutChatInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const MessageCreateManyChatInputSchema: z.ZodType<Prisma.MessageCreateManyChatInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			content: z.string(),
			userId: z.string(),
		})
		.strict();

export const MessageUpdateWithoutChatInputSchema: z.ZodType<Prisma.MessageUpdateWithoutChatInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			User: z
				.lazy(
					() => UserUpdateOneRequiredWithoutMessagesNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const MessageUncheckedUpdateWithoutChatInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutChatInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const UserUpdateWithoutChatInputSchema: z.ZodType<Prisma.UserUpdateWithoutChatInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			password: z
				.lazy(() => PasswordUpdateOneWithoutUserNestedInputSchema)
				.optional(),
			reservations: z
				.lazy(() => ReservationUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			properties: z
				.lazy(() => PropertyUpdateManyWithoutOwnerNestedInputSchema)
				.optional(),
			messages: z
				.lazy(() => MessageUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			reviews: z
				.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema)
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateWithoutChatInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutChatInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			password: z
				.lazy(
					() => PasswordUncheckedUpdateOneWithoutUserNestedInputSchema
				)
				.optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			properties: z
				.lazy(
					() =>
						PropertyUncheckedUpdateManyWithoutOwnerNestedInputSchema
				)
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
			reviews: z
				.lazy(
					() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const UserUncheckedUpdateManyWithoutParticipantsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutParticipantsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			roles: z
				.union([
					z.lazy(() => UserUpdaterolesInputSchema),
					z.lazy(() => RoleSchema).array(),
				])
				.optional(),
			fname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lname: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const RoomCreateManyHotelInputSchema: z.ZodType<Prisma.RoomCreateManyHotelInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			quantity: z.number().int(),
			maxGuests: z.number().int(),
			price: z.number(),
		})
		.strict();

export const ReviewCreateManyPropertyInputSchema: z.ZodType<Prisma.ReviewCreateManyPropertyInput> =
	z
		.object({
			id: z.string().uuid().optional(),
			rating: z.number().int().optional(),
			content: z.string(),
			createdAt: z.coerce.date().optional(),
			userId: z.string(),
		})
		.strict();

export const RoomUpdateWithoutHotelInputSchema: z.ZodType<Prisma.RoomUpdateWithoutHotelInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			quantity: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			maxGuests: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			reservations: z
				.lazy(() => ReservationUpdateManyWithoutRoomNestedInputSchema)
				.optional(),
			facilities: z
				.lazy(() => FacilityUpdateManyWithoutRoomsNestedInputSchema)
				.optional(),
		})
		.strict();

export const RoomUncheckedUpdateWithoutHotelInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateWithoutHotelInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			quantity: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			maxGuests: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedUpdateManyWithoutRoomNestedInputSchema
				)
				.optional(),
			facilities: z
				.lazy(
					() =>
						FacilityUncheckedUpdateManyWithoutRoomsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const RoomUncheckedUpdateManyWithoutRoomsInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyWithoutRoomsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			quantity: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			maxGuests: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReviewUpdateWithoutPropertyInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutPropertyInput> =
	z
		.object({
			id: z
				.union([
					z.string().uuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rating: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			user: z
				.lazy(
					() => UserUpdateOneRequiredWithoutReviewsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const ReviewUncheckedUpdateWithoutPropertyInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutPropertyInput> =
	z
		.object({
			id: z
				.union([
					z.string().uuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rating: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ReservationCreateManyRoomInputSchema: z.ZodType<Prisma.ReservationCreateManyRoomInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			price: z.number(),
			from: z.coerce.date(),
			to: z.coerce.date(),
			userId: z.string(),
		})
		.strict();

export const ReservationUpdateWithoutRoomInputSchema: z.ZodType<Prisma.ReservationUpdateWithoutRoomInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			from: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			to: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			user: z
				.lazy(
					() =>
						UserUpdateOneRequiredWithoutReservationsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const ReservationUncheckedUpdateWithoutRoomInputSchema: z.ZodType<Prisma.ReservationUncheckedUpdateWithoutRoomInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			from: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			to: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			userId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const FacilityUpdateWithoutRoomsInputSchema: z.ZodType<Prisma.FacilityUpdateWithoutRoomsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			category: z
				.union([
					z.lazy(() => CategorySchema),
					z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema),
				])
				.optional(),
			icon: z
				.union([
					z.lazy(() => IconSchema),
					z.lazy(() => EnumIconFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const FacilityUncheckedUpdateWithoutRoomsInputSchema: z.ZodType<Prisma.FacilityUncheckedUpdateWithoutRoomsInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			category: z
				.union([
					z.lazy(() => CategorySchema),
					z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema),
				])
				.optional(),
			icon: z
				.union([
					z.lazy(() => IconSchema),
					z.lazy(() => EnumIconFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const FacilityUncheckedUpdateManyWithoutFacilitiesInputSchema: z.ZodType<Prisma.FacilityUncheckedUpdateManyWithoutFacilitiesInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			category: z
				.union([
					z.lazy(() => CategorySchema),
					z.lazy(() => EnumCategoryFieldUpdateOperationsInputSchema),
				])
				.optional(),
			icon: z
				.union([
					z.lazy(() => IconSchema),
					z.lazy(() => EnumIconFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const RoomUpdateWithoutFacilitiesInputSchema: z.ZodType<Prisma.RoomUpdateWithoutFacilitiesInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			quantity: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			maxGuests: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			hotel: z
				.lazy(
					() => PropertyUpdateOneRequiredWithoutRoomsNestedInputSchema
				)
				.optional(),
			reservations: z
				.lazy(() => ReservationUpdateManyWithoutRoomNestedInputSchema)
				.optional(),
		})
		.strict();

export const RoomUncheckedUpdateWithoutFacilitiesInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateWithoutFacilitiesInput> =
	z
		.object({
			id: z
				.union([
					z.string().cuid(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			quantity: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			maxGuests: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			price: z
				.union([
					z.number(),
					z.lazy(() => FloatFieldUpdateOperationsInputSchema),
				])
				.optional(),
			hotelId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			reservations: z
				.lazy(
					() =>
						ReservationUncheckedUpdateManyWithoutRoomNestedInputSchema
				)
				.optional(),
		})
		.strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([
				UserOrderByWithRelationInputSchema.array(),
				UserOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				UserScalarFieldEnumSchema,
				UserScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
	z
		.object({
			select: UserSelectSchema.optional(),
			include: UserIncludeSchema.optional(),
			where: UserWhereInputSchema.optional(),
			orderBy: z
				.union([
					UserOrderByWithRelationInputSchema.array(),
					UserOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: UserWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					UserScalarFieldEnumSchema,
					UserScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([
				UserOrderByWithRelationInputSchema.array(),
				UserOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				UserScalarFieldEnumSchema,
				UserScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
	.object({
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([
				UserOrderByWithRelationInputSchema.array(),
				UserOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
	.object({
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([
				UserOrderByWithAggregationInputSchema.array(),
				UserOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: UserScalarFieldEnumSchema.array(),
		having: UserScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema,
	})
	.strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
	z
		.object({
			select: UserSelectSchema.optional(),
			include: UserIncludeSchema.optional(),
			where: UserWhereUniqueInputSchema,
		})
		.strict();

export const PasswordFindFirstArgsSchema: z.ZodType<Prisma.PasswordFindFirstArgs> =
	z
		.object({
			select: PasswordSelectSchema.optional(),
			include: PasswordIncludeSchema.optional(),
			where: PasswordWhereInputSchema.optional(),
			orderBy: z
				.union([
					PasswordOrderByWithRelationInputSchema.array(),
					PasswordOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PasswordWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					PasswordScalarFieldEnumSchema,
					PasswordScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const PasswordFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PasswordFindFirstOrThrowArgs> =
	z
		.object({
			select: PasswordSelectSchema.optional(),
			include: PasswordIncludeSchema.optional(),
			where: PasswordWhereInputSchema.optional(),
			orderBy: z
				.union([
					PasswordOrderByWithRelationInputSchema.array(),
					PasswordOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PasswordWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					PasswordScalarFieldEnumSchema,
					PasswordScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const PasswordFindManyArgsSchema: z.ZodType<Prisma.PasswordFindManyArgs> =
	z
		.object({
			select: PasswordSelectSchema.optional(),
			include: PasswordIncludeSchema.optional(),
			where: PasswordWhereInputSchema.optional(),
			orderBy: z
				.union([
					PasswordOrderByWithRelationInputSchema.array(),
					PasswordOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PasswordWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					PasswordScalarFieldEnumSchema,
					PasswordScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const PasswordAggregateArgsSchema: z.ZodType<Prisma.PasswordAggregateArgs> =
	z
		.object({
			where: PasswordWhereInputSchema.optional(),
			orderBy: z
				.union([
					PasswordOrderByWithRelationInputSchema.array(),
					PasswordOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PasswordWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const PasswordGroupByArgsSchema: z.ZodType<Prisma.PasswordGroupByArgs> =
	z
		.object({
			where: PasswordWhereInputSchema.optional(),
			orderBy: z
				.union([
					PasswordOrderByWithAggregationInputSchema.array(),
					PasswordOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: PasswordScalarFieldEnumSchema.array(),
			having: PasswordScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const PasswordFindUniqueArgsSchema: z.ZodType<Prisma.PasswordFindUniqueArgs> =
	z
		.object({
			select: PasswordSelectSchema.optional(),
			include: PasswordIncludeSchema.optional(),
			where: PasswordWhereUniqueInputSchema,
		})
		.strict();

export const PasswordFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PasswordFindUniqueOrThrowArgs> =
	z
		.object({
			select: PasswordSelectSchema.optional(),
			include: PasswordIncludeSchema.optional(),
			where: PasswordWhereUniqueInputSchema,
		})
		.strict();

export const ChatFindFirstArgsSchema: z.ZodType<Prisma.ChatFindFirstArgs> = z
	.object({
		select: ChatSelectSchema.optional(),
		include: ChatIncludeSchema.optional(),
		where: ChatWhereInputSchema.optional(),
		orderBy: z
			.union([
				ChatOrderByWithRelationInputSchema.array(),
				ChatOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: ChatWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				ChatScalarFieldEnumSchema,
				ChatScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const ChatFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChatFindFirstOrThrowArgs> =
	z
		.object({
			select: ChatSelectSchema.optional(),
			include: ChatIncludeSchema.optional(),
			where: ChatWhereInputSchema.optional(),
			orderBy: z
				.union([
					ChatOrderByWithRelationInputSchema.array(),
					ChatOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: ChatWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					ChatScalarFieldEnumSchema,
					ChatScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const ChatFindManyArgsSchema: z.ZodType<Prisma.ChatFindManyArgs> = z
	.object({
		select: ChatSelectSchema.optional(),
		include: ChatIncludeSchema.optional(),
		where: ChatWhereInputSchema.optional(),
		orderBy: z
			.union([
				ChatOrderByWithRelationInputSchema.array(),
				ChatOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: ChatWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				ChatScalarFieldEnumSchema,
				ChatScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const ChatAggregateArgsSchema: z.ZodType<Prisma.ChatAggregateArgs> = z
	.object({
		where: ChatWhereInputSchema.optional(),
		orderBy: z
			.union([
				ChatOrderByWithRelationInputSchema.array(),
				ChatOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: ChatWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const ChatGroupByArgsSchema: z.ZodType<Prisma.ChatGroupByArgs> = z
	.object({
		where: ChatWhereInputSchema.optional(),
		orderBy: z
			.union([
				ChatOrderByWithAggregationInputSchema.array(),
				ChatOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: ChatScalarFieldEnumSchema.array(),
		having: ChatScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const ChatFindUniqueArgsSchema: z.ZodType<Prisma.ChatFindUniqueArgs> = z
	.object({
		select: ChatSelectSchema.optional(),
		include: ChatIncludeSchema.optional(),
		where: ChatWhereUniqueInputSchema,
	})
	.strict();

export const ChatFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChatFindUniqueOrThrowArgs> =
	z
		.object({
			select: ChatSelectSchema.optional(),
			include: ChatIncludeSchema.optional(),
			where: ChatWhereUniqueInputSchema,
		})
		.strict();

export const MessageFindFirstArgsSchema: z.ZodType<Prisma.MessageFindFirstArgs> =
	z
		.object({
			select: MessageSelectSchema.optional(),
			include: MessageIncludeSchema.optional(),
			where: MessageWhereInputSchema.optional(),
			orderBy: z
				.union([
					MessageOrderByWithRelationInputSchema.array(),
					MessageOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: MessageWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					MessageScalarFieldEnumSchema,
					MessageScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const MessageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MessageFindFirstOrThrowArgs> =
	z
		.object({
			select: MessageSelectSchema.optional(),
			include: MessageIncludeSchema.optional(),
			where: MessageWhereInputSchema.optional(),
			orderBy: z
				.union([
					MessageOrderByWithRelationInputSchema.array(),
					MessageOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: MessageWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					MessageScalarFieldEnumSchema,
					MessageScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const MessageFindManyArgsSchema: z.ZodType<Prisma.MessageFindManyArgs> =
	z
		.object({
			select: MessageSelectSchema.optional(),
			include: MessageIncludeSchema.optional(),
			where: MessageWhereInputSchema.optional(),
			orderBy: z
				.union([
					MessageOrderByWithRelationInputSchema.array(),
					MessageOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: MessageWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					MessageScalarFieldEnumSchema,
					MessageScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const MessageAggregateArgsSchema: z.ZodType<Prisma.MessageAggregateArgs> =
	z
		.object({
			where: MessageWhereInputSchema.optional(),
			orderBy: z
				.union([
					MessageOrderByWithRelationInputSchema.array(),
					MessageOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: MessageWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const MessageGroupByArgsSchema: z.ZodType<Prisma.MessageGroupByArgs> = z
	.object({
		where: MessageWhereInputSchema.optional(),
		orderBy: z
			.union([
				MessageOrderByWithAggregationInputSchema.array(),
				MessageOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: MessageScalarFieldEnumSchema.array(),
		having: MessageScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const MessageFindUniqueArgsSchema: z.ZodType<Prisma.MessageFindUniqueArgs> =
	z
		.object({
			select: MessageSelectSchema.optional(),
			include: MessageIncludeSchema.optional(),
			where: MessageWhereUniqueInputSchema,
		})
		.strict();

export const MessageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MessageFindUniqueOrThrowArgs> =
	z
		.object({
			select: MessageSelectSchema.optional(),
			include: MessageIncludeSchema.optional(),
			where: MessageWhereUniqueInputSchema,
		})
		.strict();

export const ReviewFindFirstArgsSchema: z.ZodType<Prisma.ReviewFindFirstArgs> =
	z
		.object({
			select: ReviewSelectSchema.optional(),
			include: ReviewIncludeSchema.optional(),
			where: ReviewWhereInputSchema.optional(),
			orderBy: z
				.union([
					ReviewOrderByWithRelationInputSchema.array(),
					ReviewOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: ReviewWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					ReviewScalarFieldEnumSchema,
					ReviewScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const ReviewFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReviewFindFirstOrThrowArgs> =
	z
		.object({
			select: ReviewSelectSchema.optional(),
			include: ReviewIncludeSchema.optional(),
			where: ReviewWhereInputSchema.optional(),
			orderBy: z
				.union([
					ReviewOrderByWithRelationInputSchema.array(),
					ReviewOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: ReviewWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					ReviewScalarFieldEnumSchema,
					ReviewScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const ReviewFindManyArgsSchema: z.ZodType<Prisma.ReviewFindManyArgs> = z
	.object({
		select: ReviewSelectSchema.optional(),
		include: ReviewIncludeSchema.optional(),
		where: ReviewWhereInputSchema.optional(),
		orderBy: z
			.union([
				ReviewOrderByWithRelationInputSchema.array(),
				ReviewOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: ReviewWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				ReviewScalarFieldEnumSchema,
				ReviewScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const ReviewAggregateArgsSchema: z.ZodType<Prisma.ReviewAggregateArgs> =
	z
		.object({
			where: ReviewWhereInputSchema.optional(),
			orderBy: z
				.union([
					ReviewOrderByWithRelationInputSchema.array(),
					ReviewOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: ReviewWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const ReviewGroupByArgsSchema: z.ZodType<Prisma.ReviewGroupByArgs> = z
	.object({
		where: ReviewWhereInputSchema.optional(),
		orderBy: z
			.union([
				ReviewOrderByWithAggregationInputSchema.array(),
				ReviewOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: ReviewScalarFieldEnumSchema.array(),
		having: ReviewScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const ReviewFindUniqueArgsSchema: z.ZodType<Prisma.ReviewFindUniqueArgs> =
	z
		.object({
			select: ReviewSelectSchema.optional(),
			include: ReviewIncludeSchema.optional(),
			where: ReviewWhereUniqueInputSchema,
		})
		.strict();

export const ReviewFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReviewFindUniqueOrThrowArgs> =
	z
		.object({
			select: ReviewSelectSchema.optional(),
			include: ReviewIncludeSchema.optional(),
			where: ReviewWhereUniqueInputSchema,
		})
		.strict();

export const ReservationFindFirstArgsSchema: z.ZodType<Prisma.ReservationFindFirstArgs> =
	z
		.object({
			select: ReservationSelectSchema.optional(),
			include: ReservationIncludeSchema.optional(),
			where: ReservationWhereInputSchema.optional(),
			orderBy: z
				.union([
					ReservationOrderByWithRelationInputSchema.array(),
					ReservationOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: ReservationWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					ReservationScalarFieldEnumSchema,
					ReservationScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const ReservationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReservationFindFirstOrThrowArgs> =
	z
		.object({
			select: ReservationSelectSchema.optional(),
			include: ReservationIncludeSchema.optional(),
			where: ReservationWhereInputSchema.optional(),
			orderBy: z
				.union([
					ReservationOrderByWithRelationInputSchema.array(),
					ReservationOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: ReservationWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					ReservationScalarFieldEnumSchema,
					ReservationScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const ReservationFindManyArgsSchema: z.ZodType<Prisma.ReservationFindManyArgs> =
	z
		.object({
			select: ReservationSelectSchema.optional(),
			include: ReservationIncludeSchema.optional(),
			where: ReservationWhereInputSchema.optional(),
			orderBy: z
				.union([
					ReservationOrderByWithRelationInputSchema.array(),
					ReservationOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: ReservationWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					ReservationScalarFieldEnumSchema,
					ReservationScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const ReservationAggregateArgsSchema: z.ZodType<Prisma.ReservationAggregateArgs> =
	z
		.object({
			where: ReservationWhereInputSchema.optional(),
			orderBy: z
				.union([
					ReservationOrderByWithRelationInputSchema.array(),
					ReservationOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: ReservationWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const ReservationGroupByArgsSchema: z.ZodType<Prisma.ReservationGroupByArgs> =
	z
		.object({
			where: ReservationWhereInputSchema.optional(),
			orderBy: z
				.union([
					ReservationOrderByWithAggregationInputSchema.array(),
					ReservationOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: ReservationScalarFieldEnumSchema.array(),
			having: ReservationScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const ReservationFindUniqueArgsSchema: z.ZodType<Prisma.ReservationFindUniqueArgs> =
	z
		.object({
			select: ReservationSelectSchema.optional(),
			include: ReservationIncludeSchema.optional(),
			where: ReservationWhereUniqueInputSchema,
		})
		.strict();

export const ReservationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReservationFindUniqueOrThrowArgs> =
	z
		.object({
			select: ReservationSelectSchema.optional(),
			include: ReservationIncludeSchema.optional(),
			where: ReservationWhereUniqueInputSchema,
		})
		.strict();

export const PropertyFindFirstArgsSchema: z.ZodType<Prisma.PropertyFindFirstArgs> =
	z
		.object({
			select: PropertySelectSchema.optional(),
			include: PropertyIncludeSchema.optional(),
			where: PropertyWhereInputSchema.optional(),
			orderBy: z
				.union([
					PropertyOrderByWithRelationInputSchema.array(),
					PropertyOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PropertyWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					PropertyScalarFieldEnumSchema,
					PropertyScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const PropertyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PropertyFindFirstOrThrowArgs> =
	z
		.object({
			select: PropertySelectSchema.optional(),
			include: PropertyIncludeSchema.optional(),
			where: PropertyWhereInputSchema.optional(),
			orderBy: z
				.union([
					PropertyOrderByWithRelationInputSchema.array(),
					PropertyOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PropertyWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					PropertyScalarFieldEnumSchema,
					PropertyScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const PropertyFindManyArgsSchema: z.ZodType<Prisma.PropertyFindManyArgs> =
	z
		.object({
			select: PropertySelectSchema.optional(),
			include: PropertyIncludeSchema.optional(),
			where: PropertyWhereInputSchema.optional(),
			orderBy: z
				.union([
					PropertyOrderByWithRelationInputSchema.array(),
					PropertyOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PropertyWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					PropertyScalarFieldEnumSchema,
					PropertyScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const PropertyAggregateArgsSchema: z.ZodType<Prisma.PropertyAggregateArgs> =
	z
		.object({
			where: PropertyWhereInputSchema.optional(),
			orderBy: z
				.union([
					PropertyOrderByWithRelationInputSchema.array(),
					PropertyOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PropertyWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const PropertyGroupByArgsSchema: z.ZodType<Prisma.PropertyGroupByArgs> =
	z
		.object({
			where: PropertyWhereInputSchema.optional(),
			orderBy: z
				.union([
					PropertyOrderByWithAggregationInputSchema.array(),
					PropertyOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: PropertyScalarFieldEnumSchema.array(),
			having: PropertyScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const PropertyFindUniqueArgsSchema: z.ZodType<Prisma.PropertyFindUniqueArgs> =
	z
		.object({
			select: PropertySelectSchema.optional(),
			include: PropertyIncludeSchema.optional(),
			where: PropertyWhereUniqueInputSchema,
		})
		.strict();

export const PropertyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PropertyFindUniqueOrThrowArgs> =
	z
		.object({
			select: PropertySelectSchema.optional(),
			include: PropertyIncludeSchema.optional(),
			where: PropertyWhereUniqueInputSchema,
		})
		.strict();

export const RoomFindFirstArgsSchema: z.ZodType<Prisma.RoomFindFirstArgs> = z
	.object({
		select: RoomSelectSchema.optional(),
		include: RoomIncludeSchema.optional(),
		where: RoomWhereInputSchema.optional(),
		orderBy: z
			.union([
				RoomOrderByWithRelationInputSchema.array(),
				RoomOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: RoomWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				RoomScalarFieldEnumSchema,
				RoomScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const RoomFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RoomFindFirstOrThrowArgs> =
	z
		.object({
			select: RoomSelectSchema.optional(),
			include: RoomIncludeSchema.optional(),
			where: RoomWhereInputSchema.optional(),
			orderBy: z
				.union([
					RoomOrderByWithRelationInputSchema.array(),
					RoomOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: RoomWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					RoomScalarFieldEnumSchema,
					RoomScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const RoomFindManyArgsSchema: z.ZodType<Prisma.RoomFindManyArgs> = z
	.object({
		select: RoomSelectSchema.optional(),
		include: RoomIncludeSchema.optional(),
		where: RoomWhereInputSchema.optional(),
		orderBy: z
			.union([
				RoomOrderByWithRelationInputSchema.array(),
				RoomOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: RoomWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				RoomScalarFieldEnumSchema,
				RoomScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const RoomAggregateArgsSchema: z.ZodType<Prisma.RoomAggregateArgs> = z
	.object({
		where: RoomWhereInputSchema.optional(),
		orderBy: z
			.union([
				RoomOrderByWithRelationInputSchema.array(),
				RoomOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: RoomWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const RoomGroupByArgsSchema: z.ZodType<Prisma.RoomGroupByArgs> = z
	.object({
		where: RoomWhereInputSchema.optional(),
		orderBy: z
			.union([
				RoomOrderByWithAggregationInputSchema.array(),
				RoomOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: RoomScalarFieldEnumSchema.array(),
		having: RoomScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const RoomFindUniqueArgsSchema: z.ZodType<Prisma.RoomFindUniqueArgs> = z
	.object({
		select: RoomSelectSchema.optional(),
		include: RoomIncludeSchema.optional(),
		where: RoomWhereUniqueInputSchema,
	})
	.strict();

export const RoomFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RoomFindUniqueOrThrowArgs> =
	z
		.object({
			select: RoomSelectSchema.optional(),
			include: RoomIncludeSchema.optional(),
			where: RoomWhereUniqueInputSchema,
		})
		.strict();

export const FacilityFindFirstArgsSchema: z.ZodType<Prisma.FacilityFindFirstArgs> =
	z
		.object({
			select: FacilitySelectSchema.optional(),
			include: FacilityIncludeSchema.optional(),
			where: FacilityWhereInputSchema.optional(),
			orderBy: z
				.union([
					FacilityOrderByWithRelationInputSchema.array(),
					FacilityOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: FacilityWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					FacilityScalarFieldEnumSchema,
					FacilityScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const FacilityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FacilityFindFirstOrThrowArgs> =
	z
		.object({
			select: FacilitySelectSchema.optional(),
			include: FacilityIncludeSchema.optional(),
			where: FacilityWhereInputSchema.optional(),
			orderBy: z
				.union([
					FacilityOrderByWithRelationInputSchema.array(),
					FacilityOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: FacilityWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					FacilityScalarFieldEnumSchema,
					FacilityScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const FacilityFindManyArgsSchema: z.ZodType<Prisma.FacilityFindManyArgs> =
	z
		.object({
			select: FacilitySelectSchema.optional(),
			include: FacilityIncludeSchema.optional(),
			where: FacilityWhereInputSchema.optional(),
			orderBy: z
				.union([
					FacilityOrderByWithRelationInputSchema.array(),
					FacilityOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: FacilityWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					FacilityScalarFieldEnumSchema,
					FacilityScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const FacilityAggregateArgsSchema: z.ZodType<Prisma.FacilityAggregateArgs> =
	z
		.object({
			where: FacilityWhereInputSchema.optional(),
			orderBy: z
				.union([
					FacilityOrderByWithRelationInputSchema.array(),
					FacilityOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: FacilityWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const FacilityGroupByArgsSchema: z.ZodType<Prisma.FacilityGroupByArgs> =
	z
		.object({
			where: FacilityWhereInputSchema.optional(),
			orderBy: z
				.union([
					FacilityOrderByWithAggregationInputSchema.array(),
					FacilityOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: FacilityScalarFieldEnumSchema.array(),
			having: FacilityScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const FacilityFindUniqueArgsSchema: z.ZodType<Prisma.FacilityFindUniqueArgs> =
	z
		.object({
			select: FacilitySelectSchema.optional(),
			include: FacilityIncludeSchema.optional(),
			where: FacilityWhereUniqueInputSchema,
		})
		.strict();

export const FacilityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FacilityFindUniqueOrThrowArgs> =
	z
		.object({
			select: FacilitySelectSchema.optional(),
			include: FacilityIncludeSchema.optional(),
			where: FacilityWhereUniqueInputSchema,
		})
		.strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
	})
	.strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema,
		create: z.union([
			UserCreateInputSchema,
			UserUncheckedCreateInputSchema,
		]),
		update: z.union([
			UserUpdateInputSchema,
			UserUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
	.object({
		data: z.union([
			UserCreateManyInputSchema,
			UserCreateManyInputSchema.array(),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema,
	})
	.strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
		where: UserWhereUniqueInputSchema,
	})
	.strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
	.object({
		data: z.union([
			UserUpdateManyMutationInputSchema,
			UserUncheckedUpdateManyInputSchema,
		]),
		where: UserWhereInputSchema.optional(),
	})
	.strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
	.object({
		where: UserWhereInputSchema.optional(),
	})
	.strict();

export const PasswordCreateArgsSchema: z.ZodType<Prisma.PasswordCreateArgs> = z
	.object({
		select: PasswordSelectSchema.optional(),
		include: PasswordIncludeSchema.optional(),
		data: z.union([
			PasswordCreateInputSchema,
			PasswordUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const PasswordUpsertArgsSchema: z.ZodType<Prisma.PasswordUpsertArgs> = z
	.object({
		select: PasswordSelectSchema.optional(),
		include: PasswordIncludeSchema.optional(),
		where: PasswordWhereUniqueInputSchema,
		create: z.union([
			PasswordCreateInputSchema,
			PasswordUncheckedCreateInputSchema,
		]),
		update: z.union([
			PasswordUpdateInputSchema,
			PasswordUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const PasswordCreateManyArgsSchema: z.ZodType<Prisma.PasswordCreateManyArgs> =
	z
		.object({
			data: z.union([
				PasswordCreateManyInputSchema,
				PasswordCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const PasswordDeleteArgsSchema: z.ZodType<Prisma.PasswordDeleteArgs> = z
	.object({
		select: PasswordSelectSchema.optional(),
		include: PasswordIncludeSchema.optional(),
		where: PasswordWhereUniqueInputSchema,
	})
	.strict();

export const PasswordUpdateArgsSchema: z.ZodType<Prisma.PasswordUpdateArgs> = z
	.object({
		select: PasswordSelectSchema.optional(),
		include: PasswordIncludeSchema.optional(),
		data: z.union([
			PasswordUpdateInputSchema,
			PasswordUncheckedUpdateInputSchema,
		]),
		where: PasswordWhereUniqueInputSchema,
	})
	.strict();

export const PasswordUpdateManyArgsSchema: z.ZodType<Prisma.PasswordUpdateManyArgs> =
	z
		.object({
			data: z.union([
				PasswordUpdateManyMutationInputSchema,
				PasswordUncheckedUpdateManyInputSchema,
			]),
			where: PasswordWhereInputSchema.optional(),
		})
		.strict();

export const PasswordDeleteManyArgsSchema: z.ZodType<Prisma.PasswordDeleteManyArgs> =
	z
		.object({
			where: PasswordWhereInputSchema.optional(),
		})
		.strict();

export const ChatCreateArgsSchema: z.ZodType<Prisma.ChatCreateArgs> = z
	.object({
		select: ChatSelectSchema.optional(),
		include: ChatIncludeSchema.optional(),
		data: z
			.union([ChatCreateInputSchema, ChatUncheckedCreateInputSchema])
			.optional(),
	})
	.strict();

export const ChatUpsertArgsSchema: z.ZodType<Prisma.ChatUpsertArgs> = z
	.object({
		select: ChatSelectSchema.optional(),
		include: ChatIncludeSchema.optional(),
		where: ChatWhereUniqueInputSchema,
		create: z.union([
			ChatCreateInputSchema,
			ChatUncheckedCreateInputSchema,
		]),
		update: z.union([
			ChatUpdateInputSchema,
			ChatUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const ChatCreateManyArgsSchema: z.ZodType<Prisma.ChatCreateManyArgs> = z
	.object({
		data: z.union([
			ChatCreateManyInputSchema,
			ChatCreateManyInputSchema.array(),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();

export const ChatDeleteArgsSchema: z.ZodType<Prisma.ChatDeleteArgs> = z
	.object({
		select: ChatSelectSchema.optional(),
		include: ChatIncludeSchema.optional(),
		where: ChatWhereUniqueInputSchema,
	})
	.strict();

export const ChatUpdateArgsSchema: z.ZodType<Prisma.ChatUpdateArgs> = z
	.object({
		select: ChatSelectSchema.optional(),
		include: ChatIncludeSchema.optional(),
		data: z.union([ChatUpdateInputSchema, ChatUncheckedUpdateInputSchema]),
		where: ChatWhereUniqueInputSchema,
	})
	.strict();

export const ChatUpdateManyArgsSchema: z.ZodType<Prisma.ChatUpdateManyArgs> = z
	.object({
		data: z.union([
			ChatUpdateManyMutationInputSchema,
			ChatUncheckedUpdateManyInputSchema,
		]),
		where: ChatWhereInputSchema.optional(),
	})
	.strict();

export const ChatDeleteManyArgsSchema: z.ZodType<Prisma.ChatDeleteManyArgs> = z
	.object({
		where: ChatWhereInputSchema.optional(),
	})
	.strict();

export const MessageCreateArgsSchema: z.ZodType<Prisma.MessageCreateArgs> = z
	.object({
		select: MessageSelectSchema.optional(),
		include: MessageIncludeSchema.optional(),
		data: z.union([
			MessageCreateInputSchema,
			MessageUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const MessageUpsertArgsSchema: z.ZodType<Prisma.MessageUpsertArgs> = z
	.object({
		select: MessageSelectSchema.optional(),
		include: MessageIncludeSchema.optional(),
		where: MessageWhereUniqueInputSchema,
		create: z.union([
			MessageCreateInputSchema,
			MessageUncheckedCreateInputSchema,
		]),
		update: z.union([
			MessageUpdateInputSchema,
			MessageUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const MessageCreateManyArgsSchema: z.ZodType<Prisma.MessageCreateManyArgs> =
	z
		.object({
			data: z.union([
				MessageCreateManyInputSchema,
				MessageCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const MessageDeleteArgsSchema: z.ZodType<Prisma.MessageDeleteArgs> = z
	.object({
		select: MessageSelectSchema.optional(),
		include: MessageIncludeSchema.optional(),
		where: MessageWhereUniqueInputSchema,
	})
	.strict();

export const MessageUpdateArgsSchema: z.ZodType<Prisma.MessageUpdateArgs> = z
	.object({
		select: MessageSelectSchema.optional(),
		include: MessageIncludeSchema.optional(),
		data: z.union([
			MessageUpdateInputSchema,
			MessageUncheckedUpdateInputSchema,
		]),
		where: MessageWhereUniqueInputSchema,
	})
	.strict();

export const MessageUpdateManyArgsSchema: z.ZodType<Prisma.MessageUpdateManyArgs> =
	z
		.object({
			data: z.union([
				MessageUpdateManyMutationInputSchema,
				MessageUncheckedUpdateManyInputSchema,
			]),
			where: MessageWhereInputSchema.optional(),
		})
		.strict();

export const MessageDeleteManyArgsSchema: z.ZodType<Prisma.MessageDeleteManyArgs> =
	z
		.object({
			where: MessageWhereInputSchema.optional(),
		})
		.strict();

export const ReviewCreateArgsSchema: z.ZodType<Prisma.ReviewCreateArgs> = z
	.object({
		select: ReviewSelectSchema.optional(),
		include: ReviewIncludeSchema.optional(),
		data: z.union([
			ReviewCreateInputSchema,
			ReviewUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const ReviewUpsertArgsSchema: z.ZodType<Prisma.ReviewUpsertArgs> = z
	.object({
		select: ReviewSelectSchema.optional(),
		include: ReviewIncludeSchema.optional(),
		where: ReviewWhereUniqueInputSchema,
		create: z.union([
			ReviewCreateInputSchema,
			ReviewUncheckedCreateInputSchema,
		]),
		update: z.union([
			ReviewUpdateInputSchema,
			ReviewUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const ReviewCreateManyArgsSchema: z.ZodType<Prisma.ReviewCreateManyArgs> =
	z
		.object({
			data: z.union([
				ReviewCreateManyInputSchema,
				ReviewCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const ReviewDeleteArgsSchema: z.ZodType<Prisma.ReviewDeleteArgs> = z
	.object({
		select: ReviewSelectSchema.optional(),
		include: ReviewIncludeSchema.optional(),
		where: ReviewWhereUniqueInputSchema,
	})
	.strict();

export const ReviewUpdateArgsSchema: z.ZodType<Prisma.ReviewUpdateArgs> = z
	.object({
		select: ReviewSelectSchema.optional(),
		include: ReviewIncludeSchema.optional(),
		data: z.union([
			ReviewUpdateInputSchema,
			ReviewUncheckedUpdateInputSchema,
		]),
		where: ReviewWhereUniqueInputSchema,
	})
	.strict();

export const ReviewUpdateManyArgsSchema: z.ZodType<Prisma.ReviewUpdateManyArgs> =
	z
		.object({
			data: z.union([
				ReviewUpdateManyMutationInputSchema,
				ReviewUncheckedUpdateManyInputSchema,
			]),
			where: ReviewWhereInputSchema.optional(),
		})
		.strict();

export const ReviewDeleteManyArgsSchema: z.ZodType<Prisma.ReviewDeleteManyArgs> =
	z
		.object({
			where: ReviewWhereInputSchema.optional(),
		})
		.strict();

export const ReservationCreateArgsSchema: z.ZodType<Prisma.ReservationCreateArgs> =
	z
		.object({
			select: ReservationSelectSchema.optional(),
			include: ReservationIncludeSchema.optional(),
			data: z.union([
				ReservationCreateInputSchema,
				ReservationUncheckedCreateInputSchema,
			]),
		})
		.strict();

export const ReservationUpsertArgsSchema: z.ZodType<Prisma.ReservationUpsertArgs> =
	z
		.object({
			select: ReservationSelectSchema.optional(),
			include: ReservationIncludeSchema.optional(),
			where: ReservationWhereUniqueInputSchema,
			create: z.union([
				ReservationCreateInputSchema,
				ReservationUncheckedCreateInputSchema,
			]),
			update: z.union([
				ReservationUpdateInputSchema,
				ReservationUncheckedUpdateInputSchema,
			]),
		})
		.strict();

export const ReservationCreateManyArgsSchema: z.ZodType<Prisma.ReservationCreateManyArgs> =
	z
		.object({
			data: z.union([
				ReservationCreateManyInputSchema,
				ReservationCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const ReservationDeleteArgsSchema: z.ZodType<Prisma.ReservationDeleteArgs> =
	z
		.object({
			select: ReservationSelectSchema.optional(),
			include: ReservationIncludeSchema.optional(),
			where: ReservationWhereUniqueInputSchema,
		})
		.strict();

export const ReservationUpdateArgsSchema: z.ZodType<Prisma.ReservationUpdateArgs> =
	z
		.object({
			select: ReservationSelectSchema.optional(),
			include: ReservationIncludeSchema.optional(),
			data: z.union([
				ReservationUpdateInputSchema,
				ReservationUncheckedUpdateInputSchema,
			]),
			where: ReservationWhereUniqueInputSchema,
		})
		.strict();

export const ReservationUpdateManyArgsSchema: z.ZodType<Prisma.ReservationUpdateManyArgs> =
	z
		.object({
			data: z.union([
				ReservationUpdateManyMutationInputSchema,
				ReservationUncheckedUpdateManyInputSchema,
			]),
			where: ReservationWhereInputSchema.optional(),
		})
		.strict();

export const ReservationDeleteManyArgsSchema: z.ZodType<Prisma.ReservationDeleteManyArgs> =
	z
		.object({
			where: ReservationWhereInputSchema.optional(),
		})
		.strict();

export const PropertyCreateArgsSchema: z.ZodType<Prisma.PropertyCreateArgs> = z
	.object({
		select: PropertySelectSchema.optional(),
		include: PropertyIncludeSchema.optional(),
		data: z.union([
			PropertyCreateInputSchema,
			PropertyUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const PropertyUpsertArgsSchema: z.ZodType<Prisma.PropertyUpsertArgs> = z
	.object({
		select: PropertySelectSchema.optional(),
		include: PropertyIncludeSchema.optional(),
		where: PropertyWhereUniqueInputSchema,
		create: z.union([
			PropertyCreateInputSchema,
			PropertyUncheckedCreateInputSchema,
		]),
		update: z.union([
			PropertyUpdateInputSchema,
			PropertyUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const PropertyCreateManyArgsSchema: z.ZodType<Prisma.PropertyCreateManyArgs> =
	z
		.object({
			data: z.union([
				PropertyCreateManyInputSchema,
				PropertyCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const PropertyDeleteArgsSchema: z.ZodType<Prisma.PropertyDeleteArgs> = z
	.object({
		select: PropertySelectSchema.optional(),
		include: PropertyIncludeSchema.optional(),
		where: PropertyWhereUniqueInputSchema,
	})
	.strict();

export const PropertyUpdateArgsSchema: z.ZodType<Prisma.PropertyUpdateArgs> = z
	.object({
		select: PropertySelectSchema.optional(),
		include: PropertyIncludeSchema.optional(),
		data: z.union([
			PropertyUpdateInputSchema,
			PropertyUncheckedUpdateInputSchema,
		]),
		where: PropertyWhereUniqueInputSchema,
	})
	.strict();

export const PropertyUpdateManyArgsSchema: z.ZodType<Prisma.PropertyUpdateManyArgs> =
	z
		.object({
			data: z.union([
				PropertyUpdateManyMutationInputSchema,
				PropertyUncheckedUpdateManyInputSchema,
			]),
			where: PropertyWhereInputSchema.optional(),
		})
		.strict();

export const PropertyDeleteManyArgsSchema: z.ZodType<Prisma.PropertyDeleteManyArgs> =
	z
		.object({
			where: PropertyWhereInputSchema.optional(),
		})
		.strict();

export const RoomCreateArgsSchema: z.ZodType<Prisma.RoomCreateArgs> = z
	.object({
		select: RoomSelectSchema.optional(),
		include: RoomIncludeSchema.optional(),
		data: z.union([RoomCreateInputSchema, RoomUncheckedCreateInputSchema]),
	})
	.strict();

export const RoomUpsertArgsSchema: z.ZodType<Prisma.RoomUpsertArgs> = z
	.object({
		select: RoomSelectSchema.optional(),
		include: RoomIncludeSchema.optional(),
		where: RoomWhereUniqueInputSchema,
		create: z.union([
			RoomCreateInputSchema,
			RoomUncheckedCreateInputSchema,
		]),
		update: z.union([
			RoomUpdateInputSchema,
			RoomUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const RoomCreateManyArgsSchema: z.ZodType<Prisma.RoomCreateManyArgs> = z
	.object({
		data: z.union([
			RoomCreateManyInputSchema,
			RoomCreateManyInputSchema.array(),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();

export const RoomDeleteArgsSchema: z.ZodType<Prisma.RoomDeleteArgs> = z
	.object({
		select: RoomSelectSchema.optional(),
		include: RoomIncludeSchema.optional(),
		where: RoomWhereUniqueInputSchema,
	})
	.strict();

export const RoomUpdateArgsSchema: z.ZodType<Prisma.RoomUpdateArgs> = z
	.object({
		select: RoomSelectSchema.optional(),
		include: RoomIncludeSchema.optional(),
		data: z.union([RoomUpdateInputSchema, RoomUncheckedUpdateInputSchema]),
		where: RoomWhereUniqueInputSchema,
	})
	.strict();

export const RoomUpdateManyArgsSchema: z.ZodType<Prisma.RoomUpdateManyArgs> = z
	.object({
		data: z.union([
			RoomUpdateManyMutationInputSchema,
			RoomUncheckedUpdateManyInputSchema,
		]),
		where: RoomWhereInputSchema.optional(),
	})
	.strict();

export const RoomDeleteManyArgsSchema: z.ZodType<Prisma.RoomDeleteManyArgs> = z
	.object({
		where: RoomWhereInputSchema.optional(),
	})
	.strict();

export const FacilityCreateArgsSchema: z.ZodType<Prisma.FacilityCreateArgs> = z
	.object({
		select: FacilitySelectSchema.optional(),
		include: FacilityIncludeSchema.optional(),
		data: z.union([
			FacilityCreateInputSchema,
			FacilityUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const FacilityUpsertArgsSchema: z.ZodType<Prisma.FacilityUpsertArgs> = z
	.object({
		select: FacilitySelectSchema.optional(),
		include: FacilityIncludeSchema.optional(),
		where: FacilityWhereUniqueInputSchema,
		create: z.union([
			FacilityCreateInputSchema,
			FacilityUncheckedCreateInputSchema,
		]),
		update: z.union([
			FacilityUpdateInputSchema,
			FacilityUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const FacilityCreateManyArgsSchema: z.ZodType<Prisma.FacilityCreateManyArgs> =
	z
		.object({
			data: z.union([
				FacilityCreateManyInputSchema,
				FacilityCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const FacilityDeleteArgsSchema: z.ZodType<Prisma.FacilityDeleteArgs> = z
	.object({
		select: FacilitySelectSchema.optional(),
		include: FacilityIncludeSchema.optional(),
		where: FacilityWhereUniqueInputSchema,
	})
	.strict();

export const FacilityUpdateArgsSchema: z.ZodType<Prisma.FacilityUpdateArgs> = z
	.object({
		select: FacilitySelectSchema.optional(),
		include: FacilityIncludeSchema.optional(),
		data: z.union([
			FacilityUpdateInputSchema,
			FacilityUncheckedUpdateInputSchema,
		]),
		where: FacilityWhereUniqueInputSchema,
	})
	.strict();

export const FacilityUpdateManyArgsSchema: z.ZodType<Prisma.FacilityUpdateManyArgs> =
	z
		.object({
			data: z.union([
				FacilityUpdateManyMutationInputSchema,
				FacilityUncheckedUpdateManyInputSchema,
			]),
			where: FacilityWhereInputSchema.optional(),
		})
		.strict();

export const FacilityDeleteManyArgsSchema: z.ZodType<Prisma.FacilityDeleteManyArgs> =
	z
		.object({
			where: FacilityWhereInputSchema.optional(),
		})
		.strict();
