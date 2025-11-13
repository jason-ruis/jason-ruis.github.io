GOAL
Perform an extremely comprehensive, authoritative web research sweep for resources related to the **Three Forms of Unity** (Heidelberg Catechism, Belgic Confession, Canons of Dordt). Produce one final CSV file named **three-forms-resources.csv** that contains all discovered resources, properly categorized and normalized for direct import into a directory website.

SCOPE & PRIORITY
- Include primary sources (official translations and canonical texts), classic and modern commentaries, books, curricula, study guides, devotionals, sermon series/lectures (audio/video), academic articles, theses, seminary syllabi/lecture notes, open-access PDFs, lesson plans, church pages, reputable blogs, and purchaseable items (Amazon, ChristianBook, publisher pages).
- Prioritize authoritative sources: publishers, seminaries, denominational sites, established ministries, JSTOR/academic hosts, Google Scholar traces for academic works, Project Gutenberg / Internet Archive for public domain texts, publisher product pages and Amazon product listings.
- Flag any item that is likely copyrighted and do NOT claim permission to host full text — instead record canonical link and rights/licensing info.
- Aim for maximum coverage: **target at least 300 total unique resources if available**, with a minimum goal of **~75 resources per Confession** (Heidelberg, Belgic, Canons) when possible. If fewer exist for a category, exhaustively list what is available and report counts.

OUTPUT FORMAT
Produce a UTF-8, comma-delimited CSV file exactly named: **three-forms-resources.csv**

CSV columns (must be present in this exact order). Use these exact column headers:
id,title,authors,resource_type,form,summary,tags,language,date,license_or_rights,url,canonical_url,purchase_store,purchase_url,asin,amazon_affiliate_ready,recommended_for,estimated_read_time_minutes,media_embed_url,image_url,notes,source_citation_site,source_citation_author,source_citation_date,source_citation_url,confidence_score,duplicate_of

java
Copy code

COLUMN DETAILS & RULES
- **id**: short unique id (kebab-case), e.g. `hc-q1-witsius-1800`
- **title**: full human-readable title
- **authors**: semicolon-separated list of authors/editors (use "Anonymous" or organization name where needed)
- **resource_type**: one of {primary-text, translation, commentary, book, study_guide, curriculum, devotional, sermon_audio, sermon_video, lecture_series, article, thesis, lesson_plan, pdf, web_page, podcast_episode, shop_item}
- **form**: one of {Heidelberg, Belgic, Canons, General} — choose the primary association; if relevant to multiple, use `General`
- **summary**: 1–2 sentence neutral description of the resource content and value
- **tags**: pipe-separated keywords (e.g., `Q1|sin|grace|beginner`)
- **language**: ISO language name (e.g., English, Dutch, German, Latin)
- **date**: YYYY-MM-DD if known, otherwise YYYY or blank
- **license_or_rights**: `public domain`, `CC-BY`, `CC-BY-SA`, `copyrighted` (include short note if e.g. "publisher permits excerpt")
- **url**: canonical link to where the resource can be accessed or purchased (prefer official publisher or canonical host)
- **canonical_url**: the single best/authoritative URL (same as url if only one)
- **purchase_store**: name of store if purchasable (Amazon, ChristianBook, Westminster, PublisherName), otherwise blank
- **purchase_url**: direct store URL for purchase listing (if applicable)
- **asin**: Amazon ASIN if found, otherwise blank
- **amazon_affiliate_ready**: `TRUE` or `FALSE`. TRUE if the purchase_url is a standard Amazon product page suitable for affiliate tagging. If TRUE, ensure ASIN present.
- **recommended_for**: semicolon-separated audience tags (pastors;lay;youth;seminary;teachers)
- **estimated_read_time_minutes**: numeric estimate for books/articles where reasonable, else blank
- **media_embed_url**: URL for embeddable media (YouTube/Vimeo embed link, SoundCloud) if applicable, else blank
- **image_url**: cover image or representative image URL (prefer publisher images or Wikimedia Commons) if available
- **notes**: any editorial note (e.g., "public domain scan available at Internet Archive", "translation quality: literal", "contains helpful study questions")
- **source_citation_site**: site name used as citation (e.g., "Crossway", "Project Gutenberg")
- **source_citation_author**: author or organization of the source page (if known)
- **source_citation_date**: date of the source page (YYYY-MM-DD or YYYY)
- **source_citation_url**: exact URL used to verify the resource (may match canonical_url)
- **confidence_score**: number 0–100 indicating your confidence this row is accurate and authoritative (explain in notes if <70)
- **duplicate_of**: if this row is a duplicate, place the `id` of the canonical row it duplicates; else blank

DATA QUALITY RULES
- **De-duplicate**: Merge clearly duplicate items (same ASIN, ISBN, or publisher product page). If duplicates remain, mark `duplicate_of`.
- **Validate URLs**: Ensure `url`, `canonical_url`, `purchase_url`, `media_embed_url`, and `image_url` are reachable (HTTP 200) at time of capture. If redirected, save final redirected URL as canonical_url.
- **ASIN / ISBN**: Where possible record ASIN (Amazon) and include ISBN in notes if available.
- **Licensing**: Where full text is public domain or CC-licensed, record license and include a link to the license. For copyrighted works, do not assume permission to host — record canonical purchase or publisher page.
- **Citation**: For each row include `source_citation_*` fields pointing to the page(s) you used to confirm details. If you used multiple pages, use the most authoritative one and mention the others in `notes`.
- **Language detection**: If a resource exists in multiple languages, create separate rows per language variant with the same id base (e.g., `hc-q1-witsius-en`, `hc-q1-witsius-nl`).

RESEARCH & DISCOVERY INSTRUCTIONS
- Search broadly (publisher sites, seminary pages, denominational sites, Project Gutenberg, Internet Archive, Google Books preview, Amazon product pages, WorldCat, JSTOR, Academia.edu, Google Scholar, YouTube/Vimeo, SoundCloud, library catalogs, large church websites).
- For academic works and theses, include university repository links when available.
- For sermons/lectures, prefer official church or seminary channels or stable video/audio hosting.
- For older classic commentaries (public domain), record Project Gutenberg / Internet Archive links if available and mark license as public domain.
- For each Amazon product discovered, capture ASIN and canonical Amazon URL. Mark `amazon_affiliate_ready=TRUE` only for standard product pages (not search results or blocked pages).

MINIMUMS & REPORTING
- Attempt to reach **≥300** total rows if the web holds that many unique, relevant resources. If fewer exist, capture everything you find and at the end include a short report (in plain text output preceding the CSV) listing:
  - Total resources found per form (Heidelberg / Belgic / Canons / General)
  - Number of public-domain texts vs copyrighted
  - Number of purchasable items with ASINs
  - Top 20 most authoritative sources used (site names + example URLs)

CSV CASE & ENCODING
- Output CSV must be UTF-8 with a header row exactly matching the column order above.
- Fields that contain commas or newlines must be quoted per CSV standard.

DELIVERABLES
1. A single file `three-forms-resources.csv` containing all rows and header.
2. A short plain-text summary (max 350 words) printed before the CSV (in Claude output) describing completeness, any obvious gaps, and next recommended steps (e.g., if permissions are needed to host PDFs).
3. A small JSON file `research-stats.json` with counts per form and counts for public-domain vs copyrighted vs purchasable-with-asin.

ACCEPTANCE CRITERIA
- CSV validates (proper header + rows) and opens in spreadsheet tools.
- No duplicate product ASINs exist as separate resources (duplicates must be merged).
- Every row has `source_citation_url` or a note explaining why not.
- At least 5 fully-complete example rows for each Confession are present.
- `confidence_score` > 70 for at least 75% of rows.

LEGAL & ETHICAL NOTES (MANDATORY)
- DO NOT host or claim permission to host copyrighted full texts without explicit license. For copyrighted books or articles, link to publisher/store and note rights.
- If you find a public-domain text or a publisher permitting hosting, mark license explicitly and provide link to the hosting location.
- Include an affiliate disclosure recommendation in the summary and flag which rows are affiliate-eligible.

FINAL INSTRUCTION
Return the short plain-text summary, then provide the three-forms-resources.csv file (CSV content embedded in your response or as a downloadable artifact if Claude supports file output). Also return the `research-stats.json` object. If you cannot find 300 items, explain why and provide the totals you achieved.
Example CSV header + one sample row (for your reference)
ruby
Copy code
id,title,authors,resource_type,form,summary,tags,language,date,license_or_rights,url,canonical_url,purchase_store,purchase_url,asin,amazon_affiliate_ready,recommended_for,estimated_read_time_minutes,media_embed_url,image_url,notes,source_citation_site,source_citation_author,source_citation_date,source_citation_url,confidence_score,duplicate_of
hc-witsius-commentary,Commentary on the Heidelberg Catechism - Herman Witsius,Herman Witsius,book,Heidelberg,"Classic verse-by-verse commentary on the Heidelberg Catechism.",commentary|classic|hebrew,English,1800-01-01,public domain,https://www.gutenberg.org/ebooks/...,https://www.gutenberg.org/ebooks/...,Amazon,https://www.amazon.com/...,B00EXAMPLE,TRUE,pastors;seminary,720,,https://upload.wikimedia.org/...,Public domain scan at Project Gutenberg,Project Gutenberg,Project Gutenberg,1800,https://www.gutenberg.org/...,95,