# 🧭 Product Requirements Document (PRD)

## Travel Planning & Visualization App

---

# 1. 🧠 Product Overview

### Product Name

Travel Buddy

### Vision

Build a visual, map-first travel planning application that allows users to easily discover, organize, and understand travel activities without feeling overwhelmed.

### Core Idea

Enable users to:

- Freely explore a destination on a map
- Save interesting places
- Visually organize them into a date-based itinerary
- Understand distance and logistics in real time

---

# 2. ❗ Problem Statement

Planning travel today requires:

- Jumping between apps (maps, blogs, videos)
- Difficulty understanding how far things are from each other
- Confusion around transportation and logistics
- Manual effort to organize plans by day

This leads to:

- Overwhelm and decision fatigue
- Poor itinerary planning
- Stress during trips

---

# 3. 👤 Target Users

### Primary User

**Casual Travelers**

- Enjoy exploring new places
- Want flexibility (not rigid planning tools)
- Prefer visual understanding over lists

### Secondary User

**Couples / Shared Travel**

- Plan trips together
- Want simple, intuitive coordination

---

# 4. 🎯 Product Goals

- Reduce friction in travel planning
- Provide a **map-first, visual experience**
- Enable fast discovery and saving of places
- Help users understand **distance + logistics**
- Create a tool usable for real-world trips

---

# 5. 🧩 Core Features

## 5.1 Authentication

- Supabase Auth integration
- Secure login/signup
- Session management

---

## 5.2 Dashboard

### Features:

- View all user trips
- **"Start New Vacation"** button

---

## 5.3 Trip Creation (Modal-Based)

### UX Flow:

User clicks **"Start New Vacation"** → Modal opens

### Inputs:

- Destination (city/country search)
- Start Date
- End Date
- Interests (destination-specific tags, e.g., "Harry Potter" for London, "Pokemon" for Japan)

### Behavior:

- On submit:
  - Trip is created
  - Days are auto-generated based on date range
  - User is redirected to **Exploration View**

### Why Interests at Trip Creation?

Interests vary by destination. A user may care about anime in Japan but historical sites in Rome. Capturing interests per-trip allows for personalized place recommendations.

---

## 5.4 Trip Data Model

### Trip

- id
- userId
- destination
- startDate
- endDate
- interests (array of strings, e.g., ["Harry Potter", "Fish & Chips"])
- createdAt

### Day

- id
- tripId
- date
- orderIndex

### SavedPlace

- id
- tripId
- placeId (external reference)
- name
- coordinates
- category
- addedAt

👉 Days are automatically generated from start → end date
👉 SavedPlaces live in the bucket until assigned to a day

---

## 5.5 Exploration View (CORE FEATURE)

The first screen users see after creating a trip. Designed for discovering and saving places.

### Layout:

- **Right (75%):** Interactive map with place pins
- **Left (25%):** Scrollable list of places

Map powered by Mapbox or Google Maps.

### Behavior:

- Map auto-loads centered on destination
- Places populate based on:
  - User's inputted interests (prioritized)
  - Popular/recommended spots in the area
- Clicking a pin or list item opens **Place Details**
- List and map are synced (clicking list item highlights pin, and vice versa)

### Filter Tags:

Users can filter places by category to avoid overwhelm:

- Food
- Attractions
- Nature
- Nightlife
- Shopping
- Events
- Culture

Interests (e.g., "Harry Potter") influence **which places appear and their ranking**, but filters are category-based for consistency.

### Place Cards:

- Name
- Rating
- Image
- Address
- Category tag
- External link ("View Website")
- **"Save to Trip"** button → adds to Saved Places bucket

---

## 5.6 Saved Places Bucket

A holding area for places the user wants to visit but hasn't assigned to a specific day yet.

### Behavior:

- Clicking "Save to Trip" instantly adds place to the bucket
- No prompts or day selection required during exploration
- Places remain in bucket until dragged into itinerary
- Bucket is trip-specific (context-aware)

### Purpose:

Allows users to freely explore and collect places without the cognitive load of deciding "which day?" in the moment.

---

## 5.7 Saved Places Panel (in Itinerary View)

### Layout:

- Horizontal scroll panel at top of Itinerary View screen

### Features:

- Displays all places from the Saved Places bucket
- Shows:
  - Name
  - Image
  - Rating

### Behavior:

- Drag places from this panel into day slots
- When added to itinerary → becomes **faded** (but still visible)
- Can be dragged to multiple days if needed (e.g., "visit twice")

---

## 5.8 Itinerary View (CORE FEATURE)

A separate view from Exploration, focused on organizing saved places into a day-by-day plan.

### Layout:

- **Top:** Saved Places panel (horizontal scroll)
- **Left:** Itinerary (day-based slots)
- **Right:** Live map showing selected day's places

### Navigation:

- User switches from Exploration View → Itinerary View via tab/button
- Can switch back to Exploration to save more places anytime

---

### Features:

#### Drag & Drop

- Drag places from Saved Places panel into specific days
- Reorder places within days
- Move places between days

#### Visual Feedback

- Pins appear on map for the selected day
- Lines connect locations in visit order
- Updates in real time as user reorders

#### Distance Awareness

- Show between each place:
  - Distance (km/miles)
  - Estimated travel time

---

### Goal:

Help users understand:

> "Are these activities realistically close together?"

---

## 5.9 Travel Prep Panel

Lightweight info section per trip:

Includes:

- Visa information links
- Transportation tips
- eSIM suggestions
- Useful local apps

---

# 6. 🔄 User Flow

1. User logs in
2. Opens dashboard
3. Clicks **"Start New Vacation"**
4. Modal: enters destination, dates, and interests
5. Trip is created with auto-generated days
6. **Exploration View** loads:
   - Map (75%) + place list (25%)
   - Places shown based on interests
7. User filters by category tags (Food, Attractions, etc.)
8. User saves interesting places to bucket
9. User switches to **Itinerary View**
10. Drags saved places into specific days
11. Uses map to visualize distances and adjust plan
12. Can return to Exploration to discover more places anytime

---

# 7. 🏗️ Technical Considerations

## Frontend

- Next.js
- Map integration (Mapbox recommended)
- Drag & drop (dnd-kit)
- State management (React Query / Zustand)

## Backend / Data

- Supabase (Auth + Database)
- PostgreSQL

## Data Strategy

- Fetch places via external API
- Cache/store key data:
  - Name
  - Coordinates
  - Rating
  - Image
  - External link

---

# 8. ⚡ MVP Scope

### Must Have

- Auth (Supabase)
- Trip creation with dates + interests
- Auto-generated itinerary days
- **Exploration View** (75/25 map + list layout)
- Category filter tags (Food, Attractions, Nature, etc.)
- Interest-based place prioritization
- Save places to bucket
- **Itinerary View** with drag & drop
- Map visualization (pins + connections + distance)

---

# 9. 🚀 Future Enhancements

- Hotel recommendations based on saved locations
- Shared/collaborative trips
- Smart clustering / route optimization
- AI-generated suggestions
- Offline travel mode

---

# 10. 📏 Success Criteria

- Users can plan a full trip visually
- Users understand distances between activities
- Planning feels intuitive and fast
- App is usable for real travel scenarios

---

# 11. 💼 Resume Positioning

Built a full-stack travel planning application featuring:

- Map-based exploration
- Date-driven itinerary system
- Drag-and-drop planning interface
- Real-time geospatial visualization
- Supabase authentication and database integration

---

# 12. ❤️ Personal Motivation

This product is inspired by real travel experiences where:

- Planning took too long
- Transportation systems were confusing
- It was difficult to organize activities spatially

The goal is to create a tool that makes travel planning:

- Simpler
- More visual
- Less stressful
