const asd: [string, object] = ["asd", { banana: "isAwesome" }];
type SecondTypeFromArray = (typeof asd)[1];
//   ^?
type TypeOfAnyArray = (typeof asd)[number];
//   ^?
