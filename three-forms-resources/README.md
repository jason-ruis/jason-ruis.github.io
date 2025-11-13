# Three Forms Resources

**Exploring the Riches of the Reformed Confessions**

A curated directory website for discovering resources related to the Three Forms of Unity: the Heidelberg Catechism, the Belgic Confession, and the Canons of Dort.

---

## 📖 Overview

Three Forms Resources is a dynamic, filterable directory featuring 263+ Reformed resources including:
- Books and study guides
- Commentaries and devotionals
- Sermon series and curricula
- Primary texts and articles
- Academic resources and more

The website provides an elegant, user-friendly interface for browsing, searching, and discovering materials to deepen understanding of the Reformed confessions.

---

## 🎨 Design & Branding

**Color Palette:**
- Navy (`#1C2A3A`) — trust, depth, tradition
- Brass/Gold (`#C49A47`) — richness, sacred value
- Cream (`#F7F4EE`) — clarity, calm background

**Typography:**
- Headings: *Lora* (serif) — classical elegance
- Body: *Inter* (sans-serif) — clean readability

**Visual Tone:** Warmly traditional yet modern and accessible, reminiscent of old theological volumes presented in a clean, web-native interface.

---

## 🚀 Features

### ✅ Implemented
- **Dynamic Resource Directory** — 263 resources loaded from CSV
- **Advanced Filtering** — Filter by confession (Heidelberg, Belgic, Canons, General)
- **Type Filtering** — Filter by resource type (books, commentaries, sermons, etc.)
- **Search Functionality** — Full-text search across titles, authors, descriptions, and tags
- **Responsive Design** — Fully mobile-friendly interface
- **Resource Cards** — Beautiful card-based layout with metadata, descriptions, and purchase links
- **Amazon Affiliate Integration** — Ready for affiliate links on eligible resources
- **Navigation System** — Quick access to confession-specific resources

### 🔮 Future Enhancements
- User accounts to submit or suggest resources
- Rating or recommendation system
- Integration with Christian bookstores or publishers
- API for church or seminary websites to pull directory data
- Blog or "Insights" section for Reformed content

---

## 📂 File Structure

```
three-forms-resources/
├── index.html                          # Main website page
├── styles.css                          # Stylesheet with brand colors and responsive design
├── app.js                              # JavaScript for CSV parsing, filtering, and search
├── three-forms-resources.csv           # Resource database (263 entries)
├── README.md                           # This file
├── three-forms-content-styleguide.md   # Content and design guidelines
├── three-forms-directory-website-build.md  # Original build instructions
└── research-phase-prompt.md            # Research documentation
```

---

## 🔧 How to Add New Resources

### Method 1: Direct CSV Editing

1. Open `three-forms-resources.csv` in a text editor or spreadsheet application
2. Add a new row with the following columns:
   - `id` — Unique identifier (e.g., "hc-author-title-year")
   - `title` — Full resource title
   - `authors` — Author name(s)
   - `resource_type` — Type: book, study_guide, commentary, sermon_series, curriculum, article, primary_text
   - `form` — Confession: Heidelberg, Belgic, Canons, or General
   - `summary` — 1-2 sentence description
   - `tags` — Pipe-separated keywords (e.g., "reformed|catechism|study")
   - `language` — Resource language
   - `date` — Publication year
   - `url` — Primary URL to access resource
   - `purchase_url` — Link to purchase page
   - `asin` — Amazon product ID (if applicable)
   - `amazon_affiliate_ready` — TRUE or FALSE
   - `recommended_for` — Semicolon-separated audience (e.g., "pastors;seminary;lay")
   - `image_url` — Optional thumbnail image URL
   - Other optional fields as needed

3. Save the CSV file
4. Refresh the website — changes will appear immediately

### Method 2: Future CMS Integration

Future versions may include:
- Admin dashboard for adding resources
- Form-based submission system
- Automated sorting and categorization

---

## 🖥️ Local Development

To run the website locally:

```bash
# Navigate to the directory
cd three-forms-resources

# Start a local server (Python 3)
python3 -m http.server 8080

# Or use Node.js
npx http-server -p 8080

# Open in browser
open http://localhost:8080
```

---

## 🌐 Deployment

The website is a static site and can be hosted on:
- GitHub Pages (recommended for this repository)
- Netlify
- Vercel
- Any static hosting service

**GitHub Pages Setup:**
1. Enable GitHub Pages in repository settings
2. Select the branch containing `three-forms-resources/`
3. Set the folder to `/three-forms-resources` or root if moved
4. Access via `https://[username].github.io/three-forms-resources/`

---

## 🔍 SEO Considerations

The website includes:
- Semantic HTML structure
- Descriptive meta tags and Open Graph data
- Clean, readable URLs
- Fast loading with minimal dependencies
- Mobile-responsive design
- Accessible markup with ARIA labels

**Future SEO Enhancements:**
- Schema markup for religious resources
- Blog/insights section for content marketing
- Sitemap generation
- Social sharing integration

---

## 💰 Affiliate Link Policy

**Ethics and Transparency:**
- Only affiliate links for reputable, confessional materials
- Clear disclosure in footer
- Theological fidelity prioritized over profit
- No promotion of resources solely for affiliate gain

**Current Status:** Amazon affiliate links are marked in the CSV with `amazon_affiliate_ready: TRUE` and will display "Buy on Amazon" buttons.

---

## 📊 Current Statistics

- **Total Resources:** 263
- **Confessions Covered:** 3 (Heidelberg, Belgic, Canons, plus General)
- **Resource Types:** 10+ categories
- **Languages:** Primarily English
- **Date Range:** 1561–2025

---

## 🛠️ Technical Details

**Built With:**
- Pure HTML5, CSS3, and vanilla JavaScript
- No framework dependencies
- Google Fonts (Lora + Inter)
- CSV-based data storage

**Browser Compatibility:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

**Performance:**
- Lightweight (~25KB total excluding CSV)
- Fast CSV parsing with custom parser
- Efficient filtering and search algorithms
- No external API calls

---

## 📞 Contact & Contributions

To suggest resources or report issues:
1. Add resources directly via CSV (if you have access)
2. Submit an issue or pull request on GitHub
3. Contact the site maintainer

---

## 📜 License & Credits

**Content:** Curated from public domain and copyrighted sources with proper attribution
**Code:** Custom development for Three Forms Resources
**Design:** Based on Three Forms Content Styleguide

---

## 🙏 Acknowledgments

This directory exists to serve the Church and support the study of Reformed confessions. All glory to God alone — *Soli Deo Gloria*.

---

**Built with ❤️ for the Reformed community**
