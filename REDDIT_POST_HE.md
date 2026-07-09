# DevKit Console – Debug כמו וויז, לא כמו Vim

**TL;DR:** ספריית npm ללא dependencies לשליטה דו-כיוונית ברמת הדיבוג בין console ל-React UI. הקלידו `debug.trace()` בדטולס → ה-UI מתעדכן מיד. נסו חי: https://devkit-console.vercel.app

---

## הבעיה

אתם בתוך סשן דיבוג עמוק. אתם רוצים לראות הכל (`trace` level). אז אתם:

1. פותחים DevTools
2. מקלידים `debug.trace()`
3. **מתכופפים על ה-console בזמן שמנסים להבין את ה-UI של האפליקציה**
4. חוטפים log מופעם כי הוא עבר בחטף
5. לא יכולים לסנן לפי namespace או לייצא ליעיל
6. חוזרים על זה 50 פעמים

או שאתם לוחצים בוטון בממשק כדי לשנות רמת logging, אבל ה-DevTools לא יודע על זה. הדיבוג מרגיש *מעובד*.

---

## הפתרון

**DevKit Console** סוגר את הפער. זה כמו להיות ווייז (ממשק אינטואיטיבי) במקום לקרוא קואורדינטות GPS (logs גולמיים).

### הטריק הליבה: Sync דו-כיווני

```javascript
// פתחו console ב-DevTools וכתבו (ללא סוגריים):
debug.trace    // הפעילו TRACE level - ה-UI מתעדכן מיד
debug.debug    // עברו ל-DEBUG level - שניהם מתעדכנים ביחד
debug.info
debug.warn
debug.error
debug.disable  // כבו הכל
```

ה-React UI (`<DebugPanel>`) מתעדכן חי כשאתם מקלידים. לחצו על level pill בממשק → ה-console משקף את זה מיד. **הם תמיד בסנכרון.**

### מה זה משלח

**שתי ספריות npm (אפס dependencies):**

1. **`devkit-console-core`** (13 KB gzipped)
   - `window.debug` global (עובד בכל סביבת JavaScript)
   - Namespace-scoped loggers
   - Real-time config emitter
   - Log history (ring buffer, 500 entries)
   - Export ל-JSON/text

2. **`devkit-console-ui`** (18 KB gzipped)
   - React hooks: `useDebugConfig()`, `useLogHistory()`, `useLogger()`
   - `<DebugPanel>` floating component (compose-friendly)
   - `<LevelSelector>`, `<LogViewer>`, `<StatusBadge>`, `<ExportButton>`
   - Dark/light theme support
   - כל ה-inline styles (אפס CSS imports)

---

## Features שחשובים

### 1. **Namespace Filtering**
```javascript
const auth = useLogger('Auth');
const network = useLogger('Network');

auth.info('User logged in');
network.debug('Fetching /api/users');
```

UI מראה logs מקובצים לפי namespace. לחצו על namespace כדי להעמיק.

### 2. **Live Log Export**
- לחצו "Export JSON" → הורידו את כל ה-log history עם metadata
- טוב ל: bug reports, performance analysis, QA sign-off
- אין API calls, הכל client-side

### 3. **Floating Debug Panel**
- Compose לכל React app ב-2 שורות
- Position: top-left, top-right, bottom-left, bottom-right
- Open/close toggle (animated)
- Responsive על mobile

### 4. **Offline First**
- אין backend, אין צורך באינטרנט
- עובד ב-test environments, SSR, Electron, React Native
- מושלם לטימים security-conscious

---

## Use Cases בעולם האמיתי

### 🎮 Game Development
עקבו אחרי FPS, input state, entity updates בלי לחזור לDevTools.

### 📱 Mobile Web
Debuggingו על מכשירים פיזיים כשגישה ל-console קשה. UI תמיד בעמוד.

### 🔍 QA / Bug Reporting
"הנה ה-JSON log מכשהיה השבר" → reproducible bug report.

### 🚀 Onboarding
טימלד חדש פותח את האפליקציה, לוחץ על הבאג 🐛, רואה live logs. Context מיד.

### 🏢 Enterprise
Audit trail של debug activities. Export logs ל-compliance.

---

## Quick Start

```bash
npm install devkit-console-core devkit-console-ui
```

```tsx
import { DebugKitProvider } from 'devkit-console-ui';
import { DebugPanel } from 'devkit-console-ui';

export function App() {
  return (
    <DebugKitProvider>
      <DebugPanel position="bottom-right" defaultOpen={true} />
      <YourApp />
    </DebugKitProvider>
  );
}
```

סיים. ב-DevTools console, הקלידו `debug.debug()` וראו את ה-UI מגיב.

---

## Live Demo

**בקרו ב:** https://devkit-console.vercel.app

נסו את ה-scenarios:
- **Console Sync:** הקלידו פקודות ב-DevTools, ראו את ה-UI panel מתעדכן
- **Namespace Demo:** הגרילו logs מ-Auth/Network/Render services
- **Scenario Simulator:** פוצצו 10 TRACE logs, ראו את הviewer עומד בזה
- **Export:** הורידו JSON של הכל

---

## למה זה קיים

בילו שנים בדיבוג דרך console.log פזור על tabs וterminals. יום אחד הבנתי: *אפליקציות GPS לא מחייבות אותך לקרוא קואורדינטות. למה debuggingשל צריך להיות אחרת?* DevKit Console היא הרגע "Waze" הזה לlogging.

---

## תחת ה-Hood

- **TypeScript** (strict mode, full .d.ts types)
- **React 18+ hooks** (useContext, useState, useEffect)
- **אפס dependencies** (core package באמת standalone)
- **Ring buffer** (bounded memory, לעולם לא ינפץ)
- **TypedEmitter** (pub/sub בלי התנגשויות)
- **Tested** (vitest + @testing-library/react)

---

## קישורים

- 📦 **Core ב-npm:** https://www.npmjs.com/package/devkit-console-core
- ⚛️ **UI ב-npm:** https://www.npmjs.com/package/devkit-console-ui
- 🌟 **GitHub:** https://github.com/ikrigel/devkit-console
- 🎮 **Live Demo:** https://devkit-console.vercel.app

---

## מה הבא?

תרשים דרכים ל-v0.2.0:
- Advanced filtering (status, date range)
- Heatmap mode (log density visualization)
- GeoJSON export ל-mapping/analysis
- Telemetry integration hooks
- Service Worker integration ל-offline PWA logging

---

## עוד דבר אחד

זו ספריה production-ready המשמשת בפרויקטים אמיתיים. Bug reports / PRs / ideas יתקבלו בברכה. אם התחמו מ-debugging workflows, תנו לזה הזדמנות. אני חושב שתעריצו את ה-"it just works" vibeשל זה.

---

**שדיבוג שמח.** ✨

*Igal Krigel*  
Full-stack developer | React enthusiast | Debugging tool maker  
https://github.com/ikrigel
