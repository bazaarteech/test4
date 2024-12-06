const translationsUrl = "https://raw.githubusercontent.com/bazaarteech/test5/main/test5.json"; // رابط ملف JSON الصحيح

fetch("https://ipinfo.io/json?token=7026faa1150bfd")
    .then(response => response.json())
    .then(data => {
        const language = getLanguageByCountry(data.country);
        applyTranslations(language);
    })
    .catch(error => console.error("Error fetching location data:", error));

function getLanguageByCountry(country) {
    const countryLangMap = {
        "MA": "ar",
        "US": "en",
        "ES": "es",
        "FR": "fr"
    };
    return countryLangMap[country] || "en"; // اللغة الافتراضية "en"
}

function applyTranslations(lang) {
    fetch(translationsUrl)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch translations file");
            return response.json();
        })
        .then(translations => {
            const texts = translations[lang] || translations["en"]; // ضمان استخدام لغة افتراضية
            if (!texts) {
                console.error(`Translations for language '${lang}' not found`);
                return;
            }

            // دالة لتحديث النصوص بشكل آمن
            const updateTextContent = (id, value) => {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = value || "";
                } else {
                    console.warn(`Element with ID '${id}' not found`);
                }
            };

            // تحديث النصوص
            updateTextContent("subscriptionTitle", texts.subscriptionTitle);
            updateTextContent("addToCartButton", texts.addToCartButton);
            updateTextContent("popularBadge", texts.popular);

            // تحديث النصوص الديناميكية
            const freeGifts = ["freeGift1", "freeGift2", "freeGift3", "freeGift4", "freeGift6", "freeGift12"];
            freeGifts.forEach(id => updateTextContent(id, texts.freeGift));

            const durations = {
                "duration1": "1_month",
                "duration2": "2_months",
                "duration3": "3_months",
                "duration4": "4_months",
                "duration6": "6_months",
                "duration12": "12_months"
            };
            for (const [id, key] of Object.entries(durations)) {
                updateTextContent(id, texts.duration[key]);
            }
        })
        .catch(error => console.error("Error fetching translations:", error));
                  }
