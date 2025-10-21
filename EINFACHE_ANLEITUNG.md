# 📝 Einfache Anleitung: Webseite bearbeiten

Willkommen! Diese Anleitung zeigt Ihnen, wie Sie Ihre Webseite ändern können - **ohne zu programmieren!**

---

## 🎯 Was Sie ändern können:

- ✏️ Telefonnummern
- ✏️ E-Mail-Adresse
- ✏️ Texte und Beschreibungen
- ✏️ Leistungen hinzufügen/entfernen
- ✏️ Firmeninformationen

---

## 📋 Schritt-für-Schritt Anleitung:

### Schritt 1: Datei öffnen

1. Gehen Sie zu: https://github.com/ihsanalattar2017/blitz-blank
2. Klicken Sie auf den Ordner **"public"**
3. Klicken Sie auf die Datei **"index.html"**
4. Klicken Sie auf das **Stift-Symbol** (Edit) oben rechts

### Schritt 2: Text ändern

Jetzt können Sie den Text direkt bearbeiten:

**Beispiel: Telefonnummer ändern**

Suchen Sie nach:
```
+49 157 81518416
```

Ersetzen Sie es mit Ihrer neuen Nummer:
```
+49 XXX XXXXXXX
```

### Schritt 3: Speichern und hochladen

1. Scrollen Sie nach unten
2. Klicken Sie auf **"Commit changes"**
3. Geben Sie eine Beschreibung ein (z.B. "Telefonnummer aktualisiert")
4. Klicken Sie auf **"Commit changes"** Button

**Fertig!** Ihre Webseite wird automatisch aktualisiert (dauert 1-2 Minuten).

---

## 🔍 Häufige Änderungen:

### Telefonnummern ändern:

Suchen Sie nach:
```html
<p><strong>Telefon:</strong></p>
<ul>
  <li><a href="tel:+491578151841">+49 157 81518416</a></li>
  <li><a href="tel:+491520602726">+49 152 06027263</a></li>
  <li><a href="tel:+491765694234">+49 176 56942340</a></li>
</ul>
```

Ersetzen Sie die Nummern mit Ihren neuen Nummern.

### E-Mail ändern:

Suchen Sie nach:
```html
<p><strong>E-Mail:</strong> <a href="mailto:ihsanalattar373@gmail.com">ihsanalattar373@gmail.com</a></p>
```

Ersetzen Sie `ihsanalattar373@gmail.com` mit Ihrer E-Mail.

### Leistung hinzufügen:

Suchen Sie nach dem Bereich "Leistungen". Kopieren Sie einen Service-Block:

```html
<div class="service-card">
  <div class="service-icon">🏢</div>
  <h3>Reinigung von Gebäuden</h3>
  <p>Gründliche Reinigung von alten Gebäuden und Wohnungen</p>
</div>
```

Ändern Sie:
- 🏢 = Emoji (z.B. 🧹, ✨, 🏠)
- "Reinigung von Gebäuden" = Titel
- "Gründliche Reinigung..." = Beschreibung

### Leistung entfernen:

Löschen Sie einfach den ganzen Service-Block (von `<div class="service-card">` bis `</div>`).

### Willkommenstext ändern:

Suchen Sie nach:
```html
<h1>Willkommen bei Blitz&Blank</h1>
<p>Ihr zuverlässiger Partner für Qualität und Service.</p>
```

Ersetzen Sie die Texte mit Ihren neuen Texten.

---

## ⚠️ Wichtige Regeln:

1. **Nicht löschen:**
   - `<` und `>` Symbole
   - Anführungszeichen `"`
   - Die Struktur der HTML-Tags

2. **Nur ändern:**
   - Text zwischen den Tags
   - Telefonnummern
   - E-Mail-Adressen
   - Emojis

3. **Beispiel - RICHTIG:**
   ```html
   <h3>Neue Leistung</h3>  ✅
   ```

4. **Beispiel - FALSCH:**
   ```html
   <h3 Neue Leistung</h3>  ❌ (< fehlt)
   <h3>Neue Leistung<h3>   ❌ (/ fehlt)
   ```

---

## 🆘 Wenn etwas schiefgeht:

Wenn Sie einen Fehler machen und die Webseite nicht mehr funktioniert:

1. Gehen Sie zu: https://github.com/ihsanalattar2017/blitz-blank
2. Klicken Sie auf **"index.html"**
3. Klicken Sie auf das **Papierkorb-Symbol** (Delete)
4. Schreiben Sie: "Revert to previous version"
5. Klicken Sie **"Commit changes"**

Das stellt die alte Version wieder her.

---

## 📞 Kontakt für Hilfe:

Wenn Sie Fragen haben oder Hilfe benötigen, können Sie mir jederzeit schreiben!

---

**Viel Erfolg beim Bearbeiten Ihrer Webseite! 🚀**

