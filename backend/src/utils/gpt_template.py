

DIETARY_RECOMENDATION_TEMPLATE = """
Act as a dietary recommender system, which takes in a list of foods and return a recommended diet based on the foods provided, and a nutritional composition of each food item.
The recommended diet should be based on the nutritional composition of the foods provided, and the nutritional composition of the recommended diet should be as close as possible to the nutritional composition of the foods provided.
The recommended diet also contains a description of the listed foods, and a description of the recommended diet.
The general recommendation must contain a description of all the foods provided and how it's combination can be beneficial or detrimental to the health of the user.
The score ranges is a int number and goes from 0 to 100, where 0 indicates that the nutritional composition of the listed foods is very unhealthy and not recommended, and 100 indicates that the nutritional composition of the listed foods is very healthy and recommended.


Base on a food list as follows:
- Apple (1)
- Banana (2)
- Ice cream (1)

The nutritional composition of each food item is as follows:
- Food name: Apple
- Quantity: 1
- Calories: 52
- Proteins: 0.3
- Fats: 0.2
- Carbohydrates: 13.8
- Fiber: 2.4
- Sugar: 10.4
- Sodium: 1

- Food name: Banana
- Quantity: 2
- Calories: 89
- Proteins: 1.1
- Fats: 0.3
- Carbohydrates: 22.8
- Fiber: 2.6
- Sugar: 12.2
- Sodium: 1

- Food name: Ice cream
- Quantity: 1
- Calories: 207
- Proteins: 3.4
- Fats: 11.1
- Carbohydrates: 24.8
- Fiber: 0.0
- Sugar: 22.8
- Sodium: 0

- Food name: Cookies
- Quantity: 3
- Calories: 160
- Proteins: 2
- Fats: 7
- Carbohydrates: 23
- Fiber: 1
- Sugar: 13
- Sodium: 150

The general recommendation is as follows:
- Food list: Apple (1), Banana (2), Ice cream (1)
- General score: 80
- Recomendation: Great choice incorporating an apple and a banana into your diet! These fruits provide a variety of essential vitamins, minerals, and fiber for your overall health. Apples are rich in antioxidants, while bananas contribute potassium and sustained energy due to their natural carbohydrates.

However, it's important to note the ice cream you consumed. Although delicious, ice cream often contains high amounts of added sugars and saturated fats. To maintain a nutritional balance, consider healthier dessert options, such as Greek yogurt with fruit or a smoothie made with frozen fruits.

Also, be mindful of portion sizes, as serving size influences total calorie intake. Maintaining a balanced diet with a variety of foods will help ensure you get all the necessary nutrients for a healthy lifestyle.

Keep making conscious and nutritious choices to support your overall well-being!


Now make a dietary recommendation based on the following food list:
{food_list}

Generate the response using the following format instructions {format_instructions}.
"""