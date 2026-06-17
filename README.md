# Rasoi Plus - Fast Entry

## Overview

Rasoi Plus - Fast Entry is a Chrome Extension developed to improve data entry efficiency on the Rajasthan Indira Rasoi portal.

The extension adds a custom sidebar interface that allows users to store, search, manage, and quickly reuse beneficiary information. Instead of repeatedly entering the same details manually, users can select a saved record and automatically populate the form.

The project was created to reduce repetitive work and improve operator productivity during transaction entry.

---

## Features

### Fast Form Auto-Fill

Automatically fills supported form fields with stored beneficiary data.

### Local Database Storage

Stores records directly in browser local storage without requiring a server.

### Instant Search

Search beneficiaries quickly using the built-in search interface.

### Record Management

Add, view, select, and delete stored records.

### Portal Integration

Integrates directly into the Rajasthan Indira Rasoi transaction page.

### Custom User Interface

Injects a dedicated sidebar panel for faster workflow management.

### Data Export Support

Allows local database backup and download.

### Workflow Enhancements

Includes additional utility functions to reduce repetitive operator actions.

---

## Technology Stack

* JavaScript
* HTML
* CSS
* Chrome Extension Manifest V3
* Browser Local Storage API

---

## Installation

1. Download or clone the repository.
2. Open Chrome and navigate to:

```text
chrome://extensions
```

3. Enable Developer Mode.
4. Click **Load Unpacked**.
5. Select the project folder.
6. Open the supported Indira Rasoi portal page.
7. The extension interface will load automatically.

---

## Usage

1. Open the supported transaction page.
2. Search existing records from the sidebar.
3. Select a beneficiary record.
4. The extension automatically fills the required fields.
5. Continue the transaction process.

---

## Project Structure

```text
Rasoi Plus - Fast Entry
│
├── manifest.json
├── content-script.js
├── icon.png
├── add.png
├── up.png
├── down.png
└── Bookmark JS.txt
```

---

## Author

Surender Kumar
