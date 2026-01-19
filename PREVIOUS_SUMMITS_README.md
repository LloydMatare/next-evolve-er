# Previous Summits Feature - Admin Guide

## Overview
The Previous Summits feature allows admins to manage historical summit data through the Payload CMS admin panel. The frontend automatically fetches and displays this data.

## Accessing the Admin Panel

1. Navigate to `/admin` on your website
2. Log in with your admin credentials
3. Click on **"Previous Summits"** in the sidebar under the "Events" group

## Creating a New Summit

### Basic Information
1. Click **"Create New"** button
2. Fill in the required fields:
   - **Year**: Summit year (e.g., "2025", "2024")
   - **Title**: Summit title (e.g., "Summit 2025")
   - **Theme**: Main theme (e.g., "Digital Transformation: The Future is Now")

### Statistics Section
Add summit statistics:
- Delegates (e.g., "1,500+")
- Speakers (e.g., "50+")
- Exhibitors (e.g., "80+")
- Startups (e.g., "30+")
- Countries (e.g., "25+")
- Partnerships (e.g., "40+")
- Days (optional, e.g., "2")

### Event Highlights
Click "Add Highlight" to add memorable moments:
- Minister of ICT Keynote Address
- Innovation Showcase with 30+ Startups
- Panel: Women in Tech Leadership
- etc.

### Key Themes
Click "Add Theme" to add focus areas:
- Digital Transformation in African Enterprises
- AI and Machine Learning for Social Impact
- Cybersecurity in the Digital Age
- etc.

### Color Schemes
Choose gradient colors for the summit:
- **Gradient Color Scheme**: Used for buttons
- **Full Gradient**: Used for the summit card background

Options include:
- Blue to Cyan (default)
- Purple to Pink
- Green to Teal
- Orange to Red
- Indigo to Purple

### Photo Gallery
Add images from the summit:
1. Click "Add Image"
2. Upload an image via the Media collection
3. Fill in:
   - **Title**: Image title
   - **Description**: Brief description
   - **Category**: Choose from:
     - Ceremony
     - Speeches
     - Exhibition
     - Panels
     - Networking
     - Competition
     - Awards
     - Workshops
   - **Initial Likes**: Starting number of likes (optional)

### Video Gallery
Add videos from the summit:
1. Click "Add Video"
2. Fill in:
   - **Thumbnail**: Upload thumbnail image (optional)
   - **Video URL**: YouTube embed URL (e.g., `https://www.youtube.com/embed/VIDEO_ID`)
   - **Title**: Video title
   - **Description**: Brief description
   - **Category**: Choose from:
     - Highlights
     - Speeches
     - Panels
     - Exhibition
     - Competition
     - Interviews
   - **Initial Likes**: Starting number of likes (optional)

### Status and Order
- **Status**: 
  - Draft: Not visible to public
  - Published: Visible on website
  - Archived: Hidden from public
- **Display Order**: Higher numbers appear first (most recent summits should have higher numbers)

## Tips for Best Results

### Images
- Upload high-quality images (recommended: 1200x1200px or higher)
- Use descriptive titles for better SEO
- Categorize images properly for easy filtering

### Videos
- Use YouTube embed URLs (format: `https://www.youtube.com/embed/VIDEO_ID`)
- Add thumbnails for better visual appeal
- Keep video descriptions concise but informative

### Data Consistency
- Use consistent formatting for statistics (e.g., always include "+" for numbers like "1,500+")
- Maintain similar number of highlights and themes across summits
- Use appropriate color schemes that don't clash with website design

### Display Order
- Set higher order numbers for more recent summits
- Example: 2025 = order 2, 2024 = order 1

## Viewing on the Frontend

Once published, summits will automatically appear on:
- `/previous-summit` page
- Summit navigation buttons will dynamically generate based on available summits
- All images and videos will be displayed in responsive galleries

## Technical Details

### Collections Used
- **previous-summits**: Main collection for summit data
- **media**: Stores uploaded images and thumbnails

### API Access
The frontend fetches data from:
```
/api/previous-summits?status=published&sort=-order&depth=2
```

### TypeScript Types
Auto-generated types are available in `src/payload-types.ts` as `PreviousSummit`

## Troubleshooting

### Images not displaying
- Verify image was successfully uploaded to Media collection
- Check that the image relationship is properly set
- Ensure summit status is "Published"

### Summit not appearing
- Check that status is set to "Published"
- Verify the order field is set appropriately
- Clear browser cache and refresh

### Videos not playing
- Ensure YouTube URL is in embed format: `https://www.youtube.com/embed/VIDEO_ID`
- Not: `https://www.youtube.com/watch?v=VIDEO_ID`

## Support

For technical issues, contact the development team or check the project documentation.
