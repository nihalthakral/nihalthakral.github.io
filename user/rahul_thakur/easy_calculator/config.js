const CONFIG = {

  // Client ka naam (header aur install screen mein dikhega)
  clientName: "Template",

  // Header emoji (dukaan ki type ke hisaab se choose karo)
  headerEmoji: "🛍️",

  // Free trial khatam hone ki date — format: "YYYY-MM-DD"
  expiryDate: "2999-10-14",

  // Tracker naam — spaces ki jagah _ use karo
  trackerName: "tracker",

  // Services / Products list
  // unit examples: "page", "meter", "piece", "kg", "item", "sheet"
  // Minimum 1, Recommended = 4, Maximum = 10 
  services: [
    { id: "1", emoji: "🛒", name: "Product 1", rate: 3,  unit: "page"  },
    { id: "2", emoji: "🛒", name: "Product 2", rate: 5,  unit: "meter"  },
    { id: "3", emoji: "🛒", name: "Product 3", rate: 10, unit: "piece"  },
    { id: "4", emoji: "🛒", name: "Product 4", rate: 10, unit: "kg"  }
  ]

};
