# Gather UI Prototype

Gather is a warm, bilingual social-experience prototype for German- and Persian-speaking people in Germany. The design focuses on the emotional questions behind participation: Who will be there? Will I feel welcome if I come alone? Can I trust the host? What will happen before and after booking?

The visual system uses restrained indigo, coral and teal accents, warm backgrounds, soft elevation and generous spacing. Experience cards show social context and trust without exposing private participant information. German uses a left-to-right layout with Manrope; Persian uses a fully mirrored right-to-left layout with Vazirmatn.

## Project structure

```text
gather/
├── index.html
├── explore.html
├── experience-details.html
├── booking.html
├── booking-confirmation.html
├── my-bookings.html
├── profile.html
├── host-profile.html
├── host-dashboard.html
├── create-experience.html
├── login.html
├── register.html
├── ui-states.html
├── assets/
│   ├── css/main.css
│   ├── icons/favicon.svg
│   ├── js/app.js
│   └── scss/
│       ├── main.scss
│       ├── abstracts/
│       ├── base/
│       ├── components/
│       ├── layout/
│       └── pages/
├── scripts/check-links.js
├── package.json
└── README.md
```

## Run locally

1. Install Node.js 18 or newer.
2. Run `npm install`.
3. Compile SCSS with `npm run build:css`.
4. Start the server with `npm run serve`.
5. Open `http://localhost:4173`.

The HTML pages also work when opened directly in a browser. A local server is recommended. During SCSS development, use `npm run watch:css`. Validate local links and fragments with `npm run check:links`.

## Prototype interactions

- German/Persian language switching with complete LTR/RTL changes
- Responsive mobile menu, bottom navigation and filter drawer
- Favourite actions and accessible toast feedback
- Booking tabs, accordions and grid/list results
- Accessible report, review, preview and confirmation dialogs
- Five-step guest booking flow
- Twelve-step host experience form
- Form validation and password visibility
- Full state catalogue on `ui-states.html`

## Assumptions

- Gather is a temporary name and the wordmark is deliberately simple.
- Frankfurt is the default location; examples also include Berlin, Cologne and the Rhine Valley.
- Authentication, payments, maps, messaging, uploads and persistence are simulated. There is no backend.
- Lifestyle imagery uses fixed Unsplash URLs. The interface remains usable if images are unavailable.
- The demo guest is Amir, and the demo verified host is Leila.
- Sample prices do not define a final business model.

## Quality checklist

- [x] Semantic HTML landmarks and ordered headings
- [x] Modular SCSS, BEM classes and logical properties
- [x] Complete German LTR and Persian RTL content
- [x] Language, direction, labels, placeholders, alt text and ARIA labels update together
- [x] Responsive layouts for 360, 430, 768, 1024 and 1440 pixels
- [x] Mobile navigation, filter drawer and sticky booking action
- [x] Keyboard navigation, focus indicators and modal focus handling
- [x] Accessible labels and bilingual validation messages
- [x] Hover, focus, active and disabled states
- [x] Reduced-motion support
- [x] Trust, privacy, verification, cancellation, reporting and blocking concepts
- [x] Loading, empty, error, payment, sold-out, cancelled, pending and draft states
- [x] Connected guest and host journeys
- [x] Automated local-link and fragment validation

## Angular migration readiness

The BEM-oriented components and centralized interaction hooks map to later Angular components such as `GatherHeader`, `ExperienceCard`, `ParticipantPreview`, `BookingStepper`, `HostDashboard`, `ExperienceForm`, `Modal` and `Toast`. Localization currently uses `data-de` and `data-fa`; these values can later move into Angular translation resources without changing the visual structure.
