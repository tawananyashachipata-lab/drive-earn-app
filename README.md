# Drive & Earn App

Build a modern, responsive TakeOFF-inspired transportation and delivery website focused on driver onboarding.

Goal

Create a polished website where people can:

Learn what TakeOFF is.

Choose between becoming a Driver or using TakeOFF as a Customer.

Complete a simple Driver Onboarding process.

See the benefits and requirements of becoming a TakeOFF driver.

The design should feel like a real African mobility/delivery startup: modern, trustworthy, simple, youthful, and professional.

Tech Stack

React

TypeScript

Vite

Tailwind CSS

React Router

Use reusable components

Use clean, maintainable code

Make the website fully responsive for desktop, tablet, and mobile.

Brand / Visual Style

Use a clean modern design inspired by transportation and delivery apps.

Colors:

Primary: deep/dark blue

Secondary: bright green

White backgrounds

Dark text

Light gray sections

Use green for success states and completed onboarding steps.

Use rounded cards, subtle shadows, clear buttons, clean typography, and modern spacing.

Do NOT make the interface overly complicated.

PAGE 1 — HOME

Create a homepage with:

Navbar

Logo:
TakeOFF

Navigation:

Home

How It Works

Drivers

About

Contact

Buttons:

Sign In

Become a Driver

On mobile, use a hamburger menu.

Hero Section

Headline:

Move. Deliver. Earn with TakeOFF.

Supporting text:

Join TakeOFF and connect with customers who need reliable rides and deliveries.

Primary button:
Become a Driver

Secondary button:
Explore TakeOFF

Include a modern hero image/illustration showing a driver using a vehicle or making a delivery.

How TakeOFF Works

Create 3 simple cards:

Sign Up
Create your TakeOFF driver account.

Get Verified
Submit your required information and documents.

Start Earning
Once approved, start accepting rides and deliveries.

Why Drive With TakeOFF?

Create 4 cards:

Flexible working hours

Earn from rides and deliveries

Easy-to-use driver platform

Grow your income

Driver CTA

Large section:

Ready to start earning?

Text:
Join TakeOFF as a driver and become part of a growing mobility and delivery community.

Button:
Start Driver Registration

Footer

Include:

TakeOFF logo

About

Drivers

Contact

Terms & Conditions

Privacy Policy

Social media icons

Copyright

PAGE 2 — DRIVER ONBOARDING

Create a dedicated multi-step driver registration flow.

At the top show:

Become a TakeOFF Driver

Progress indicator:

Step 1 — Personal Information
Step 2 — Vehicle Information
Step 3 — Documents
Step 4 — Review
Step 5 — Submitted

Use a clean card-based form.

STEP 1 — PERSONAL INFORMATION

Fields:

First Name

Last Name

Phone Number

Email Address

Date of Birth

Residential Address

Dropdown:
City

Options:

Harare

Bulawayo

Mutare

Gweru

Other

Button:
Continue

Validate required fields.

STEP 2 — VEHICLE INFORMATION

Title:

Tell us about your vehicle

Fields:

Vehicle Type

Car

Motorcycle

Van

Truck

Vehicle Make

Vehicle Model

Vehicle Year

Registration Number

Vehicle Color

Checkbox:

I confirm that I am legally allowed to operate this vehicle.

Buttons:
Back
Continue

STEP 3 — DOCUMENTS

Title:

Upload your documents

Create upload cards for:

Driver's Licence

National ID

Vehicle Registration

Vehicle Insurance

Each upload component should show:

Upload button

File name after upload

Upload status

Remove button

Add a notice:

Your documents will only be used for verification purposes.

Buttons:
Back
Continue

For the prototype, uploaded files can be stored locally or represented using mock upload functionality.

STEP 4 — REVIEW

Show a summary of all information entered.

Sections:

Personal Information

Show the driver's details.

Vehicle Information

Show vehicle details.

Documents

Show uploaded document names and verification status.

Include an Edit button beside each section.

Add checkbox:

I confirm that the information I provided is accurate and complete.

Button:

Submit Application

STEP 5 — SUCCESS

After submission, show a professional success screen.

Large success icon.

Heading:

Application Submitted!

Message:

Thank you for applying to become a TakeOFF driver. Our team will review your application and contact you once your verification is complete.

Show:

Application ID: TO-XXXXXX

Buttons:

Back to Home
View Application Status

PAGE 3 — DRIVER DASHBOARD

Create a simple dashboard that appears after a driver has completed onboarding.

Sidebar navigation:

Dashboard

My Profile

Documents

Application Status

Earnings

Help

Logout

Dashboard cards:

Application Status
Pending Verification

Documents
4/4 Submitted

Profile
Complete

Earnings
$0.00

Include a status timeline:

Application Submitted → Documents Reviewed → Approved → Ready to Drive

PAGE 4 — HOW IT WORKS

Create a simple page explaining:

For Drivers

Register

Submit documents

Get verified

Start accepting rides and deliveries

Earn

For Customers

Request a ride or delivery

Get matched with a driver

Track your trip

Complete your journey

PAGE 5 — ABOUT

Create an About page explaining that TakeOFF connects customers with drivers for transportation and delivery services.

Keep the copy concise and professional.

Include sections:

Our Mission

What We Do

Drivers

Customers

Community

PAGE 6 — CONTACT

Create a contact page with:

Full Name

Email

Phone Number

Message

Button:
Send Message

Also show contact information cards for:

Support

Driver Support

Business Enquiries

FUNCTIONAL REQUIREMENTS

Make the prototype interactive.

The following must work:

Navbar navigation

React Router page navigation

Become a Driver button opens onboarding

Multi-step onboarding

Next/Back buttons

Form validation

Progress indicator updates with each step

Uploaded document names appear in the form

Review page displays entered information

Submit application displays success screen

Dashboard can be opened after submission

Responsive mobile navigation

Buttons should have hover states

Forms should have clear error messages

Required fields should be validated

Use mock/local state for now. Do not require a real backend.

Important

Do NOT copy TakeOFF's exact website code, proprietary assets, or copyrighted images.

Create an original interface that is inspired by the concept of TakeOFF as a ride and delivery platform, while keeping the branding and UX suitable for a student prototype.

Make the final website look polished enough for a portfolio/Uncommon student presentation.

Before finishing, make sure there are no broken routes, console errors, or non-functional buttons.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
