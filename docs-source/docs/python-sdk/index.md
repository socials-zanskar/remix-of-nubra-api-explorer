# Python SDK Overview

The Nubra API is your gateway to seamless integration with Nubra’s trading infrastructure.  
Our APIs are designed to empower developers, algorithmic traders, and institutions with programmatic access to core trading functionalities including order execution, account information, market data, and more.

The **Python SDK** provides a high-level, intuitive interface to Nubra’s trading services.  
It is ideal for building trading strategies, automation scripts, research tools, or custom trading applications using Python — without needing to manage low-level REST requests.

In addition to the SDK, Nubra also offers a complete suite of **REST APIs** for developers requiring direct HTTP-level integrations.

---

## ⚠️ Version Notice (Important)

**The Nubra Python SDK is currently on Version 2 (V2).**  
V2 includes major improvements in stability, authentication, market data, and trading workflows.

> **V1 of the SDK will be deprecated soon.**  
If you are still using V1, we strongly recommend migrating to **V2** to ensure compatibility and continued support.

---


## Features

- Easy-to-use Python interface  
- Comprehensive market data access  
- Real-time quotes and Greeks  
- Historical data retrieval  
- Option chain snapshots  
- Full order management (regular, CO, flexi, basket)  
- Positions, holdings, and funds  
- Secure MPIN-based authentication  
- Built for algorithmic trading and automation  
- Production-ready performance  

---

## Getting Started

### Prerequisites: Setting Up Your Environment

To use the Nubra Trading API, you'll need to set up your system with the following tools:

#### 1. Install Visual Studio Code (VS Code)
This is your code editor for writing and running Python code.
- Download from: [https://code.visualstudio.com/download](https://code.visualstudio.com/download)
- Once installed, open it and install the Python extension (search for "Python" in the Extensions tab on the left sidebar).

#### 2. Install Python
Python is the programming language you'll use to write API scripts.
- Download from: [https://www.python.org/downloads/](https://www.python.org/downloads/)
- Make sure to check the box "Add Python to PATH" before installing (very important on Windows).
- After installation, confirm it's installed:

**For Mac:**
Open Terminal and run:
```bash
python3 --version
```

**For Windows:**
Open Command Prompt and run:
```bash
python --version
```

You should see something like `Python 3.x.x`.

### Installation

To get started with the Nubra Python SDK, you'll need to:

1. Install the SDK package
2. Set up authentication
3. Initialize the client
4. Start making API calls

Install the SDK using pip:

```bash
pip install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple nubra-sdk
```

For mac

```bash
pip3 install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple nubra-sdk
```

## Support

If you encounter any issues or have questions, please email us at support@nubra.io