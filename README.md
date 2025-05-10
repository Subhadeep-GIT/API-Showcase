LinkStack Demo

LinkStack Demo is a real-life implementation showcasing two APIs: the Excuse API and the HerThoughts API. This demo project is designed to give users access to random excuses and thoughts, grouped by categories, with a seamless user interface.

Features

1. Excuse API:
	•	Random Excuse Generator: Allows users to fetch a random excuse from various categories such as “romantic”, “work”, “school”, etc.
	•	Category-based Excuse: Users can select a specific category to fetch an excuse from that category.

2. HerThoughts API:
	•	Category Fetching: Displays a list of thought categories (e.g., “love”, “hope”, “nostalgia”, etc.) fetched from the HerThoughts API.
	•	Random Thought Generator: Fetches a random thought from a selected category.

Technologies Used
	•	React: Frontend framework used for building the user interface.
	•	API Integration: Integration with two APIs — the Excuse API and HerThoughts API — to fetch data for excuses and thoughts.
	•	CSS: For styling the application.



1. Excuse API:

The Excuse API provides random and category-specific excuses.
	•	Endpoint: https://excuses-api.vercel.app/api/excuses
	•	GET /random: Fetch a random excuse.
	•	GET /category/{category}: Fetch an excuse based on the selected category (e.g., “work”, “romantic”, etc.).

2. HerThoughts API:

The HerThoughts API provides random thoughts grouped by categories.
	•	Endpoint: https://herthoughts-api.vercel.app/api/thoughts
	•	GET /: Fetch all available categories.
	•	GET /?category={category}&random=true: Fetch a random thought from a specific category.

How to Use

Random Excuse

Click the “🎲 Random Excuse” button to fetch a random excuse from the Excuse API.

Get Excuse by Category

Click any of the category buttons (e.g., “romantic”, “work”, “school”, etc.) to fetch an excuse from the corresponding category.

HerThoughts API
	•	Load Categories: Click the “Load Categories” button to fetch the list of thought categories from the HerThoughts API.
	•	Select Category: Choose a category from the dropdown menu to fetch a random thought from that category.

Example Output
	•	Random Excuse: "Sorry, I was caught in traffic."
	•	Category-based Excuse: "I couldn't make it because of work."
	•	Random Thought: "Hope is the thing with feathers."

Conclusion

This project serves as a reference implementation showcasing the use of the Excuse API and HerThoughts API. It demonstrates how APIs can be integrated into a real-world web application to provide dynamic, categorized content.