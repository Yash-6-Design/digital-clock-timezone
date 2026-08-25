// State Management
let selectedTimezones = JSON.parse(localStorage.getItem('selectedTimezones')) || ['America/New_York', 'Europe/London', 'Asia/Tokyo'];
let timeFormat = localStorage.getItem('timeFormat') || '24'; // 24 or 12

// DOM Elements
const timeFormatSelect = document.getElementById('timeFormat');
const addTimezoneInput = document.getElementById('addTimezone');
const addBtn = document.getElementById('addBtn');
const clocksContainer = document.getElementById('clocksContainer');
const timezoneSuggestions = document.getElementById('timezoneSuggestions');
const popularTimezones = document.getElementById('popularTimezones');
const mainDisplay = document.getElementById('mainDisplay');
const secondaryDisplays = document.getElementById('secondaryDisplays');
const analogClock = document.getElementById('analogClock');
const toast = document.getElementById('toast');

// Event Listeners
timeFormatSelect.addEventListener('change', (e) => {
    timeFormat = e.target.value;
    localStorage.setItem('timeFormat', timeFormat);
    updateAllClocks();
});

addTimezoneInput.addEventListener('input', handleTimezoneSearch);
addBtn.addEventListener('click', addTimezone);
addTimezoneInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTimezone();
    }
});

// Set initial format
timeFormatSelect.value = timeFormat;

// Debounce search
let searchTimeout;
function handleTimezoneSearch(e) {
    const query = e.target.value.trim();
    clearTimeout(searchTimeout);
    
    if (query.length < 1) {
        timezoneSuggestions.classList.remove('active');
        return;
    }

    searchTimeout = setTimeout(() => {
        const results = searchTimezones(query);
        displaySuggestions(results);
    }, 300);
}

function displaySuggestions(results) {
    if (results.length === 0) {
        timezoneSuggestions.classList.remove('active');
        return;
    }

    timezoneSuggestions.innerHTML = results.map(tz => `
        <div class="suggestion-item" onclick="selectTimezoneFromSuggestion('${tz.timezone}', '${tz.name}')">
            <strong>${tz.name}</strong> - ${tz.region}
            <br>
            <small>${tz.timezone}</small>
        </div>
    `).join('');
    
    timezoneSuggestions.classList.add('active');
}

function selectTimezoneFromSuggestion(timezone, name) {
    addTimezoneInput.value = name;
    addTimezone();
}

function addTimezone() {
    const query = addTimezoneInput.value.trim();
    if (!query) return;

    const results = searchTimezones(query);
    if (results.length === 0) {
        showToast('Timezone not found', 'error');
        return;
    }

    const timezone = results[0].timezone;
    
    if (selectedTimezones.includes(timezone)) {
        showToast('Timezone already added', 'error');
        return;
    }

    selectedTimezones.push(timezone);
    localStorage.setItem('selectedTimezones', JSON.stringify(selectedTimezones));
    addTimezoneInput.value = '';
    timezoneSuggestions.classList.remove('active');
    renderClocks();
    showToast('Timezone added successfully', 'success');
}

function removeTimezone(timezone) {
    selectedTimezones = selectedTimezones.filter(tz => tz !== timezone);
    localStorage.setItem('selectedTimezones', JSON.stringify(selectedTimezones));
    renderClocks();
    showToast('Timezone removed', 'success');
}

// Render all clocks
function renderClocks() {
    clocksContainer.innerHTML = selectedTimezones.map(timezone => {
        const tzData = TIMEZONES.find(tz => tz.timezone === timezone);
        const name = tzData ? tzData.name : timezone;
        const region = tzData ? tzData.region : '';
        
        return `
            <div class="clock-card">
                <button class="remove-btn" onclick="removeTimezone('${timezone}')"><i class="fas fa-times"></i></button>
                <div class="timezone-name">${name}</div>
                <div class="timezone-region">${region}</div>
                <div class="digital-time" data-timezone="${timezone}">--:--:--</div>
                <div class="time-period" data-period="${timezone}"></div>
                <div class="time-details">
                    <div class="detail-item">
                        <span class="detail-label">Date:</span>
                        <span class="detail-value" data-date="${timezone}">--</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Day:</span>
                        <span class="detail-value" data-day="${timezone}">--</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Render popular timezones quick add
function renderPopularTimezones() {
    popularTimezones.innerHTML = POPULAR_TIMEZONES.map(timezone => {
        const tzData = TIMEZONES.find(tz => tz.timezone === timezone);
        const isActive = selectedTimezones.includes(timezone);
        
        return `
            <button class="popular-btn ${isActive ? 'active' : ''}" onclick="togglePopularTimezone('${timezone}')">
                ${tzData ? tzData.name : timezone}
            </button>
        `;
    }).join('');
}

function togglePopularTimezone(timezone) {
    if (selectedTimezones.includes(timezone)) {
        removeTimezone(timezone);
    } else {
        selectedTimezones.push(timezone);
        localStorage.setItem('selectedTimezones', JSON.stringify(selectedTimezones));
        renderClocks();
        renderPopularTimezones();
        showToast('Timezone added', 'success');
    }
}

// Update clock displays
function updateAllClocks() {
    updateCardClocks();
    updateMainDisplay();
    updateSecondaryDisplays();
    drawAnalogClock();
}

function updateCardClocks() {
    selectedTimezones.forEach(timezone => {
        const time = getTimeInTimezone(timezone);
        const timeStr = formatTime(time);
        const period = getPeriod(time);
        const date = getDateInTimezone(timezone);
        const day = getDayInTimezone(timezone);
        
        const timeElement = document.querySelector(`[data-timezone="${timezone}"]`);
        const periodElement = document.querySelector(`[data-period="${timezone}"]`);
        const dateElement = document.querySelector(`[data-date="${timezone}"]`);
        const dayElement = document.querySelector(`[data-day="${timezone}"]`);
        
        if (timeElement) {
            timeElement.textContent = timeStr;
            periodElement.textContent = period;
            dateElement.textContent = date;
            dayElement.textContent = day;
        }
    });
}

function updateMainDisplay() {
    const localTime = new Date();
    const timeStr = formatTime(localTime);
    const tzData = TIMEZONES.find(tz => tz.timezone === 'America/New_York');
    
    document.querySelector('.main-time').textContent = timeStr;
    document.querySelector('.main-timezone').textContent = 'Local Time';
}

function updateSecondaryDisplays() {
    const displayCount = Math.min(selectedTimezones.length - 1, 3);
    let html = '';
    
    for (let i = 1; i <= displayCount; i++) {
        if (i < selectedTimezones.length) {
            const timezone = selectedTimezones[i];
            const time = getTimeInTimezone(timezone);
            const timeStr = formatTime(time);
            const tzData = TIMEZONES.find(tz => tz.timezone === timezone);
            const name = tzData ? tzData.name : timezone;
            
            html += `
                <div class="secondary-display">
                    <div class="secondary-time">${timeStr}</div>
                    <div class="secondary-timezone">${name}</div>
                </div>
            `;
        }
    }
    
    secondaryDisplays.innerHTML = html;
}

// Time utility functions
function getTimeInTimezone(timezone) {
    const now = new Date();
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const offset = tzDate - utcDate;
    return new Date(now.getTime() + offset);
}

function formatTime(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    if (timeFormat === '12') {
        hours = hours % 12 || 12;
    }
    
    hours = String(hours).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function getPeriod(date) {
    const hours = date.getHours();
    if (timeFormat === '12') {
        return hours >= 12 ? 'PM' : 'AM';
    }
    return '';
}

function getDateInTimezone(timezone) {
    const time = getTimeInTimezone(timezone);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return time.toLocaleDateString('en-US', options);
}

function getDayInTimezone(timezone) {
    const time = getTimeInTimezone(timezone);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[time.getDay()];
}

// Draw analog clock
function drawAnalogClock() {
    const canvas = analogClock;
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;
    const centerX = radius;
    const centerY = radius;
    
    // Get time from first timezone or local
    const timezone = selectedTimezones[0];
    const time = getTimeInTimezone(timezone);
    
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw clock face
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw hour markers
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30) * Math.PI / 180;
        const x1 = centerX + (radius - 30) * Math.sin(angle);
        const y1 = centerY - (radius - 30) * Math.cos(angle);
        const x2 = centerX + (radius - 10) * Math.sin(angle);
        const y2 = centerY - (radius - 10) * Math.cos(angle);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw numbers
        const numX = centerX + (radius - 45) * Math.sin(angle);
        const numY = centerY - (radius - 45) * Math.cos(angle);
        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i === 0 ? '12' : i, numX, numY);
    }
    
    // Draw center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#667eea';
    ctx.fill();
    
    // Get time components
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    
    // Draw hour hand
    const hourAngle = ((hours % 12) * 30 + minutes * 0.5) * Math.PI / 180;
    drawHand(ctx, centerX, centerY, hourAngle, radius * 0.5, 6, '#667eea');
    
    // Draw minute hand
    const minuteAngle = (minutes * 6 + seconds * 0.1) * Math.PI / 180;
    drawHand(ctx, centerX, centerY, minuteAngle, radius * 0.7, 4, '#764ba2');
    
    // Draw second hand
    const secondAngle = seconds * 6 * Math.PI / 180;
    drawHand(ctx, centerX, centerY, secondAngle, radius * 0.8, 2, '#f093fb');
}

function drawHand(ctx, centerX, centerY, angle, length, width, color) {
    const x = centerX + length * Math.sin(angle);
    const y = centerY - length * Math.cos(angle);
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.stroke();
}

// Toast notification
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (e.target !== addTimezoneInput) {
        timezoneSuggestions.classList.remove('active');
    }
});

// Initialize app
function initApp() {
    renderClocks();
    renderPopularTimezones();
    updateAllClocks();
    
    // Update clocks every second
    setInterval(updateAllClocks, 1000);
}

// Start app
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}