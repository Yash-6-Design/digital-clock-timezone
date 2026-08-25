# Digital Clock - Multiple Timezones

A beautiful, responsive digital clock application that displays current time across multiple timezones with both digital and analog displays.

## ✨ Features

### 🌍 Timezone Management
- Search and add any timezone worldwide
- Auto-complete timezone suggestions
- Popular timezones quick-add buttons
- Remove timezones individually
- Save selected timezones to local storage

### ⏰ Time Display Options
- **Digital Display**: Multiple card-based timezone clocks
- **Main Display**: Prominent large-format time display
- **Secondary Displays**: Quick reference for additional timezones
- **Analog Clock**: Beautiful analog clock showing current time
- Real-time updates every second

### ⚙️ Customization
- Toggle between 24-hour and 12-hour (AM/PM) formats
- Persistent time format preference
- Automatic DST (Daylight Saving Time) handling
- Display date and day of week for each timezone

### 📱 Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface
- Smooth animations and transitions

### 💾 Local Storage
- Save selected timezones
- Remember time format preference
- Persistent across browser sessions

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yash-6-Design/digital-clock-timezone.git
   cd digital-clock-timezone
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```

## 📖 Usage

### Add a Timezone
1. Type timezone name or city in the search box (e.g., "Tokyo", "New York")
2. Select from auto-complete suggestions
3. Click the + button or press Enter
4. Timezone will be added to your clock display

### Use Quick Add Buttons
- Click any popular timezone button at the bottom
- Button will highlight when timezone is active
- Click again to remove the timezone

### Change Time Format
- Use the dropdown selector at the top
- Choose between 24-hour or 12-hour (AM/PM) format
- Format preference is automatically saved

### Remove a Timezone
- Click the × button on any clock card
- Timezone will be removed from display

### View Different Displays
- **Clock Cards**: Individual timezone information with date and day
- **Main Display**: Large-format time (local time by default)
- **Secondary Displays**: Quick reference cards for other timezones
- **Analog Clock**: Visual representation with hour, minute, and second hands

## 📁 Project Structure

```
digital-clock-timezone/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styling and animations
├── js/
│   ├── timezones.js    # Timezone database and search
│   └── app.js          # Application logic
└── README.md           # This file
```

## 🎨 Timezone Coverage

Supports 60+ timezones worldwide including:

**Africa**
- Cairo, Lagos, Johannesburg, Nairobi, etc.

**Asia**
- Tokyo, Shanghai, Hong Kong, Singapore, New Delhi, Dubai, Bangkok, Seoul, etc.

**Europe**
- London, Paris, Berlin, Rome, Amsterdam, Madrid, Moscow, etc.

**North America**
- New York, Los Angeles, Chicago, Denver, Toronto, Vancouver, Mexico City, etc.

**South America**
- São Paulo, Buenos Aires, Lima, Bogotá, Santiago, etc.

**Oceania**
- Sydney, Melbourne, Auckland, Brisbane, Perth, etc.

## 🛠️ Customization

### Add More Timezones
Edit `js/timezones.js` and add to the `TIMEZONES` array:

```javascript
{ name: 'City Name', timezone: 'Continent/City', region: 'Country' }
```

### Change Popular Timezones
Edit the `POPULAR_TIMEZONES` array in `js/timezones.js`:

```javascript
const POPULAR_TIMEZONES = [
    'America/New_York',
    'Europe/London',
    // ... add your preferred timezones
];
```

### Modify Colors
Edit CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* ... more colors */
}
```

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📦 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Styling, animations, and responsive design
- **JavaScript (ES6+)** - Application logic and timezone handling
- **Canvas API** - Analog clock drawing
- **LocalStorage API** - Data persistence
- **Font Awesome** - Icons

## 🚀 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select `main` branch
4. Your site will be published

### Netlify
1. Connect your GitHub repository
2. Deploy immediately (no build steps needed)

### Vercel
1. Import your GitHub repository
2. Deploy with zero configuration

## 🎯 Features Roadmap

- [ ] Alarm functionality for specific timezones
- [ ] World map with timezone visualization
- [ ] Timezone difference calculator
- [ ] Meeting planner for multiple timezones
- [ ] Sunrise/sunset times for each timezone
- [ ] Time zone offset information
- [ ] Dark mode toggle
- [ ] Multiple language support
- [ ] Stopwatch/timer with timezone support
- [ ] Export timezone schedule

## 🐛 Troubleshooting

**Clocks not updating**
- Ensure JavaScript is enabled in your browser
- Try refreshing the page
- Check browser console for errors

**Timezone not found**
- Try searching by city name
- Use the official IANA timezone name format
- Check spelling and capitalization

**Analog clock not displaying**
- Ensure your browser supports HTML5 Canvas
- Try a different browser
- Check browser console for errors

**Local storage not working**
- Check if your browser allows local storage
- Try clearing browser cache
- Ensure you're not in private/incognito mode

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or issues, please open a GitHub issue or contact through the repository.

---

**Built with ❤️ for time zone enthusiasts**