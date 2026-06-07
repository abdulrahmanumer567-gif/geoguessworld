export type Country = {
  name: string;
  capital: string;
  continent: string;
  flag: string;
  difficulty: "easy" | "medium" | "hard";
};

// Curated list. Difficulty: easy = very well-known, medium = familiar, hard = lesser-known.
export const COUNTRIES: Country[] = [
  // EASY
  { name: "United States", capital: "Washington, D.C.", continent: "North America", flag: "🇺🇸", difficulty: "easy" },
  { name: "United Kingdom", capital: "London", continent: "Europe", flag: "🇬🇧", difficulty: "easy" },
  { name: "France", capital: "Paris", continent: "Europe", flag: "🇫🇷", difficulty: "easy" },
  { name: "Germany", capital: "Berlin", continent: "Europe", flag: "🇩🇪", difficulty: "easy" },
  { name: "Italy", capital: "Rome", continent: "Europe", flag: "🇮🇹", difficulty: "easy" },
  { name: "Spain", capital: "Madrid", continent: "Europe", flag: "🇪🇸", difficulty: "easy" },
  { name: "Japan", capital: "Tokyo", continent: "Asia", flag: "🇯🇵", difficulty: "easy" },
  { name: "China", capital: "Beijing", continent: "Asia", flag: "🇨🇳", difficulty: "easy" },
  { name: "India", capital: "New Delhi", continent: "Asia", flag: "🇮🇳", difficulty: "easy" },
  { name: "Brazil", capital: "Brasília", continent: "South America", flag: "🇧🇷", difficulty: "easy" },
  { name: "Canada", capital: "Ottawa", continent: "North America", flag: "🇨🇦", difficulty: "easy" },
  { name: "Mexico", capital: "Mexico City", continent: "North America", flag: "🇲🇽", difficulty: "easy" },
  { name: "Australia", capital: "Canberra", continent: "Oceania", flag: "🇦🇺", difficulty: "easy" },
  { name: "Russia", capital: "Moscow", continent: "Europe", flag: "🇷🇺", difficulty: "easy" },
  { name: "Egypt", capital: "Cairo", continent: "Africa", flag: "🇪🇬", difficulty: "easy" },
  { name: "South Africa", capital: "Pretoria", continent: "Africa", flag: "🇿🇦", difficulty: "easy" },
  { name: "Argentina", capital: "Buenos Aires", continent: "South America", flag: "🇦🇷", difficulty: "easy" },
  { name: "Greece", capital: "Athens", continent: "Europe", flag: "🇬🇷", difficulty: "easy" },
  { name: "Netherlands", capital: "Amsterdam", continent: "Europe", flag: "🇳🇱", difficulty: "easy" },
  { name: "Sweden", capital: "Stockholm", continent: "Europe", flag: "🇸🇪", difficulty: "easy" },

  // MEDIUM
  { name: "Portugal", capital: "Lisbon", continent: "Europe", flag: "🇵🇹", difficulty: "medium" },
  { name: "Norway", capital: "Oslo", continent: "Europe", flag: "🇳🇴", difficulty: "medium" },
  { name: "Finland", capital: "Helsinki", continent: "Europe", flag: "🇫🇮", difficulty: "medium" },
  { name: "Denmark", capital: "Copenhagen", continent: "Europe", flag: "🇩🇰", difficulty: "medium" },
  { name: "Ireland", capital: "Dublin", continent: "Europe", flag: "🇮🇪", difficulty: "medium" },
  { name: "Poland", capital: "Warsaw", continent: "Europe", flag: "🇵🇱", difficulty: "medium" },
  { name: "Turkey", capital: "Ankara", continent: "Asia", flag: "🇹🇷", difficulty: "medium" },
  { name: "Thailand", capital: "Bangkok", continent: "Asia", flag: "🇹🇭", difficulty: "medium" },
  { name: "Vietnam", capital: "Hanoi", continent: "Asia", flag: "🇻🇳", difficulty: "medium" },
  { name: "South Korea", capital: "Seoul", continent: "Asia", flag: "🇰🇷", difficulty: "medium" },
  { name: "Indonesia", capital: "Jakarta", continent: "Asia", flag: "🇮🇩", difficulty: "medium" },
  { name: "Philippines", capital: "Manila", continent: "Asia", flag: "🇵🇭", difficulty: "medium" },
  { name: "Pakistan", capital: "Islamabad", continent: "Asia", flag: "🇵🇰", difficulty: "medium" },
  { name: "Saudi Arabia", capital: "Riyadh", continent: "Asia", flag: "🇸🇦", difficulty: "medium" },
  { name: "Israel", capital: "Jerusalem", continent: "Asia", flag: "🇮🇱", difficulty: "medium" },
  { name: "Iran", capital: "Tehran", continent: "Asia", flag: "🇮🇷", difficulty: "medium" },
  { name: "Chile", capital: "Santiago", continent: "South America", flag: "🇨🇱", difficulty: "medium" },
  { name: "Colombia", capital: "Bogotá", continent: "South America", flag: "🇨🇴", difficulty: "medium" },
  { name: "Peru", capital: "Lima", continent: "South America", flag: "🇵🇪", difficulty: "medium" },
  { name: "Venezuela", capital: "Caracas", continent: "South America", flag: "🇻🇪", difficulty: "medium" },
  { name: "Nigeria", capital: "Abuja", continent: "Africa", flag: "🇳🇬", difficulty: "medium" },
  { name: "Kenya", capital: "Nairobi", continent: "Africa", flag: "🇰🇪", difficulty: "medium" },
  { name: "Morocco", capital: "Rabat", continent: "Africa", flag: "🇲🇦", difficulty: "medium" },
  { name: "New Zealand", capital: "Wellington", continent: "Oceania", flag: "🇳🇿", difficulty: "medium" },
  { name: "Switzerland", capital: "Bern", continent: "Europe", flag: "🇨🇭", difficulty: "medium" },
  { name: "Austria", capital: "Vienna", continent: "Europe", flag: "🇦🇹", difficulty: "medium" },
  { name: "Belgium", capital: "Brussels", continent: "Europe", flag: "🇧🇪", difficulty: "medium" },
  { name: "Czech Republic", capital: "Prague", continent: "Europe", flag: "🇨🇿", difficulty: "medium" },
  { name: "Hungary", capital: "Budapest", continent: "Europe", flag: "🇭🇺", difficulty: "medium" },
  { name: "Ukraine", capital: "Kyiv", continent: "Europe", flag: "🇺🇦", difficulty: "medium" },

  // HARD
  { name: "Bhutan", capital: "Thimphu", continent: "Asia", flag: "🇧🇹", difficulty: "hard" },
  { name: "Mongolia", capital: "Ulaanbaatar", continent: "Asia", flag: "🇲🇳", difficulty: "hard" },
  { name: "Kazakhstan", capital: "Astana", continent: "Asia", flag: "🇰🇿", difficulty: "hard" },
  { name: "Uzbekistan", capital: "Tashkent", continent: "Asia", flag: "🇺🇿", difficulty: "hard" },
  { name: "Kyrgyzstan", capital: "Bishkek", continent: "Asia", flag: "🇰🇬", difficulty: "hard" },
  { name: "Turkmenistan", capital: "Ashgabat", continent: "Asia", flag: "🇹🇲", difficulty: "hard" },
  { name: "Laos", capital: "Vientiane", continent: "Asia", flag: "🇱🇦", difficulty: "hard" },
  { name: "Brunei", capital: "Bandar Seri Begawan", continent: "Asia", flag: "🇧🇳", difficulty: "hard" },
  { name: "Maldives", capital: "Malé", continent: "Asia", flag: "🇲🇻", difficulty: "hard" },
  { name: "Eswatini", capital: "Mbabane", continent: "Africa", flag: "🇸🇿", difficulty: "hard" },
  { name: "Lesotho", capital: "Maseru", continent: "Africa", flag: "🇱🇸", difficulty: "hard" },
  { name: "Namibia", capital: "Windhoek", continent: "Africa", flag: "🇳🇦", difficulty: "hard" },
  { name: "Botswana", capital: "Gaborone", continent: "Africa", flag: "🇧🇼", difficulty: "hard" },
  { name: "Madagascar", capital: "Antananarivo", continent: "Africa", flag: "🇲🇬", difficulty: "hard" },
  { name: "Rwanda", capital: "Kigali", continent: "Africa", flag: "🇷🇼", difficulty: "hard" },
  { name: "Djibouti", capital: "Djibouti", continent: "Africa", flag: "🇩🇯", difficulty: "hard" },
  { name: "Eritrea", capital: "Asmara", continent: "Africa", flag: "🇪🇷", difficulty: "hard" },
  { name: "Suriname", capital: "Paramaribo", continent: "South America", flag: "🇸🇷", difficulty: "hard" },
  { name: "Guyana", capital: "Georgetown", continent: "South America", flag: "🇬🇾", difficulty: "hard" },
  { name: "Paraguay", capital: "Asunción", continent: "South America", flag: "🇵🇾", difficulty: "hard" },
  { name: "Uruguay", capital: "Montevideo", continent: "South America", flag: "🇺🇾", difficulty: "hard" },
  { name: "Belize", capital: "Belmopan", continent: "North America", flag: "🇧🇿", difficulty: "hard" },
  { name: "Moldova", capital: "Chișinău", continent: "Europe", flag: "🇲🇩", difficulty: "hard" },
  { name: "Albania", capital: "Tirana", continent: "Europe", flag: "🇦🇱", difficulty: "hard" },
  { name: "North Macedonia", capital: "Skopje", continent: "Europe", flag: "🇲🇰", difficulty: "hard" },
  { name: "Montenegro", capital: "Podgorica", continent: "Europe", flag: "🇲🇪", difficulty: "hard" },
  { name: "Luxembourg", capital: "Luxembourg City", continent: "Europe", flag: "🇱🇺", difficulty: "hard" },
  { name: "Malta", capital: "Valletta", continent: "Europe", flag: "🇲🇹", difficulty: "hard" },
  { name: "Iceland", capital: "Reykjavík", continent: "Europe", flag: "🇮🇸", difficulty: "hard" },
  { name: "Vanuatu", capital: "Port Vila", continent: "Oceania", flag: "🇻🇺", difficulty: "hard" },
  { name: "Samoa", capital: "Apia", continent: "Oceania", flag: "🇼🇸", difficulty: "hard" },
  { name: "Tonga", capital: "Nukuʻalofa", continent: "Oceania", flag: "🇹🇴", difficulty: "hard" },
  { name: "Fiji", capital: "Suva", continent: "Oceania", flag: "🇫🇯", difficulty: "hard" },
];

export function pickRandomCountry(difficulty: "easy" | "medium" | "hard"): Country {
  const pool = COUNTRIES.filter((c) => c.difficulty === difficulty);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function normalizeName(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

export function matchesCountry(guess: string, country: Country): boolean {
  const g = normalizeName(guess);
  if (!g) return false;
  const aliases: Record<string, string[]> = {
    "United States": ["us", "usa", "america", "unitedstates", "unitedstatesofamerica"],
    "United Kingdom": ["uk", "britain", "greatbritain", "england"],
    "Czech Republic": ["czechia"],
    "Eswatini": ["swaziland"],
    "North Macedonia": ["macedonia"],
  };
  if (normalizeName(country.name) === g) return true;
  const extras = aliases[country.name] ?? [];
  return extras.some((a) => normalizeName(a) === g);
}
