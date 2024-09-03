                                                Compare Quest
Project Overview

Compare Quest is an interactive web application designed to provide an engaging way to compare video games across different platforms. Users can select two games and receive a comprehensive side-by-side comparison, including ratings, genres, themes, release dates, and more. Additionally, the application offers AI-powered recommendations based on user preferences to aid in decision-making.

Key Features

Dynamic Search: Quickly search for video games and select them for comparison.

In-Depth Game Comparison: View detailed side-by-side comparisons of game ratings, genres, themes, release dates, modes, developers, and platforms.

AI Recommendations: Receive personalized game suggestions through AI-driven insights based on user input.

Responsive Design: Enjoy a seamless user experience across all devices with a fully responsive design.

Tech Stack

Frontend: React, Material-UI, Framer Motion, Axios

Backend: Node.js, Express, MongoDB Atlas

API Integration: Amazon's IGDB API, Cohere AI LLM

Deployment: AWS Amplify, Render

Project Structure

App Component: Manages the navigation between Ginput and Gdisplay components.

Ginput Component: Facilitates user input for game selection.

Gdisplay Component: Presents detailed game information and comparisons.

SearchResults Component: Displays search results and handles user interactions.

Design Philosophy
In designing Compare Quest, the goal was to create a visually engaging experience that reflects the essence of video gaming:

Game-Centric Design: The website's aesthetics are inspired by classic arcade games, utilizing the "Press Start" font and vibrant, game-inspired color schemes.

Enhanced Search Experience: Implemented a real-time search bar with debouncing to optimize performance and reduce unnecessary API calls, showcasing proficiency in both frontend and backend technologies.

Sleek Loading Animations: Incorporated skeletal loading screens and smooth transition effects for a modern and polished user experience.

Striking Visuals: Styled game information with contrasting colors and visually appealing tags to ensure that key details stand out to users.

AI-Driven Insights: Integrated Cohere LLM API to provide AI-generated recommendations based on user queries, enhancing decision-making with intelligent assistance.

API Details

Amazon’s IGDB API provides access to a rich database of video game information, including titles, genres, platforms, and more. This API is essential for powering the search, discovery, and comparison features within the application.

MongoDB Atlas was chosen for its ease of use and efficient cloud-based management, enabling focus on application development rather than database maintenance.
