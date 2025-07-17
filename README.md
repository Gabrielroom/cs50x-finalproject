# cs50x-finalproject-1
 My Web Stock Management System Video Demo: https://www.youtube.com/watch?v=QxJ9rfri4 Description: For my CS50x final project, I developed a simple but functional web-based stock management system called "Web Stock Management System". The main goal of this project was to create a small software that allows users to register products, add quantities to the stock, and manage inventory through a web interface. Additionally, the project includes login and user registration functionalities with basic form validation.

The system was developed using HTML, CSS, and pure JavaScript (without any frameworks or external libraries), following the core web development concepts learned during the course.

Features Here are the main features implemented in my project:

Login Screen with Validation: The application starts with a login screen. It validates that the username and password fields are not empty before submission. This ensures that users cannot log in with blank fields.

User Registration: If the user does not have an account, they can switch to a registration screen where they can create a new username and password. This is also validated on the client side to ensure that all fields are filled.

Dynamic Screen Switching: JavaScript is used to switch dynamically between the login and registration screens, without needing to reload the page.

Main Inventory Dashboard: Once logged in, the user is directed to the main inventory screen. This dashboard allows users to register new products, add quantities to existing products, and view a full list of items in stock.

Add New Products: Users can open a modal window to register new products by specifying the name, quantity, and product type (like food, cleaning, etc.). The product is then added to the stock list.

Add Quantity to Existing Products: Another modal window allows users to select an existing product and add more quantity to it. The last update date for that product is also refreshed.

Stock Table Display: All products are displayed in a table format showing the following columns:

Product Name

Quantity

Product Type

Date Added

Last Updated

Actions (like future delete or edit options)

Pagination Support: Basic pagination was prepared for the stock table, to help manage longer product lists.

Responsive Layout: The application layout adapts well to different screen sizes, thanks to the CSS styling.

File Structure The project is divided into the following key files:

index.html: This file contains all the HTML structure for the entire system. It includes all the different screens (login, registration, main stock screen, modals for adding products, etc.), all managed through CSS and JavaScript to hide and show as needed.

style.css: This file contains all the styling rules for the project. It defines the color palette, button styles, modal windows, input fields, table styling, responsive behaviors, and overall page layout.

script.js: This JavaScript file contains all the functionality and business logic of the system. It handles screen switching, form validations, dynamic table updates, and pagination controls. The logic is written in plain JavaScript, without external frameworks.

Design Decisions During development, I made several important design decisions:

Use of Pure JavaScript: I decided to stick with pure JavaScript for all logic, as it aligned with my current learning stage. This gave me more control over DOM manipulation and helped solidify my knowledge of event handling and dynamic content updates.

Single Page Management: Instead of creating multiple HTML pages for each screen (login, register, dashboard), I implemented a Single Page Application style (SPA) approach, controlling screen visibility using JavaScript and CSS classes like .hidden.

Basic Client-side Validation: Form validation is simple but ensures that empty submissions are not allowed. This could be improved in the future by adding more complex validation and possibly backend integration.

No Database: For simplicity and time constraints, I decided not to implement any database or server-side backend. All data (users, products, quantities) are stored in memory using JavaScript variables. This means data is lost after refreshing the page, but it allowed me to focus on frontend development.

Challenges and Learnings Throughout the project, I faced some challenges:

DOM Manipulation: Building a fully dynamic table that updates live as products are added or modified was a great exercise in DOM manipulation.

User Flow Control: Designing the logic to switch smoothly between login, registration, and main stock management screens took time and testing.

CSS Layout and Responsiveness: Making the application visually pleasant and responsive on both desktop and mobile was a new skill I had to develop during this project.

JavaScript Logic Structuring: Organizing JavaScript functions in a clear and reusable way was another important learning point.

Future Improvements If I had more time, or in a next version, I would like to implement the following:

Persistent Storage: Use browser storage (like LocalStorage) or a backend database (e.g., SQLite or Firebase) to store users and stock data permanently.

Edit and Delete Product Functions: Allow users to edit product details or delete products from the inventory.

User Authentication System: Implement a real authentication and password encryption system for better security.

Better Pagination: Improve pagination by dynamically limiting the number of rows displayed and adding next/previous page navigation.

Visual Enhancements: Improve the user interface with better styling, icons, and animations.

Backend Development: Move the logic to a real backend using Python (Flask or Django), PHP, or Node.js.

Conclusion Overall, I am proud of this project. It allowed me to practice core web development concepts, improve my JavaScript skills, and create a functional tool that could be a foundation for a real inventory management system in the future. This project reflects what I learned during the CS50x course and shows how I am progressing as a developer.

Thank you for everything, CS50.

This is CS50x!!!

# cs50x-finalproject
