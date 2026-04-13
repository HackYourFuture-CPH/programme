# Requirements

## Product Requirements Document (PRD)

These requirements describe the overall functionality of the app. Some of these are already implemented in the current app (marked with a check), the rest will need to be implemented by you.

### 1. Browsing and Searching

- [x] 1.1 Users can view a basic list of events
- [ ] 1.2 Users can search and paginate through events
- [ ] 1.3 Users can view individual event details (date, time, venue, description)
- [ ] 1.4 Users can see ticket availability and pricing for an event

### 2. Authentication

- [x] 2.1 Unauthenticated users can browse events
- [ ] 2.2 Authenticated users can see their account, previous orders etc.
- [ ] 2.3 Unauthorized actions result in clear and actionable error to the user

### 3. Shopping Cart

- [x] 3.1 Users can add tickets to their shopping cart
- [ ] 3.2 Users can select ticket quantity when adding to cart
- [ ] 3.3 Items can be added, updated, or removed while in the cart
- [ ] 3.4 Cart is saved across the session (and beyond the session, if authenticated)

### 4. Checkout

- [ ] 4.1 A user must be authenticated to checkout
- [ ] 4.2 During checkout, the cart is finalized into an order, which can then no longer be changed

### 5. History and Review

- [ ] 5.1 Authenticated users can view a list of completed orders
- [ ] 5.2 Authenticated users can view a specific order and its details
- [ ] 5.3 Authenticated users can easily view and show their purchased tickets

### 6. Error Handling and UX

- [x] 6.1 Loading states are displayed while data is being fetched (Frontend only)
  - [ ] This is only implemented in the existing pages, you'll need to implement this for all the additions you make too!
- [ ] 6.2 Meaningful error messages are shared when actions fail
- [ ] 6.3 Form inputs are validated before submission (Frontend only)

### 7. Admin and Reporting (optional ideas)

These are NOT required, but if you're looking for a realistic new feature to implement as a stretch task, this is one to consider.

- [ ] 7.1 Admins can view ticket sales statistics per event (e.g. tickets sold, revenue)
- [ ] 7.2 Admins can see an overview of all events and their performance

## Technical Requirements

### Implementation

You should use the technologies, skills, tools, and stack you've learned throughout the course up until now. Here are some specific requirements that you must meet in your implementation:

- [ ] Database schema must be documented with an Entity-Relationship Diagram (ERD)
- [ ] Database must use PostgreSQL
- [ ] All database queries must use parameterized queries (no SQL injection vulnerabilities)

### API

We already have a very basic API in place, but it is missing many features that you will be required to implement. You can find the current API in the project template.
