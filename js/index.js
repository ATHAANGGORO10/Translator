const countries = {
    "AM-ET": "Amharic",
    "AR-SA": "Arabic",
    "BE-BY": "Bielarus",
    "BEM-ZM": "Bemba",
    "BI-VU": "Bislama",
    "BJS-BB": "Bajan",
    "BN-IN": "Bengali",
    "BO-CN": "Tibetan",
    "BR-FR": "Breton",
    "BS-BA": "Bosnian",
    "CA-ES": "Catalan",
    "COP-EG": "Coptic",
    "CS-CZ": "Czech",
    "CY-GB": "Welsh",
    "DA-DK": "Danish",
    "DZ-BT": "Dzongkha",
    "DE-DE": "German",
    "DV-MV": "Maldivian",
    "EL-GR": "Greek",
    "EN-GB": "English",
    "ES-ES": "Spanish",
    "ET-EE": "Estonian",
    "EU-ES": "Basque",
    "FA-IR": "Persian",
    "FI-FI": "Finnish",
    "FN-FNG": "Fanagalo",
    "FO-FO": "Faroese",
    "FR-FR": "French",
    "GL-ES": "Galician",
    "GU-IN": "Gujarati",
    "HA-NE": "Hausa",
    "HE-IL": "Hebrew",
    "HI-IN": "Hindi",
    "HR-HR": "Croatian",
    "HU-HU": "Hungarian",
    "ID-ID": "Indonesian",
    "IS-IS": "Icelandic",
    "IT-IT": "Italian",
    "JA-JP": "Japanese",
    "KK-KZ": "Kazakh",
    "KM-KM": "Khmer",
    "KN-IN": "Kannada",
    "KO-KR": "Korean",
    "KU-TR": "Kurdish",
    "KY-KG": "Kyrgyz",
    "LA-VA": "Latin",
    "LO-LA": "Lao",
    "LV-LV": "Latvian",
    "MEN-SL": "Mende",
    "MG-MG": "Malagasy",
    "MI-NZ": "Maori",
    "MS-MY": "Malay",
    "MT-MT": "Maltese",
    "MY-MM": "Burmese",
    "NE-NP": "Nepali",
    "NIU-NU": "Niuean",
    "NL-NL": "Dutch",
    "NO-NO": "Norwegian",
    "NY-MW": "Nyanja",
    "UR-PK": "Pakistani",
    "PAU-PW": "Palauan",
    "PA-IN": "Panjabi",
    "PS-PK": "Pashto",
    "PIS-SB": "Pijin",
    "PL-PL": "Polish",
    "PT-PT": "Portuguese",
    "RN-BI": "Kirundi",
    "RO-RO": "Romanian",
    "RU-RU": "Russian",
    "SG-CF": "Sango",
    "SI-LK": "Sinhala",
    "SK-SK": "Slovak",
    "SM-WS": "Samoan",
    "SN-ZW": "Shona",
    "SO-SO": "Somali",
    "SQ-AL": "Albanian",
    "SR-RS": "Serbian",
    "SV-SE": "Swedish",
    "SW-SZ": "Swahili",
    "TA-LK": "Tamil",
    "TE-IN": "Telugu",
    "TET-TL": "Tetum",
    "TG-TJ": "Tajik",
    "TH-TH": "Thai",
    "TI-TI": "Tigrinya",
    "TK-TM": "Turkmen",
    "TL-PH": "Tagalog",
    "TN-BW": "Tswana",
    "TO-TO": "Tongan",
    "TR-TR": "Turkish",
    "UK-UA": "Ukrainian",
    "UZ-UZ": "Uzbek",
    "VI-VN": "Vietnamese",
    "WO-SN": "Wolof",
    "XH-ZA": "Xhosa",
    "YI-YD": "Yiddish",
    "ZU-ZA": "Zulu"
}
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const selectTags = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
selectTags.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id === 0 ? (country_code === "en-GB" ? "selected" : "") : (country_code === "hi-IN" ? "selected" : "");
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value;
    let tempLang = selectTags[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTags[0].value = selectTags[1].value;
    selectTags[1].value = tempLang;
});

fromText.addEventListener("keyup", () => {
    if (!fromText.value) {
        toText.value = "";
    }
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim();
    let translateFrom = selectTags[0].value;
    let translateTo = selectTags[1].value;
    if (!text) {
        Swal.fire({
            icon: 'warning',
            title: 'Tolong isi terlebih dahulu',
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }
    toText.setAttribute("placeholder", "Translating...");
    setTimeout(() => {
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                toText.value = data.responseData.translatedText;
                data.matches.forEach(data => {
                    if (data.id === 0) {
                        toText.value = data.translation;
                    }
                });
                toText.setAttribute("placeholder", "Translation");
            });
    }, 1000);
});