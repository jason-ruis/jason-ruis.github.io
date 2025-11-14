#!/usr/bin/env python3
"""
Compile research JSON files into CSV format for Three Forms Resources directory
"""

import json
import csv
import re
from pathlib import Path

def slugify(text):
    """Create a URL-friendly slug from text"""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text[:50]

def create_id(resource, form_prefix):
    """Generate unique ID for resource"""
    title_slug = slugify(resource.get('title', ''))
    author_slug = slugify(resource.get('authors', '').split(';')[0] if resource.get('authors') else '')
    year = resource.get('date', '')[:4] if resource.get('date') else ''

    if author_slug and title_slug:
        base_id = f"{form_prefix}-{author_slug}-{title_slug[:20]}"
    elif title_slug:
        base_id = f"{form_prefix}-{title_slug[:30]}"
    else:
        base_id = f"{form_prefix}-resource"

    if year:
        base_id += f"-{year}"

    return base_id

def normalize_resource(resource, form, existing_ids):
    """Normalize resource data to CSV format"""

    # Determine form prefix for ID
    form_map = {
        'Heidelberg': 'hc',
        'Belgic': 'bc',
        'Canons': 'cd',
        'General': 'tfu'
    }
    form_prefix = form_map.get(form, 'res')

    # Generate unique ID
    base_id = create_id(resource, form_prefix)
    resource_id = base_id
    counter = 1
    while resource_id in existing_ids:
        resource_id = f"{base_id}-{counter}"
        counter += 1
    existing_ids.add(resource_id)

    # Extract and normalize fields
    return {
        'id': resource_id,
        'title': resource.get('title', '').strip(),
        'authors': resource.get('authors', '').strip(),
        'resource_type': resource.get('resource_type', '').strip(),
        'form': form,
        'summary': resource.get('summary', '').strip(),
        'tags': resource.get('tags', '').strip(),
        'language': resource.get('language', 'English').strip(),
        'date': resource.get('date', '').strip(),
        'license_or_rights': resource.get('license_or_rights', '').strip(),
        'url': resource.get('url', '').strip(),
        'canonical_url': resource.get('canonical_url', resource.get('url', '')).strip(),
        'purchase_store': resource.get('purchase_store', '').strip(),
        'purchase_url': resource.get('purchase_url', '').strip(),
        'asin': resource.get('asin', '').strip(),
        'amazon_affiliate_ready': 'TRUE' if resource.get('amazon_affiliate_ready') else 'FALSE',
        'recommended_for': resource.get('recommended_for', '').strip(),
        'estimated_read_time_minutes': resource.get('estimated_read_time_minutes', ''),
        'media_embed_url': resource.get('media_embed_url', '').strip(),
        'image_url': resource.get('image_url', '').strip(),
        'notes': resource.get('notes', '').strip(),
        'source_citation_site': resource.get('source_citation_site', '').strip(),
        'source_citation_author': resource.get('source_citation_author', '').strip(),
        'source_citation_date': resource.get('source_citation_date', '').strip(),
        'source_citation_url': resource.get('source_citation_url', '').strip(),
        'confidence_score': resource.get('confidence_score', 85),
        'duplicate_of': ''
    }

def main():
    # Define file mappings
    files = [
        ('heidelberg-catechism-resources.json', 'Heidelberg'),
        ('belgic-confession-resources.json', 'Belgic'),
        ('canons-of-dort-resources.json', 'Canons'),
        ('three-forms-unity-combined-resources.json', 'General')
    ]

    all_resources = []
    existing_ids = set()
    stats = {
        'Heidelberg': 0,
        'Belgic': 0,
        'Canons': 0,
        'General': 0,
        'total': 0,
        'amazon_ready': 0,
        'public_domain': 0,
        'copyrighted': 0
    }

    base_path = Path('/home/user/jason-ruis.github.io')

    # Load and process each JSON file
    for filename, form in files:
        filepath = base_path / filename

        if not filepath.exists():
            print(f"Warning: {filename} not found")
            continue

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                resources = json.load(f)

            # Handle both array and object formats
            if isinstance(resources, dict):
                resources = resources.get('resources', [])

            for resource in resources:
                normalized = normalize_resource(resource, form, existing_ids)
                all_resources.append(normalized)

                # Update stats
                stats[form] += 1
                stats['total'] += 1

                if normalized['amazon_affiliate_ready'] == 'TRUE':
                    stats['amazon_ready'] += 1

                if 'public domain' in normalized['license_or_rights'].lower():
                    stats['public_domain'] += 1
                elif 'copyrighted' in normalized['license_or_rights'].lower():
                    stats['copyrighted'] += 1

            print(f"Loaded {len(resources)} resources from {filename}")

        except Exception as e:
            print(f"Error processing {filename}: {e}")

    # Write CSV file
    csv_path = base_path / 'three-forms-resources' / 'three-forms-resources-new.csv'

    fieldnames = [
        'id', 'title', 'authors', 'resource_type', 'form', 'summary', 'tags',
        'language', 'date', 'license_or_rights', 'url', 'canonical_url',
        'purchase_store', 'purchase_url', 'asin', 'amazon_affiliate_ready',
        'recommended_for', 'estimated_read_time_minutes', 'media_embed_url',
        'image_url', 'notes', 'source_citation_site', 'source_citation_author',
        'source_citation_date', 'source_citation_url', 'confidence_score',
        'duplicate_of'
    ]

    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(all_resources)

    print(f"\nCSV file created: {csv_path}")
    print(f"Total resources: {stats['total']}")

    # Write stats JSON
    stats_path = base_path / 'three-forms-resources' / 'research-stats.json'
    with open(stats_path, 'w', encoding='utf-8') as f:
        json.dump(stats, f, indent=2)

    print(f"Stats file created: {stats_path}")
    print(f"\nStatistics:")
    print(f"  Heidelberg: {stats['Heidelberg']}")
    print(f"  Belgic: {stats['Belgic']}")
    print(f"  Canons: {stats['Canons']}")
    print(f"  General: {stats['General']}")
    print(f"  Amazon affiliate ready: {stats['amazon_ready']}")
    print(f"  Public domain: {stats['public_domain']}")
    print(f"  Copyrighted: {stats['copyrighted']}")

if __name__ == '__main__':
    main()
