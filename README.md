# Yash Vala — Lead Generation & UI/UX Portfolio

A premium, responsive and accessible personal portfolio for an early-career **UI/UX Designer** with supporting **Lead Generation** experience.

The project uses only HTML5, CSS3 and Vanilla JavaScript. There are no frameworks, npm packages, build tools or installation steps. Open `index.html` directly or deploy the folder to GitHub Pages or Vercel.

## 1. Project Overview

Included features:

- Premium dark theme and optional light theme
- Responsive hero and bento-style layouts
- UI/UX and Lead Generation experience timeline
- Three clearly labeled demo UI/UX case studies
- Lead Generation campaign case study with honest placeholder metrics
- Accessible project filters and keyboard-friendly modal
- Skills, tools, design process and value sections
- Frontend-only contact form with validation and `mailto`
- Theme preference saved in `localStorage`
- Mobile navigation and active section highlighting
- Scroll reveal using `IntersectionObserver`
- Copy email and back-to-top controls
- SEO metadata and Person JSON-LD
- Reduced-motion support
- Valid one-page placeholder resume PDF

## 2. Folder Structure

```text
yash-vala-portfolio/
│
├── assets/
│   ├── favicon.svg
│   ├── og-preview.svg
│   ├── profile-placeholder.svg
│   └── resume.pdf
├── index.html
├── styles.css
├── script.js
├── README.md
└── vercel.json
```

## 3. How to Open Locally

1. Extract the ZIP file.
2. Open the `uiux-leadgen-portfolio` folder.
3. Double-click `index.html`.
4. The website opens directly in your browser.

No installation or terminal command is required.

## 4. How to Run with VS Code Live Server

1. Open the project folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html`.
4. Choose **Open with Live Server**.

Live Server is optional because the website also works by opening `index.html` directly.

## 5. How to Upload to GitHub

1. Create a new empty repository on GitHub.
2. Extract this project.
3. Upload all files and the complete `assets` folder.
4. Keep `index.html` in the repository root.
5. Commit the files.

Optional Git commands:

```bash
git init
git add .
git commit -m "Add portfolio website"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

## 6. How to Deploy on Vercel

1. Upload the project to GitHub.
2. Sign in to Vercel.
3. Select **Add New Project**.
4. Import the GitHub repository.
5. Keep Framework Preset as **Other**.
6. Do not add a build command.
7. Do not add an output directory.
8. Click **Deploy**.

The included `vercel.json` is configured for a static website. No `package.json` is required.

## 7. How to Deploy on GitHub Pages

1. Upload the project to a GitHub repository.
2. Open repository **Settings**.
3. Select **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder.
6. Save.

All website asset paths are relative, so they work on GitHub Pages.

## 8. How to Replace Personal Details

Open `index.html` and find the editable block:

```html
<!-- EDITABLE CONTENT START -->
<!-- Replace name, experience and contact information here -->
<!-- EDITABLE CONTENT END -->
```

Search and replace these demo values:

- `Yash Vala`
- `YV`
- `Lead Generation Executive & UI/UX Designer`
- `yashvala709@gmail.com`
- `+91 98250 44511`
- `Ahmedabad, Gujarat, India`
- `https://www.linkedin.com/in/yash-vala-a03a59421/`
- `https://www.behance.net/yashvala5`
- `https://your-domain.com/`

Also update the same personal information in the Person JSON-LD block inside `<head>`.

## 9. How to Replace the Profile Image

### Keep the current filename

1. Prepare your portrait as an SVG.
2. Name it `profile-placeholder.svg`.
3. Replace the existing file in `assets`.

### Use JPG, PNG or WebP

1. Add the image to `assets`.
2. In `index.html`, find:

```html
<img src="assets/profile-placeholder.svg"
```

3. Change the path, for example:

```html
<img src="assets/profile-photo.webp"
```

Recommended portrait ratio: approximately **4:5**. Keep the optimized file under 300 KB where possible.

## 10. How to Replace Project Images

The three project previews are lightweight inline SVG illustrations inside `index.html`.

Search for:

- `finflow-title`
- `insight-title`
- `homeserve-title`

You can edit each SVG or replace the complete `<svg class="project-svg">...</svg>` block with:

```html
<img
  class="project-svg"
  src="assets/your-project-image.webp"
  alt="Description of the project interface"
  width="800"
  height="560"
  loading="lazy"
>
```

Keep width and height attributes to avoid layout shifts.

## 11. How to Replace `resume.pdf`

1. Export your real resume as PDF.
2. Rename it to `resume.pdf`.
3. Replace `assets/resume.pdf`.
4. Keep the same filename so no HTML changes are required.

## 12. How to Change Colors

Open `styles.css`. All main design controls are at the top under:

```css
/* =========================
   CUSTOMIZE DESIGN HERE
   ========================= */
```

Important variables include:

```css
--bg: #0b0d12;
--surface-solid: #151925;
--text: #f6f7fb;
--purple: #8b5cf6;
--blue: #6366f1;
--cyan: #22d3ee;
--accent-gradient: linear-gradient(...);
```

Dark and light theme variables are both located near the beginning of the file.

## 13. How to Change Social Links

In `index.html`, replace every occurrence of:

```text
https://www.linkedin.com/in/yash-vala-a03a59421/
https://www.behance.net/yashvala5
```

Also update the `sameAs` array in Person JSON-LD.

## 14. How to Add or Remove Projects

### Add a project

1. Duplicate a `<article class="project-card">` block in `index.html`.
2. Set its `data-category` value.
3. Give the case-study button a unique `data-project` key.
4. Add matching content to the `projects` object at the top of `script.js`.

Example:

```html
<button data-project="newproject">View Case Study</button>
```

```javascript
newproject: {
  type: "Mobile App",
  title: "Project Name",
  description: "Project summary",
  tools: ["Figma", "Prototype"],
  sections: [
    ["Problem", "Describe the problem."]
  ]
}
```

### Remove a project

1. Delete its project card from `index.html`.
2. Delete its matching object from `script.js`.

## 15. Quick Customization Checklist

- [ ] Replace name and initials
- [ ] Replace professional title and tagline
- [ ] Replace location, email and phone
- [ ] Replace LinkedIn and Behance links
- [ ] Replace profile image
- [ ] Replace demo resume PDF
- [ ] Replace demo experience content
- [ ] Replace demo projects with real work
- [ ] Update project modal content in `script.js`
- [ ] Replace Lead Generation placeholder metrics
- [ ] Update page title and meta description
- [ ] Update canonical and social preview URLs
- [ ] Update Person JSON-LD
- [ ] Review dark and light theme colors
- [ ] Test resume download
- [ ] Test contact form and email destination
- [ ] Test mobile layout before publishing

## Files You Need to Edit

### `index.html`

Update:

- Personal name, initials and title
- Hero tagline and introduction
- About content
- Experience details
- Project card content and preview SVGs
- Lead Generation case study and placeholder metrics
- Contact details and social links
- SEO meta tags and Person JSON-LD

### `styles.css`

Update the CSS variables at the top to change:

- Dark and light theme colors
- Accent gradient
- Border radii
- Shadows
- Spacing
- Maximum content width

### `script.js`

Update:

- Case-study modal content in the `projects` object
- Contact form destination email in the `mailto:yashvala709@gmail.com` line

### `assets/`

Replace:

- `profile-placeholder.svg`
- `resume.pdf`
- `favicon.svg` if your brand changes
- `og-preview.svg` for the real social preview

## Contact Form Behavior

The form validates fields in the browser and opens the visitor's default email application. It does not use a backend and does not claim that a server received the message.
