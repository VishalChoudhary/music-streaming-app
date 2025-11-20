# 🎵 MusicStream

### A Modern Music Streaming Web App


A modern, fully responsive music streaming web application built using **Next.js 14**, **TypeScript**, **Redux Toolkit**, **TanStack Query**, and **shadcn/ui**, featuring real-time previews via the iTunes Search API.

## 🔧 Setup & Installation

### 1️⃣ Clone the Repository

``` sh
git clone git@github.com:VishalChoudhary/music-streaming-app.git
cd music-streaming-app
npm install
```

## 2️⃣ Environment Variables

Create a **.env.local** file in the project root:

    # iTunes API (Free + No Auth Required)
    NEXT_PUBLIC_API_URL=https://itunes.apple.com/search

> ✔ The iTunes Search API is completely free and requires **no API
> key**.

## 3️⃣ Run the Development Server

``` sh
npm run dev
```

Then open:

http://localhost:3000

## Features
**Real music previews** from iTunes API  
**Dark/Light mode toggle**  
**Fully responsive design**  
**Skeleton loading states**  
**Infinite scroll** (pagination)  
**Full Playback Controls** - Play, pause, next, previous, and seekbar  

## Tech Stack
Next.js 14 (App Router) + TypeScript  
Redux Toolkit - State management  
TanStack Query - Data fetching  
shadcn/ui + Tailwind CSS - UI components  
iTunes Search API - Music data  

## 📁 Project Structure

    src
    ├── app                   # Next.js App Router
    ├── components
    │   ├── ui                 # shadcn/ui components
    │   ├── layout             # Header, Footer, ThemeToggle
    │   ├── music              # Player, SongCard, ArtistCard
    │   └── home               # Home page sections
    ├── store                  # Redux store & slices
    ├── hooks                  # Custom hooks (useSongs, usePlayer)
    ├── lib                    # Utility functions & API calls
    └── types/                 # TypeScript types