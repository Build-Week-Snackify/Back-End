# Back-End
Backend engineers

Snack vending machines in offices are the worst. They are stocked with snacks that either unhealthy or old and stale - and they are always in dire need of a restock. Nobody gets a say in which snacks are stocked or when they should be rotated or re-stocked. With Snackify - the office snack subscription service and app - send your office snacktime woes packing faster than Janet from HR did to your annoying cubicle-mate last week!

1. User can signup/register for an authenticated account as either a `Organization` or an `Employee` of a currently registered `Organization`. Each account must have the following properties at a minimum: (Web, Mobile)
	
	* a unique `username` - String
	* a strong `password` - String
	* a unique and valid `email` - String
	* a valid `phoneNumber` - String or Int
	* a valid `streetAddress` - String
	* a valid `state` - String
	* a valid `zipcode` - String or Int
	* `organizationName` (for `Organizations`) or `fullName` (for `Employees`)
	* `contactPerson` - String

2. `Organization` or `Employee` can initiate and authenticated session by providing the `username` and `password` from account registration/signup. (Web)

3. Authenticated `Organization` or `orgAdmin` can convert registered `Employees` into `orgAdmin`s (Web)

4. Authenticated `Organization` or `orgAdmin` can view a list of available `snack`s. Each snack should have the following properties: (web, mobile)

	* `name`
	* `type`
	* `numberOfServings`
	* `nutritionInfo` object with:
		- `calories` (per serving) - Double/Float
		- `totalFat` (per serving)- Double/Float
		- `totalSugars` (per serving) - Double/Float
		- `protein` (per serving) - Double/Float
		- `carbs` (per serving) - Double/Float
		- `allergens` - [String]
	 * `totalWeight` - Double/Float
	 * `price` - Double/Float

5. Authenticated `Organization` or `orgAdmin` can select a `subscription` from a list of options of your choice. Each `subscription` should have the following properties at a minimum: (Web)
	
	* `monthlyFee` - Double/Float
	* `lengthOfSubscription` - DateTime
	* `name` - String

	
6. Authenticated `Organization` or `orgAdmin` can create, read, update and delete a list of `snack`s that they would like to have included in their order/subscription. (Web, Mobile)

7. Authenticated `Organization` or `orgAdmin` can change or cancel a `subscription`. (Web)

8. Authenticated `Organization` or `orgAdmin` can make a "one-time purchase" of `snacks`. (Web, Mobile)

9. Authenticated `Employees` can make "one-time purchases of `snack`s that can be delivered with the next upcoming `Organization` subscription order. (Mobile)

10. Authenticated `Employees` can request `snack` choices to request to be added to thenext upcoming `Organization` subscription order. (Mobile)

