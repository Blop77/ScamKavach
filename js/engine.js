/*
 * ScamKavach detection engine.
 *
 * Pure, dependency-free and offline: the message never leaves the device.
 * Works in the browser (window.ScamEngine) and in Node (module.exports) so
 * the same rules are unit-tested in tests/engine.test.js.
 *
 * Each rule adds its weight once if any of its patterns match. Latin
 * patterns use \b; Devanagari patterns are plain substrings because \b in
 * JavaScript only understands ASCII word characters.
 */
(function (root) {
  'use strict';

  var SCAM_SCORE = 6;
  var SUSPICIOUS_SCORE = 3;

  // Phrases like "do not share your OTP" are stripped before looking for
  // OTP requests, so genuine OTP messages are not flagged.
  var NEGATIONS = [
    /\b(do not|don't|dont|never|not to|pls don't|please don't|mat|na|nahi|nahin)\s+(share|send|tell|disclose|give|forward|bataye|batayen|bataen|batana)\b/g,
    /\b(share|send|tell|disclose|batana|bataye|batayen|bataen|bhejna|bhejen)\s+(na|nahi|nahin|mat)\b/g,
    /(साझा|शेयर|शेअर)\s*(न|ना|नहीं|मत)\s*(करें|करे|करो|करा|करू)/g,
    /(न|मत|ना)\s*(बताएं|बताएँ|बताइए|बताओ|बताना|बतायें|भेजें|भेजो)/g,
    /(सांगू|शेअर करू|शेयर करू|देऊ|पाठवू)\s*नका/g
  ];

  var RULES = [
    {
      id: 'otp_request', weight: 6, stripNegations: true,
      patterns: [
        /\b(share|send|tell|give|forward|provide|batao|bataye|bataiye|bata do|bhejo|bhej do|dijiye|bolo)\b[^.!?\n।]{0,30}\b(otp|pin|cvv|password)\b/,
        /\b(otp|cvv|password)\b[^.!?\n।]{0,30}\b(share|send|tell|give|forward|provide|batao|bataye|bataiye|bata do|bhejo|bhej do|dijiye|bolo|batayen|bataen)\b/,
        /(ओटीपी|otp|पिन|सीवीवी|cvv|पासवर्ड)[^.!?\n।]{0,25}(बताएं|बताएँ|बताइए|बताओ|बता दें|भेजें|भेजो|भेज दें|शेयर करें|शेयर करो|सांगा|पाठवा|शेअर करा|द्या)/
      ]
    },
    {
      id: 'upi_pin_receive', weight: 6,
      patterns: [
        /\b(enter|type|put|daalo|dalo|daaliye|dale)\b[^.!?\n]{0,25}\bpin\b[^.!?\n]{0,40}\b(receive|get|credit|credited|claim|refund|cashback|milenge|milega|prapt)/,
        /\b(receive|get|claim)\b[^.!?\n]{0,40}\b(refund|cashback|money|amount|payment|prize|reward)\b[^.!?\n]{0,40}\b(enter|scan|approve)\b/,
        /\b(approve|accept)\b[^.!?\n]{0,15}\b(collect|payment|money) request\b/,
        /\bcollect request\b[^.!?\n।]{0,20}\b(accept|approve)\b/,
        /(रिफंड|पैसे|रक्कम|कैशबैक)[^.!?\n।]{0,60}(पिन|pin)\s*(डालें|डालो|डालिए|दर्ज करें|टाका|टाइप करा)/,
        /\bscan\b[^.!?\n]{0,30}\b(qr|code)\b[^.!?\n]{0,30}\b(receive|get|refund|cashback|claim)\b/,
        /(पिन|pin)[^.!?\n।]{0,30}(डालें|डालो|दर्ज करें|टाका|टाइप करा)[^.!?\n।]{0,30}(पैसे|रिफंड|कैशबैक|रक्कम|मिळ|मिलेंगे|मिलेगा|प्राप्त)/,
        /(पैसे|रिफंड|कैशबैक|रक्कम)\s*(पाने|प्राप्त करने|मिळवण्यासाठी|घेण्यासाठी)[^.!?\n।]{0,30}(पिन|pin)/
      ]
    },
    {
      id: 'remote_app', weight: 6,
      patterns: [
        /\b(anydesk|any desk|teamviewer|team viewer|quicksupport|quick support|rustdesk|airdroid|screen ?share|screen sharing)\b/,
        /\.apk\b/,
        /\b(download|install)\b[^.!?\n]{0,30}\bapk\b/
      ]
    },
    {
      id: 'authority_threat', weight: 5,
      patterns: [
        /\b(digital arrest|arrest warrant|cbi|narcotics|ncb|enforcement directorate|money laundering|cyber ?cell|police (case|complaint|station|officer)|fir|court notice|legal action|trai)\b/,
        /\b(parcel|courier|fedex|dhl)\b[^.!?\n]{0,60}\b(drugs|illegal|seized|customs|held|banned)\b/,
        /(डिजिटल अरेस्ट|गिरफ्तार|गिरफ़्तार|सीबीआई|पुलिस केस|कस्टम|अटक|डिजिटल अटक|नारकोटिक्स)/
      ]
    },
    {
      id: 'kyc_block', weight: 3,
      patterns: [
        /\b(kyc|pan|pan card|aadhaa?r)\b[^.!?\n]{0,40}\b(update|expire|expired|expiring|pending|verify|verification|link|suspend|suspended|block|blocked)/,
        /\b(account|a\/c|acct|card|sim|wallet|yono|net ?banking)\b[^.!?\n]{0,40}\b(will be|has been|is|be)\b[^.!?\n]{0,15}\b(block|blocked|suspend|suspended|deactivat\w*|freeze|frozen|closed|close|disconnected)/,
        /(केवाईसी|kyc|पैन|आधार)[^.!?\n।]{0,30}(अपडेट|समाप्त|बंद|ब्लॉक|लिंक)/,
        /(खाता|अकाउंट|खाते|कार्ड|सिम)[^.!?\n।]{0,30}(बंद|ब्लॉक|निलंबित|फ्रीज)/
      ]
    },
    {
      id: 'prize', weight: 4,
      patterns: [
        /\b(you (have )?won|you are (the )?winner|winner|lottery|lucky draw|jackpot|kbc|claim (your )?(reward|prize|cashback|gift))\b/,
        /\bcongratulations?\b[^.!?\n]{0,60}\b(won|win|selected|reward|prize|gift|cashback)\b/,
        /(लॉटरी|इनाम|विजेता|जीत गए|जीता है|बक्षीस|जिंकल|लकी ड्रॉ)/
      ]
    },
    {
      id: 'electricity', weight: 4,
      patterns: [
        /\b(electricity|electric|power|light|bijli|bijlee|mseb|msedcl|mahadiscom)\b[^.!?\n]{0,60}\b(disconnect\w*|cut|cutoff|cut off|kaat|kat)\b/,
        /(बिजली|लाइट)[^.!?\n।]{0,40}(कट|काट|बंद)/,
        /(वीज|लाईट)[^.!?\n।]{0,40}(खंडित|बंद|कट)/
      ]
    },
    {
      id: 'task_scam', weight: 4,
      patterns: [
        /\b(like (youtube |instagram )?videos|rate (hotels|products|restaurants)|telegram (task|group|job)|prepaid task|review task|simple tasks?|subscribe (youtube )?channels)\b/
      ]
    },
    {
      id: 'investment', weight: 4,
      patterns: [
        /\b(guaranteed (returns?|profit|income)|double (your )?money|money double|\d+ ?% (daily|weekly|per day) (returns?|profit)|risk[- ]free (returns?|profit|investment))\b/,
        /(पैसा डबल|पैसे डबल|गारंटीड रिटर्न|गारंटीड मुनाफा|दुप्पट)/
      ]
    },
    {
      id: 'trading_group', weight: 3,
      patterns: [
        /\b(stock tips|trading (group|tips|app)|vip group|crypto (investment|trading)|ipo allotment|insider tips|forex trading)\b/,
        /(ट्रेडिंग ग्रुप|शेयर टिप्स|स्टॉक टिप्स)/
      ]
    },
    {
      id: 'job_offer', weight: 3,
      patterns: [
        /\b(work from home|part[- ]time (job|work)|home based job|daily (income|earning|payment)|earn (rs\.?|₹|inr)? ?\d[\d,]*[^.!?\n]{0,20}(per|a|\/|daily|every) ?(day|hour|week))\b/,
        /(घर बैठे|रोज़ कमाएं|रोज कमाएं|पार्ट टाइम|घरबसल्या|रोज कमवा)/
      ]
    },
    {
      id: 'fee_request', weight: 3,
      patterns: [
        /\b(processing|registration|activation|verification|delivery|customs|clearance|security|refundable|advance|insurance|gst|token|release) (fee|fees|charge|charges|amount|deposit)\b/,
        /(प्रोसेसिंग|रजिस्ट्रेशन|पंजीकरण)\s*(शुल्क|फीस)|(शुल्क|फीस)\s*(जमा|भरा|भरें)/
      ]
    },
    {
      id: 'loan', weight: 3,
      patterns: [
        /\b(instant|pre-?approved|pre approved)\b[^.!?\n]{0,20}\bloan\b/,
        /\bloan\b[^.!?\n]{0,40}\b(no (documents|cibil|credit check)|without (documents|cibil)|in \d+ (minutes|mins))\b/,
        /(तुरंत लोन|बिना दस्तावेज|झटपट कर्ज|त्वरित कर्ज)/
      ]
    },
    {
      id: 'impersonation', weight: 3,
      patterns: [
        /\b(this is my new number|my new number|i am in (trouble|hospital)|i'm in (trouble|hospital)|had an accident|urgent(ly)? need money|need money urgently)\b/,
        /(मेरा नया नंबर|माझा नवीन नंबर|पैसों की सख्त जरूरत|पैसे की सख्त जरूरत)/
      ]
    },
    {
      id: 'urgency', weight: 2,
      patterns: [
        /\b(urgent|urgently|immediately|asap|within \d+ ?(hours?|hrs?|minutes?|mins?)|today itself|last (chance|warning|reminder)|act now|tonight|expires? today|final notice|turant|abhi)\b/,
        /(तुरंत|तत्काल|आज रात|अंतिम चेतावनी|24 घंटे|२४ घंटे|लगेच|ताबडतोब|आज रात्री|अभी)/
      ]
    },
    {
      id: 'secrecy', weight: 2,
      patterns: [
        /\b(do not|don't|dont|never) (tell|inform) (your )?(family|parents|wife|husband|son|daughter|relatives)\b/,
        /\b(keep (this|it) (confidential|secret|private)|ghar (par|pe|walon ko) mat batana)\b/,
        /(परिवार|घरवालों|घर वालों|घरच्यांना|कुटुंबाला|कुटुंबियांना)[^.!?\n।]{0,20}(मत बताना|न बताएं|न बताना|सांगू नका)/,
        /(गोपनीय रखें|गुप्त ठेवा|गुप्त रखें)/
      ]
    },
    {
      id: 'call_number', weight: 2,
      patterns: [
        /\b(call|contact|whatsapp|whats app|message|sms|phone)\b[^.!?\n]{0,30}(\+?91[\s-]?)?[6-9]\d{9}\b/,
        /(कॉल|संपर्क|फोन)[^.!?\n।]{0,30}(\+?91[\s-]?)?[6-9]\d{9}/
      ]
    },
    {
      id: 'money_request', weight: 1,
      patterns: [
        /\b(pay|send|transfer)\b[^.!?\n]{0,15}(rs\.?|₹|inr) ?\d/
      ]
    }
  ];

  var SHORTENERS = [
    'bit.ly', 'tinyurl.com', 'cutt.ly', 'rb.gy', 'is.gd', 't.ly', 'shorturl.at',
    'goo.gl', 'ow.ly', 'tiny.cc', 'rebrand.ly', 'short.gy', 'bit.do', 's.id',
    'surl.li', 'shorturl.asia', 'v.gd', 'qr.ae', 'clck.ru'
  ];

  var RISKY_TLDS = [
    'xyz', 'top', 'click', 'online', 'site', 'info', 'live', 'icu', 'buzz', 'cfd',
    'shop', 'link', 'vip', 'tk', 'ml', 'ga', 'cf', 'gq', 'rest', 'sbs', 'cyou',
    'monster', 'quest', 'lat', 'bond', 'win', 'loan', 'work'
  ];

  // Names scammers copy. A link containing one of these must be on an
  // official domain below, or it is treated as a look-alike.
  var BRAND_TOKENS = [
    'sbi', 'hdfc', 'icici', 'axisbank', 'kotak', 'pnb', 'baroda', 'paytm', 'phonepe',
    'gpay', 'googlepay', 'npci', 'rbi', 'uidai', 'aadhaar', 'aadhar', 'incometax',
    'amazon', 'flipkart', 'mahadiscom', 'msedcl', 'indiapost', 'epfo', 'bhim', 'yono'
  ];

  var OFFICIAL_DOMAINS = [
    'sbi.co.in', 'onlinesbi.sbi', 'sbi', 'sbicard.com', 'hdfcbank.com', 'icicibank.com',
    'axisbank.com', 'kotak.com', 'pnbindia.in', 'bankofbaroda.in', 'paytm.com',
    'phonepe.com', 'pay.google.com', 'npci.org.in', 'bhimupi.org.in', 'rbi.org.in',
    'amazon.in', 'amazon.com', 'flipkart.com', 'mahadiscom.in', 'indiapost.gov.in'
  ];

  // Suffixes only real organisations can register.
  var OFFICIAL_SUFFIXES = ['gov.in', 'nic.in', 'bank.in'];

  var BAIT_WORDS = /(kyc|verify|verification|update|reward|refund|claim|bonus|lucky|prize|winner|cashback|gift)/;

  var URL_RE = /\b((?:https?:\/\/|www\.)[^\s<>"'()]+|[a-z0-9][a-z0-9-]*(?:\.[a-z0-9-]+)*\.(?:com|in|net|org|co|xyz|top|click|online|site|info|live|icu|buzz|cfd|shop|link|app|me|ly|gl|io|biz|vip|cc|tk|ml|ga|cf|gq|gd|id|at|ru|sbi|win|loan|work|rest|sbs|cyou|monster|quest|lat|bond)(?:\/[^\s<>"'()]*)?)/gi;

  function normalize(text) {
    return String(text || '')
      .normalize('NFC')
      .toLowerCase()
      .replace(/[​-‍﻿]/g, '')
      .replace(/[ \t]+/g, ' ');
  }

  function stripNegations(text) {
    var out = text;
    NEGATIONS.forEach(function (re) { out = out.replace(re, ' '); });
    return out;
  }

  function hostOf(rawUrl) {
    var url = rawUrl.replace(/[.,;:!?]+$/, '');
    var withScheme = /^https?:\/\//.test(url) ? url : 'http://' + url;
    var host = withScheme.replace(/^https?:\/\//, '').split(/[\/?#]/)[0];
    host = host.split('@').pop().split(':')[0];
    return { url: url, host: host.replace(/^www\./, ''), http: /^http:\/\//.test(url) };
  }

  function isOfficial(host) {
    var official = OFFICIAL_DOMAINS.concat(OFFICIAL_SUFFIXES);
    return official.some(function (d) { return host === d || host.slice(-(d.length + 1)) === '.' + d; });
  }

  function hasBrand(host) {
    var labels = host.split(/[.-]/);
    return BRAND_TOKENS.some(function (t) {
      return labels.some(function (l) {
        return t.length <= 3 ? (l === t || l.indexOf(t) === 0 || l.slice(-t.length) === t) : l.indexOf(t) !== -1;
      });
    });
  }

  function analyzeLinks(text) {
    var signals = [];
    var seen = {};
    var m;
    URL_RE.lastIndex = 0;
    while ((m = URL_RE.exec(text)) !== null) {
      var info = hostOf(m[1]);
      var host = info.host;
      if (!host || seen[host]) continue;
      seen[host] = true;
      var official = isOfficial(host);
      var add = function (id, weight) { signals.push({ id: id, weight: weight, match: info.url, host: host }); };

      if (SHORTENERS.indexOf(host) !== -1) add('link_shortener', 3);
      if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) add('link_ip', 4);
      if (host.indexOf('xn--') !== -1) add('link_punycode', 4);
      if (!official && hasBrand(host)) add('link_lookalike', 6);
      if (!official && BAIT_WORDS.test(host)) add('link_bait', 3);
      var tld = host.split('.').pop();
      if (RISKY_TLDS.indexOf(tld) !== -1) add('link_tld', 2);
      if (info.http && !official) add('link_http', 1);
    }
    return signals;
  }

  function analyze(message) {
    var text = normalize(message);
    if (!text.trim()) return { level: 'empty', score: 0, signals: [], otpNotice: false };

    var negationFree = stripNegations(text);
    var signals = [];

    RULES.forEach(function (rule) {
      var subject = rule.stripNegations ? negationFree : text;
      for (var i = 0; i < rule.patterns.length; i++) {
        var hit = subject.match(rule.patterns[i]);
        if (hit) {
          signals.push({ id: rule.id, weight: rule.weight, match: hit[0].trim() });
          break;
        }
      }
    });

    signals = signals.concat(analyzeLinks(text));
    signals.sort(function (a, b) { return b.weight - a.weight; });

    var score = signals.reduce(function (sum, s) { return sum + s.weight; }, 0);
    var level = score >= SCAM_SCORE ? 'scam' : score >= SUSPICIOUS_SCORE ? 'suspicious' : 'low';

    // A real OTP message: mentions an OTP and tells you not to share it.
    var mentionsOtp = /\b(otp|one time password|verification code)\b|ओटीपी|वन टाइम पासवर्ड/.test(text);
    var otpNotice = mentionsOtp && negationFree !== text && !signals.some(function (s) { return s.id === 'otp_request'; });

    return { level: level, score: score, signals: signals, otpNotice: otpNotice };
  }

  var api = { analyze: analyze, SCAM_SCORE: SCAM_SCORE, SUSPICIOUS_SCORE: SUSPICIOUS_SCORE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ScamEngine = api;
})(this);
