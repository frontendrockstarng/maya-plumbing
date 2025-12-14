# Setup Instructions

## Important: Node Version Requirement

This project requires **Node.js 20.19+ or 22.12+** because it uses Rolldown Vite. If you're on Node.js 20.11.1, you have two options:

### Option 1: Upgrade Node.js (Recommended)

1. Download and install the latest Node.js version from https://nodejs.org/
2. Verify installation: `node --version`
3. Run the development server: `npm run dev`

### Option 2: Use Standard Vite

If you cannot upgrade Node.js, you can switch to standard Vite:

1. Edit `package.json` and change:
   ```json
   "vite": "npm:rolldown-vite@7.2.5"
   ```
   to:
   ```json
   "vite": "^6.0.0"
   ```

2. Remove the overrides section completely

3. Delete `node_modules` and `package-lock.json`:
   ```bash
   Remove-Item -Recurse -Force node_modules, package-lock.json
   ```

4. Reinstall dependencies:
   ```bash
   npm install
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Adding Your Hero Image

1. Place your hero image (the one from your Figma design showing the plumber with the Maya Plumbing van) in:
   `public/images/hero-plumber.jpg`

2. The image should be:
   - Format: JPG or PNG
   - Recommended size: 1200x800px minimum
   - Optimized for web (compressed but high quality)

## Running the Project

Once dependencies are installed and your Node version is compatible:

```bash
npm run dev
```

The site will be available at http://localhost:5173 (or another port if 5173 is in use).

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Testing Production Build Locally

```bash
npm run preview
```

This serves the production build locally so you can test it before deploying.

## Troubleshooting

### "styleText is not exported from node:util"

This error means your Node.js version is too old. Follow Option 1 or Option 2 above.

### Port already in use

If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual URL.

### Missing images

If you see broken images, make sure you've added `hero-plumber.jpg` to the `public/images/` directory.

