// Comprehensive list of timezones
const TIMEZONES = [
    // Africa
    { name: 'Cairo', timezone: 'Africa/Cairo', region: 'Egypt' },
    { name: 'Lagos', timezone: 'Africa/Lagos', region: 'Nigeria' },
    { name: 'Johannesburg', timezone: 'Africa/Johannesburg', region: 'South Africa' },
    { name: 'Nairobi', timezone: 'Africa/Nairobi', region: 'Kenya' },
    { name: 'Dar es Salaam', timezone: 'Africa/Dar_es_Salaam', region: 'Tanzania' },
    
    // Asia
    { name: 'Bangkok', timezone: 'Asia/Bangkok', region: 'Thailand' },
    { name: 'Singapore', timezone: 'Asia/Singapore', region: 'Singapore' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', region: 'Hong Kong' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo', region: 'Japan' },
    { name: 'Seoul', timezone: 'Asia/Seoul', region: 'South Korea' },
    { name: 'Shanghai', timezone: 'Asia/Shanghai', region: 'China' },
    { name: 'New Delhi', timezone: 'Asia/Kolkata', region: 'India' },
    { name: 'Dubai', timezone: 'Asia/Dubai', region: 'UAE' },
    { name: 'Jakarta', timezone: 'Asia/Jakarta', region: 'Indonesia' },
    { name: 'Manila', timezone: 'Asia/Manila', region: 'Philippines' },
    { name: 'Istanbul', timezone: 'Europe/Istanbul', region: 'Turkey' },
    { name: 'Baghdad', timezone: 'Asia/Baghdad', region: 'Iraq' },
    { name: 'Tehran', timezone: 'Asia/Tehran', region: 'Iran' },
    { name: 'Karachi', timezone: 'Asia/Karachi', region: 'Pakistan' },
    { name: 'Kolkata', timezone: 'Asia/Kolkata', region: 'India' },
    
    // Europe
    { name: 'London', timezone: 'Europe/London', region: 'United Kingdom' },
    { name: 'Paris', timezone: 'Europe/Paris', region: 'France' },
    { name: 'Berlin', timezone: 'Europe/Berlin', region: 'Germany' },
    { name: 'Rome', timezone: 'Europe/Rome', region: 'Italy' },
    { name: 'Amsterdam', timezone: 'Europe/Amsterdam', region: 'Netherlands' },
    { name: 'Madrid', timezone: 'Europe/Madrid', region: 'Spain' },
    { name: 'Moscow', timezone: 'Europe/Moscow', region: 'Russia' },
    { name: 'Athens', timezone: 'Europe/Athens', region: 'Greece' },
    { name: 'Prague', timezone: 'Europe/Prague', region: 'Czech Republic' },
    { name: 'Dublin', timezone: 'Europe/Dublin', region: 'Ireland' },
    { name: 'Brussels', timezone: 'Europe/Brussels', region: 'Belgium' },
    { name: 'Vienna', timezone: 'Europe/Vienna', region: 'Austria' },
    { name: 'Zurich', timezone: 'Europe/Zurich', region: 'Switzerland' },
    { name: 'Stockholm', timezone: 'Europe/Stockholm', region: 'Sweden' },
    { name: 'Helsinki', timezone: 'Europe/Helsinki', region: 'Finland' },
    
    // North America
    { name: 'New York', timezone: 'America/New_York', region: 'USA' },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles', region: 'USA' },
    { name: 'Chicago', timezone: 'America/Chicago', region: 'USA' },
    { name: 'Denver', timezone: 'America/Denver', region: 'USA' },
    { name: 'Anchorage', timezone: 'America/Anchorage', region: 'USA' },
    { name: 'Honolulu', timezone: 'Pacific/Honolulu', region: 'USA' },
    { name: 'Toronto', timezone: 'America/Toronto', region: 'Canada' },
    { name: 'Vancouver', timezone: 'America/Vancouver', region: 'Canada' },
    { name: 'Mexico City', timezone: 'America/Mexico_City', region: 'Mexico' },
    { name: 'Cancun', timezone: 'America/Cancun', region: 'Mexico' },
    
    // South America
    { name: 'Sao Paulo', timezone: 'America/Sao_Paulo', region: 'Brazil' },
    { name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', region: 'Argentina' },
    { name: 'Lima', timezone: 'America/Lima', region: 'Peru' },
    { name: 'Caracas', timezone: 'America/Caracas', region: 'Venezuela' },
    { name: 'Bogota', timezone: 'America/Bogota', region: 'Colombia' },
    { name: 'Santiago', timezone: 'America/Santiago', region: 'Chile' },
    
    // Oceania
    { name: 'Sydney', timezone: 'Australia/Sydney', region: 'Australia' },
    { name: 'Melbourne', timezone: 'Australia/Melbourne', region: 'Australia' },
    { name: 'Brisbane', timezone: 'Australia/Brisbane', region: 'Australia' },
    { name: 'Perth', timezone: 'Australia/Perth', region: 'Australia' },
    { name: 'Auckland', timezone: 'Pacific/Auckland', region: 'New Zealand' },
    { name: 'Fiji', timezone: 'Pacific/Fiji', region: 'Fiji' },
];

const POPULAR_TIMEZONES = [
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Hong_Kong',
    'Australia/Sydney',
    'Asia/Dubai',
];

// Search timezones by name
function searchTimezones(query) {
    const lowerQuery = query.toLowerCase();
    return TIMEZONES.filter(tz => 
        tz.name.toLowerCase().includes(lowerQuery) || 
        tz.region.toLowerCase().includes(lowerQuery) ||
        tz.timezone.toLowerCase().includes(lowerQuery)
    );
}