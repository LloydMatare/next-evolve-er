# School Summit Collection Setup Guide

This guide explains how to manage School Summit content through the Payload CMS admin panel.

## Collection Overview

The **School Summit** collection allows you to manage all content for the School Summit page including objectives, sub-themes, featured cards with images and videos, and more.

## Adding Content

### 1. Access the Admin Panel

- Go to your Payload CMS admin panel: `http://localhost:3000/admin`
- Navigate to **Events** → **School Summit Content**

### 2. Content Sections

You can create content for the following sections:

#### **Objectives** Section

- **Icon Options**: CPU, Briefcase, Lightbulb, Heart Handshake
- **Fields**:
  - `title`: Objective title (e.g., "Digital Skills for the Future")
  - `description`: Overview of the objective
  - `objectiveIcon`: Select the icon to display
  - `skills`: Array of skills (add multiple rows)
  - `order`: Display order (lower numbers appear first)
  - `status`: Draft or Published

#### **Sub-Themes** Section

- **Fields**:
  - `title`: Theme title
  - `description`: Theme description
  - `order`: Display order
  - `status`: Draft or Published

Example titles:

- "Digital Skills for the Future of Work"
- "Youth Innovation & Entrepreneurship"
- "Women in Technology & Inclusive Growth"
- "AI and Emerging Technologies in Africa"
- "Building Local Solutions for Local Challenges"

#### **Target Audience** Section

- **Fields**:
  - `title`: Audience segment (e.g., "University and college students")
  - `description`: Details about this audience
  - `order`: Display order
  - `status`: Draft or Published

#### **Why Attend** Section

- **Fields**:
  - `title`: Reason to attend (e.g., "Gain exposure to real-world technology applications")
  - `description`: More details
  - `order`: Display order
  - `status`: Draft or Published

#### **Programme Highlights** Section

- **Fields**:
  - `title`: Highlight description
  - `description`: Additional details
  - `order`: Display order
  - `status`: Draft or Published

Examples:

- "Inspirational keynote sessions from African digital leaders"
- "Career guidance panels with industry experts"
- "Hands-on workshops and technical masterclasses"

#### **Expected Outcomes** Section

- **Fields**:
  - `title`: Outcome description
  - `description`: More information
  - `order`: Display order
  - `status`: Draft or Published

#### **Featured Cards** Section

For cards with images and videos:

- **Required Fields**:
  - `title`: Card title
  - `description`: Card description
  - `order`: Display order

- **Image Card**:
  - `cardImage`: Upload an image from your media library
  - `cardLink`: URL to link to when card is clicked (optional)

- **Video Card**:
  - `cardVideo`: Enter the video URL
  - `videoType`: Select "YouTube" or "Direct"
  - `thumbnail`: Upload custom thumbnail for direct videos (optional)
  - `cardLink`: URL to link to (optional)

### 3. Publishing Content

- Set `status` to **Published** for content to appear on the website
- Set to **Draft** to hide content temporarily
- Only published content is fetched by the front-end

## Uploading Images and Videos

### Images

1. When creating a featured card, click the `cardImage` upload button
2. Select or drag-drop an image file
3. The image will be optimized and stored in your media library

### Videos

1. For **YouTube videos**: Copy the YouTube embed URL and paste it in `cardVideo`
   - Example: `https://www.youtube.com/embed/VIDEO_ID`
2. For **Direct URLs**: Paste the video URL
   - Example: `https://example.com/video.mp4`
3. Optionally upload a thumbnail image

## Display Order

Use the `order` field to control the display order:

- Lower numbers appear first
- Items with the same section are sorted by order value
- Default is 0

## Tips & Best Practices

1. **Always publish content** - Remember to set `status: "published"` before the content appears on the website
2. **Use descriptive titles** - These appear directly on the website
3. **Add images to featured cards** - Visual content increases engagement
4. **Test on the website** - After publishing, refresh the School Summit page to see your changes
5. **Cache invalidation** - The API caches data for 1 hour, so changes may take up to 60 minutes to appear
6. **Use short descriptions** - Descriptions should be concise and impactful

## Database Queries

Content is automatically fetched from the `school-summit` collection via the API endpoint:

```
GET /api/school-summit
```

The API organizes content by section and returns it in a structured format.

## Seed Data

Initial data can be seeded using the provided script:

```bash
npm run seed:school-summit
```

This populates the collection with default content that you can then edit.

## Troubleshooting

### Images not showing

- Verify the image was uploaded to the media library
- Check that the media URL is accessible
- Ensure the featured card status is "published"

### Videos not playing

- For YouTube: Verify the embed URL format is correct
- For direct URLs: Ensure the video file is accessible
- Check browser console for CORS errors

### Content not updating

- Clear your browser cache or wait for the 1-hour API cache to expire
- Verify the status is set to "published"
- Refresh the page after publishing changes
