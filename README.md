# Sanius Health Assignment

**Movie Explorer** is a React Native application developed for the Sanius Health technical assignment. It leverages The Movie Database (TMDB) APIs to deliver a seamless movie browsing experience, featuring dynamic movie lists, detailed views, and user-friendly enhancements like search and favorites. This project showcases API integration, responsive UI design, and performant features tailored for mobile users.

## Overview

This app integrates TMDB APIs to fetch and display movies across multiple categories, with a clean tabbed interface, detailed movie insights, and optional features like infinite scrolling and animations. Designed with scalability and user experience in mind, it overcomes regional API access challenges (e.g., TMDB blocks in India) through recommended workarounds.

---

## Features

### Core Functionality
- **API Integration**: Seamlessly connects to TMDB APIs:
  - **Now Playing**: Real-time movie releases.
  - **Popular**: Trending movies worldwide.
  - **Top Rated**: Highest-rated films.
  - **Upcoming**: Future releases to watch for.
- **Tabbed Navigation**: Intuitive switching between movie categories (Now Playing, Popular, Top Rated, Upcoming, Favourites).
- **Movie Listings**: Each movie card displays:
  - Poster image
  - Title
  - Release date
  - Star rating (visualized from TMDB’s vote average)
- **Detail View**: In-depth movie information, including:
  - Larger poster
  - Title and release date
  - Rating with star visualization
  - Synopsis
  - Favorite toggle

### Enhanced Features
- **Search**: Real-time movie search across all categories, optimized with debouncing.
- **Favourites**: Save and view favorite movies in a dedicated tab.
- **Infinite Scrolling**: Effortlessly load more movies as you scroll.
- **Animations**: Smooth fade-in effects for poster images, enhancing visual appeal.

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- Yarn or npm
- React Native CLI / Expo CLI
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/Aishwaryashetty/sanius-health-assignment.git
   cd sanius-health-assignment

### Install Dependencies
1. **Using NPM or Yarn**
   ```bash
   npm install
   yarn install

### Launch the App
1. **using NPM**
   ```bash
   npm start

## TMDB Access in India
### TMDB may be blocked in India. To resolve:
- DNS Switch: Use 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google). Guide.
- VPN: Employ a free VPN service as an alternative.

### How to Use
- Open the app to explore "Now Playing" movies by default.
- Switch tabs to browse other categories or view favorites.
- Search for movies using the top search bar.
- Tap a movie card for a detailed view; bookmark it to save as a favorite.
- Scroll down to load more movies or pull to refresh the list.

### Technical Highlights
- Framework: Built with React Native for cross-platform compatibility.
- Navigation: Utilizes React Navigation for tabbed and detail views.
- State: Managed via React Hooks (useState, useEffect, useCallback).
- Performance: Debounced search and infinite scrolling for efficiency.
- UX: Animated transitions using React Native’s Animated API.
- Error Handling: User-friendly alerts for API failures.
