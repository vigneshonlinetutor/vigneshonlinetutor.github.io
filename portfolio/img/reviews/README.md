# Student Review Photos

This folder contains profile photos for student testimonials displayed on the website.

## How to Add New Student Photos

1. **Photo Requirements:**
   - Format: JPG or PNG
   - Size: Minimum 100x100px (square aspect ratio preferred)
   - File size: Under 500KB for web optimization

2. **Naming Convention:**
   - Use the student's `id` from `portfolio/reviews.json` as the filename
   - Example: For `sarah_johnson` in reviews.json, use `sarah_johnson.jpg`

3. **Adding a New Review:**
   - Add student photo to this folder: `portfolio/img/reviews/student_name.jpg`
   - Update `portfolio/reviews.json` with student details
   - Set `featured: true` to show on homepage (max 3 featured reviews)

## Current Photos Needed

Based on `portfolio/reviews.json`, the following photos are expected:
- `sarah_johnson.jpg` - Sarah Johnson (Microsoft)
- `mike_chen.jpg` - Mike Chen (Google) 
- `aisha_patel.jpg` - Aisha Patel (Amazon)
- `david_kumar.jpg` - David Kumar (Netflix)
- `priya_sharma.jpg` - Priya Sharma (Spotify)
- `james_wilson.jpg` - James Wilson (Uber)
- `alex_martinez.jpg` - Alex Martinez (Tesla)
- `lisa_wong.jpg` - Lisa Wong (Adobe)
- `robert_johnson.jpg` - Robert Johnson (IBM)

## How It Works

- **Homepage**: Shows only reviews with `featured: true` (3 reviews max)
- **Reviews Page**: Shows ALL reviews from the JSON file
- **Auto-sync**: Both pages automatically load from the same JSON source

## Fallback System

If a photo is missing, the system automatically generates a placeholder with the student's initials.

## Privacy Note

Ensure you have permission from students before using their photos and personal information in testimonials. 