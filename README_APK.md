# CavoStore (Vite + React + Capacitor)

## تشغيل على الكمبيوتر/ترموكس (للتجربة)
```bash
npm install
npm run dev
```

## بناء APK على GitHub Actions (من غير كمبيوتر)
1) ارفع المشروع ده على GitHub Repo (مثلاً: CavoStore).
2) افتح تبويب **Actions** → اختار Workflow اسمها **Build Cavo APK**.
3) اضغط **Run workflow**.
4) بعد ما يخلص، افتح الـ Run → **Artifacts** → حمل **Cavo-APK** هتلاقي جواه `app-debug.apk`.

> ملحوظة: ده Debug APK (للتجربة). لو عايز Release بتوقيع رسمي قولّي وهنضيف keystore + خطوات signing.

## لو GitHub رفض رفع ملف workflow
لو بتعمل push من موبايل/Termux باستخدام Personal Access Token وظهر رفض لإنه workflow:
- لازم الـ Token يبقى عنده صلاحية تعديل ملفات `.github/workflows/*` (Permissions/Scopes الخاصة بالـ Actions/Workflows).
- أسهل حل: عدّل/ارفع ملف `android.yml` من GitHub website مباشرة (Add file → Create new file).
- أو اعمل Token جديد بصلاحيات Repository Contents + Actions (Write).

## لوحة المالك داخل التطبيق
- افتح `/admin`
- الـ PIN الافتراضي: `1234`
- تقدر تغيّر رقم واتساب/التليفون وPIN من نفس الصفحة.
- تضيف/تعدل/تمسح منتجات + تصدير/استيراد JSON.

⚠️ ملاحظة مهمة: الـ PIN ده حماية بسيطة (Local) مش أمان حقيقي على الإنترنت. لو هنطلع نسخة Online فيها Owner واحد بجد، هنحتاج Backend وتسجيل دخول.
