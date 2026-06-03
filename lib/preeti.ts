export type PreetiKey = {
  label: string;
  small?: string;
  type?: "vowel" | "consonant" | "matra" | "symbol" | "action";
  width?: "normal" | "wide" | "space";
};

export const preetiKeyboard: PreetiKey[][] = [
  [
    { label: "~", small: "`", type: "symbol" }, { label: "!", small: "1", type: "symbol" },
    { label: "@", small: "2", type: "symbol" }, { label: "#", small: "3", type: "symbol" },
    { label: "$", small: "4", type: "symbol" }, { label: "%", small: "5", type: "symbol" },
    { label: "^", small: "6", type: "symbol" }, { label: "&", small: "7", type: "symbol" },
    { label: "*", small: "8", type: "symbol" }, { label: "(", small: "9", type: "symbol" },
    { label: ")", small: "0", type: "symbol" }, { label: "_", small: "-", type: "symbol" },
    { label: "+", small: "=", type: "symbol" }, { label: "Backspace", type: "action", width: "wide" }
  ],
  [
    { label: "Tab", type: "action", width: "wide" }, { label: "ट", small: "q", type: "consonant" },
    { label: "ठ", small: "w", type: "consonant" }, { label: "ड", small: "e", type: "consonant" },
    { label: "ढ", small: "r", type: "consonant" }, { label: "ण", small: "t", type: "consonant" },
    { label: "त", small: "y", type: "consonant" }, { label: "थ", small: "u", type: "consonant" },
    { label: "द", small: "i", type: "consonant" }, { label: "ध", small: "o", type: "consonant" },
    { label: "न", small: "p", type: "consonant" }, { label: "प", small: "[", type: "consonant" },
    { label: "फ", small: "]", type: "consonant" }, { label: "Enter", type: "action", width: "wide" }
  ],
  [
    { label: "Caps", type: "action", width: "wide" }, { label: "अ", small: "a", type: "vowel" },
    { label: "आ", small: "s", type: "vowel" }, { label: "इ", small: "d", type: "vowel" },
    { label: "ई", small: "f", type: "vowel" }, { label: "उ", small: "g", type: "vowel" },
    { label: "ऊ", small: "h", type: "vowel" }, { label: "ए", small: "j", type: "vowel" },
    { label: "ऐ", small: "k", type: "vowel" }, { label: "ओ", small: "l", type: "vowel" },
    { label: "औ", small: ";", type: "vowel" }, { label: "ं", small: "'", type: "matra" }
  ],
  [
    { label: "Shift", type: "action", width: "wide" }, { label: "य", small: "z", type: "consonant" },
    { label: "र", small: "x", type: "consonant" }, { label: "ल", small: "c", type: "consonant" },
    { label: "व", small: "v", type: "consonant" }, { label: "श", small: "b", type: "consonant" },
    { label: "ष", small: "n", type: "consonant" }, { label: "स", small: "m", type: "consonant" },
    { label: "ह", small: ",", type: "consonant" }, { label: "ज्ञ", small: ".", type: "consonant" },
    { label: "।", small: "/", type: "symbol" }, { label: "Shift", type: "action", width: "wide" }
  ],
  [
    { label: "Ctrl", type: "action", width: "wide" }, { label: "Win", type: "action" },
    { label: "Alt", type: "action", width: "wide" }, { label: "Space", type: "action", width: "space" },
    { label: "AltGr", type: "action", width: "wide" }, { label: "Ctrl", type: "action", width: "wide" }
  ]
];

export const romanHints = [
  ["ka", "क"], ["kha", "ख"], ["ga", "ग"], ["cha", "च"], ["tra", "त्र"], ["gya", "ज्ञ"],
  ["aa", "आ"], ["i", "ि"], ["ee", "ी"], ["u", "ु"], ["oo", "ू"], ["ai", "ै"], ["au", "ौ"]
];

export const practiceTexts = {
  words: "समाज प्रयास अध्यक्ष विकास कार्यक्रम संविधान योजना शिक्षा स्वास्थ्य संस्कृति",
  sentences: "शिक्षा नै मानिसको सबैभन्दा ठूलो धन हो। निरन्तर अभ्यासले क्षमता बढाउँछ।",
  paragraph: "नेपाल हाम्रो देश हो। यहाँ हिमाल, पहाड र तराई छन्। हामी सबै नेपाली एक भएर देशको विकासमा लाग्नु पर्छ।",
  news: "नेपाल सरकारले डिजिटल सेवा विस्तार गर्दै स्थानीय तहसम्म प्रविधिको पहुँच पुर्‍याउने योजना अघि बढाएको छ।",
  speed: "हामीले हरेक दिन केही न केही नयाँ कुरा सिक्ने प्रयास गर्नुपर्छ। समयको सही प्रयोग गर्न सकेमा हामी धेरै सफल हुन सक्छौँ।"
};
