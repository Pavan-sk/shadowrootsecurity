# ShadowRoot Security — Coming Soon Landing Page

A premium, minimalist Coming Soon landing page for **ShadowRoot Security** ([https://shadowrootsecurity.com](https://shadowrootsecurity.com/)).

This pre-launch website establishes the brand identity for a future cybersecurity academy providing hands-on labs, ethical hacking practice, security challenges, and practical learning experiences.

---

## 1. Visual & Brand Direction

* **Design Philosophy**: Editorial minimalism with generous whitespace, centered typography, and an original visual illustration.
* **Color Palette**:
  * **Warm Beige (`#F3EBDD`)**: Primary page background.
  * **Cobalt Blue (`#2455D6`)**: Headings, logo mark, links, and primary CTA button.
  * **Sun Yellow (`#FFD447`)**: Highlights, portal glow, digital nodes, and accents.
  * **Dark Ink (`#252A35`)**: Supporting text and silhouettes.
  * **Cream White (`#FFF9ED`)**: Subtle contrasting panels and badges.
* **Typography**: Space Grotesk for headlines and brand display; Inter for supporting text.
* **Original Vector Artwork**: An artistic portal/gateway representing the entrance to cybersecurity mastery, an integrated ShadowRoot Security emblem, circuit-like digital nodes, and floating learning pathways (`EXPLORE`, `LEARN`, `PRACTISE`, `CHALLENGE`).

---

## 2. Project File Structure

```text
.
├── CNAME               # GitHub Pages custom domain configuration (shadowrootsecurity.com)
├── favicon.svg         # Brand vector favicon
├── index.html          # Semantic HTML5 page structure and vector artwork
├── script.js           # Minimal vanilla JavaScript for modals and form validation
├── styles.css          # Minimalist stylesheet with design tokens and responsive rules
├── assets/
│   └── logo.svg        # Standalone vector brand lockup (shield mark + wordmark)
└── README.md           # Documentation, preview, and deployment guide
```

---

## 3. Local Preview

Preview the site locally using any standard static file server:

### Python (Built-in)
```bash
python3 -m http.server 8089
```
Then visit [http://localhost:8089](http://localhost:8089) in your web browser.

### Node.js
```bash
npx serve .
```

---

## 4. Connecting an Email Provider for Early Access

The "Stay Updated" modal validates emails client-side and provides honest status feedback.

When you are ready to connect a live mailing list or webhook provider (such as Formspree, Mailchimp, or a Cloudflare Worker):

1. Open `script.js`.
2. Locate `SUBSCRIBE_ENDPOINT`:
   ```javascript
   const SUBSCRIBE_ENDPOINT = ""; // Set to your endpoint URL
   ```
3. Set your webhook URL:
   ```javascript
   const SUBSCRIBE_ENDPOINT = "https://formspree.io/f/your_form_id";
   ```
4. Deploy the change. Submissions will automatically POST to your endpoint with success and error feedback states.

---

## 5. GitHub Pages Deployment

This static repository requires no build step and deploys directly:

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: fresh minimalist ShadowRoot Security coming soon website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. On GitHub, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder, then save.

---

## 6. Custom Domain Setup (`shadowrootsecurity.com`)

The repository includes the `CNAME` file configured with `shadowrootsecurity.com`.

In your DNS provider (e.g. Cloudflare, Namecheap, Google Domains):

### Apex Domain (`@` / `shadowrootsecurity.com`)
Add four `A` records pointing to GitHub Pages IP addresses:
* `185.199.108.153`
* `185.199.109.153`
* `185.199.110.153`
* `185.199.111.153`

### Subdomain (`www.shadowrootsecurity.com`)
Add a `CNAME` record:
* **Host**: `www`
* **Target**: `<your-github-username>.github.io`

### Enforce HTTPS
In GitHub repository **Settings > Pages**, enable **Enforce HTTPS** once DNS propagation is complete.

---

## 7. Ethics & Responsible Learning

ShadowRoot Security operates under a strict code of responsibility: *Learn responsibly. Test only with authorization.*
