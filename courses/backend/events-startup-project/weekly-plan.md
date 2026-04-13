# Weekly Plan

This document outlines the expected weekly progress and milestones for completing the backend project.
The structure aligns with the Product Requirements Document (PRD), Shared API Contract, and Technical Specification.

The goal is to progressively implement a fully functional, contract-compliant API with proper documentation, testing, and deployment.

---

## Week 1 Sprint – Core Data Modeling (DB week 1)

### Week 1 Goal

Design and implement the foundational database schema for users and catalog entities.

### Week 1 Tasks

- [ ] Review the Product Requirements Document (PRD)
- [ ] Design ERD (v1) including:
  - `user`
  - `{domain}_item` (e.g. `event`)
- [ ] Implement PostgreSQL schema with:
  - Primary keys
  - Foreign keys (where applicable)
  - Proper constraints
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
- [ ] Implement all foreign key relationships
- [ ] Enforce “one active cart per user” rule
- [ ] Implement SQL queries for:
  - Paginated item listing (`LIMIT`, sorting)
  - Cart subtotal calculation
  - Order totals snapshot logic
- [ ] Update ERD (v2)
- [ ] Add seed updates if needed

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
  - `GET /api/{domain}` (paginated)
  - `GET /api/{domain}/search`
  - `GET /api/{domain}/{id}`
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
- [ ] Implement order endpoints:
  - `GET /api/orders`
  - `GET /api/orders/{orderId}`
- [ ] Implement database transaction for:
  - Converting active cart → order
  - Creating order items
  - Clearing/replacing active cart
- [ ] Finalize error handling across all routes
- [ ] Complete Swagger documentation
- [ ] Finalize Postman collection
- [ ] Deploy:
  - Database
  - API service
  - Swagger documentation

### Week 5 Outcome

- Fully functional contract-compliant backend
- Checkout flow transactional and stable
- Orders history available
- Swagger/OpenAPI docs accurately reflect the implemented API
- API + DB deployed
- Postman collection complete
