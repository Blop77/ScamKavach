/*
 * All user-facing text in English, Hindi and Marathi.
 * Translations should be reviewed by native speakers before wide rollout.
 */
(function (root) {
  'use strict';

  var STRINGS = {
    en: {
      tagline: 'Check a suspicious message before you click, call or pay.',
      inputLabel: 'Paste the SMS, WhatsApp message or link you received',
      placeholder: 'e.g. "Your account will be blocked today. Update KYC: bit.ly/..."',
      check: 'Check message',
      clear: 'Clear',
      examples: 'Try an example:',
      privacy: 'Your message never leaves your phone. Everything is checked on this device.',
      levelScam: 'Very likely a SCAM',
      levelSuspicious: 'Suspicious — be careful',
      levelLow: 'No common scam signs found',
      lowNote: 'This does not guarantee it is safe. If anything feels wrong, contact the company using the number on its official website, app or the back of your card.',
      whyTitle: 'Why we think so',
      found: 'Found',
      doTitle: 'What you should do',
      readAloud: 'Read aloud',
      stop: 'Stop',
      warnFamily: 'Warn family on WhatsApp',
      lostTitle: 'Already lost money?',
      lostSteps: [
        'Call 1930 immediately (National Cyber Crime Helpline). The first few hours matter most for freezing the money.',
        'Report online at cybercrime.gov.in',
        'Call your bank and block your card / UPI.',
        'Report the fraud number or message at sancharsaathi.gov.in (Chakshu).'
      ],
      rulesTitle: '4 golden rules',
      rules: [
        'Never share OTP, UPI PIN, CVV or passwords — not even with "bank staff" or "police".',
        'You never need to enter your UPI PIN to RECEIVE money.',
        'There is no "digital arrest". Real police never investigate over video call.',
        'Never install apps from links (APK) or screen-sharing apps on a stranger\'s request.'
      ],
      feedback: 'Was this helpful? Tell us',
      disclaimer: 'ScamKavach gives guidance based on common scam patterns. It can be wrong. It is not affiliated with any bank, NPCI or government body.',
      source: 'Open source on GitHub',
      shareText: '⚠️ Scam alert! I got a message that ScamKavach flagged as a likely scam. Never share your OTP or UPI PIN with anyone. Check suspicious messages for free: ',
      otpNotice: 'This looks like a normal OTP message. It is safe only if YOU started this login or payment. Never tell this code to anyone — even if they say they are from your bank.',
      advice: {
        scam: [
          'Do NOT click any link, call the number, or pay anything.',
          'Do NOT share any OTP, PIN or password.',
          'Block the sender and report it at sancharsaathi.gov.in (Chakshu).',
          'Delete the message and warn your family.'
        ],
        suspicious: [
          'Don\'t click links or call numbers given in this message.',
          'Check directly with the company using the number on its official website, app or the back of your card.',
          'If someone is pressuring you, stop and ask a family member first.'
        ],
        low: [
          'Still be careful: never share OTP or PIN, and verify using official numbers if anything feels wrong.'
        ]
      },
      reasons: {
        otp_request: 'Asks you to share an OTP, PIN, CVV or password. No real bank, company or police officer will ever ask for these.',
        upi_pin_receive: 'Says you must enter your UPI PIN, scan a QR code or approve a request to RECEIVE money. You never need a PIN to receive money — a PIN only sends money OUT of your account.',
        remote_app: 'Asks you to install a screen-sharing app (AnyDesk, TeamViewer) or an APK file. This gives a stranger full control of your phone and bank apps.',
        authority_threat: 'Uses police, CBI, customs, court or "digital arrest" threats. There is no such thing as "digital arrest" — real police never investigate over video call or ask for money.',
        kyc_block: 'Threatens that your account, card, SIM or KYC will be blocked or expire. Banks do not block accounts through SMS links.',
        prize: 'Claims you won a lottery, prize or reward. You cannot win a contest you never entered.',
        electricity: 'Threatens to cut your electricity and asks you to call someone. Electricity boards don\'t do this from personal mobile numbers.',
        task_scam: '"Task" jobs (like videos, rate hotels, Telegram tasks) pay small amounts first, then ask you to "invest" — and the money disappears.',
        investment: 'Promises guaranteed or very high returns. No real investment is risk-free or doubles your money quickly.',
        trading_group: 'Invites you to a trading / stock-tips / crypto group. Fake trading groups show false profits and then block withdrawals.',
        job_offer: 'Offers easy money or a work-from-home job with high daily pay.',
        fee_request: 'Asks for a "fee", "charge" or "deposit" before you get money, a job or a prize. Real prizes and jobs never ask you to pay first.',
        loan: 'Offers instant loans with no documents. Fake loan apps steal your contacts and photos and then harass you.',
        impersonation: 'Someone claims to be family or a friend on a "new number" and needs money urgently. Call them on their old number first.',
        urgency: 'Creates panic and hurry ("immediately", "today", "24 hours"). Scammers rush you so you don\'t stop to think.',
        secrecy: 'Tells you to keep it secret from your family. Scammers isolate victims so no one can warn them.',
        call_number: 'Asks you to call or WhatsApp a personal mobile number. Real companies use official helpline numbers.',
        money_request: 'Asks you to pay or transfer money.',
        link_shortener: 'Contains a shortened link ({host}) that hides where it really goes.',
        link_ip: 'Contains a link to a raw IP address ({host}) instead of a real website name.',
        link_punycode: 'The link uses look-alike letters to copy a real website ({host}).',
        link_lookalike: 'The link pretends to be a bank or company but is NOT its official website ({host}).',
        link_bait: 'The website name uses bait words like "kyc", "update", "reward" or "refund" ({host}).',
        link_tld: 'The link uses a cheap domain ending that scammers often use ({host}).',
        link_http: 'The link is not secure — it starts with http, not https ({host}).'
      },
      exampleLabels: {
        kyc: 'KYC block', prize: 'Lottery', job: 'Task job', refund: 'UPI refund',
        power: 'Electricity cut', arrest: 'Digital arrest', otp: 'Real OTP'
      }
    },

    hi: {
      tagline: 'क्लिक, कॉल या पेमेंट करने से पहले संदिग्ध मैसेज जाँचें।',
      inputLabel: 'आपको मिला SMS, WhatsApp मैसेज या लिंक यहाँ पेस्ट करें',
      placeholder: 'जैसे: "आपका खाता आज बंद हो जाएगा। KYC अपडेट करें: bit.ly/..."',
      check: 'मैसेज जाँचें',
      clear: 'मिटाएँ',
      examples: 'उदाहरण आज़माएँ:',
      privacy: 'आपका मैसेज आपके फ़ोन से बाहर नहीं जाता। सारी जाँच इसी डिवाइस पर होती है।',
      levelScam: 'यह लगभग निश्चित रूप से धोखाधड़ी (स्कैम) है',
      levelSuspicious: 'संदिग्ध — सावधान रहें',
      levelLow: 'आम स्कैम के संकेत नहीं मिले',
      lowNote: 'इसका मतलब यह नहीं कि यह पूरी तरह सुरक्षित है। कुछ भी गलत लगे तो कंपनी की आधिकारिक वेबसाइट, ऐप या कार्ड के पीछे लिखे नंबर पर ही संपर्क करें।',
      whyTitle: 'हमें ऐसा क्यों लगता है',
      found: 'मिला',
      doTitle: 'आपको क्या करना चाहिए',
      readAloud: 'सुनें',
      stop: 'रोकें',
      warnFamily: 'WhatsApp पर परिवार को सावधान करें',
      lostTitle: 'पैसे पहले ही चले गए?',
      lostSteps: [
        'तुरंत 1930 पर कॉल करें (राष्ट्रीय साइबर अपराध हेल्पलाइन)। पैसे रुकवाने के लिए शुरुआती कुछ घंटे सबसे ज़रूरी हैं।',
        'cybercrime.gov.in पर ऑनलाइन शिकायत करें।',
        'अपने बैंक को कॉल करके कार्ड / UPI ब्लॉक करवाएँ।',
        'धोखेबाज़ नंबर या मैसेज की शिकायत sancharsaathi.gov.in (चक्षु) पर करें।'
      ],
      rulesTitle: '4 सुनहरे नियम',
      rules: [
        'OTP, UPI PIN, CVV या पासवर्ड कभी किसी को न बताएँ — "बैंक कर्मचारी" या "पुलिस" को भी नहीं।',
        'पैसे पाने (रिसीव करने) के लिए UPI PIN डालने की कभी ज़रूरत नहीं होती।',
        '"डिजिटल अरेस्ट" जैसा कुछ नहीं होता। असली पुलिस वीडियो कॉल पर जाँच नहीं करती।',
        'किसी अनजान के कहने पर लिंक से ऐप (APK) या स्क्रीन-शेयरिंग ऐप कभी इंस्टॉल न करें।'
      ],
      feedback: 'क्या यह मददगार था? हमें बताएँ',
      disclaimer: 'ScamKavach आम स्कैम पैटर्न के आधार पर सलाह देता है। यह गलत भी हो सकता है। इसका किसी बैंक, NPCI या सरकारी संस्था से कोई संबंध नहीं है।',
      source: 'GitHub पर ओपन सोर्स',
      shareText: '⚠️ स्कैम अलर्ट! मुझे एक मैसेज मिला जिसे ScamKavach ने स्कैम बताया। अपना OTP या UPI PIN कभी किसी को न बताएँ। संदिग्ध मैसेज मुफ़्त में जाँचें: ',
      otpNotice: 'यह एक सामान्य OTP मैसेज लगता है। यह तभी सुरक्षित है जब लॉगिन या पेमेंट आपने ख़ुद शुरू किया हो। यह कोड कभी किसी को न बताएँ — भले ही वह ख़ुद को बैंक से बताए।',
      advice: {
        scam: [
          'किसी भी लिंक पर क्लिक न करें, नंबर पर कॉल न करें और कोई पेमेंट न करें।',
          'कोई भी OTP, PIN या पासवर्ड न बताएँ।',
          'भेजने वाले को ब्लॉक करें और sancharsaathi.gov.in (चक्षु) पर शिकायत करें।',
          'मैसेज डिलीट करें और परिवार को सावधान करें।'
        ],
        suspicious: [
          'इस मैसेज में दिए लिंक या नंबर का इस्तेमाल न करें।',
          'कंपनी की आधिकारिक वेबसाइट, ऐप या कार्ड के पीछे लिखे नंबर पर ख़ुद संपर्क करके जाँचें।',
          'अगर कोई आप पर जल्दी करने का दबाव डाल रहा है, तो रुकें और पहले परिवार से पूछें।'
        ],
        low: [
          'फिर भी सावधान रहें: OTP या PIN कभी न बताएँ, और शक होने पर आधिकारिक नंबर से ही पुष्टि करें।'
        ]
      },
      reasons: {
        otp_request: 'आपसे OTP, PIN, CVV या पासवर्ड माँगा जा रहा है। कोई भी असली बैंक, कंपनी या पुलिस अधिकारी यह कभी नहीं माँगता।',
        upi_pin_receive: 'पैसे पाने के लिए UPI PIN डालने, QR कोड स्कैन करने या रिक्वेस्ट अप्रूव करने को कहा गया है। पैसे पाने के लिए PIN की ज़रूरत नहीं होती — PIN से पैसे आपके खाते से बाहर जाते हैं।',
        remote_app: 'स्क्रीन-शेयरिंग ऐप (AnyDesk, TeamViewer) या APK फ़ाइल इंस्टॉल करने को कहा गया है। इससे अनजान व्यक्ति को आपके फ़ोन और बैंक ऐप का पूरा कंट्रोल मिल जाता है।',
        authority_threat: 'पुलिस, CBI, कस्टम, कोर्ट या "डिजिटल अरेस्ट" की धमकी दी गई है। "डिजिटल अरेस्ट" जैसा कुछ नहीं होता — असली पुलिस वीडियो कॉल पर जाँच नहीं करती और पैसे नहीं माँगती।',
        kyc_block: 'खाता, कार्ड, SIM या KYC बंद होने की धमकी दी गई है। बैंक SMS लिंक से खाते बंद नहीं करते।',
        prize: 'लॉटरी, इनाम या रिवॉर्ड जीतने का दावा किया गया है। जिस प्रतियोगिता में आपने भाग ही नहीं लिया, उसे आप जीत नहीं सकते।',
        electricity: 'बिजली काटने की धमकी देकर किसी नंबर पर कॉल करने को कहा गया है। बिजली विभाग निजी मोबाइल नंबर से ऐसा नहीं करता।',
        task_scam: '"टास्क" वाली नौकरियाँ (वीडियो लाइक करना, होटल रेटिंग, टेलीग्राम टास्क) पहले थोड़े पैसे देती हैं, फिर "निवेश" करवाती हैं — और पैसे गायब हो जाते हैं।',
        investment: 'गारंटीड या बहुत ज़्यादा मुनाफ़े का वादा किया गया है। कोई भी असली निवेश बिना जोखिम या जल्दी पैसे डबल नहीं करता।',
        trading_group: 'ट्रेडिंग / स्टॉक टिप्स / क्रिप्टो ग्रुप में बुलाया गया है। नकली ट्रेडिंग ग्रुप झूठा मुनाफ़ा दिखाते हैं और फिर पैसे निकालने नहीं देते।',
        job_offer: 'आसान कमाई या घर बैठे ज़्यादा रोज़ाना कमाई वाली नौकरी का ऑफ़र है।',
        fee_request: 'पैसे, नौकरी या इनाम से पहले "फ़ीस", "चार्ज" या "डिपॉज़िट" माँगा गया है। असली इनाम और नौकरियाँ पहले पैसे नहीं माँगतीं।',
        loan: 'बिना दस्तावेज़ तुरंत लोन का ऑफ़र है। नकली लोन ऐप आपके कॉन्टैक्ट और फ़ोटो चुराकर परेशान करते हैं।',
        impersonation: 'कोई "नए नंबर" से परिवार या दोस्त होने का दावा कर रहा है और तुरंत पैसे माँग रहा है। पहले उनके पुराने नंबर पर कॉल करें।',
        urgency: 'घबराहट और जल्दबाज़ी पैदा की जा रही है ("तुरंत", "आज", "24 घंटे")। ठग जल्दी करवाते हैं ताकि आप सोच न सकें।',
        secrecy: 'परिवार से बात छिपाने को कहा गया है। ठग पीड़ित को अकेला करते हैं ताकि कोई उन्हें सावधान न कर सके।',
        call_number: 'किसी निजी मोबाइल नंबर पर कॉल या WhatsApp करने को कहा गया है। असली कंपनियाँ आधिकारिक हेल्पलाइन नंबर इस्तेमाल करती हैं।',
        money_request: 'पैसे भेजने या ट्रांसफ़र करने को कहा गया है।',
        link_shortener: 'इसमें छोटा किया गया लिंक ({host}) है जो असली वेबसाइट छिपाता है।',
        link_ip: 'इसमें वेबसाइट के नाम की जगह सीधा IP पता ({host}) है।',
        link_punycode: 'लिंक असली वेबसाइट की नकल करने के लिए मिलते-जुलते अक्षर इस्तेमाल करता है ({host})।',
        link_lookalike: 'लिंक किसी बैंक या कंपनी जैसा दिखता है, पर उसकी आधिकारिक वेबसाइट नहीं है ({host})।',
        link_bait: 'वेबसाइट के नाम में "kyc", "update", "reward" या "refund" जैसे लालच वाले शब्द हैं ({host})।',
        link_tld: 'लिंक ऐसे सस्ते डोमेन पर है जिसका इस्तेमाल ठग अक्सर करते हैं ({host})।',
        link_http: 'लिंक सुरक्षित नहीं है — यह https नहीं, http से शुरू होता है ({host})।'
      },
      exampleLabels: {
        kyc: 'KYC ब्लॉक', prize: 'लॉटरी', job: 'टास्क जॉब', refund: 'UPI रिफंड',
        power: 'बिजली कटौती', arrest: 'डिजिटल अरेस्ट', otp: 'असली OTP'
      }
    },

    mr: {
      tagline: 'क्लिक, कॉल किंवा पेमेंट करण्याआधी संशयास्पद मेसेज तपासा.',
      inputLabel: 'तुम्हाला आलेला SMS, WhatsApp मेसेज किंवा लिंक इथे पेस्ट करा',
      placeholder: 'उदा. "तुमचे खाते आज बंद होईल. KYC अपडेट करा: bit.ly/..."',
      check: 'मेसेज तपासा',
      clear: 'पुसा',
      examples: 'उदाहरण पाहा:',
      privacy: 'तुमचा मेसेज तुमच्या फोनच्या बाहेर जात नाही. सगळी तपासणी याच डिव्हाइसवर होते.',
      levelScam: 'हा बहुधा फसवणुकीचा (स्कॅम) मेसेज आहे',
      levelSuspicious: 'संशयास्पद — काळजी घ्या',
      levelLow: 'नेहमीच्या फसवणुकीची लक्षणे आढळली नाहीत',
      lowNote: 'याचा अर्थ हा मेसेज पूर्णपणे सुरक्षित आहे असा नाही. काही चुकीचे वाटल्यास कंपनीच्या अधिकृत वेबसाइट, अ‍ॅप किंवा कार्डच्या मागे दिलेल्या नंबरवरच संपर्क करा.',
      whyTitle: 'आम्हाला असे का वाटते',
      found: 'आढळले',
      doTitle: 'तुम्ही काय करावे',
      readAloud: 'ऐका',
      stop: 'थांबवा',
      warnFamily: 'WhatsApp वर कुटुंबाला सावध करा',
      lostTitle: 'पैसे आधीच गेले आहेत?',
      lostSteps: [
        'लगेच 1930 वर कॉल करा (राष्ट्रीय सायबर गुन्हे हेल्पलाइन). पैसे थांबवण्यासाठी सुरुवातीचे काही तास सर्वात महत्त्वाचे असतात.',
        'cybercrime.gov.in वर ऑनलाइन तक्रार करा.',
        'तुमच्या बँकेला कॉल करून कार्ड / UPI ब्लॉक करा.',
        'फसवणुकीचा नंबर किंवा मेसेज sancharsaathi.gov.in (चक्षु) वर कळवा.'
      ],
      rulesTitle: '4 सुवर्ण नियम',
      rules: [
        'OTP, UPI PIN, CVV किंवा पासवर्ड कधीही कोणालाही सांगू नका — "बँक कर्मचारी" किंवा "पोलीस" यांनाही नाही.',
        'पैसे मिळवण्यासाठी (रिसीव्ह करण्यासाठी) UPI PIN टाकण्याची कधीच गरज नसते.',
        '"डिजिटल अटक" असे काही नसते. खरे पोलीस व्हिडिओ कॉलवर चौकशी करत नाहीत.',
        'अनोळखी व्यक्तीच्या सांगण्यावरून लिंकवरून अ‍ॅप (APK) किंवा स्क्रीन-शेअरिंग अ‍ॅप कधीही इन्स्टॉल करू नका.'
      ],
      feedback: 'हे उपयोगी ठरले का? आम्हाला सांगा',
      disclaimer: 'ScamKavach नेहमीच्या फसवणुकीच्या पॅटर्नवरून सल्ला देते. ते चुकीचेही असू शकते. याचा कोणत्याही बँक, NPCI किंवा सरकारी संस्थेशी संबंध नाही.',
      source: 'GitHub वर ओपन सोर्स',
      shareText: '⚠️ स्कॅम अलर्ट! मला आलेला एक मेसेज ScamKavach ने फसवणूक असल्याचे सांगितले. तुमचा OTP किंवा UPI PIN कधीही कोणालाही सांगू नका. संशयास्पद मेसेज मोफत तपासा: ',
      otpNotice: 'हा नेहमीचा OTP मेसेज वाटतो. लॉगिन किंवा पेमेंट तुम्ही स्वतः सुरू केले असेल तरच तो सुरक्षित आहे. हा कोड कधीही कोणालाही सांगू नका — ते स्वतःला बँकेचे सांगत असले तरीही.',
      advice: {
        scam: [
          'कोणत्याही लिंकवर क्लिक करू नका, नंबरवर कॉल करू नका आणि कोणतेही पेमेंट करू नका.',
          'कोणताही OTP, PIN किंवा पासवर्ड सांगू नका.',
          'पाठवणाऱ्याला ब्लॉक करा आणि sancharsaathi.gov.in (चक्षु) वर तक्रार करा.',
          'मेसेज डिलीट करा आणि कुटुंबाला सावध करा.'
        ],
        suspicious: [
          'या मेसेजमधील लिंक किंवा नंबर वापरू नका.',
          'कंपनीच्या अधिकृत वेबसाइट, अ‍ॅप किंवा कार्डच्या मागील नंबरवर स्वतः संपर्क करून खात्री करा.',
          'कोणी घाई करण्यासाठी दबाव टाकत असेल, तर थांबा आणि आधी कुटुंबाला विचारा.'
        ],
        low: [
          'तरीही काळजी घ्या: OTP किंवा PIN कधीही सांगू नका, आणि शंका आल्यास अधिकृत नंबरवरूनच खात्री करा.'
        ]
      },
      reasons: {
        otp_request: 'तुमच्याकडे OTP, PIN, CVV किंवा पासवर्ड मागितला आहे. कोणतीही खरी बँक, कंपनी किंवा पोलीस अधिकारी हे कधीच मागत नाहीत.',
        upi_pin_receive: 'पैसे मिळवण्यासाठी UPI PIN टाकायला, QR कोड स्कॅन करायला किंवा रिक्वेस्ट मंजूर करायला सांगितले आहे. पैसे मिळवण्यासाठी PIN लागत नाही — PIN ने पैसे तुमच्या खात्यातून बाहेर जातात.',
        remote_app: 'स्क्रीन-शेअरिंग अ‍ॅप (AnyDesk, TeamViewer) किंवा APK फाइल इन्स्टॉल करायला सांगितले आहे. यामुळे अनोळखी व्यक्तीला तुमच्या फोनचा आणि बँक अ‍ॅपचा पूर्ण ताबा मिळतो.',
        authority_threat: 'पोलीस, CBI, कस्टम, कोर्ट किंवा "डिजिटल अटक" ची धमकी दिली आहे. "डिजिटल अटक" असे काही नसते — खरे पोलीस व्हिडिओ कॉलवर चौकशी करत नाहीत आणि पैसे मागत नाहीत.',
        kyc_block: 'खाते, कार्ड, SIM किंवा KYC बंद होण्याची धमकी दिली आहे. बँका SMS लिंकवरून खाती बंद करत नाहीत.',
        prize: 'लॉटरी, बक्षीस किंवा रिवॉर्ड जिंकल्याचा दावा केला आहे. ज्या स्पर्धेत तुम्ही भागच घेतला नाही ती तुम्ही जिंकू शकत नाही.',
        electricity: 'वीज कापण्याची धमकी देऊन एखाद्या नंबरवर कॉल करायला सांगितले आहे. वीज मंडळ खासगी मोबाइल नंबरवरून असे करत नाही.',
        task_scam: '"टास्क" नोकऱ्या (व्हिडिओ लाइक करणे, हॉटेल रेटिंग, टेलिग्राम टास्क) आधी थोडे पैसे देतात, मग "गुंतवणूक" करायला लावतात — आणि पैसे गायब होतात.',
        investment: 'हमखास किंवा खूप जास्त नफ्याचे आश्वासन दिले आहे. कोणतीही खरी गुंतवणूक जोखीममुक्त नसते किंवा पटकन पैसे दुप्पट करत नाही.',
        trading_group: 'ट्रेडिंग / स्टॉक टिप्स / क्रिप्टो ग्रुपमध्ये बोलावले आहे. बनावट ट्रेडिंग ग्रुप खोटा नफा दाखवतात आणि मग पैसे काढू देत नाहीत.',
        job_offer: 'सोप्या कमाईची किंवा घरबसल्या जास्त रोजच्या पगाराची नोकरी देऊ केली आहे.',
        fee_request: 'पैसे, नोकरी किंवा बक्षीस मिळण्याआधी "फी", "चार्ज" किंवा "डिपॉझिट" मागितले आहे. खरी बक्षिसे आणि नोकऱ्या आधी पैसे मागत नाहीत.',
        loan: 'कागदपत्रांशिवाय झटपट कर्जाची ऑफर आहे. बनावट लोन अ‍ॅप तुमचे कॉन्टॅक्ट आणि फोटो चोरून त्रास देतात.',
        impersonation: 'कोणीतरी "नवीन नंबर" वरून कुटुंबातील किंवा मित्र असल्याचा दावा करून तातडीने पैसे मागत आहे. आधी त्यांच्या जुन्या नंबरवर कॉल करा.',
        urgency: 'घबराट आणि घाई निर्माण केली आहे ("लगेच", "आज", "24 तास"). फसवणूक करणारे घाई करायला लावतात म्हणजे तुम्ही विचार करू नये.',
        secrecy: 'कुटुंबापासून गोष्ट लपवायला सांगितले आहे. फसवणूक करणारे पीडितांना एकटे पाडतात म्हणजे कोणी त्यांना सावध करू नये.',
        call_number: 'खासगी मोबाइल नंबरवर कॉल किंवा WhatsApp करायला सांगितले आहे. खऱ्या कंपन्या अधिकृत हेल्पलाइन नंबर वापरतात.',
        money_request: 'पैसे पाठवायला किंवा ट्रान्सफर करायला सांगितले आहे.',
        link_shortener: 'यात छोटी केलेली लिंक ({host}) आहे जी खरी वेबसाइट लपवते.',
        link_ip: 'यात वेबसाइटच्या नावाऐवजी थेट IP पत्ता ({host}) आहे.',
        link_punycode: 'खऱ्या वेबसाइटची नक्कल करण्यासाठी लिंकमध्ये सारखी दिसणारी अक्षरे वापरली आहेत ({host}).',
        link_lookalike: 'लिंक बँक किंवा कंपनीसारखी दिसते, पण ती त्यांची अधिकृत वेबसाइट नाही ({host}).',
        link_bait: 'वेबसाइटच्या नावात "kyc", "update", "reward" किंवा "refund" असे आमिष दाखवणारे शब्द आहेत ({host}).',
        link_tld: 'फसवणूक करणारे नेहमी वापरतात अशा स्वस्त डोमेनवर ही लिंक आहे ({host}).',
        link_http: 'लिंक सुरक्षित नाही — ती https ने नाही, तर http ने सुरू होते ({host}).'
      },
      exampleLabels: {
        kyc: 'KYC ब्लॉक', prize: 'लॉटरी', job: 'टास्क जॉब', refund: 'UPI रिफंड',
        power: 'वीज कपात', arrest: 'डिजिटल अटक', otp: 'खरा OTP'
      }
    }
  };

  // Sample messages for the "Try an example" buttons, in the chosen language.
  var EXAMPLES = {
    en: {
      kyc: 'Dear Customer, your SBI YONO account will be blocked today. Update your PAN immediately: http://sbi-kyc-update.xyz/login',
      prize: 'Congratulations! You have won Rs 25,00,000 in KBC lucky draw. To claim your prize pay processing fee of Rs 5,000. Call 9876543210',
      job: 'Part time job! Earn Rs 3000 per day by liking YouTube videos. Simple tasks, join our Telegram group now.',
      refund: 'You have received a refund of Rs 2,499. Accept the collect request and enter UPI PIN to receive the money.',
      power: 'Dear consumer your electricity power will be disconnected tonight at 9.30 pm because your previous month bill was not update. Please immediately contact our electricity officer 9123456789',
      arrest: 'This is CBI officer. Your Aadhaar is linked to a parcel with drugs seized by customs. You are under digital arrest. Do not tell your family. Join video call now.',
      otp: '123456 is your OTP for login to HDFC Bank NetBanking. Do not share it with anyone. -HDFC Bank'
    },
    hi: {
      kyc: 'प्रिय ग्राहक, आपका बैंक खाता आज बंद हो जाएगा। तुरंत केवाईसी अपडेट करें: bit.ly/abc123',
      prize: 'बधाई हो! आपने KBC लकी ड्रॉ में 25 लाख रुपये की लॉटरी जीती है। इनाम पाने के लिए 5000 रुपये प्रोसेसिंग शुल्क जमा करें। कॉल करें 9876543210',
      job: 'घर बैठे कमाएँ! YouTube वीडियो लाइक करके रोज़ ₹3000 कमाएँ। simple tasks, अभी Telegram group जॉइन करें।',
      refund: 'आपको ₹2,499 का रिफंड मिला है। रिफंड पाने के लिए collect request accept करें और UPI पिन डालें।',
      power: 'प्रिय उपभोक्ता, आपकी बिजली आज रात 9:30 बजे काट दी जाएगी। तुरंत बिजली अधिकारी से संपर्क करें 9123456789',
      arrest: 'मैं सीबीआई अधिकारी बोल रहा हूँ। आपके आधार से जुड़े पार्सल में ड्रग्स मिले हैं। आप डिजिटल अरेस्ट में हैं। अपने परिवार को मत बताना।',
      otp: 'आपका ओटीपी 4521 है। इसे किसी के साथ साझा न करें।'
    },
    mr: {
      kyc: 'प्रिय ग्राहक, तुमचे बँक खाते आज बंद होईल. लगेच KYC अपडेट करा: bit.ly/abc123',
      prize: 'अभिनंदन! तुम्हाला ५०,००० रुपयांचे बक्षीस मिळाले आहे. बक्षीस मिळवण्यासाठी OTP सांगा.',
      job: 'घरबसल्या नोकरी! YouTube व्हिडिओ लाइक करून रोज ₹3000 कमवा. simple tasks, लगेच Telegram group जॉइन करा.',
      refund: 'तुम्हाला ₹2,499 चा रिफंड आला आहे. रक्कम मिळवण्यासाठी collect request accept करा आणि UPI PIN टाका.',
      power: 'प्रिय ग्राहक, तुमची वीज आज रात्री खंडित केली जाईल. लगेच संपर्क करा 9123456789',
      arrest: 'मी सीबीआई अधिकारी बोलतोय. तुमच्या आधारशी जोडलेल्या पार्सलमध्ये ड्रग्स सापडले आहेत. तुम्ही डिजिटल अटकेत आहात. घरच्यांना सांगू नका.',
      otp: 'तुमचा OTP 7788 आहे. तो कोणालाही सांगू नका.'
    }
  };

  var api = { STRINGS: STRINGS, EXAMPLES: EXAMPLES, LANGS: ['en', 'hi', 'mr'] };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ScamI18n = api;
})(this);
