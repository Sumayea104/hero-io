🚀 Zenith Apps
Zenith Apps is a modern, sleek, and highly responsive mobile application marketplace interface. It allows users to browse various categories of apps, view detailed analytics via interactive charts, and "install" apps to their personal collection with persistent data storage.

🛠️ Technologies Used
The project is built with a focus on performance, aesthetic UI/UX, and professional-grade libraries:

Core: React.js (Vite)

Styling: Tailwind CSS & DaisyUI (for a clean, utility-first design)

Routing: React Router DOM (v6)

Icons: React Icons (Font Awesome)

Charts: Recharts (for dynamic ratings and data visualization)

Notifications: SweetAlert2 (for robust, cross-device alerts)

Deployment: Vercel / GitHub Pages

🌟 Key Features
Dynamic App Discovery: Browse apps with real-time filtering and category-based navigation.

Advanced Analytics: Every app detail page features a Ratings Analysis bar chart using Recharts.

Persistent Installation: Uses localStorage to keep track of installed apps even after page refreshes.

Global State Sync: Implements custom storage event dispatching to update the UI (like Navbar counters) instantly across components.

Premium UX: Includes artificial loading delays to prevent layout shifts and provide a smoother transition feel.

🚧 Challenges Faced & Solutions
During the development of Zenith Apps, I encountered several technical hurdles. Here is how I solved them:

1. The "Invisible Toast" Mystery
Problem: Initially, I used react-hot-toast for notifications, but they were invisible on the screen even though the logic was firing correctly in the console.
Solution: I discovered that the Fixed Navbar and the high-layered Hero Section were overlapping the toast notifications. After experimenting with z-index, I decided to switch to SweetAlert2. It provided a more robust, centrally-aligned popup that bypassed all z-index conflicts and improved the mobile experience significantly.

2. Event Bubbling in App Cards
Problem: Clicking the "Install Now" button on an AppCard would also trigger the card's main onClick event, navigating the user to the details page unexpectedly.
Solution: I implemented e.stopPropagation() inside the handleInstall function. This isolated the button click from the parent container, ensuring the user stays on the same page while installing.

3. Responsive Data Visualization
Problem: The Recharts BarChart was breaking the layout on small mobile screens.
Solution: I utilized the ResponsiveContainer component from the Recharts library and combined it with Tailwind's aspect-ratio classes. This allowed the chart to scale fluidly from a 24-inch monitor down to a 5-inch smartphone screen.

4. Cross-Component State Sync
Problem: Installing an app on the Details page wouldn't update the "Installed" count in the Navbar without a manual refresh.
Solution: I used a global event listener system: window.dispatchEvent(new Event("storage")). By listening for this event in the Navbar, the app can reactively update its state whenever the localStorage changes.
