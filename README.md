# NFC Health Web

A modern web application for managing and sharing patient health information via NFC (Near Field Communication) technology.

## Overview

NFC Health Web is a secure platform that allows patients to store and share critical medical information through NFC-enabled cards or devices. Healthcare providers and emergency responders can quickly access essential patient data without internet connectivity.

## Features

- **Patient Profile Management**: Store and manage patient health records
- **Emergency Contact Information**: Quick access to emergency contacts
- **Medical Conditions**: Track active medical conditions
- **Medications**: Maintain a list of current medications
- **Allergies**: Document allergies for safety-critical information
- **NFC Token Sharing**: Generate secure tokens for sharing health information
- **Rate Limiting**: API protection against abuse
- **Secure Sessions**: Patient authentication and session management

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) - React with server-side rendering
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Database**: Configured in [lib/db.ts](lib/db.ts)
- **Cryptography**: Custom crypto utilities in [lib/crypto.ts](lib/crypto.ts)

## Project Structure

```
nfc-health-web/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── cards/generate/      # Card generation endpoints
│   │   └── patients/            # Patient data endpoints
│   ├── dashboard/               # Dashboard pages
│   │   └── profile/            # User profile page
│   ├── p/[token]/              # Dynamic patient share page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/                 # Reusable React components
│   ├── AllergyCard.tsx
│   ├── ConditionList.tsx
│   ├── EmergencyContactRow.tsx
│   ├── InfoGrid.tsx
│   └── MedicationList.tsx
├── lib/                        # Utility functions
│   ├── crypto.ts              # Cryptographic utilities
│   ├── db.ts                  # Database connection
│   ├── ratelimit.ts           # Rate limiting logic
│   └── session.ts             # Session management
├── types/                      # TypeScript type definitions
│   └── patient.types.ts
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── next.config.mjs            # Next.js configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dokiwitw/Medcase_nfc.git
cd nfc-health-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local  # If available
```

Configure any required environment variables for database, authentication, etc.

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building

Build for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

### Testing

Run tests (if configured):
```bash
npm test
```

## API Endpoints

### Generate NFC Card
- **POST** `/api/cards/generate` - Generate a new NFC card token for sharing patient data

### Patient Data
- **GET/POST** `/api/patients` - Retrieve or update patient information

## Components

### AllergyCard
Displays patient allergies in a card format with clear visual indicators.

### ConditionList
Lists active medical conditions affecting the patient.

### EmergencyContactRow
Shows emergency contact information in an organized table row.

### InfoGrid
Grid-based layout for displaying various patient information sections.

### MedicationList
Displays current medications and dosage information.

## Security Considerations

- All patient data is encrypted using utilities in [lib/crypto.ts](lib/crypto.ts)
- Sessions are managed securely in [lib/session.ts](lib/session.ts)
- API rate limiting prevents abuse in [lib/ratelimit.ts](lib/ratelimit.ts)
- NFC tokens provide secure, time-limited access to patient data

## Environment Variables

Create a `.env.local` file with the following (example):
```
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=your_database_url
SESSION_SECRET=your_session_secret
```

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact the development team or open an issue on [GitHub](https://github.com/dokiwitw/Medcase_nfc).

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Type-safe with [TypeScript](https://www.typescriptlang.org/)
