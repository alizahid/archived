const categories = [
  {
    name: 'cash',
    keywords: /(atm transaction|interest)/gi
  },
  {
    name: 'entertainment',
    keywords: /(800 tickets|blizzard|majid al futtaim cinemas|netflix|reel cinema|steamgames)/gi
  },
  {
    name: 'food',
    keywords: /(cargo|costa coffee|deliveroo|din tai fung|emirates fast food|fume neighbourhood|jumeirah golf estates|margherita|mcdonalds|movenpick|pizza hut|restaurant|talabat|the address|the butcher shop|yo sushi)/gi
  },
  {
    name: 'groceries',
    keywords: /(al maya|all day|honey lemon)/gi
  },
  {
    name: 'health',
    keywords: /(boots|mansion pharmacy|medcare medical)/gi
  },
  {
    name: 'payments',
    keywords: /(online banking transfer)/gi
  },
  {
    name: 'personal',
    keywords: /(1847 executive grooming|hair concept)/gi
  },
  {
    name: 'shopping',
    keywords: /(adidas|amazon|amzn|diesel|grand stores|h and m|noon|swarovski|v star multimedia)/gi
  },
  {
    name: 'transport',
    keywords: /(careem|national taxi)/gi
  },
  {
    name: 'utilities',
    keywords: /(du eitc|washmen)/gi
  },
  {
    name: 'work',
    keywords: /(godaddy|heroku|icons8|media temple|mongodbcloud)/gi
  }
]

export default description => {
  for (const category of categories) {
    const { name, keywords } = category

    if (keywords.test(description.replace(/([^A-Za-z0-9\s])/g, ''))) {
      return name
    }
  }

  return 'other'
}
