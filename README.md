# Hue Yomi Portfolio Blog

A modern portfolio and blog website built with Next.js 15, TypeScript, and Chakra UI.

## Features

- 🚀 Built with Next.js 15 and App Router
- 💎 TypeScript for type safety
- 🎨 Chakra UI for beautiful, accessible components
- 📱 Fully responsive design
- ⚡ Fast and optimized performance
- 🔍 SEO-friendly
- 📝 Blog functionality
- 💼 Portfolio showcase
- 📧 Contact form

## Tech Stack

- **Framework:** Next.js 15.2.4
- **Language:** TypeScript
- **UI Library:** Chakra UI 2.8.2
- **Icons:** React Icons 5.0.1
- **Animation:** Framer Motion 11.0.5
- **HTTP Client:** Axios 1.6.7

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hueyomi-portfolio-blog
```

2. Install dependencies:
```bash
yarn install
```

3. Run the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── about/          # About page
│   ├── blog/           # Blog listing page
│   ├── contact/        # Contact page
│   ├── projects/       # Projects showcase page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/         # Reusable components
│   └── Layout.tsx      # Main layout component
├── styles/             # Styling files
│   ├── globals.css     # Global styles
│   └── theme.ts        # Chakra UI theme
├── types/              # TypeScript type definitions
│   └── index.ts        # Common types
└── utils/              # Utility functions
    └── index.ts        # Helper functions
```

## Customization

### Theme
Customize the Chakra UI theme in `src/styles/theme.ts` to match your brand colors and preferences.

### Content
- Update the homepage content in `src/app/page.tsx`
- Modify the about page in `src/app/about/page.tsx`
- Add your projects to `src/app/projects/page.tsx`
- Customize contact information in `src/app/contact/page.tsx`

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.