# Nubra SDK Documentation

This repository contains the documentation for Nubra APIs and Client SDKs. The documentation is built using MkDocs with the Material theme, providing a modern and responsive documentation website.

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Zanskar-Securities/nubra-api-documentation.git
cd nubra-api-documentation
```

2. Create and activate a virtual environment (recommended):
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## 🏃 Running the Documentation Locally

To preview the documentation locally:

```bash
mkdocs serve
```

This will start a local development server at `http://127.0.0.1:8000`. The site will automatically reload whenever you make changes to the documentation.

## 📚 Project Structure

- `docs/` - Contains all documentation source files
- `mkdocs.yml` - Configuration file for MkDocs
- `requirements.txt` - Python dependencies
- `assets/` - Static assets like images and custom CSS

## 🛠️ Building the Documentation

To build the documentation for deployment:

```bash
mkdocs build
```

This will create a `site/` directory containing the static HTML files of your documentation.

## 🚀 Deployment

The documentation can be deployed to various platforms:

### GitHub Pages

1. Install the `mike` package for versioning:
```bash
pip install mike
```

2. Deploy to GitHub Pages:(Optional)
```bash
mike deploy latest
mike set-default latest
```

### Custom Server

1. Build the documentation:
```bash
mkdocs build
```

2. Deploy the contents of the `site/` directory to your web server.

## 📝 Writing Documentation

- Use Markdown syntax for writing documentation
- Place new documentation files in the appropriate directory under `docs/`
- Update `mkdocs.yml` to include new pages in the navigation
- Use the tabbed content feature with `=== "Tab Name"` syntax for code examples in different languages

## 📂 Maintaining Documentation Structure

To keep the documentation clean and easy to maintain, follow these guidelines when adding, updating, or removing files in the `docs/` directory.

### 📁 Adding New Files
- Place files inside the correct category folder (e.g., `rest-api/market-data/`, `rest-api/trading/orders/`).
- Use **lowercase folder names** and **kebab-case filenames** (e.g., `option-chain.md`, `cancel-order.md`).
- After adding a file:
  - Update `mkdocs.yml` → `nav:` to include it.
  - Ensure all relative links inside the file point to correct paths.

**Avoid:**
- Adding files in random or incorrect directories  
- Creating duplicates like `file2.md`, `file-new.md`, `file-final.md`  
- Leaving unused or temporary files behind  

### 📝 Updating Existing Files
- Update the original file instead of creating new versions.
- For major breaking changes, choose one:
  - **Versioned folders:**
    - `rest-api/v1/orders/place-order.md`
    - `rest-api/v2/orders/place-order.md`
  - **MkDocs versioning with `mike`:**
    ```bash
    mike deploy v1
    mike deploy v2
    ```

**Do not duplicate files unless necessary for versioning.**

## 🔧 Configuration

The documentation is configured through `mkdocs.yml`. Key features include:

- Material theme with light/dark mode
- Custom CSS styling
- Code highlighting
- Tabbed content
- Search functionality
- Versioning support

## 🤝 Contributing

1. Create a new branch for your changes
2. Make your changes and test locally
3. Submit a pull request

## 📄 License

Copyright © 2025 Zanskar Securities Private Limited. All rights reserved.
