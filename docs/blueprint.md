# **App Name**: UPI Sentinel

## Core Features:

- APK Upload and Analysis: Allows judges to upload an APK file for analysis.
- Signature Extraction: Extracts the cryptographic signing certificate (SHA-256) from the uploaded APK.
- Dataset Comparison: Compares the extracted signature with a pre-built dataset of official app signatures to identify matches or mismatches. Uses reasoning as a tool to incorporate matches and mismatches into the final analysis.
- Real-time Dataset Generation: Scripts to automatically download APKs and extract certificates to update the dataset.
- Detection Result Display: Presents the analysis result in a clean UI, indicating whether the APK is genuine or fake, and showing expected vs found signatures.
- Official App Table: Displays a table of official banking/UPI apps with their SHA-256 signatures for reference.

## Style Guidelines:

- Primary color: Deep indigo (#3F51B5) to evoke trust and security.
- Background color: Very light gray (#F5F5F5), a nearly white background that provides a clean backdrop.
- Accent color: Amber (#FFC107) for highlighting results and interactive elements. 
- Font: 'Inter', a sans-serif, will be used for all text, providing a modern and neutral look.
- Simple, geometric icons to represent app status and actions.
- Clean, grid-based layout for easy navigation and information presentation.
- Subtle transitions and loading animations to provide a smooth user experience.