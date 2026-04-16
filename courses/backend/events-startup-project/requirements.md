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
- [ ] 3.4 Cart is persisted in the backend for both authenticated and unauthenticated users

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

- [ ] API routes must be documented with Swagger / OpenAPI
- [ ] A Postman collection must be included for the implemented API

## Implementation Clarifications

These clarifications define the minimum expectations for this project. They are intended to remove ambiguity while still leaving room for implementation choices.

### Naming Guidance

- Because the program often prefers singular table names, avoid reserved SQL words by using more specific names where needed.
- For example, prefer names such as:
  - `app_user` instead of `user`
  - `customer_order` instead of `order`
- If you choose plural naming in your own schema, that is also acceptable as long as the schema is consistent and clear.

### Minimum API Expectations

- The public listing route should be `GET /api/events`.
- Search should be implemented through query parameters on the listing route, for example `GET /api/events?q=music&page=1&pageSize=20`.
- A separate `/search` route is not required.
- `PUT /api/cart/items/{itemId}` and `DELETE /api/cart/items/{itemId}` should identify a specific cart line, not the event itself.
- In the default project route design, `{itemId}` is a single cart line identifier.
- If a trainee intentionally chooses a composite-key cart-line design, the route shape should be adjusted accordingly and documented clearly.
- The cart line should store a reference to the related event.

### Cart and Checkout Simplifications

- The cart is backend-persisted in all cases.
- A cart may belong either to an authenticated user or to an unauthenticated user.
- A simple schema approach is to allow `cart.user_id` to be nullable until the cart is associated with a logged-in user.
- The project should enforce the rule that each authenticated user has at most one active cart.
- A database-level approach such as a unique constraint or partial unique index is recommended where supported by the chosen schema design.
- Trainees are not required to implement advanced race-condition handling beyond a reasonable database-backed solution for this course project.
- Ticket inventory is intentionally treated as unlimited in this backend project.
- Because inventory is unlimited, stock validation and overselling prevention are not required.
- During checkout, the minimum required atomic behavior is converting the active cart into an order and preventing further modification of that finalized order.
- Price snapshotting into the order data is recommended, but the exact checkout internals may be kept simple unless the implementation defines stricter business rules.
