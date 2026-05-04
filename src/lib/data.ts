export const REVIEWS = [
  { id: 1, name: "Novie Subrio", text: "Salamat kaayo, EFZ, sa pag cater sa amoang PC needs.", date: "2 days ago" },
  { id: 2, name: "Chunsy Pantillo", text: "Kung gusto mog pinakabarato ug dekalidad nga PC parts, EFZ gyud!", date: "1 week ago" },
  { id: 3, name: "Cassiel Flores", text: "Hawd kaayo sila mo-cable manage, han-ay jud kaayo ang build!", date: "2 weeks ago" }
];

export const TEAM = [
  { name: "Eric Zamora", role: "Founder & COO", image: "/eric.webp" },
  { name: "Farah Zamora", role: "CEO", image: "/farah.webp" },
  { name: "Admin Team", role: "Customer Service & Administration", image: "/admin_team_2.webp" },
  { name: "Technical Team", role: "PC Builders & Support Technicians", image: "/technical_team_1.webp" },
];

export const CATEGORIES = [
  { name: 'Graphics Cards', image: '/categories/gpu.png', color: 'bg-[#FF3B30]' },
  { name: 'Processors', image: '/categories/cpu.png', color: 'bg-[#34C759]' },
  { name: 'Memory (RAM)', image: '/categories/memory.png', color: 'bg-[#007AFF]' },
  { name: 'Motherboards', image: '/categories/motherboard.png', color: 'bg-[#FFCC00]' },
  { name: 'Storage', image: '/categories/storage.png', color: 'bg-[#AF52DE]' },
];

export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  specs: string;
  price: number;
  image: string;
  isDeal: boolean;
  inStock?: boolean;
}

export const PRODUCTS: Product[] = [
  // Graphics Cards
  { id: 1, name: 'RTX 4090 OC Edition', category: 'GRAPHICS CARDS', brand: 'NVIDIA', specs: '24GB GDDR6X, 2520MHz Boost', price: 105000, image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 2, name: 'RX 7900 XTX', category: 'GRAPHICS CARDS', brand: 'MSI', specs: '24GB GDDR6, 2500MHz Boost', price: 61000, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: false },
  { id: 3, name: 'RTX 4070 Ti SUPER', category: 'GRAPHICS CARDS', brand: 'PALIT', specs: '16GB GDDR6X, 2610MHz Boost', price: 42500, image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600', isDeal: true, inStock: true },
  { id: 4, name: 'RTX 4060 Ti Dual OC', category: 'GRAPHICS CARDS', brand: 'ASUS', specs: '8GB GDDR6, 2580MHz Boost', price: 26500, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

  // Processors
  { id: 5, name: 'Ryzen 9 7950X3D', category: 'PROCESSORS', brand: 'AMD', specs: '16 Cores, 32 Threads, 5.7GHz', price: 42000, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=600', isDeal: true, inStock: true },
  { id: 6, name: 'Core i9-14900K', category: 'PROCESSORS', brand: 'INTEL', specs: '24 Cores, 32 Threads, 6.0GHz', price: 37500, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 7, name: 'Ryzen 7 7800X3D', category: 'PROCESSORS', brand: 'AMD', specs: '8 Cores, 16 Threads, 5.0GHz', price: 24500, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=600', isDeal: true, inStock: true },
  { id: 8, name: 'Core i5-14600K', category: 'PROCESSORS', brand: 'INTEL', specs: '14 Cores, 20 Threads, 5.3GHz', price: 17500, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

  // Memory
  { id: 9, name: 'Dominator Platinum DDR5', category: 'MEMORY MODULES', brand: 'TEAM', specs: '32GB (2x16GB) DDR5-6000', price: 11500, image: 'https://images.unsplash.com/photo-1562976540-1502f7454238?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 10, name: 'Trident Z5 Neo RGB', category: 'MEMORY MODULES', brand: 'G.SKILL', specs: '32GB (2x16GB) DDR5-6400', price: 9800, image: 'https://images.unsplash.com/photo-1562976540-1502f7454238?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 11, name: 'FURY Beast DDR5', category: 'MEMORY MODULES', brand: 'KINGSTON', specs: '16GB (2x8GB) DDR5-5600', price: 4200, image: 'https://images.unsplash.com/photo-1562976540-1502f7454238?auto=format&fit=crop&q=80&w=600', isDeal: true, inStock: true },

  // Motherboards
  { id: 12, name: 'Z790 AORUS Elite AX', category: 'MOTHERBOARDS', brand: 'GIGABYTE', specs: 'LGA 1700, ATX, DDR5', price: 15500, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600', isDeal: true, inStock: true },
  { id: 13, name: 'ROG STRIX B650E-F', category: 'MOTHERBOARDS', brand: 'ASUS', specs: 'AM5, ATX, DDR5, WiFi 6E', price: 18500, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 14, name: 'MAG B760M Mortar WiFi', category: 'MOTHERBOARDS', brand: 'MSI', specs: 'LGA 1700, mATX, DDR5', price: 10200, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

  // Storage
  { id: 15, name: '990 PRO NVMe M.2', category: 'SOLID STATE DRIVES(SSD)', brand: 'WD', specs: '2TB PCIe 4.0, 7450MB/s', price: 10500, image: 'https://images.unsplash.com/photo-1531492746076-161ca9bc5ce8?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 16, name: 'FireCuda 530', category: 'SOLID STATE DRIVES(SSD)', brand: 'WD', specs: '1TB PCIe 4.0, 7300MB/s', price: 7200, image: 'https://images.unsplash.com/photo-1531492746076-161ca9bc5ce8?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 17, name: 'WD Black SN850X', category: 'SOLID STATE DRIVES(SSD)', brand: 'WD', specs: '2TB PCIe 4.0, 7300MB/s', price: 9800, image: 'https://images.unsplash.com/photo-1531492746076-161ca9bc5ce8?auto=format&fit=crop&q=80&w=600', isDeal: true, inStock: true },

  // CPU Coolers
  { id: 18, name: 'Kraken X73 RGB', category: 'CPU COOLERS', brand: 'NZXT', specs: '360mm AIO, LCD Display', price: 12500, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 19, name: 'H7 Flow Tower', category: 'CPU COOLERS', brand: 'CRYORIG', specs: 'Tower Cooler, 4 Heatpipes', price: 3200, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: false },
  { id: 20, name: 'FROSTFLOW X 240', category: 'CPU COOLERS', brand: 'ID-COOLING', specs: '240mm AIO, RGB', price: 3800, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

  // Power Supplies
  { id: 21, name: 'RM1000x SHIFT', category: 'POWER SUPPLIES', brand: 'COOLERMASTER', specs: '1000W, 80+ Gold, Modular', price: 9800, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 22, name: 'XPG CORE Reactor II', category: 'POWER SUPPLIES', brand: 'ANTEC', specs: '850W, 80+ Gold, Modular', price: 6500, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600', isDeal: true, inStock: true },

  // Cases
  { id: 23, name: 'H9 Elite Mid-Tower', category: 'CPU CASE', brand: 'NZXT', specs: 'ATX, Tempered Glass, White', price: 8500, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 24, name: 'DLX21 Mesh RGB', category: 'CPU CASE', brand: 'DARKFLASH', specs: 'ATX, Mesh Front, 4x Fans', price: 3500, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

  // Monitors
  { id: 25, name: 'Predator XB273U', category: 'MONITORS', brand: 'ACER', specs: '27" QHD, 170Hz, IPS', price: 22000, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 26, name: 'MAG274QRF-QD', category: 'MONITORS', brand: 'MSI', specs: '27" QHD, 165Hz, Rapid IPS', price: 18500, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600', isDeal: true, inStock: true },

  // Gaming Keyboards
  { id: 27, name: 'BlackWidow V4 Pro', category: 'GAMING KEYBOARDS', brand: 'RAZER', specs: 'Mechanical, Green Switch, RGB', price: 12500, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 28, name: 'K70 MAX', category: 'GAMING KEYBOARDS', brand: 'TECWARE', specs: 'Magnetic Hall Effect, RGB', price: 2800, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

  // Gaming Mouse
  { id: 29, name: 'DeathAdder V3 Pro', category: 'GAMING MOUSE', brand: 'RAZER', specs: '63g, 30K DPI, Wireless', price: 8500, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 30, name: 'G Pro X Superlight 2', category: 'GAMING MOUSE', brand: 'LOGITECH', specs: '60g, 32K DPI, Wireless', price: 7800, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

  // Headsets
  { id: 31, name: 'BlackShark V2 Pro', category: 'HEADSETS', brand: 'RAZER', specs: 'Wireless, THX Spatial, 70hr', price: 9500, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 32, name: 'G PRO X 2 Lightspeed', category: 'HEADSETS', brand: 'LOGITECH', specs: 'Wireless, DTS:X 2.0, 50hr', price: 11200, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

  // Fans
  { id: 33, name: 'F12 RGB 3-Pack', category: 'FANS', brand: 'NZXT', specs: '120mm, RGB, PWM', price: 2800, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 34, name: 'C12 Infinity Mirror 3-Pack', category: 'FANS', brand: 'DARKFLASH', specs: '120mm, ARGB, PWM', price: 1500, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

  // Laptops
  { id: 35, name: 'Nitro V 15', category: 'LAPTOPS', brand: 'ACER', specs: 'i5-13420H, RTX 4050, 16GB', price: 45000, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: false },
  { id: 36, name: 'ROG Strix G16', category: 'LAPTOPS', brand: 'ASUS', specs: 'i7-13650HX, RTX 4060, 16GB', price: 72000, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600', isDeal: true, inStock: true },

  // Routers
  { id: 37, name: 'UniFi Dream Router', category: 'ROUTERS', brand: 'UBIQUITI', specs: 'WiFi 6, Dual-Band, PoE', price: 12500, image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

  // Speakers
  { id: 38, name: 'R1280T 2.0', category: 'SPEAKERS', brand: 'EDIFIER', specs: '42W, Bluetooth, Wood', price: 4200, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

  // Flash Drives
  { id: 39, name: 'Ultra Flair 128GB', category: 'FLASH DRIVES', brand: 'SANDISK', specs: 'USB 3.0, 150MB/s', price: 650, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 40, name: 'DataTraveler Max 256GB', category: 'FLASH DRIVES', brand: 'KINGSTON', specs: 'USB-C 3.2, 1000MB/s', price: 2100, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

  // Gaming Chairs
  { id: 41, name: 'Caliber R2C', category: 'GAMING CHAIRS', brand: 'COOLERMASTER', specs: 'PU Leather, 4D Arms', price: 15000, image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },
  { id: 42, name: 'Ranger Eva', category: 'GAMING CHAIRS', brand: 'COUGAR', specs: 'PVC Leather, Lumbar, 180° Recline', price: 9500, image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

  // Webcams
  { id: 43, name: 'Facecam MK.2', category: 'WEBCAMS', brand: 'ELGATO', specs: '1080p60, Sony Sensor, USB-C', price: 8500, image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

  // UPS
  { id: 44, name: 'Back-UPS 800VA', category: 'UPS', brand: 'PHILIPS', specs: '800VA/450W, 4 Outlets', price: 3800, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600', isDeal: false, inStock: true },

];

// Add AMD and INTEL to BRANDS if not present (products reference them)
export const ALL_CATEGORIES = [
  "CPU CASE",
  "CPU COOLERS",
  "EXTERNAL HARD DRIVES",
  "EXTERNAL SSD",
  "FANS",
  "FLASH DRIVES",
  "GAMING CHAIRS",
  "GAMING KEYBOARDS",
  "GAMING MOUSE",
  "GRAPHICS CARDS",
  "HARD DRIVES",
  "HEADSETS",
  "LAPTOPS",
  "MEMORY MODULES",
  "MICRO SD",
  "MONITORS",
  "MOTHERBOARDS",
  "NETWORK ATTACHED STORAGE(NAS)",
  "POWER SUPPLIES",
  "PRINTERS",
  "PROCESSORS",
  "ROUTERS",
  "SOLID STATE DRIVES(SSD)",
  "SPEAKERS",
  "UPS",
  "WEBCAMS"
];

export const BRANDS = [
  "ACER",
  "AMD",
  "ANTEC",
  "ASUS",
  "COOLERMASTER",
  "COUGAR",
  "CRYORIG",
  "DARKFLASH",
  "DAREU",
  "EDIFIER",
  "ELGATO",
  "G.SKILL",
  "GIGABYTE",
  "HP",
  "ID-COOLING",
  "INTEL",
  "KINGSTON",
  "LOGITECH",
  "MSI",
  "NVIDIA",
  "NZXT",
  "ORICO",
  "PALIT",
  "PHILIPS",
  "RAZER",
  "REDRAGON",
  "SANDISK",
  "TEAM",
  "TECWARE",
  "UBIQUITI",
  "WD"
];
