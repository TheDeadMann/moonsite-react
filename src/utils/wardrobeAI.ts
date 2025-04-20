import { WardrobeItem } from "../types/wardrobe"

// TODO - better file name? all of http requests here? idk
export const generateAIRequestBody = (selectedItems: WardrobeItem[], availableItems: WardrobeItem[]) => {
    // from backend perspective, this 👇🏿 is not best practice at all. only doing it because the project is supposed to asess my frontend skills and coding a dedicated backend server feels like cheating 🤔
    const systemMessage = `
    You are a fashion recommendation expert. Your job is to suggest clothing items that go well together in terms of size and color. You help users build a stylish outfit consisting of a shirt, pants, and shoes. Each clothing item has:
      - an id (which must be preserved in the output)
      - a type: shirt, pants, or shoes
      - a brand
      - a color
      - a size (shirts use sizes S–XXL; pants and shoes use numeric sizes).
    
    The user selects one or more items. Based on these items, you evaluate the rest of the clothing items and assign each one a relevance score from 0 (best match) to 100 (worst match). 

    **It is essential that you return all available items** with an associated relevance score, even if the relevance score is high (i.e., less relevant).

    Guidelines:
    1. Size compatibility: Use rough mapping between clothing types (e.g., shoe size 45 likely means shirt size XL or XXL).
    2. Color matching: Avoid clashing colors and favor complementary or neutral tones.
    
    Your response must be in the following JSON format:
    {
      "items": [
      {
        "id": "item_123",
        "type": "pants",
        "brand": "Levi's",
        "color": "dark blue",
        "size": 32,
        "relevance": 5
      },
      {
        "id": "item_124",
        "type": "shirt",
        "brand": "Nike",
        "color": "blue",
        "size": "M",
        "relevance": 20
      }
      ]
    }
    response without \`\`\`json and \`\`\` at the beginning and end.
    `

    const userMessage = `
    The user has selected: ${JSON.stringify(selectedItems)}.
    Please evaluate the following available clothing items and assign a relevance score to each one: ${JSON.stringify(availableItems)}
    `

    return {
        system: systemMessage,
        user: userMessage
    }
}