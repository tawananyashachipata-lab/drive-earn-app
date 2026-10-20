# Drive & Earn App

#  African Unicorn TakeOFF — Driver Onboarding System

## About the Project

African Unicorn TakeOFF is a driver onboarding web application designed to simplify and streamline the process of registering drivers onto a transport platform.

The system provides a digital onboarding experience where drivers can submit their information and required details, helping make the registration process more organized and efficient.

The project uses modern web technologies and Supabase to support data management and backend functionality. It also integrates eSMS Africa to support SMS notifications.

##  Key Features

- **Driver Registration:** Collects driver information through an online onboarding process.
- **Form Validation:** Helps ensure that submitted information meets the required input rules.
- **Database Integration:** Uses Supabase to manage and store application data.
- **SMS Notifications:** Integrates with eSMS Africa to support sending SMS messages through a Supabase Edge Function.
- **Responsive Interface:** Designed to provide a user-friendly experience across different screen sizes.

##  Technologies Used

- **React** — Building the user interface.
- **Vite** — Frontend development server and build tool.
- **TypeScript** — Type-safe JavaScript development.
- **Supabase** — Backend services and database integration.
- **Supabase Edge Functions** — Server-side functionality for SMS integration.
- **eSMS Africa** — SMS messaging service.
- **Git & GitHub** — Version control and project collaboration.

##  Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd take-off-driver-onboarding
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and configure your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL displayed in your terminal.

## 🔐 Environment Variables

The application uses environment variables to configure its connection to Supabase.

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase publishable/anonymous key |

**Security note:** Never commit real secrets, service-role keys, or SMS API credentials to GitHub. Keep sensitive credentials in secure environment settings or Supabase Edge Function secrets.

##  Project Objectives

- Digitize the driver registration process.
- Improve the organization of driver onboarding information.
- Provide a simple and accessible registration experience.
- Integrate backend services and SMS functionality.
- Apply modern frontend and backend development practices to a practical project.

##  Future Improvements

- Add driver onboarding progress tracking.
- Improve registration feedback and error handling.
- Expand document verification capabilities.
- Add an administrative dashboard for reviewing applications.
- Enhance SMS notifications and delivery status tracking.

##  Developer

**Tawananyasha Chipata**

Software Development Student | Aspiring Software Developer

Interested in frontend and backend development, building practical applications, and learning modern software technologies.

---

*African Unicorn TakeOFF Driver Onboarding — making driver registration more organized through technology.*
