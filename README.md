# Paradise Nursery — e-plantShopping

## Project Name
Paradise Nursery Shopping Application

An online houseplant shop built with React, Redux Toolkit.

## Features
- Landing page with the company name and a "Get Started" button
- Navigation bar with links to Home, Plants, and Cart
- Cart icon in the navbar showing the live item count
- Three plant sections: Aromatic Plants, Medicinal Plants, Succulents
- Six unique plants per section (thumbnail, name, description, price)
- Add to Cart buttons that disable once the plant is in the cart
- Cart page with thumbnail, unit price, line total, +/- quantity, Delete
- Continue Shopping and Checkout buttons (Checkout shows "Coming Soon")
- Live total cart amount and total quantity

## Tech Stack
React · Redux Toolkit · React Redux · Vite · CSS

## Repo
https://github.com/Atharva0682/e-plantShopping

## Live Demo
https://Atharva0682.github.io/e-plantShopping/
EOF'
cat > src/index.css <<'EOF'
* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
  background-color: #f7fbf5;
  color: #222;
}
