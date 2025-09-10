## Calorie Tracker Web Application

Available at https://a2-matthewfranco-a25.onrender.com/

This is a single-page calorie tracker app that allows users to add, edit, and delete meal entries for different days. The app displays a form for entering meal data and a table that always shows the current state of the server-side data. Meals are grouped by date, and users can navigate between days using left/right arrow buttons. The table always opens to today's date by default if available.

**CSS Positioning Technique:**
The layout uses CSS Flexbox to arrange the form and the table side by side for a modern, responsive design.

**How to Use:**

1. Start the server with `npm start` (or `node server.improved.js`).
2. Open your browser to `http://localhost:3000`.
3. Use the form to add meals. All fields are required.
4. Use the table to view, edit, or delete meals. Navigate between days using the arrow buttons above the table.
5. The table always shows the current state of the data on the server.

## Technical Achievements

- **Single-page dynamic update:** The app uses JavaScript fetch and DOM manipulation to update the table without reloading the page.
  - _Challenge:_ Ensuring the table always reflected the latest server state after every operation required careful coordination between client and server, especially with asynchronous fetch calls.
- **Server-side grouping and derived fields:** Meals are grouped by date on the server, and the total calories per day are calculated and sent to the client.
- **RESTful endpoints:** The server supports adding, editing, and deleting meals with clear endpoints (`/submit`, `/update`, `/delete`).
  - _Challenge:_ Designing endpoints to be stateless and robust, and ensuring the client always receives the correct, updated data after each operation.
- **Form validation:** The client prevents submission of incomplete forms.
- **Date field:** The date field for each meal is added by the server.

### Design/Evaluation Achievements

- **Responsive layout:** The app uses Flexbox for a clean, responsive layout that works on both desktop and mobile.
- **User-friendly navigation:** Users can easily switch between days and see their meal history.
  - _Challenge:_ Managing the current date, handling edge cases (like no meals for a day), and keeping navigation intuitive was tricky.
- **Live feedback:** The table updates instantly after any change, always reflecting the server's state.
  - _Challenge:_ Making sure the UI always matched the server data after every operation required careful fetch logic and error handling.

### Testing the User Interface

- **User:** Vieira

  - **What problems did the user have with your design?**
    - She did not like that the calories did not get automatically calculated.
    - She also said the date navigation was confusing.
  - **What comments did they make that surprised you?**
    - She said she appreciated the form validation.
  - **What would you change about the interface based on their feedback?**
    - I would change how to navigate between different dates and use an external API to calculate calories, so that users don't have to enter them manually.

- **User:** Paiva
  - **What problems did the user have with your design?**
    - He also did not like the date navigation.
  - **What comments did they make that surprised you?**
    - He appreciated that the calorie totals updated instantly after editing a meal.
    - He also appreciated the clear button in the form.
  - **What would you change about the interface based on their feedback?**
    - Change the date navigation so that it would use a date picker.
    
