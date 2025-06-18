# Animation Portfolio Website

A beautiful, responsive website for showcasing your Blender animation projects with an interactive planetary age calculator.

## Features

### 🎬 Featured Animation Section
- Display your main Blender animation video at the top
- Static video showcase (replace `your-animation.mp4` with your actual video file)
- Professional presentation of your work

### 📺 YouTube Video Showcase
- Pre-loaded sample videos showing project progression (Week 1-5 + Final Render)
- Search and filter videos by week
- Click videos to open in full-screen modal
- Delete videos individually if needed

### 🌍 Interactive Planets Section
- **Solar System Exploration**: Text content explaining your planetary animation project
- **Planetary Age Calculator**: Interactive tool that calculates your age on different planets
- **Blender Animation Placeholder**: Space for your 3D planetary animation

### 🛠️ Tools Used Section
- Display the tools and techniques used in your project
- Icons for Blender, Material Design, Lighting, and Camera Work
- Easy to customize with your own tools

### 📱 Responsive Design
- Mobile-friendly navigation with hamburger menu
- Responsive grid layouts
- Smooth animations and transitions
- Works on all device sizes

## How to Use

### 1. Add Your Featured Animation
1. Replace `your-animation.mp4` in the HTML with your actual video file
2. Or replace the entire video element with your embedded video code

### 2. Customize Your Videos
1. Edit the `sampleVideos` array in `script.js` to add your own YouTube videos
2. Use descriptive labels like "Week 1 - Concept Design", "Final Render", etc.
3. Replace the sample video IDs with your actual YouTube video IDs

### 3. Use the Age Calculator
1. Enter your age in the input field
2. Select which planet you're calculating from
3. Click "Calculate Ages" to see your age on all planets
4. Results show with planet emojis and highlighted input planet

### 4. Navigate the Site
- **Home**: View your featured animation
- **Planets List**: See the planets section with age calculator
- **Tools Used**: View the tools section

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization

### Adding Your Videos
Edit the `sampleVideos` array in `script.js`:
```javascript
const sampleVideos = [
    {
        id: '1',
        week: 'Week 1 - Your Title',
        videoId: 'YOUR_YOUTUBE_VIDEO_ID',
        url: 'https://www.youtube.com/watch?v=YOUR_YOUTUBE_VIDEO_ID',
        addedAt: new Date('2024-01-15').toISOString()
    }
    // Add more videos...
];
```

### Adding Your Blender Animation
Replace the animation placeholder in `index.html`:
```html
<div class="planets-animation">
    <!-- Replace this with your animation -->
    <video controls>
        <source src="your-planetary-animation.mp4" type="video/mp4">
    </video>
</div>
```

### Adding More Tools
Edit the tools section in `index.html`:
```html
<div class="tool-card">
    <div class="tool-icon">
        <i class="fas fa-your-icon"></i>
    </div>
    <h3>Your Tool</h3>
    <p>Description here</p>
</div>
```

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
/* Main gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## Age Calculator Features

The planetary age calculator uses real astronomical data:
- **Mercury**: 88 Earth days per year
- **Venus**: 224.7 Earth days per year  
- **Earth**: 365.25 Earth days per year
- **Mars**: 687 Earth days per year
- **Jupiter**: 4,333 Earth days per year
- **Saturn**: 10,759 Earth days per year
- **Uranus**: 30,687 Earth days per year
- **Neptune**: 60,190 Earth days per year

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Local Storage
The website uses browser localStorage to save:
- Your video preferences and deletions
- Search history

## Tips
- Use descriptive week labels for better organization
- Keep video files under 100MB for better performance
- Use high-quality YouTube videos for the best presentation
- Test the age calculator with different values
- Customize the planets text content to match your project

## Support
For any issues or questions, check the browser console for error messages or contact the developer.

---

**Enjoy showcasing your amazing Blender animations! 🎬✨**
