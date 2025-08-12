# VISTA Brand Color System

## 🎨 **Quick Start Guide**

### **To Update Your Brand Colors:**

1. **Open**: `css/brand-colors.css`
2. **Find**: Lines 13-14 in the "PRIMARY BRAND COLORS" section:
   ```css
   --vista-blue-primary: #007bff;      /* Main brand blue - UPDATE THIS */
   --vista-orange-primary: #ff8c00;    /* Main brand orange - UPDATE THIS */
   ```
3. **Replace** with your exact color codes
4. **Save** - All website colors update automatically! 

### **Example:**
```css
/* Replace these lines: */
--vista-blue-primary: #1e3a8a;      /* Your exact blue */
--vista-orange-primary: #f97316;    /* Your exact orange */
```

## 📁 **File Structure**

- `brand-colors.css` - **Main color file** (edit this one!)
- `modern-style.css` - Uses colors from brand-colors.css
- `README.md` - This instructions file

## 🔧 **How It Works**

1. **brand-colors.css** defines all brand colors as CSS variables
2. **modern-style.css** uses these variables instead of hardcoded colors
3. **All pages** automatically load brand-colors.css first
4. **One change** updates the entire website!

## 🎯 **Color Categories Available**

### **Primary Colors**
- `--vista-blue-primary` - Main blue
- `--vista-orange-primary` - Main orange

### **Auto-Generated Variants**
- Light versions (automatically generated)
- Dark versions (automatically generated)
- Ultra-light backgrounds

### **Ready-to-Use Classes**
```html
<div class="text-brand-primary">Blue text</div>
<div class="text-brand-secondary">Orange text</div>
<div class="bg-brand-light">Light blue background</div>
```

## 🚀 **Benefits**

✅ **One-File Control** - Update colors in one place  
✅ **Automatic Variants** - System generates light/dark versions  
✅ **Future-Proof** - Easy to rebrand anytime  
✅ **Consistent** - No missed color updates  
✅ **Professional** - Industry standard approach  

## 📞 **Need Help?**

Just update the two main color lines in `brand-colors.css` and everything else happens automatically!
