(function () {
  'use strict';

  var STRINGS = window.ScamI18n.STRINGS;
  var EXAMPLES = window.ScamI18n.EXAMPLES;
  var LANGS = window.ScamI18n.LANGS;
  var config = window.SCAMKAVACH_CONFIG || {};
  var analyze = window.ScamEngine.analyze;

  var ICONS = { scam: '⛔', suspicious: '⚠️', low: '✅' };
  var SPEECH_LANGS = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN' };
  var LINKABLE = ['cybercrime.gov.in', 'sancharsaathi.gov.in'];

  var $ = function (id) { return document.getElementById(id); };
  var msg = $('msg');
  var lang = initialLang();
  var lastResult = null;

  function initialLang() {
    try {
      var saved = localStorage.getItem('scamkavach-lang');
      if (LANGS.indexOf(saved) !== -1) return saved;
    } catch (e) { /* storage blocked */ }
    var nav = (navigator.language || 'en').slice(0, 2);
    return LANGS.indexOf(nav) !== -1 ? nav : 'en';
  }

  function t(key) { return STRINGS[lang][key]; }

  // Render text, turning known reporting websites into links.
  function fillWithLinks(el, text) {
    el.textContent = '';
    var re = new RegExp('(' + LINKABLE.map(function (d) { return d.replace(/\./g, '\\.'); }).join('|') + ')');
    text.split(re).forEach(function (part) {
      if (LINKABLE.indexOf(part) !== -1) {
        var a = document.createElement('a');
        a.href = 'https://' + part;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = part;
        el.appendChild(a);
      } else if (part) {
        el.appendChild(document.createTextNode(part));
      }
    });
  }

  function fillList(el, items) {
    el.textContent = '';
    items.forEach(function (item) {
      var li = document.createElement('li');
      fillWithLinks(li, item);
      el.appendChild(li);
    });
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    document.querySelectorAll('.langs button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });

    var list = $('example-list');
    list.textContent = '';
    Object.keys(EXAMPLES[lang]).forEach(function (key) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = t('exampleLabels')[key];
      b.addEventListener('click', function () {
        msg.value = EXAMPLES[lang][key];
        check();
      });
      list.appendChild(b);
    });

    fillList($('lost-steps'), t('lostSteps'));
    fillList($('rules'), t('rules'));

    var feedback = $('feedback');
    feedback.hidden = !config.feedbackUrl;
    if (config.feedbackUrl) feedback.href = config.feedbackUrl;

    if (lastResult) render(lastResult);
  }

  function reasonText(signal) {
    return t('reasons')[signal.id].replace('{host}', signal.host || '');
  }

  function render(result) {
    lastResult = result;
    var box = $('result');
    if (result.level === 'empty') { box.hidden = true; return; }

    box.hidden = false;
    box.className = 'card result ' + result.level;
    box.querySelector('.verdict-icon').textContent = ICONS[result.level];
    $('verdict-title').textContent = t({ scam: 'levelScam', suspicious: 'levelSuspicious', low: 'levelLow' }[result.level]);

    var notice = $('otp-notice');
    notice.hidden = !result.otpNotice;
    notice.textContent = result.otpNotice ? t('otpNotice') : '';

    var lowNote = $('low-note');
    lowNote.hidden = result.level !== 'low';
    lowNote.textContent = t('lowNote');

    var why = $('why');
    why.textContent = '';
    result.signals.forEach(function (s) {
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(reasonText(s)));
      var found = document.createElement('span');
      found.className = 'found';
      found.textContent = t('found') + ': “' + s.match + '”';
      li.appendChild(found);
      why.appendChild(li);
    });
    $('why-block').hidden = result.signals.length === 0;

    fillList($('todo'), t('advice')[result.level]);

    var share = $('share');
    share.hidden = result.level === 'low';
    share.textContent = t('warnFamily');
    share.href = 'https://wa.me/?text=' + encodeURIComponent(t('shareText') + (config.siteUrl || location.href));

    updateSpeakButton();
  }

  function check() {
    stopSpeaking();
    render(analyze(msg.value));
    $('result').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Read-aloud for people who find reading hard.
  var canSpeak = 'speechSynthesis' in window;

  function speaking() { return canSpeak && window.speechSynthesis.speaking; }

  function stopSpeaking() {
    if (canSpeak) window.speechSynthesis.cancel();
    updateSpeakButton();
  }

  function updateSpeakButton() {
    var b = $('speak');
    b.hidden = !canSpeak;
    b.textContent = (speaking() ? '⏹ ' + t('stop') : '🔊 ' + t('readAloud'));
  }

  function speak() {
    if (speaking()) { stopSpeaking(); return; }
    if (!lastResult) return;
    var parts = [$('verdict-title').textContent];
    if (lastResult.otpNotice) parts.push(t('otpNotice'));
    lastResult.signals.forEach(function (s) { parts.push(reasonText(s)); });
    parts = parts.concat(t('advice')[lastResult.level]);

    var u = new SpeechSynthesisUtterance(parts.join('. '));
    u.lang = SPEECH_LANGS[lang];
    var voices = window.speechSynthesis.getVoices();
    // Marathi voices are rare; a Hindi voice can read Devanagari text.
    var voice = voices.find(function (v) { return v.lang === u.lang; }) ||
      (lang === 'mr' && voices.find(function (v) { return v.lang === 'hi-IN'; }));
    if (voice) { u.voice = voice; u.lang = voice.lang; }
    u.rate = 0.95;
    u.onend = updateSpeakButton;
    window.speechSynthesis.speak(u);
    setTimeout(updateSpeakButton, 100);
  }

  document.querySelectorAll('.langs button').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.getAttribute('data-lang');
      try { localStorage.setItem('scamkavach-lang', lang); } catch (e) { /* storage blocked */ }
      stopSpeaking();
      applyLang();
    });
  });

  $('check').addEventListener('click', check);
  $('clear').addEventListener('click', function () {
    msg.value = '';
    stopSpeaking();
    render({ level: 'empty', signals: [] });
    msg.focus();
  });
  $('speak').addEventListener('click', speak);
  msg.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) check();
  });

  // Support links like ?msg=... so the checker can be opened pre-filled.
  var params = new URLSearchParams(location.search);
  applyLang();
  if (params.get('msg')) { msg.value = params.get('msg'); check(); }
})();
