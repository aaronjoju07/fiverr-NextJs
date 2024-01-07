# Fiverr Clone App with Next.js

This project is a Fiverr clone app built with Next.js, featuring Firebase for authentication, Firestore for data storage, Chakra UI for styling, and Stripe for the payment gateway.

## Features

- **User Authentication:**
  - Sign up and log in using Firebase Authentication.
  - Secure authentication flow with token-based authentication.

- **Gig Listings:**
  - Display a list of available gigs.

- **User Profiles:**
  - Create and update user profiles.
  - View other users' profiles.

- **Ordering Gigs:**
  - Place orders for gigs.
  - View order history.

- **Payment Integration:**
  - Accept payments using Stripe.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download and install them from [Node.js official website](https://nodejs.org/).

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-aaronjoju07/fiverr-clone-nextjs.git
cd fiverr-clone-nextjs
npm install
```
# Configuration
#### Set up a Firebase project and obtain the configuration details (API Key, Auth Domain, etc.).
#### Create a .env.local file in the root of your project and add the Firebase and Stripe configuration:
# Firebase
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```
# Stripe
```baash
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your-stripe-public-key
```
# Tech Stack

  - Next.js: React framework for building web applications.
  - Chakra UI: React component library for building accessible and customizable UIs.
  - Firebase: Google's mobile and web application development platform.
  - Authentication: Firebase Authentication for user authentication.
  - Firestore: Cloud Firestore for storing and syncing data.
  - Stripe: Online payment processing for internet businesses.
