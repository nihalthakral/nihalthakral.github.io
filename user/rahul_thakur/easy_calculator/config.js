const CONFIG = {

  // Client ka naam (header aur install screen mein dikhega)
  clientName: "Rahul Thakur",

  // Header emoji (dukaan ki type ke hisaab se choose karo)
  headerEmoji: "🛍️",

  // Free trial khatam hone ki date — format: "YYYY-MM-DD"
  expiryDate: "2026-7-10",

  // Tracker naam — spaces ki jagah _ use karo
  trackerName: "Rahul_Thakur_Easy_Calculator",

  // Services / Products list
  // unit examples: "page", "meter", "piece", "kg", "item", "sheet"
  // Minimum 1, Recommended = 4, Maximum = 10 
  services: [
    { id: "1", emoji: "📄", name: "Photo Copy", rate: 3,  unit: "page"  },
    { id: "2", emoji: "🖨️", name: "Saada Printout", rate: 5,  unit: "page"  },
    { id: "3", emoji: "🌈", name: "Colored Printout", rate: 10, unit: "page"  },
    { id: "4", emoji: "🎨", name: "Colored Photocopy", rate: 10, unit: "page"  }
  ]

};
