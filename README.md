# Penn Labs Frontend Challenge

## Features

1. **Explore Courses**

   Courses are displayed as rectangular cards, with three cards per row.

   Each card displays an image (top-half), the course's `dept`, `number`, `title`, and its difficulty *(Beginner, Intermediate, Advanced, Expert)* (bottom-half).

   Incomplete courses have a blue background, and courses not in the **Course Cart** have a grey outline.

2. **Search & Filter**

    Users are able to search for specific courses using two search bars.
    ```jsx
    import Fuse from fuse.js
    ```
   - The first *(Search courses...)* utilises a fuzzy-search library (shown above) to match user-inputted text with corresponding courses based on `dept`, `title`, and `description`, with `threshold: 0.5`.
   - The second *(Filter by number...)* performs an exact match, allowing the user to search a specific course based on `number`.

3. **Mark courses as "Completed!"**

   When the user clicks on a course, they can mark it as **"Completed!"** if they have already passed the course.

   For courses with prerequisites, the user cannot mark them as **"Completed!"** without having completed their prerequisites beforehand.

   Once a course is marked as **"Completed!"**, its background turns green, and the **"Add to Cart"** button is disabled.

4. **Add courses to Course Cart**

   When the user clicks on a course, they can add it to their **Course Cart** if they have completed its prerequisites.

   Once a course is added to the **Course Cart**, its outline turns golden, and the **"Completed?"** button is disabled.

   Users cannot add more than seven courses.

5. **View Completed Courses**

   Clicking on the checkbox button in the top-right corner opens a popup where the user can see every course they passed.

6. **View Course Cart**

   Clicking on the cart button in the top-right corner opens the **Course Cart**, where the user can see all courses they've added.

   The symbol on the bottom right corner of the button (golden) displays how many courses they've added.
   - Once they've reached their limit, the symbol turns red.
  
7. **Checkout**
   
   Inside the **Course Cart**, the user can click on the **Checkout** button, redirecting them to a new page.

   The **Checkout** page is designed to look like a receipt, displaying all courses from their **Course Cart**.
