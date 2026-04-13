# Weekly plan - Frontend project

Here is a guideline of the outcomes you should reach each week to stay on track.

**How this plan works:** Each week's tasks are aligned with that week's [React](/courses/frontend/react/README.md) learning goals and session content, and move the [Requirements](./requirements.md) forward in small steps. Scope is sized so it fits alongside other course assignments.
Throughout all weeks, build reusable components where possible and style your components and the whole UI.
The requirements in the [Requirements](./requirements.md) and this plan are the basis; you can always do more if you wish.

---

## Week 1 Sprint — Components & composition

**Goal:** Build the core UI structure for the event list and event detail without state or routing. Use mock data only (no fetch until Week 3).

**React focus:** Components, JSX, splitting into files, layout composition.

**PRD / spec:** Lay the structure for event list and event detail; no shared state or routing yet.

- [ ] **Event list structure:** Look into the existing EventList component, split it into smaller components (e.g. `EventCard`) in their own files. Keep the list working as it is. Use mock or hardcoded event data (no fetch yet).
- [ ] **Event detail page:** Add a dedicated event detail view (new component) that shows date, time, venue, and description for one event. Focus on layout and composition, not yet on routing.
- [ ] **Layout/nav:** Ensure you have a clear layout (e.g. header/nav, main content, footer) so adding cart, auth, or other elements later is straightforward.

**Outcome:** A composed event list (e.g. EventCard, EventList), a dedicated event detail view, and a clear layout ready for cart, auth, and navigation.

---

## Week 2 Sprint — State & conditional UI

**Goal:** Add ticket info and interactive UI using local state and conditional rendering; no cart yet (cart comes with Context in Week 4). Still use mock data (fetch comes in Week 3).

**React focus:** Props, `useState`, conditional rendering, rendering lists with `.map()`, lifting state.

**PRD / spec:** Ticket availability and pricing on the UI; no cart, no Context yet.

- [ ] **Ticket quantity & pricing display:** Show ticket availability and pricing on the event list and/or event detail using mock data (e.g. add price and availability fields to your mock events). Use conditional UI (e.g. "sold out" vs "X tickets left", price display).
- [ ] **Interactive detail state:** Add local state on event detail (e.g. quantity selector, expanded section, or tab) so you practice `useState` and controlled inputs. No cart or persistence yet.
- [ ] **Lifting state — list sort or filter:** Implement sort order and/or filter for the event list so that you must **lift state**: keep the sort/filter value (e.g. `sortBy`, `filterQuery`) in a parent component that renders both the control (e.g. in header or above the list) and the event list. Pass the state and setter down as props so both the control and the list react to the same state.
- [ ] **Conditional list UI:** Use conditional rendering for the list (e.g. empty state when there are no events or no matches).

**Outcome:** Ticket availability and pricing visible on list and/or detail; conditional UI for sold out/available; at least one interactive element using local state; sort or filter implemented with state lifted to a common parent and passed via props.

---

## Week 3 Sprint — Data fetching, forms & errors

**Goal:** Add search, pagination, loading/error handling, form validation, and auth form UIs (login, register). This week you switch from mock data to fetch: replace mock data with real API calls for the event list (and event detail if you fetch by id). The auth API/tool will be provided; you build the UI only.

**React focus:** `useEffect`, fetch, loading/error state; forms and validation.

**PRD / spec:** Search/pagination, loading/errors everywhere, form validation, auth forms.

- [ ] **Switch to fetch:** Replace mock event data with real API calls. Use `useEffect` and fetch.
- [ ] **Search & pagination:** Add search and pagination for the event list. Use query params with fetch; update the list when params change.
- [ ] **Loading & error states:** Ensure every place that fetches data (event list, event detail, and any new fetches) shows a loading state and a meaningful error message if the request fails.
- [ ] **Auth form UIs:** Build the UI for login, register, and sign out. Use the provided auth API/tool to wire submit actions. Add clear error/success feedback.
- [ ] **Form validation:** Do validation at least on the auth forms (login, register). Show clear messages for invalid input before submit.

**Outcome:** Event list and detail loaded via fetch instead of mock data; searchable, paginated list; loading and error states on all fetches; form validation at least on auth forms; login, register, and sign-out flows implemented in the UI and wired to the provided auth API/tool.

---

## Week 4 Sprint — Context, routing & persistence

**Goal:** Introduce cart and session via Context, define routes, and make the app auth-aware.

**React focus:** React Context, React Router. [Frontend spec](../frontend/technical-specification.md) requires Router + Context for cart and user session.

**PRD / spec:** Cart and user session in Context; distinct routes; auth-aware behaviour.

- [ ] **Cart Context:** Create a Cart Context (provider in app root) holding cart items and actions (add, update, remove). Build cart UI: list items, quantities, total, empty state. Session persistence can be e.g. `localStorage` + context.
- [ ] **Routes:** Use React Router with clear routes: event list, event detail, cart, login/register (or account), and (if you have them) checkout and orders. Link to cart and auth flows from where it is relevant.
- [ ] **Auth-aware UI:** Use the auth API/tool and session (e.g. Auth Context): show "account" / "orders" / sign out when the user is logged in; show login/register when not. Show a clear message when an action requires login (e.g. "You must be logged in to checkout").

**Outcome:** Cart in Context with full cart UI (add, remove, update quantity), distinct routes (e.g. list, detail, cart, auth, checkout/orders), and auth-aware UI wired to the provided auth API/tool.

---

## Week 5 Sprint — Checkout, orders & deploy

**Goal:** Complete checkout, order history, polish, and deploy the app.

**React focus:** Integration and deployment (e.g. Vite app on Vercel or Netlify).

**PRD / spec:** Checkout flow, order history, polish, deploy.

- [ ] **Checkout:** Implement checkout so that an authenticated user can turn the cart into an order (call API, clear cart, show success or error). Cart is no longer editable after order is created.
- [ ] **Order history:** For authenticated users, add an orders list and an order detail page (and "view my tickets" if the API supports it).
- [ ] **Polish:** Ensure loading and error handling and form validation are in place for all new flows.
- [ ] **Deploy:** Deploy the frontend to a public URL (e.g. Vercel, Netlify). Document the URL and how to run the app locally.

**Outcome:** Full checkout flow, orders list and detail, consistent loading/error/validation, and app deployed to a public URL.

---

## Summary

| Week | React focus                          | Events app focus                                                                               | PRD progress                 |
| ---- | ------------------------------------ | ---------------------------------------------------------------------------------------------- | ---------------------------- |
| 1    | Components, composition              | EventCard, event detail view, layout                                                           | 1.3 (detail)                 |
| 2    | State, conditional UI, lifting state | Ticket display, quantity/availability, interactive detail, sort/filter (lifted state); no cart | 1.4, 3.2, 3.3 (display only) |
| 3    | useEffect, forms                     | Search, pagination, loading, errors, validation, auth form UIs                                 | 1.2, 6.1, 6.2, 6.3, 2.2, 2.3 |
| 4    | Context, Router                      | Cart Context + cart UI, routes, auth-aware UI                                                  | 3.2, 3.3, 3.4, 4.1, spec     |
| 5    | Integrate & deploy                   | Checkout, orders, polish, deploy                                                               | 4.2, 5.1, 5.2, 5.3           |
