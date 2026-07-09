# DevKit Console — Debug את ה-React App שלך בצורה מקצועית

**TL;DR:** ספריית npm ללא dependencies שמנהלת סינכרון בזמן אמת בין browser console ל-React UI. שנה log levels מ-DevTools או מפנל צף - שניהם מתעדכנים באותו הרגע. TypeScript מלא. React components מוכנים. אין CSS imports. [demo חי](https://devkit-console.vercel.app) | [GitHub](https://github.com/ikrigel/devkit-console)

---

## הבעיה

אתה debug ל-React app. פתחת את DevTools וקלדת `debug.debug()` כדי לשנות את log level. אבל ה-UI של React שלך? עדיין מראה את הlevel הישן. ה-logger component שלך לא התעדכן. אתה צריך ידנית להפעיל state change או לטעון מחדש את העמוד.

או גרוע יותר: ה-logger UI שלך מחובר רק ל*חלקים מסוימים* מה-app שלך. console API לא סנכרונה. ההיסטוריה של logs ב-React state לא מתאימה למה שב-localStorage.

## הפתרון

**DevKit Console** היא ספריית npm בגודל 10KB (gzipped) שמנהלת סינכרון **דו-כיווני אמיתי** בין browser console ל-React UI:

```javascript
// מ-browser console (F12):
debug.debug()        // ← שנה את log level
```

```javascript
// ה-React UI שלך מתעדכן באותו הרגע:
const config = useDebugConfig();  // Re-renders עם ה-level החדש
```

אין polling. אין setTimeout. אירועים אמיתיים pub/sub מתחת למכסה המנוע.

---

## מה כלול

### @devkit-console/core
- **DebugManager** — ניהול מרכזי של log state (enabled/disabled, level)
- **Logger** — loggers בממ"ד namespaces (`debug.ns('MyApp')`)
- **Storage** — שמור אוטומטי ל-localStorage + log history
- **window.debug API** — הכל ישירות מה-browser console שלך
- **TypeScript** — type safety מלא

אפס dependencies בזמן ריצה. ~3KB gzipped.

### @devkit-console/react
- **Hooks** — `useDebugConfig()`, `useLogHistory()`, `useLogger()`
- **6 React Components מוכנים**
  - `<StatusBadge />` — "● DEBUG" או "○ OFF"
  - `<LevelSelector />` — 5-button pill group ל-levels
  - `<LogViewer />` — היסטוריית logs צבעונית וגלילה
  - `<ExportButton />` — download logs כ-JSON/text
  - `<NamespaceList />` — namespaces פעילים + כמויות
  - `<DebugPanel />` — floating panel המורכב מכל האלמנטים הנ"ל
- **אין CSS imports** — הכל בתוך inline styles
- **Uncontrolled & controlled** — השתמש ב-`defaultOpen` או `open` + `onOpenChange`

~8KB gzipped.

---

## דוגמה מהירה

```typescript
import React from 'react';
import { DebugKitProvider, DebugPanel, useDebugConfig } from '@devkit-console/react';

function App() {
  return (
    <DebugKitProvider>
      <YourApp />
      
      {/* Floating debug panel — לחץ 🐛 כדי לפתוח */}
      <DebugPanel
        position="bottom-right"
        defaultOpen={false}
        showLogViewer={true}
        showExport={true}
        showVersion={true}
      />
    </DebugKitProvider>
  );
}

function MyComponent() {
  const config = useDebugConfig();  // Subscribe ל-config changes
  const logger = useLogger('MyComponent');

  return (
    <div>
      Debug הוא {config.enabled ? '🟢 ON' : '🔴 OFF'} ב-{config.level}
      <button onClick={() => logger.info('Button clicked!')}>
        לחץ על כפתור
      </button>
    </div>
  );
}
```

---

## Browser Console Magic

```javascript
// מ-console (F12), אין צורך בsetup:

debug.debug()        // קבע level ל-DEBUG (הצג debug logs)
debug.trace()        // קבע level ל-TRACE (הכי מילולי)
debug.info()         // קבע level ל-INFO
debug.warn()         // קבע level ל-WARN
debug.error()        // קבע level ל-ERROR
debug.disable()      // כבה את logging

debug.status()       // הצג ASCII banner עם status נוכחי
debug.version()      // הצג version
debug.history()      // קבל array של כל ה-logged entries
debug.exportLogs('json') // Download כ-JSON
debug.ns('Auth').info('Login') // Scoped logging

// ה-React UI שלך מתעדכן בזמן אמת 👆
```

---

## למה זה מדהים

✅ **Bidirectional sync** — console ו-UI תמיד מסונכרנים  
✅ **Namespace support** — scoped loggers (`debug.ns('Network')`)  
✅ **Structured data** — log objects + arrays, לא רק strings  
✅ **Export logs** — download כ-JSON או text  
✅ **TypeScript** — type safety מלא, לא `any`  
✅ **אפס dependencies** (core package)  
✅ **אין CSS** — React components מוכנים עם inline styles  
✅ **קטן מאוד** — 3KB core + 8KB react (gzipped)  
✅ **Persistent** — הגדרות נשמרות ל-localStorage  
✅ **Event-based** — pub/sub מתחת למכסה המנוע, לא polling  

---

## התקנה

```bash
npm install @devkit-console/core @devkit-console/react
```

או רק core אם אתה רוצה רק את ה-manager + console API:

```bash
npm install @devkit-console/core
```

---

## Demo חי

בדוק את ה-demo האינטראקטיבי: https://devkit-console.vercel.app

- פתח את browser console (F12)
- קלוד `debug.debug()` כדי לשנות את level
- צפה בפנל ה-UI מתעדכן בזמן אמת
- לחץ על level buttons ב-UI
- צפה ב-console banner משקף את השינוי

---

## Docs

- **README** — https://github.com/ikrigel/devkit-console/blob/main/docs/README.md
- **Full API** — https://github.com/ikrigel/devkit-console/blob/main/docs/API.md
- **Changelog** — https://github.com/ikrigel/devkit-console/blob/main/docs/CHANGELOG.md

---

## GitHub

https://github.com/ikrigel/devkit-console

⭐ אם זה הוגן לך, תן ⭐!

---

**איך הsetup של logging שלך נראה?** תגובה אם אי פעם התמודדת עם בעיית סינכרון console↔UI. סקרן מה אנשים עושים היום.
