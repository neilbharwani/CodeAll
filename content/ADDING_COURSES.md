# How to Add a Course

## 1. Create a JSON file in `content/courses/`

Name it `your-course-slug.json`. Copy this template:

```json
{
  "id": "your-course-slug",
  "slug": "your-course-slug",
  "title": "Your Course Title",
  "description": "One-line description shown on the course card.",
  "longDescription": "Longer description shown on the course detail page. A few sentences about what students will learn and who it's for.",
  "category": "JavaScript",
  "difficulty": "Beginner",
  "icon": "⚡",
  "prerequisites": [],
  "whatYouLearn": [
    "First thing they will learn",
    "Second thing",
    "Third thing"
  ],
  "lessons": [
    {
      "id": "unique-lesson-id-1",
      "slug": "lesson-url-slug",
      "title": "Lesson Title",
      "description": "What this lesson covers.",
      "videoFile": "lesson-01.mp4",
      "duration": "10:30",
      "durationSeconds": 630,
      "points": 15
    }
  ]
}
```

## 2. Add your video files

Drop MP4 files into `public/videos/your-course-slug/`:
```
public/videos/your-course-slug/lesson-01.mp4
public/videos/your-course-slug/lesson-02.mp4
...
```

The `videoFile` field in the JSON maps directly to these filenames.

## 3. Restart the dev server

```
npm run dev
```

Your course will appear automatically on the courses page.

## Points guide
- Short lesson (<10 min): 10 pts
- Medium lesson (10–15 min): 15 pts
- Long lesson (15–25 min): 20 pts
- Project lesson: 25 pts

## Category options
Any string works. Current ones: Web Fundamentals, JavaScript, Python, React, Tools
