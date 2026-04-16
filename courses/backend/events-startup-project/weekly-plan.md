# Weekly Plan

This document outlines the expected weekly progress and milestones for completing the backend project.
The structure aligns with the Requirements document and the minimum API expectations documented in this project folder.

The goal is to progressively implement a fully functional backend API with proper documentation, testing, and deployment.

---

## Week 1 Sprint – Core Data Modeling (DB week 1)

### Week 1 Goal

Design and implement the foundational database schema for users and catalog entities.

### Week 1 Tasks

- [ ] Review the Product Requirements Document (PRD)
- [ ] Design ERD (v1) including:
  - `user`
  - `{domain}_item` (e.g. `event`)
- [ ] Naming hint: if you use singular table names, avoid reserved SQL words by choosing clearer names such as `app_user` instead of `user`
- [ ] Implement PostgreSQL schema with:
  - Primary keys
  - Foreign keys (where applicable)
  - Proper constraints
- [ ] Start planning which relationships are required and which foreign keys may need to be optional, for example a cart that can exist before it is bound to a user
- [ ] Add seed data for:
  - At least 1 test user
  - Multiple catalog items
- [ ] Implement and test basic SQL queries:
  - Get all items
  - Get item by ID
- [ ] Document ERD in the repository

### Week 1 Outcome

- Working PostgreSQL database
- ERD v1 committed
- Seeded data available
- Catalog data queryable directly via SQL

---

## Week 2 Sprint – Complete Database Structure (DB week 2)

### Week 2 Goal

Finalize database structure to support cart, checkout, and order flows.

### Week 2 Tasks

- [ ] Extend ERD to include:
  - `cart`
  - `cart_item`
  - `order`
  - `order_item`
- [ ] Continue to avoid reserved SQL words in the schema, for example by using names such as `customer_order` instead of `order`
- [ ] Implement all foreign key relationships
- [ ] Design the cart so it can be persisted for both authenticated and unauthenticated users
- [ ] Decide which foreign keys and columns are required versus optional, for example whether `cart.user_id` is nullable until a cart is attached to an authenticated user
- [ ] Enforce “one active cart per authenticated user” rule
- [ ] Choose a cart-line key strategy:
  - Project default: a simple single primary key such as `cartLineId`
  - Alternative design: a composite key such as (`cartId`, `lineNo`)
- [ ] Design note: if you choose the alternative composite-key design, make sure your later endpoint design reflects it clearly
- [ ] Implement SQL queries for:
  - Paginated item listing (`LIMIT`, sorting)
  - Cart subtotal calculation
  - Order totals snapshot logic
- [ ] Update ERD (v2)
- [ ] Add seed updates if needed
- [ ] Decide how the schema enforces one active cart per authenticated user

### Week 2 Outcome

- Complete database schema supporting full PRD flow
- ERD v2 finalized
- Cart and order data structures functional at SQL level

---

## Week 3 Sprint – Public API (NODE week 1: GET Only)

### Week 3 Goal

Expose public catalog endpoints and implement initial API documentation.

### Week 3 Tasks

- [ ] Set up Express application structure
- [ ] Connect application to PostgreSQL
- [ ] Implement public endpoints:
  - `GET /api/events` (paginated)
  - `GET /api/events/{id}`
- [ ] Support search through query parameters on `GET /api/events` (for example `?q=music&page=1&pageSize=20`)
- [ ] Implement pagination response format:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 245,
    "totalPages": 13
  }
}
```

- [ ] Implement standardized error format
- [ ] Add Swagger/OpenAPI documentation for public endpoints
- [ ] Start Postman collection (public endpoints)

### Week 3 Outcome

- Public catalog API functional
- Pagination working
- API documented via Swagger
- Postman collection includes public routes

---

## Week 4 Sprint – Authentication & Cart (NODE week 2: POST + Middleware)

### Week 4 Goal

Implement authentication and protected cart functionality.

### Week 4 Tasks

- [ ] Implement authentication endpoints:
  - `POST /api/auth/signup`
  - `POST /api/auth/login`
  - `GET /api/auth/me`
- [ ] Implement JWT-based authentication middleware
- [ ] Protect private endpoints
- [ ] Implement cart endpoints:
  - `GET /api/cart`
  - `POST /api/cart/items`
  - `PUT /api/cart/items/{itemId}`
- [ ] Treat `{itemId}` as the cart line identifier, not the catalog item identifier
- [ ] Project default: use the simple cart-line design with a single cart line id in routes such as `PUT /api/cart/items/{itemId}`
- [ ] Design note: if you intentionally choose the composite-key alternative from Week 2, your routes would typically become more explicit, for example `/api/carts/{cartId}/lines/{lineNo}`
- [ ] Support cart behavior for both guest and authenticated users using the backend-persisted cart model chosen in Week 2
- [ ] Validate request payloads
- [ ] Ensure consistent error responses
- [ ] Update Swagger documentation
- [ ] Extend Postman collection with auth + cart flows

### Week 4 Outcome

- JWT authentication functional
- Protected routes working
- Cart can be created and modified
- Documentation updated

---

## Week 5 Sprint – Checkout, Orders & Deployment (NODE week 3: PUT/DELETE + Transactions)

### Week 5 Goal

Complete private API, implement checkout transaction, and deploy.

### Week 5 Tasks

- [ ] Implement remaining cart endpoints:
  - `DELETE /api/cart/items/{itemId}`
  - `POST /api/cart/checkout` (transactional)
- [ ] Keep route design consistent with your cart-line key choice from Week 2
- [ ] Implement order endpoints:
  - `GET /api/orders`
  - `GET /api/orders/{orderId}`
- [ ] Implement database transaction for:
  - Converting active cart → order
  - Creating order items
  - Clearing/replacing active cart
- [ ] Keep checkout logic simple: inventory is treated as unlimited for this project
- [ ] Finalize error handling across all routes
- [ ] Complete Swagger documentation
- [ ] Finalize Postman collection
- [ ] Deploy:
  - Database
  - API service
  - Swagger documentation

### Week 5 Outcome

- Fully functional backend covering the minimum required project scope
- Checkout flow transactional and stable
- Orders history available
- Swagger/OpenAPI docs accurately reflect the implemented API
- API + DB deployed
- Postman collection complete
