# Tiny Farm RPG - Simple Promotional Website

A clean, focused one-page promotional website for your 2D pixel art farming RPG game. This website is designed to be simple yet effective, showcasing your game without overwhelming visitors.

## 🌟 Features

- **Simple One-Page Design** - Clean and focused layout
- **Beautiful Hero Section** - Full-screen background with game imagery
- **Screenshot Gallery** - Show off your best game scenes
- **Demo Section** - Ready for you to embed your game demo
- **Newsletter Signup** - Collect email addresses for game updates
- **Mobile Responsive** - Looks great on all devices
- **Fast Loading** - Minimal content for quick page loads

## 🎨 Design Highlights

- **Hero Background**: Full-screen game image with overlay text
- **Color Palette**: Inspired by farming and nature themes
- **Typography**: Pixel art title font with clean body text
- **Minimal Content**: Just the essentials - no clutter

## 📁 File Structure

```
├── index.html          # Simple one-page website
├── style.css           # Clean, minimal styling
├── script.js           # Basic interactive functionality
├── assets/             # Images and media files
│   ├── hero-background.png    # Full-screen hero background
│   ├── screenshot-1.png       # Game screenshot 1
│   ├── screenshot-2.png       # Game screenshot 2
│   ├── screenshot-3.png       # Game screenshot 3
│   └── placeholder-info.txt   # Instructions for adding images
└── README.md           # This file
```

## 🚀 Getting Started

### 1. Start the Development Server

To test the website locally, you need to run a local web server. Here are several options:

#### Option A: Python (Recommended)
If you have Python installed:
```bash
# Navigate to the project directory
cd nevervale-website

# Python 3.x
python -m http.server 8000

# Python 2.x (if needed)
python -m SimpleHTTPServer 8000
```

#### Option B: Node.js
If you have Node.js installed:
```bash
# Install a simple server globally
npm install -g http-server

# Navigate to project directory and start server
cd nevervale-website
http-server -p 8000
```

#### Option C: PHP
If you have PHP installed:
```bash
# Navigate to project directory
cd nevervale-website

# Start PHP built-in server
php -S localhost:8000
```

#### Option D: Live Server (VS Code Extension)
If you're using VS Code:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

After starting the server, open your browser and go to:
**http://localhost:8000**

> **Note**: You need to run a local server because modern browsers block loading local files directly due to security restrictions. Simply opening `index.html` in your browser won't work properly.

### 2. Add Your Game Assets

Replace the placeholder image references in the `assets/` folder with your actual game screenshots:

- **hero-background.png** (1920x1080px recommended) - Full-screen hero background image
- **screenshot-1.png** (600x400px recommended) - Game screenshot showing farming
- **screenshot-2.png** (600x400px recommended) - Game screenshot showing village life
- **screenshot-3.png** (600x400px recommended) - Game screenshot showing animals

### 2. Customize Content

Edit `index.html` to update:
- Game title and description
- Feature descriptions
- Social media links
- Contact information

### 3. Update Styling (Optional)

Modify `style.css` to:
- Adjust colors to match your game's palette
- Change fonts if desired
- Modify animations and effects

### 4. Add Your Demo

In the demo section, replace the placeholder with:
- Embedded web build of your game
- Download links for demo builds
- Video trailer or gameplay footage

## 🎮 Demo Integration

The demo section is ready for you to integrate your game. You can:

1. **Web Build**: Upload your HTML5/WebGL build and embed it
2. **Download Links**: Add links to downloadable demo versions
3. **Video Trailer**: Embed a YouTube or Vimeo video
4. **Screenshots**: Add more interactive screenshots

Example for web build integration:
```html
<div class="demo-embed">
    <iframe src="your-game-build/index.html"
            width="800"
            height="600"
            frameborder="0">
    </iframe>
</div>
```

## 📧 Newsletter Integration

The newsletter form is ready to connect to your email service:

1. **Mailchimp**: Update the form action URL
2. **ConvertKit**: Add your form endpoint
3. **Custom Backend**: Connect to your own email collection system

Example Mailchimp integration:
```html
<form action="https://your-domain.us1.list-manage.com/subscribe/post?u=YOUR_USER_ID&id=YOUR_LIST_ID"
      method="post"
      class="newsletter-form">
```

## 🔧 Customization Tips

### Colors
The CSS uses custom properties (variables) for easy color customization:
```css
:root {
    --primary-green: #2D5016;    /* Main brand color */
    --light-green: #4A7C23;      /* Lighter variant */
    --accent-green: #6B9A2F;     /* Accent color */
    /* ... more colors */
}
```

### Fonts
Current fonts used:
- **Headers**: 'Press Start 2P' (pixel art style)
- **Body**: 'Inter' (modern, readable)

### Animations
All animations use CSS transitions and can be customized in the `:root` section:
```css
:root {
    --transition: all 0.3s ease;
    --bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## 📱 Mobile Optimization

The website is fully responsive with:
- Mobile-first design approach
- Touch-friendly navigation
- Optimized images for different screen sizes
- Fast loading on mobile connections

## 🔍 SEO Features

- Semantic HTML structure
- Meta tags for social media sharing
- Optimized images with alt text
- Fast loading performance
- Mobile-friendly design

## 🌐 Deployment

You can deploy this website to:

1. **GitHub Pages** (Free)
2. **Netlify** (Free tier available)
3. **Vercel** (Free tier available)
4. **Your own web hosting**

Simply upload all files to your web server or connect your repository to a deployment service.

## 📞 Support

This website template is designed to be easy to customize and maintain. The code is well-commented and follows modern web development best practices.

For additional customization or if you need help integrating specific features, the modular structure makes it easy to extend and modify.

## 🎯 Next Steps

1. Add your game assets to the `assets/` folder
2. Update the content in `index.html`
3. Test the website locally
4. Deploy to your preferred hosting service
5. Share your awesome farming RPG with the world!

---

**Happy farming! 🌾🚜**
