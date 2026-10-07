// Smart AI Assistant with deterministic fallback for micro-entrepreneurs
export async function generateCatalogueListing(promptText, apiKey = null) {
  const clean = promptText.trim().toLowerCase();

  // If external Gemini API is configured:
  if (apiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an assistant for a local women's marketplace in Hubballi-Dharwad called Sakhi Market. Based on this seller prompt: "${promptText}", return a valid JSON object strictly formatted as:
              {"title": "Product Title", "description": "Crisp 2-sentence description highlighting handmade quality", "category": "One of: Food, Baking, Catering, Tailoring, Kasuti / Embroidery, Handicrafts, Jewellery, Fashion, Festive Products, Other Services", "suggestedPrice": 250, "unit": "e.g. Pack of 10 or 500g or 1 Piece", "isQuoteBased": false}`
            }]
          }]
        })
      });
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }
    } catch (err) {
      console.warn("AI API fallback triggered:", err);
    }
  }

  // High quality deterministic fallback for local Hubballi-Dharwad products:
  if (clean.includes("holige") || clean.includes("puran poli") || clean.includes("sweet")) {
    return {
      title: "Traditional Dharwad Bele Holige (Puran Poli)",
      description: "Authentic handmade thin Holige prepared with organic jaggery, chana dal and pure country cow ghee. Made fresh per order.",
      category: "Food",
      suggestedPrice: 250,
      unit: "Pack of 10",
      isQuoteBased: false
    };
  }

  if (clean.includes("chutney") || clean.includes("pudi") || clean.includes("shenga") || clean.includes("powder")) {
    return {
      title: "Artisanal Hubballi Shenga (Peanut) Chutney Pudi",
      description: "Roasted groundnut chutney powder infused with garlic and roasted Byadagi chillies. Zero preservatives, stone-ground recipe.",
      category: "Food",
      suggestedPrice: 150,
      unit: "250g Jar",
      isQuoteBased: false
    };
  }

  if (clean.includes("rotti") || clean.includes("jolada") || clean.includes("meal") || clean.includes("lunch") || clean.includes("dinner")) {
    return {
      title: "Authentic North Karnataka Jolada Rotti Meal Pack",
      description: "Soft handcrafted Jowar rottis served with spicy stuffed brinjal (Ennegayi) and authentic peanut chutney.",
      category: "Food",
      suggestedPrice: 180,
      unit: "Pack of 4 Rottis + Sabzi",
      isQuoteBased: false
    };
  }

  if (clean.includes("kasuti") || clean.includes("embroidery") || clean.includes("saree") || clean.includes("ilkal")) {
    return {
      title: "GI-Certified Dharwad Kasuti Hand-Embroidered Saree",
      description: "Intricately embroidered temple motifs using heritage Gavanti and Murgi stitches by women artisans on pure Ilkal fabric.",
      category: "Kasuti / Embroidery",
      suggestedPrice: 2600,
      unit: "1 Saree with Blouse Piece",
      isQuoteBased: false
    };
  }

  if (clean.includes("blouse") || clean.includes("tailor") || clean.includes("stitch") || clean.includes("dress")) {
    return {
      title: "Custom Designer Bridal Blouse Tailoring",
      description: "Custom bridal cut, neckline detailing and tailored fitting for festive occasions. Measurements taken at doorstep or via sample.",
      category: "Tailoring",
      suggestedPrice: 550,
      unit: "Per Blouse",
      isQuoteBased: true
    };
  }

  if (clean.includes("cake") || clean.includes("bake") || clean.includes("pastry") || clean.includes("cupcake")) {
    return {
      title: "Fresh Homemade Celebration Cake (Eggless)",
      description: "Soft, oven-fresh artisan sponge cake made with premium dairy ingredients, customized for family celebrations and milestones.",
      category: "Baking",
      suggestedPrice: 650,
      unit: "1 kg",
      isQuoteBased: false
    };
  }

  if (clean.includes("jewellery") || clean.includes("bangle") || clean.includes("necklace") || clean.includes("earring")) {
    return {
      title: "Handmade Traditional Temple Jewellery Set",
      description: "Exquisite handcrafted festive jewellery crafted with antique finish and semi-precious stones for weddings and puja.",
      category: "Jewellery",
      suggestedPrice: 750,
      unit: "1 Set",
      isQuoteBased: false
    };
  }

  if (clean.includes("cater") || clean.includes("feast") || clean.includes("function") || clean.includes("thali")) {
    return {
      title: "Traditional North Karnataka Festive Thali Catering",
      description: "Hygienic home-style festive feast prepared for family gatherings, Gruhapravesha and celebrations.",
      category: "Catering",
      suggestedPrice: 280,
      unit: "Per Person (Min 10)",
      isQuoteBased: true
    };
  }

  // Generic fallback if input is generic:
  const capitalized = promptText.trim().charAt(0).toUpperCase() + promptText.trim().slice(1);
  return {
    title: capitalized.length > 50 ? capitalized.slice(0, 47) + "..." : capitalized,
    description: "Handcrafted with traditional care and high quality ingredients by a local Hubballi-Dharwad woman entrepreneur.",
    category: "Food",
    suggestedPrice: 200,
    unit: "1 Standard Unit",
    isQuoteBased: false
  };
}
