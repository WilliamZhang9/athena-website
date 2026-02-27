# Athena AI Store 🛍️

An intelligent e-commerce website powered by Athena AI MCP (Model Context Protocol) agent using your store database from GitHub.

## Features

### 🎨 Modern UI/UX
- Responsive design that works on all devices
- Beautiful gradient background and card-based layouts
- Smooth animations and transitions
- Interactive product cards with hover effects

### 🛒 Shopping Functionality
- Product catalog with category filtering (All, Skincare, Makeup, Accessories)
- Add to cart with quantity management
- Real-time cart updates
- Smart discount calculation based on order amount:
  - 10% off orders over $100
  - 20% off orders over $200
  - 30% off orders over $500
- Dynamic discount notifications

### 🤖 Athena AI Assistant
- Intelligent chatbot powered by MCP-style agent
- Answers questions about:
  - Product recommendations
  - Pricing information
  - Discount policies
  - Product categories
  - Cart status
- Natural language understanding
- Contextual responses based on store data

### 📊 Database Integration
- Integrated with your GitHub store database
- Products sourced from: `william_store_mcp/store-data.json`
- 4 products across 3 categories
- Tiered discount policy system

## How to Use

1. **Open the Website**
   - Simply open `index.html` in your web browser
   - No server required - runs entirely in the browser

2. **Browse Products**
   - View all products or filter by category
   - Click category buttons to filter: All, Skincare, Makeup, Accessories

3. **Shop**
   - Click "Add to Cart" on any product
   - Adjust quantities in the cart using + and - buttons
   - Remove items with the "Remove" button
   - Watch discounts automatically apply as your cart total increases

4. **Chat with Athena AI**
   - Use the AI Assistant at the bottom of the page
   - Ask questions like:
     - "What do you recommend for skincare?"
     - "How much is the lipstick?"
     - "Tell me about your discounts"
     - "What's in my cart?"
   - Get intelligent, contextual responses

5. **Checkout**
   - Click the "Checkout" button when ready
   - (Demo only - no actual payment processing)

## File Structure

```
athena/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript logic, AI agent, and interactivity
└── README.md           # This file
```

## Technology Stack

- **Pure HTML/CSS/JavaScript** - No frameworks required
- **MCP-Style AI Agent** - Intelligent conversational assistant
- **GitHub Database** - Data from your william_store_mcp repository
- **Responsive Design** - Mobile-first approach

## AI Agent Capabilities

The Athena AI assistant uses contextual understanding to:
- Analyze user queries
- Search the product database
- Provide personalized recommendations
- Calculate and explain discounts
- Answer specific product questions
- Track cart status

## Future Enhancements

To connect to a real MCP server:
1. Set up your MCP server endpoint
2. Replace the `STORE_DATA` constant with an API call
3. Implement WebSocket or REST API communication
4. Add real-time inventory updates
5. Connect to actual payment processing

## Credits

- Database: william_store_mcp GitHub repository
- Images: Wikimedia Commons
- Design: Custom Athena AI theme

Enjoy shopping with Athena AI! 🚀
