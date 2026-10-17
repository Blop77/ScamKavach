// Run with: node --test tests/
const test = require('node:test');
const assert = require('node:assert');
const { analyze } = require('../js/engine.js');

const SCAMS = [
  ['fake SBI KYC link', 'Dear Customer, your SBI YONO account will be blocked today. Update your PAN immediately: http://sbi-kyc-update.xyz/login'],
  ['KBC lottery with fee', 'Congratulations! You have won Rs 25,00,000 in KBC lucky draw. To claim your prize pay processing fee of Rs 5,000. Call 9876543210'],
  ['task job', 'Part time job! Earn Rs 3000 per day by liking YouTube videos. Simple tasks, join our Telegram group now.'],
  ['UPI collect refund', 'You have received a refund of Rs 2,499. Accept the collect request and enter UPI PIN to receive the money.'],
  ['electricity cut', 'Dear consumer your electricity power will be disconnected tonight at 9.30 pm because your previous month bill was not update. Please immediately contact our electricity officer 9123456789'],
  ['digital arrest', 'This is CBI officer. Your Aadhaar is linked to a parcel with drugs seized by customs. You are under digital arrest. Do not tell your family. Join video call now.'],
  ['Hindi KYC block', 'प्रिय ग्राहक, आपका बैंक खाता आज बंद हो जाएगा। तुरंत केवाईसी अपडेट करें: bit.ly/abc123'],
  ['Marathi prize + OTP', 'अभिनंदन! तुम्हाला ५०,००० रुपयांचे बक्षीस मिळाले आहे. बक्षीस मिळवण्यासाठी OTP सांगा.'],
  ['Hinglish OTP', 'Sir apna OTP batao, aapka refund process ho jayega'],
  ['AnyDesk', 'Install AnyDesk app so our executive can help you with your refund'],
  ['APK file', 'Your PM Kisan installment is pending. Download PM-Kisan.apk to update your details'],
  ['Hindi electricity', 'प्रिय उपभोक्ता, आपकी बिजली आज रात 9:30 बजे काट दी जाएगी। तुरंत बिजली अधिकारी से संपर्क करें 9123456789'],
  ['Marathi electricity', 'प्रिय ग्राहक, तुमची वीज आज रात्री खंडित केली जाईल. लगेच संपर्क करा 9123456789'],
  ['investment', 'Join our trading group for guaranteed returns of 5% daily. Double your money in 20 days!'],
  ['fake Paytm link', 'Your Paytm cashback of Rs 999 is waiting. Claim now at paytm-cashback.top'],
  ['shortener + prize', 'You are the winner of an iPhone 16! Claim your gift here bit.ly/3xYz'],
];

const SUSPICIOUS = [
  ['family new number', 'Hi Mom, this is my new number. I am in trouble, please send money urgently to this UPI ID'],
  ['instant loan', 'Pre-approved instant loan of Rs 5 lakh, no documents needed! Apply now'],
];

const GENUINE = [
  ['HDFC OTP', '123456 is your OTP for login to HDFC Bank NetBanking. Do not share it with anyone. -HDFC Bank'],
  ['Swiggy', 'Your Swiggy order #1234 has been delivered. Enjoy your meal!'],
  ['family chat', "Hi beta, I'll reach home by 8. Keep dinner ready."],
  ['SBI debit alert', 'Rs.500 debited from A/c XX1234 on 12-Oct via UPI to RAMESH. Not you? Call 18001234 -SBI'],
  ['MSEDCL bill', 'Dear customer, your electricity bill of Rs 1,230 is due on 20-10-2026. Pay at https://www.mahadiscom.in - MSEDCL'],
  ['Hindi OTP', 'आपका ओटीपी 4521 है। इसे किसी के साथ साझा न करें।'],
  ['Marathi OTP', 'तुमचा OTP 7788 आहे. तो कोणालाही सांगू नका.'],
  ['official SBI link', 'Login to https://www.onlinesbi.sbi to view your statement'],
  ['bank.in link', 'Visit https://www.sbi.bank.in for details'],
  ['Hinglish no-share OTP', 'Aapka OTP 9988 hai. Kisi ko share mat karo.'],
  ['college notice', 'Reminder: Mid-sem exams start on Monday. Check the timetable on the student portal.'],
];

for (const [name, msg] of SCAMS) {
  test(`scam: ${name}`, () => {
    const r = analyze(msg);
    assert.strictEqual(r.level, 'scam', `${name} scored ${r.score}: ${JSON.stringify(r.signals.map((s) => s.id))}`);
  });
}

for (const [name, msg] of SUSPICIOUS) {
  test(`suspicious or worse: ${name}`, () => {
    const r = analyze(msg);
    assert.notStrictEqual(r.level, 'low', `${name} scored ${r.score}`);
  });
}

for (const [name, msg] of GENUINE) {
  test(`genuine: ${name}`, () => {
    const r = analyze(msg);
    assert.strictEqual(r.level, 'low', `${name} scored ${r.score}: ${JSON.stringify(r.signals)}`);
  });
}

test('genuine OTP messages show the OTP notice', () => {
  assert.ok(analyze(GENUINE[0][1]).otpNotice);
  assert.ok(analyze('आपका ओटीपी 4521 है। इसे किसी के साथ साझा न करें।').otpNotice);
});

test('genuine OTP messages raise no warnings at all', () => {
  for (const [name, msg] of GENUINE.filter(([n]) => /OTP/.test(n))) {
    assert.deepStrictEqual(analyze(msg).signals, [], name);
  }
});

test('OTP request is not mistaken for a notice', () => {
  const r = analyze('Sir apna OTP batao');
  assert.strictEqual(r.otpNotice, false);
});

test('empty input', () => {
  assert.strictEqual(analyze('   ').level, 'empty');
});

test('look-alike link reports its host', () => {
  const s = analyze('Update KYC at sbi-kyc-update.xyz').signals.find((x) => x.id === 'link_lookalike');
  assert.strictEqual(s.host, 'sbi-kyc-update.xyz');
});

const { STRINGS, EXAMPLES, LANGS } = require('../js/i18n.js');

for (const lang of LANGS) {
  for (const [key, msg] of Object.entries(EXAMPLES[lang])) {
    test(`example ${lang}/${key}`, () => {
      const r = analyze(msg);
      const expected = key === 'otp' ? 'low' : 'scam';
      assert.strictEqual(r.level, expected, `${lang}/${key} scored ${r.score}: ${JSON.stringify(r.signals.map((s) => s.id))}`);
    });
  }
}

test('every language has the same keys', () => {
  const keysOf = (o) => Object.keys(o).sort();
  for (const lang of LANGS) {
    assert.deepStrictEqual(keysOf(STRINGS[lang]), keysOf(STRINGS.en), lang);
    assert.deepStrictEqual(keysOf(STRINGS[lang].reasons), keysOf(STRINGS.en.reasons), lang);
    assert.deepStrictEqual(keysOf(EXAMPLES[lang]), keysOf(EXAMPLES.en), lang);
  }
});

test('every signal the engine can emit has a reason text', () => {
  const src = require('fs').readFileSync(require.resolve('../js/engine.js'), 'utf8');
  const ids = [...src.matchAll(/id: '([a-z_]+)'|add\('([a-z_]+)'/g)].map((m) => m[1] || m[2]);
  for (const id of ids) assert.ok(STRINGS.en.reasons[id], `missing reason for ${id}`);
});
