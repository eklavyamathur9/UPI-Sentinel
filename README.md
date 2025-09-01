# 🛡️ UPI Sentinel

*A web-based tool to verify the authenticity of UPI APK files by checking their digital signatures against a trusted dataset of official apps.*

---

## 🚀 Features

* **APK Upload & Analysis** – Upload any `.apk` file and verify its digital signature.
* **Genuine vs Fake Detection** – Identifies whether the APK is genuine or tampered with.
* **AI-Powered Explanations** – Provides a human-friendly explanation of the verification result.
* **Reference Dataset** – Includes a curated list of SHA-256 signatures of popular Indian UPI apps.
* **Clean UI** – Built with modern UI components (`shadcn/ui`, Tailwind CSS, Lucide icons).

---

## 📸 Screenshots

<img width="1066" height="742" alt="img1" src="https://github.com/user-attachments/assets/c91a3c2e-478b-4e45-8c13-f0dd0d4fad0c" />
<img width="1037" height="625" alt="img2" src="https://github.com/user-attachments/assets/c840b493-e358-41ec-a398-36ef55cf8a03" />


---

## 🏗️ Tech Stack

* **Frontend**: Next.js / React
* **UI Components**: [shadcn/ui](https://ui.shadcn.com/), Tailwind CSS, Lucide React
* **Backend Actions**: Next.js Server Actions (`handleApkAnalysis`)
* **State Management**: React hooks (`useActionState`, `useEffect`, `useRef`)
* **Notifications**: Custom `useToast` hook

---

## ⚙️ How It Works

1. User uploads an `.apk` file.
2. The app extracts the APK’s digital signature.
3. The signature is compared against the **official dataset** of UPI app signatures.
4. The result is displayed as:

   * ✅ **Genuine** – matches an official app.
   * ❌ **Fake** – does not match.
   * ⚠️ **Error** – invalid file or processing issue.
5. An AI-powered explanation is shown to help users understand the result.

---

## 📂 Project Structure

```bash
.
├── app/
│   ├── actions/          # Server actions (APK analysis logic)
│   ├── components/
│   │   ├── ApkAnalyzer   # File upload & form
│   │   ├── AnalysisResult # Analysis result UI
│   │   ├── DatasetTable   # Official signatures table
│   │   └── ui/           # Shared UI components (shadcn/ui)
│   └── hooks/            # Custom hooks (useToast, etc.)
├── lib/
│   ├── dataset.ts        # Genuine app signatures dataset
│   └── utils.ts          # Utility functions
```

---

## 📖 Usage

### Demo

* Upload a file named **`genuine.apk`** → returns a *genuine* result.
* Upload any other `.apk` file → returns a *fake* result.

### Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/upi-sentinel.git
cd upi-sentinel

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📜 Dataset

The tool uses a dataset of **SHA-256 signatures** for official UPI apps like:

* Google Pay
* PhonePe
* Paytm
* BHIM
* Amazon Pay
  *(and more — see dataset in `/lib/dataset.ts`)*

---

## ✅ Roadmap / Future Enhancements

* [ ] Extend dataset with more UPI/payment apps.
* [ ] Support **APK decompilation** for deeper analysis.
* [ ] Add **CLI version** for power users.
* [ ] Deploy a public demo.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork and submit PRs.

---

## 📜 License

MIT License – feel free to use and adapt.
