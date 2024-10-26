# NoGravity UI

The **NoGravity UI** is the frontend for **NoGravity**, a ticket service for intergalactic travels. This React-based application offers a user interface for managing space journeys, enabling users to search for routes, book tickets, and manage their profiles.

The UI, though functional, is **still under development and lacks polished styling**. It provides the basic structure required to explore routes, book tickets, and manage user profiles, but the visual design and user experience are not fully complete.

## Project Overview

The **NoGravity UI** provides an interactive user experience for browsing routes, booking tickets, and navigating between pages in a simulated intergalactic travel service. Built with modern web technologies, this UI application offers minimal required functionality but demonstrates a modular and scalable structure for future expansion.

### Key Features

- **Route Search and Booking Wizard**: Users can search for intergalactic routes and book journeys with a multi-step booking wizard.
- **User Authentication**: Supports user login and sign-up forms, managing user sessions and authentication tokens.
- **Customizable Components**: Reusable components like `CustomButton` and `FormInput` enhance the consistency and usability of the UI.
- **Dynamic Data Management**: Context-based data management using React Context API for managing booking, route, and user data.
- **Responsive Design**: Ensures a seamless user experience across devices.

## Backend Link

The backend API repository for NoGravity can be found here: [NoGravity API](https://github.com/eugeneonufran/NoGravity_api).

## Getting Started

### Prerequisites

- Node.js
- npm (or yarn)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/eugeneonufran/NoGravity_ui.git
   cd NoGravity_ui
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Application**:

   ```bash
   npm start
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

### Usage

The NoGravity UI provides a user-friendly interface to explore routes, view ticket options, and handle bookings. Here are some of the main pages and components:

- **Home Page** (`Home.tsx`) - The main landing page with featured routes and promotional information.
- **Route Search Form** (`RouteSearchForm.tsx`) - Allows users to search for routes based on departure and destination planets.
- **Booking Wizard** (`BookingWizard.tsx`) - A step-by-step guide to help users book a journey with passenger and seat selection.
- **User Profile** (`Profile.tsx`) - Allows users to view and edit their account information.
- **LoginForm and SignUpForm** - Forms for user authentication, enabling login and registration.
- **SuperAdminPage** - A restricted page for administrative users to manage system-wide settings.

### Notable Components and Hooks

#### Components

- **BookingRoutes**: Displays available booking routes for easy navigation.
- **Navbar and Footer**: Navigation and footer components for consistent layout.
- **RouteSearchForm**: Form component that captures user inputs for searching available routes.
- **SeatMapForm**: Interactive seat selection during booking.
- **TicketsList**: Displays the list of booked tickets for the user.

#### Hooks

- **useFetch**: Custom hook for fetching data from APIs, ensuring modular and reusable data calls.
- **useLocalStorage** and **useSessionStorage**: Hooks for persisting user preferences and session information.
- **useValidateField**: Validates form fields dynamically, enhancing form reliability.

## Technology Stack

- **Language**: TypeScript (React)
- **Framework**: React
- **State Management**: React Context API
- **Styling**: CSS Modules and Styled Components
- **Build Tool**: Webpack
- **Deployment**: Configured for production builds

## Future Enhancements

The NoGravity UI provides a basic structure but is designed with scalability in mind. Future enhancements include:

- Additional route search filters (e.g., time, carrier, cost)
- Integration with backend API for dynamic data updates
- Improved seat mapping with real-time availability
- Expanded admin functionality for enhanced system management
- Improved styling and UI polish for a better user experience

## License

This project is licensed under the MIT License.
