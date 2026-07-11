# Console DevKit – ניפוי באגים כמו Waze, לא כמו Vim

**TL;DR:** ספריית npm ללא תלותיות (dependency-zero) לשליטה דו־כיוונית ברמת הדיבוג בין קונסולת הדפדפן לבין ממשק React. מקלידים `debug.trace()` ב־ DevTools → ה־ UI מתעדכן מיד. נסו בלייב: https://devkit-console.vercel.app

---

## הבעיה

אתם עמוק בתוך סשן דיבוג. אתם רוצים לראות הכל לרמת trace אז אתם:

• פותחים DevTools
• מקלידים `debug.trace()`
• אתם ממצמצים על הפלט בקונסולה תוך כדי מאבק בממשק המשתמש של האפליקציה
• מפספסים שינויים קריטיים במצב כי הלוגים גוללים ונעלמים
• לא יכולים לסנן לפי namespace או לייצא לניתוח
• חוזרים על זה 50 פעמים

או שאתם לוחצים על כפתור ב־UI כדי לשנות רמות לוג, אבל DevTools בכלל לא מודעים לזה. חוויית הדיבוג מרגישה מפוצלת.

---

## הפתרון

**DevKit Console** מגשר על הפער הזה. זה כמו לעבוד עם Waze (ממשק אינטואיטיבי) במקום לקרוא קואורדינטות GPS (לוגים גולמיים בקונסולה).

### הטריק המרכזי: סנכרון דו־כיווני

```javascript
// לפתוח את קונסולת הדפדפן ולהקליד (בלי סוגריים):
debug.trace    // מפעיל TRACE – מתעדכן מיד UI
debug.debug    // מעבר ל־DEBUG – הקונסולה וה־UI מתעדכנים יחד
debug.info
debug.warn
debug.error
debug.disable  // מכבה הכל
```

ממשק ה־React (`<DebugPanel>`) מתעדכן בזמן אמת ככל שאתם מקלידים. לוחצים על "פיל" של רמת לוג ב־UI → הקונסולה משקפת זאת מיד. הם תמיד מסונכרנים.

---

## מה מגיע בחבילה

שני חבילות npm ללא תלותיות:

### `devkit-console-core` (13KB gzipped)
• אובייקט גלובלי `window.debug` עובד בכל סביבת JS
• Loggers עם תחומי־שם (namespace-scoped)
• משדר קונפיגורציה בזמן אמת
• היסטוריית לוג (ring buffer) עד 500 רשומות
• יצוא ל־JSON/טקסט

### `devkit-console-ui` (18KB gzipped)
• React hooks: `useDebugConfig()`, `useLogHistory()`, `useLogger()`
• קומפוננטת `<DebugPanel>` צפה (מתאימה להרכבה בכל אפליקציה)
• `<LevelSelector>`, `<LogViewer>`, `<StatusBadge>`, `<ExportButton>`
• תמיכה ב־Dark/Light theme
• כל הסגנונות inline (ללא import של CSS)

---

## פיצ'רים שבאמת חשובים

### 1. סינון לפי Namespace

```javascript
const auth = useLogger('Auth');
const network = useLogger('Network');

auth.info('User logged in');
network.debug('Fetching /api/users');
```

ה־UI מציג לוגים מקובצים לפי namespace. לחיצה על namespace מאפשרת "לקדוח פנימה" ולראות רק אותו.

### 2. יצוא לוגים חי

• לחיצה על "Export JSON" → הורדת כל היסטוריית הלוג עם מטא־דאטה
• שימושי ל: דיווחי באגים, ניתוח ביצועים, QA sign-off
• הכל קורה בצד־לקוח, ללא קריאות API

### 3. פאנל דיבוג צף

• הרכבה לכל אפליקציית React בשתי שורות קוד
• מיקום: שמאל/ימין, עליון/תחתון (top-left / top-right / bottom-left / bottom-right)
• פתיחה/סגירה עם אנימציה
• רספונסיבי למובייל

### 4. Offline First

• ללא backend, ללא צורך באינטרנט
• עובד בסביבות בדיקה, SSR, Electron, React Native
• אידיאלי לצוותים שרגישים לאבטחה

---

## שימושים בעולם האמיתי

🎮 **פיתוח משחקים** – ניטור FPS, מצב קלט, עדכוני entities בלי לעבור כל הזמן ל־DevTools.

📱 **ווב למובייל** – דיבוג על מכשירים פיזיים שבהם גישה לקונסולה היא כאב ראש. ה־UI תמיד מול העיניים.

🔍 **QA / דיווח באגים** – "הנה JSON של הלוג מרגע שהכל נשבר" → דו"ח באג שניתן לשחזור.

🚀 **Onboarding** – מפתח חדש פותח את האפליקציה, לוחץ על כפתור באג, ורואה לוגים חיים. הקשר מידי.

📊 **Enterprise** – מעקב אחר פעילות דיבוג, יצוא לוגים לצורכי ציות (compliance).

---

## התחלה מהירה

```bash
npm install devkit-console-core devkit-console-ui
```

```typescript
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

זהו. ב־ DevTools קונסולה, הקלידו `debug.debug()` וצפו ב־UI מגיב מיד.

---

## דמו חי

**בקרו ב:** https://devkit-console.vercel.app

נסו תרחישים כמו:

• **Sync Console:** הקלידו פקודות ב־ DevTools וצפו בפאנל ה־ UI מתעדכן
• **Namespace Demo:** צרו לוגים משירותי Auth / Network / Render
• **Simulator Scenario:** ירו 10 לוגי TRACE ברצף וצפו איך הצופה מתמודד
• **Export:** הורידו JSON של הכל

---

## למה זה נבנה

אחרי שנים של דיבוג באמצעות `console.log` מפוזרים בין טאבים וחלונות טרמינל, הבנתי יום אחד: אפליקציות ניווט לא גורמות לכם לקרוא קואורדינטות. אז למה דיבוג כן? DevKit Console הוא רגע ה־"Waze" הזה עבור לוגינג.

---

## מאחורי הקלעים

• TypeScript במצב strict, עם טיפוסים מלאים (.d.ts)
• React 18+ עם hooks (useContext, useState, useEffect)
• ללא תלותיות – החבילה core עצמאית לחלוטין
• Ring buffer לזיכרון חסום – שלא יתפוצץ
• TypedEmitter – pub/sub בלי התנגשויות אירועים
• בדיקות עם vitest ו @testing-library/react

---

## קישורים

🔗 **Core ב־npm:** https://www.npmjs.com/package/devkit-console-core
⚛️ **UI ב־npm:** https://www.npmjs.com/package/devkit-console-ui
🌟 **GitHub:** https://github.com/ikrigel/devkit-console
🎮 **דמו חי:** https://devkit-console.vercel.app

---

## מה הלאה?

**Roadmap ל־v0.2.0:**

• סינון מתקדם (סטטוס, טווח תאריכים)
• מצב Heatmap ויזואליזציה של צפיפות לוגים
• יצוא GeoJSON למיפוי/ניתוח
• Hooks לשילוב טלמטריה
• אינטגרציית Service Worker ללוגים של PWA גם במצב אופליין

---

## דבר אחרון

זו ספרייה ברמת פרודקשן שנמצאת בשימוש בפרויקטים אמיתיים. נשמח לדיווחי באגים / PRs / רעיונות. אם זרימת הדיבוג שלכם תסכלה אתכם בעבר – שווה לנסות. כנראה שתעריכו את תחושת ה־"פשוט עובד."

---

**Happy debugging** ✨

*יגאל קריגל*
מפתח פול־סטאק | חובב React | בונה כלי דיבוג
https://github.com/ikrigel
