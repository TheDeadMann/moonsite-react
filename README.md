# Moonsite React Exam (Outfit Recommender Web App 👕👖👟)

This is a **React** web application that helps users build outfit sets using a catalog of shirts, pants, and shoes. Users can receive AI-powered recommendations for their next item based on current selections and save their completed outfits for future reference.

## 📂 App Structure

### 1. Home Screen
- Displays item counts by category.
- Shows a summary of saved outfits.
- Buttons for selecting shirt/pants/shoes, with indicators for already selected items.

### 2. Wardrobe Screen
- Displays the current outfit being built.
- Shows available items.
- Users can switch item type with a segmented control.
- Each item displays:
  - Brand
  - Color
  - Size

### 3. Saved Outfits Screen
- Lists all saved outfit sets.
- Each set includes:
  - Set ID
  - Type and ID of the three items
  - Creation date
  - Time taken to build the set
- Users can delete saved sets.

## 🧠 Recommendation Algorithm

The app uses an **AI-based model** hosted on an external server to suggest the next item in an outfit. It receives:
1. **Selected Items** – Items already chosen for the outfit.
2. **Available Items** – Items not yet used in any set.

The model is also passed logic rules derived from the assignment (e.g., size and color matching).

## 🧭 Navigation Decisions

- Navigation is handled using **React Router**.
- A sidebar provides access to:
  - Home
  - Wardrobe
  - Saved Outfits
- The goal was to keep navigation intuitive and unobtrusive.

## 🛠 Setup Instructions

1. Clone the repository.
2. Run `npm install`.
3. Start the development server with `npm run dev`.
4. Clone and follow the setup instructions for the [AI backend server](https://github.com/TheDeadMann/g4f-proxy).

## ⏱️ Time Spent

**Net time invested:** ~1 day 9 hours (editor open), ~23 hours 27 minutes (active coding time)

Time was tracked using the **Code Time** extension in Visual Studio Code.

## 🛠 Known Issues (For the Team)

- **Missing item filters:**  
  Items are not filtered by size or color based on prior selections.

- **Minimal side menu:**  
  The navigation menu works but lacks design polish and UX structure.

- **No loading indicators:**  
  The app doesn't show any loading state during data fetches, which can be confusing.

- **Unfinished areas marked as TODO:**  
  While Coding the project I tried to focus on scalable and clear code.    
  Unfortunately - Several parts of the codebase still include TODO comments where several issues lie. Including: variable names, file names, large code bits that could have moved to a function, etc.

- **Basic alerts instead of UI feedback:**  
  User notifications (e.g., after saving) are shown with `alert()` instead of styled toasts.

- **Wireframe-level styling:**  
  The UI is clean but lacks detailed styling, visual hierarchy, and interactivity.

- **Saved sets missing key info:**  
  Brand and size details are not shown in saved outfits, despite being required.

- **No transitions or animations:**  
  UI interactions are immediate without smooth feedback or motion.

- **No mobile styling:**  
  The app hasn’t been styled for smaller screens and is desktop-only for now.

## 💬 Personal Notes (For the Team)

- I had no prior experience with Redux before this project, so I spent some of the time learning and integrating it properly.
- My focus was on creating a modular and scalable React setup, even if not all features were completed.
- Due to limited time, I couldn’t fully implement or refine everything I had planned.
- Despite that, the overall architecture is thoughtful and should be easy to build on.