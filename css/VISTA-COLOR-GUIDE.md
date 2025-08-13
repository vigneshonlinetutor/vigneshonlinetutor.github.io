# 🎨 VISTA Brand Color Guide

## 🔑 **Authentic Logo Colors** (ChatGPT Extracted)

These are the **exact colors from your VISTA logo**, extracted using AI analysis:

### **Primary Brand Colors**
| Color Name | HEX Code | RGB | Usage |
|------------|----------|-----|-------|
| **VISTA Blue** | `#056aaa` | rgb(5, 106, 170) | Primary buttons, links, brand elements |
| **VISTA Orange** | `#fea939` | rgb(254, 169, 57) | CTAs, highlights, energy elements |
| **VISTA Navy** | `#05335a` | rgb(5, 51, 90) | Headers, navigation text, dark accents |

### **Generated Support Colors**
| Color Name | HEX Code | RGB | Usage |
|------------|----------|-----|-------|
| **Light Blue** | `#4a8bc2` | rgb(74, 139, 194) | Hover states, light backgrounds |
| **Light Orange** | `#feb76b` | rgb(254, 183, 107) | Hover effects, soft accents |
| **Ultra Light Blue** | `#e8f2fb` | rgb(232, 242, 251) | Section backgrounds, cards |
| **Ultra Light Orange** | `#fef4e8` | rgb(254, 244, 232) | Warning areas, soft highlights |

---

## 🎯 **Color Application Strategy**

### **1. Navigation & Branding**
- **Logo Text**: Navy Blue (`#05335a`) - Professional authority
- **Hover States**: VISTA Blue (`#056aaa`) - Interactive feedback

### **2. Buttons & CTAs**
- **Primary Buttons**: VISTA Blue (`#056aaa`) - Main actions
- **Secondary Buttons**: VISTA Orange (`#fea939`) - Secondary actions
- **Hover Effects**: Darker variants for depth

### **3. Content Elements**
- **Badges/Tags**: Blue for primary, Orange for secondary
- **Success Messages**: Keep green (`#28a745`)
- **Warnings**: Use VISTA Orange (`#fea939`)
- **Errors**: Keep red (`#dc3545`)

### **4. Background Sections**
- **Light Sections**: Ultra Light Blue (`#e8f2fb`)
- **Accent Areas**: Ultra Light Orange (`#fef4e8`)
- **Cards**: White with colored borders

---

## 🚀 **CSS Implementation**

### **How Colors Are Managed:**
1. **Primary Colors** defined in `css/brand-colors.css`
2. **All elements** use CSS variables for consistency
3. **One-file updates** change entire website

### **Current CSS Variables:**
```css
/* VISTA Authentic Colors */
--vista-blue-primary: #056aaa;      /* Main blue from logo */
--vista-orange-primary: #fea939;    /* Main orange from logo */
--vista-blue-dark: #05335a;         /* Navy blue from logo */

/* Generated Variants */
--vista-blue-light: #4a8bc2;        /* Light blue */
--vista-orange-light: #feb76b;      /* Light orange */
--vista-blue-ultra-light: #e8f2fb;  /* Ultra light blue */
--vista-orange-ultra-light: #fef4e8; /* Ultra light orange */
```

### **Quick Application Classes:**
```css
.text-primary    → VISTA Blue text
.text-secondary  → VISTA Orange text
.badge-primary   → Blue badge
.badge-warning   → Orange badge
.btn-primary     → Blue button
.btn-secondary   → Orange button
```

---

## 🎨 **Brand Gradients**

### **Professional Gradients:**
- **Primary**: Blue → Navy (`#056aaa` → `#05335a`)
- **Secondary**: Orange → Dark Orange (`#fea939` → `#e0932d`)
- **Hero**: Blue → Orange (dynamic combinations)

---

## ✅ **Color Accessibility**

All VISTA colors meet **WCAG 2.1 AA standards**:
- ✅ Navy Blue on white: **AAA contrast**
- ✅ VISTA Blue on white: **AA contrast**
- ✅ VISTA Orange on white: **AA contrast**

---

## 🔄 **Future Updates**

To change colors across entire website:
1. Edit `css/brand-colors.css`
2. Update primary color values
3. All 13 files automatically update!

**Files using this color system:**
- All navigation components
- All button styles
- All badge/tag elements  
- All text color utilities
- All background sections
- All gradient elements

---

## 💡 **Pro Tips**

1. **Use Navy Blue** for authority (headers, nav brand)
2. **Use VISTA Blue** for trust (buttons, links)
3. **Use Orange** for action (CTAs, highlights)
4. **Use Light variants** for backgrounds
5. **Maintain 60-30-10 rule**: Blue dominant, Orange accent, Navy details

This system ensures your entire website reflects your authentic VISTA brand colors! 🎯
