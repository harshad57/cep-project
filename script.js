const N = 38;

const survey = [
 {c:"Usage",q:"What is your age group?",o:[["Below 18",3],["18–26",30],["26–40",2],["Above 40",3]],r:"<strong>30 of 38</strong> respondents (78.9%) are aged 18–26."},
 {c:"Usage",q:"Which platforms do you use? (multiple)",o:[["Instagram",34],["YouTube",27],["Snapchat",17],["Facebook",11],["LinkedIn",10],["Twitter",8]],r:"<strong>Instagram</strong> (89.5%) and <strong>YouTube</strong> (71.1%) lead. Respondents use 2.8 platforms on average."},
 {c:"Usage",q:"How much time do you spend on social media daily?",o:[["Under 1 hour",6],["1–3 hours",12],["3–5 hours",10],["Over 5 hours",10]],r:"<strong>20 of 38</strong> (52.6%) spend three hours or more online each day."},
 {c:"Privacy & security",q:"Is your main account private or public?",o:[["Private",29],["Public",9]],g:[0],k:[1],r:"<strong>76.3%</strong> keep their main account private."},
 {c:"Privacy & security",q:"Do you regularly check your privacy settings?",o:[["Yes",8],["Sometimes",18],["No",11],["Don't know how",1]],g:[0],k:[2,3],r:"Only <strong>21.1%</strong> check regularly. The survey notes that none of the 9 public-account users do."},
 {c:"Privacy & security",q:"Do you use Two-Factor Authentication (2FA)?",o:[["Yes",20],["On some accounts",4],["No",8],["Don't know what 2FA is",6]],g:[0],k:[2,3],r:"<strong>52.6%</strong> use 2FA; another 10.5% use it on some accounts."},
 {c:"Privacy & security",q:"Do you use the same password for multiple accounts?",o:[["No",21],["Yes",13],["Sometimes",4]],g:[0],k:[1,2],r:"<strong>17 of 38</strong> (44.7%) reuse passwords at least sometimes."},
 {c:"Digital footprint",q:"Do you think about future effects before posting?",o:[["Always",16],["Sometimes",8],["Rarely",4],["Never",10]],g:[0],k:[2,3],r:"<strong>42.1%</strong> always do; <strong>36.8%</strong> never or rarely think ahead."},
 {c:"Digital footprint",q:"Do you know what a digital footprint is?",o:[["Yes, I understand it",19],["Heard of it, know little",13],["No",6]],g:[0],k:[2],r:"Exactly <strong>50%</strong> say they understand the concept."},
 {c:"Digital footprint",q:"What personal information do you share? (multiple)",o:[["Phone number",6],["Workplace details",6],["Photos with identifiable info",5],["Home address",4],["Current location",2],["None of these",25]],g:[5],k:[0,1,2,3,4],r:"<strong>25</strong> selected “None of these”. The source notes one contradictory response; it is retained as recorded."},
 {c:"Threats",q:"Have you received a suspicious link, message or request?",o:[["Yes",18],["No",14],["Maybe",6]],r:"<strong>47.4%</strong> have received one; 15.8% are unsure."},
 {c:"Threats",q:"What would you do with a suspicious link from a stranger?",o:[["Block the sender",13],["Verify before opening",12],["Delete it",10],["Open it",3]],g:[0,1,2],k:[3],r:"<strong>35 of 38</strong> (92.1%) would block, verify or delete. Three would open it."},
 {c:"Threats",q:"How confident are you at spotting scams or phishing?",o:[["Very confident",19],["Somewhat confident",13],["Not confident",6]],g:[0],k:[2],r:"Half are very confident; the other <strong>50%</strong> are somewhat or not confident."},
 {c:"Safety practices",q:"Do you know how to report or block a suspicious account?",o:[["Yes",26],["Somewhat",9],["No",3]],g:[0],k:[2],r:"<strong>68.4%</strong> know how to report or block; 7.9% do not."},
 {c:"Safety practices",q:"Would you like to learn more about safety and digital footprints?",o:[["Yes",19],["Maybe",10],["No",9]],r:"<strong>76.3%</strong> answered Yes or Maybe."}
];

const habits = [
 ["Use strong, unique passwords","44.7% reuse passwords at least sometimes"],
 ["Enable 2FA on important accounts","36.9% do not use 2FA or do not know it"],
 ["Review privacy settings regularly","Only 21.1% check regularly"],
 ["Avoid oversharing personal details","Phone and workplace details were each selected by 15.8%"],
 ["Verify suspicious links before opening","3 respondents would open one"],
 ["Ignore and report unknown requests","47.4% have received suspicious content"],
 ["Think before posting","36.8% never or rarely think ahead"],
 ["Learn how to report abusive accounts","31.6% do not fully know how"],
 ["Learn to identify phishing and scams","50% are not fully confident"],
 ["Keep your long-term digital footprint in mind","50% have limited or no understanding"]
];

const $ = s => document.querySelector(s);
let current = 0, showPercent = true;

function buildQuestionList(){
  $("#questionList").innerHTML = survey.map((d,i)=>
    `<button class="${i===current?"active":""}" data-i="${i}">${String(i+1).padStart(2,"0")} · ${d.q.replace(" (multiple)","")}</button>`
  ).join("");
  document.querySelectorAll("#questionList button").forEach(btn=>{
    btn.addEventListener("click",()=>{current=Number(btn.dataset.i);renderChart();});
  });
}

function renderChart(){
  const d = survey[current];

  $("#chartCategory").textContent = `Q${current + 1} · ${d.c}`;
  $("#chartTitle").textContent = d.q;
  $("#viewToggle").textContent = showPercent ? "Show counts" : "Show %";

  $("#chartBars").innerHTML = d.o.map((x, i) => {
    const cls = d.k?.includes(i) ? "risky" : "";

    // Width based on total respondents (38)
    const width = (x[1] / N) * 100;

    const value = showPercent
      ? `${(x[1] / N * 100).toFixed(1)}%`
      : `${x[1]} / ${N}`;

    return `
      <div class="bar-row ${cls}">
        <span>${x[0]}</span>
        <div class="bar-track">
          <i class="bar-fill" data-width="${width}"></i>
        </div>
        <span class="bar-value">${value}</span>
      </div>
    `;
  }).join("");

  $("#interpretation").innerHTML = d.r;

  document.querySelectorAll("#questionList button").forEach((b, i) => {
    b.classList.toggle("active", i === current);
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll(".bar-fill").forEach(el => {
        el.style.width = `${el.dataset.width}%`;
      });
    });
  });
}

function buildHabits(){
  $("#habitGrid").innerHTML = habits.map((h,i)=>
    `<label class="habit"><input type="checkbox" data-index="${i}"><span><strong>${h[0]}</strong><small>${h[1]}</small></span></label>`
  ).join("");
  document.querySelectorAll(".habit input").forEach(input=>{
    input.addEventListener("change",()=>{
      input.closest(".habit").classList.toggle("checked",input.checked);
      updateProgress();
    });
  });
}
function updateProgress(){
  const done=document.querySelectorAll(".habit input:checked").length;
  $("#progressText").textContent=`${done} / 10 completed`;
  $("#progressBar").style.width=(done*10)+"%";
}

$("#viewToggle").addEventListener("click",()=>{showPercent=!showPercent;renderChart();});

$("#menuBtn").addEventListener("click",()=>{
  const open=$("#navLinks").classList.toggle("open");
  $("#menuBtn").setAttribute("aria-expanded",open);
});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>$("#navLinks").classList.remove("open")));

// Only the light/dark preference is stored. Quiz answers are never stored.
let savedTheme=null;
try{savedTheme=localStorage.getItem("digital-trace-theme");}catch(e){}
if(savedTheme) document.documentElement.dataset.theme=savedTheme;
$("#themeBtn").addEventListener("click",()=>{
  const next=document.documentElement.dataset.theme==="dark"?"light":"dark";
  document.documentElement.dataset.theme=next;
  try{localStorage.setItem("digital-trace-theme",next);}catch(e){}
});

buildQuestionList();
buildHabits();
renderChart();

/* =====================================================================
   NEW FEATURES: quiz, scam game, action plan
   Privacy: quiz answers and game taps live only in the variables below.
   They are never written to localStorage, cookies or the network, and
   never logged. Reloading the page clears them.
   ===================================================================== */

const fmt = n => n.toFixed(1) + "%";

/* ---------- Feature 1: Check Yourself quiz ----------
   Option format: [label, % of survey respondents who chose it, level]
   level 0 = safest answer, 1 = partly safe, 2 = risky.
   Only level 0 earns a point (score out of 8).                         */
const quiz = [
  { short: "Privacy settings",
    q: "Do you regularly check your privacy settings?",
    o: [["Yes", 21.1, 0], ["Sometimes", 47.4, 1], ["No", 28.9, 2], ["I don't know how", 2.6, 2]],
    tip: "Review who can see your profile and posts every few weeks.",
    habit: "Check your privacy settings once a month",
    finding: "Only 21.1% of our respondents check their privacy settings regularly." },
  { short: "Two-factor authentication",
    q: "Do you use two-factor authentication (2FA)?",
    o: [["Yes", 52.6, 0], ["On some accounts", 10.5, 1], ["No", 21.1, 2], ["I don't know what 2FA is", 15.8, 2]],
    tip: "2FA adds a second lock, so a stolen password alone is not enough.",
    habit: "Turn on 2FA for your email and social media accounts",
    finding: "Only 52.6% of our respondents use 2FA, and 15.8% do not know what it is." },
  { short: "Password reuse",
    q: "Do you use the same password on more than one account?",
    o: [["No", 55.3, 0], ["Sometimes", 10.5, 1], ["Yes", 34.2, 2]],
    tip: "One leaked password can unlock every account that shares it.",
    habit: "Use a different password for every account",
    finding: "34.2% of our respondents reuse the same password, and another 10.5% do so sometimes." },
  { short: "Thinking before posting",
    q: "Do you think about the future effects of what you post?",
    o: [["Always", 42.1, 0], ["Sometimes", 21.1, 1], ["Rarely", 10.5, 2], ["Never", 26.3, 2]],
    tip: "Posts can be screenshotted and shared even after you delete them.",
    habit: "Pause for a few seconds before you post",
    finding: "Only 42.1% of our respondents always think before posting, and 26.3% never do." },
  { short: "Digital footprint",
    q: "Do you know what a digital footprint is?",
    o: [["Yes, I understand it", 50.0, 0], ["I have heard of it but know little", 34.2, 1], ["No", 15.8, 2]],
    tip: "Your footprint is what you post plus what is collected in the background.",
    habit: "Search for your own name once a month to see your footprint",
    finding: "Only 50.0% of our respondents say they understand what a digital footprint is." },
  { short: "Suspicious links",
    q: "A stranger sends you a suspicious link. What do you do?",
    o: [["Block the sender", 34.2, 0], ["Verify before opening", 31.6, 0], ["Delete it", 26.3, 0], ["Open it", 7.9, 2]],
    tip: "Never open an unknown link: block the sender, verify another way, or delete it.",
    habit: "Never open a link from a stranger: block, verify or delete it",
    finding: "7.9% of our respondents said they would open a suspicious link." },
  { short: "Report and block",
    q: "Do you know how to report or block a suspicious account?",
    o: [["Yes", 68.4, 0], ["Somewhat", 23.7, 1], ["No", 7.9, 2]],
    tip: "Reporting and blocking takes seconds and helps protect you and others.",
    habit: "Find the Report and Block buttons in each app you use",
    finding: "Only 68.4% of our respondents know how to report or block, and 7.9% do not." },
  { short: "Account privacy",
    q: "Is your main social media account private or public?",
    o: [["Private", 76.3, 0], ["Public", 23.7, 1]],
    tip: "A private account lets you choose who sees your posts.",
    habit: "Review who can see your main account, and make it private if you can",
    finding: "23.7% of our respondents keep their main account public." }
];

const safeShare = d => d.o.filter(o => o[2] === 0).reduce((s, o) => s + o[1], 0);

const Q = { i: 0, answers: [], locked: false, done: false };

function quizView(name) {
  $("#quizIntro").hidden = name !== "intro";
  $("#quizQ").hidden = name !== "q";
  $("#quizResults").hidden = name !== "results";
}

function setQProgress(count) {
  $("#qBar").style.width = (count / quiz.length * 100) + "%";
  $("#qProgress").setAttribute("aria-valuenow", count);
}

function renderQuestion() {
  const d = quiz[Q.i];
  Q.locked = false;
  $("#qCount").textContent = `QUESTION ${Q.i + 1} OF ${quiz.length}`;
  $("#qTitle").textContent = d.q;
  $("#qOpts").innerHTML = d.o.map((o, j) =>
    `<button type="button" class="opt" data-j="${j}" aria-pressed="false">` +
    `<span class="key" aria-hidden="true">${j + 1}</span>` +
    `<span class="opt-label">${o[0]}</span><span class="opt-tag"></span></button>`
  ).join("");
  $("#qFeedback").hidden = true;
  $("#qFeedback").innerHTML = "";
  $("#qNext").hidden = true;
  setQProgress(Q.i);
}

function answer(j) {
  if (Q.locked) return;
  Q.locked = true;
  Q.answers[Q.i] = j;
  const d = quiz[Q.i], o = d.o[j], safe = o[2] === 0;

  document.querySelectorAll("#qOpts .opt").forEach((b, k) => {
    const opt = d.o[k];
    b.classList.add("locked");
    const chosen = k === j;
    b.setAttribute("aria-pressed", chosen);
    if (chosen && !safe) b.classList.add("risky");
    if (opt[2] === 0) b.classList.add("safest");
    // Text labels so meaning never depends on colour alone
    const tags = [];
    if (chosen) tags.push("Your answer");
    if (opt[2] === 0) tags.push("Safest");
    b.querySelector(".opt-tag").textContent = tags.join(" · ");
  });

  const fb = $("#qFeedback");
  fb.className = "feedback " + (safe ? "good" : "bad");
  fb.innerHTML =
    `<p class="status">${safe ? "Safest answer" : "Could be safer"}</p>` +
    `<p>${d.tip}</p>` +
    `<p class="stat">In our survey, <strong>${fmt(o[1])}</strong> answered the same way.</p>`;
  fb.hidden = false;

  const last = Q.i === quiz.length - 1;
  const next = $("#qNext");
  next.textContent = last ? "See my results" : "Next question";
  next.hidden = false;
  setQProgress(Q.i + 1);
  next.focus();
}

function levelFor(score) {
  if (score <= 3) return { cls: "l0", name: "Needs attention", msg: "A few quick habits will make a big difference. Your action plan below shows where to start." };
  if (score <= 6) return { cls: "l1", name: "Getting there", msg: "You already have some good habits. Closing the remaining gaps will make you much harder to fool." };
  return { cls: "l2", name: "Strong", msg: "Excellent. Keep these habits up and keep checking your settings as apps change." };
}

function quizScore() {
  return quiz.reduce((s, d, i) => s + (d.o[Q.answers[i]][2] === 0 ? 1 : 0), 0);
}

function showResults() {
  Q.done = true;
  const score = quizScore(), lv = levelFor(score);
  $("#scoreNum").innerHTML = `${score}<small> / ${quiz.length}</small>`;
  const chip = $("#scoreLevel");
  chip.textContent = lv.name;
  chip.className = "level " + lv.cls;
  $("#scoreMsg").textContent = lv.msg;

  $("#cmpList").innerHTML = quiz.map((d, i) => {
    const o = d.o[Q.answers[i]], safe = o[2] === 0, share = safeShare(d);
    return `<li class="cmp">
      <div class="cmp-q">${d.short}</div>
      <div class="cmp-line"><span class="cmp-who">You</span>
        <span class="bar-track"><i class="cmp-fill" data-w="${safe ? 100 : 0}"></i></span>
        <span class="cmp-val ${safe ? "good" : "bad"}">${safe ? "safe" : ""}${o[0]}${safe ? " (safest)" : " (room to grow)"}</span></div>
      <div class="cmp-line"><span class="cmp-who">Survey</span>
        <span class="bar-track"><i class="cmp-fill survey" data-w="${share}"></i></span>
        <span class="cmp-val">${fmt(share)} gave the safest answer</span></div>
    </li>`;
  }).join("");

  quizView("results");
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll(".cmp-fill").forEach(el => { el.style.width = el.dataset.w + "%"; });
  }));
  $("#resultsHeading").focus();
  renderPlan();
}

function resetQuiz() {
  Q.i = 0; Q.answers = []; Q.locked = false; Q.done = false;
  renderPlan();
  renderQuestion();
  quizView("q");
  $("#qTitle").focus();
}

$("#quizStart").addEventListener("click", () => { renderQuestion(); quizView("q"); $("#qTitle").focus(); });
$("#quizRetake").addEventListener("click", resetQuiz);
$("#qOpts").addEventListener("click", e => {
  const b = e.target.closest(".opt");
  if (b) answer(Number(b.dataset.j));
});
$("#qNext").addEventListener("click", () => {
  if (Q.i < quiz.length - 1) { Q.i++; renderQuestion(); $("#qTitle").focus(); }
  else showResults();
});
$("#quizQ").addEventListener("keydown", e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const opts = [...document.querySelectorAll("#qOpts .opt")];
  if (!opts.length) return;
  if (/^[1-9]$/.test(e.key)) {
    const n = Number(e.key) - 1;
    if (n < opts.length && !Q.locked) { e.preventDefault(); opts[n].focus(); answer(n); }
  } else if (["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(e.key)) {
    const at = opts.indexOf(document.activeElement);
    if (at === -1 && document.activeElement.id !== "qTitle") return;
    e.preventDefault();
    const fwd = e.key === "ArrowDown" || e.key === "ArrowRight";
    const to = at === -1 ? (fwd ? 0 : opts.length - 1) : (at + (fwd ? 1 : -1) + opts.length) % opts.length;
    opts[to].focus();
  }
});

/* ---------- Feature 2: Spot the Scam ----------
   All messages are FICTIONAL. No real brands, phone numbers or links.
   Each part: {t: text, f: {n: red-flag name, w: why}} (f only on red flags). */
const scams = [
  { ch: "Direct message", safe: false, segs: [
    { t: "From: mega_rewards_official", f: { n: "Unfamiliar “official” sender", w: "You do not follow this account, and the word “official” in a name proves nothing. Scammers pick names that sound trustworthy." } },
    { t: "Hello!" },
    { t: "You have won a FREE smartphone in our giveaway!", f: { n: "A prize you never entered", w: "You cannot win a contest you did not enter. Surprise prizes are a classic way to grab your attention." } },
    { t: "Thank you for supporting us." },
    { t: "Reply within 10 minutes or the prize goes to someone else.", f: { n: "Fake urgency", w: "Pressure to act fast is meant to stop you from thinking or checking. Real giveaways do not expire in minutes." } },
    { t: "Tap [link] and log in with your social media password to claim it.", f: { n: "A link that asks for your login", w: "Never type a password after tapping a link in a message. It leads to a fake page that steals your login." } }
  ]},
  { ch: "SMS", safe: false, segs: [
    { t: "From: Delivery Alerts" },
    { t: "Hello customer," },
    { t: "your parcel could not be delivered." },
    { t: "Pay a ₹30 re-delivery fee now.", f: { n: "An unexpected fee", w: "The message names no order, and a small amount feels harmless. The real goal is to get your card or UPI details." } },
    { t: "Your parcel will be returned in 24 hours.", f: { n: "A threat and a deadline", w: "A deadline makes you tap before you check. Real couriers give you ways to reschedule without paying through a random message." } },
    { t: "Pay here: [link]", f: { n: "An unknown payment link", w: "Never pay or enter card details through a link in a message. Open the courier's own app or website yourself instead." } },
    { t: "Thank you." }
  ]},
  { ch: "Email", safe: false, segs: [
    { t: "From: Account Security Team" },
    { t: "Dear user," },
    { t: "We noticed unusual activity on your account." },
    { t: "Your account will be permanently locked in 2 hours.", f: { n: "A threat with a countdown", w: "Scary deadlines are used to rush you. Real services give you time and tell you to open the app yourself." } },
    { t: "Reply with the 6-digit code we just sent you.", f: { n: "Asks for your one-time code", w: "A code sent to you is for your eyes only. Anyone who asks you to read it back is trying to log in as you." } },
    { t: "Or click [link] and enter your password again.", f: { n: "Password through a link", w: "A real service will not ask you to re-enter your password through a link in a message. Open the app or type the address yourself." } },
    { t: "Regards, Security Team" }
  ]},
  { ch: "Chat message", safe: true,
    why: "Nothing here asks for money, codes, passwords or links, and there is no pressure. It comes from a saved contact and fits something you already expect, so it looks safe. If anything still feels odd, a quick call to the person settles it.",
    segs: [
    { t: "From: Aarav (saved contact)" },
    { t: "Hey! Our project meeting has moved to 4 pm tomorrow." },
    { t: "Same room in the library as last time." },
    { t: "Can you bring the printed survey sheets?" },
    { t: "No rush, just tell me if you can't make it." },
    { t: "Thanks!" }
  ]},
  { ch: "Chat message", safe: false, segs: [
    { t: "From: HR Recruiter" },
    { t: "Hi! We found your profile online." },
    { t: "Work from home and earn ₹5,000 a day. No experience needed!", f: { n: "Too good to be true", w: "High pay for no skills or experience is a warning sign. Real jobs ask about your qualifications." } },
    { t: "Pay ₹999 as a registration fee to secure your seat.", f: { n: "A fee to get a job", w: "Genuine employers do not charge you to hire you. Any “registration” or “training kit” fee is a red flag." } },
    { t: "Keep this offer private and don't tell anyone.", f: { n: "Secrecy", w: "Scammers want you silent so nobody can warn you. Talk to family or friends before acting on any offer." } },
    { t: "Reply YES if you are interested." }
  ]},
  { ch: "Direct message", safe: false, segs: [
    { t: "From: Sam" },
    { t: "Hey!" },
    { t: "It's me! My old account is locked, so this is my new one.", f: { n: "The “new account” story", w: "Scammers copy a friend's name and photo and claim the old account is gone. Check with your friend by phone or another app you already use." } },
    { t: "Can you send ₹2,000 right now? I'll explain later.", f: { n: "An urgent request for money", w: "Money plus urgency plus “I'll explain later” is the classic pattern. Never send money until you have verified the person." } },
    { t: "Please don't call, my phone is broken.", f: { n: "Avoids a call", w: "A real friend can be reached another way. Refusing a voice or video call stops you from checking." } },
    { t: "Thanks, you're the best!" }
  ]}
];
const totalFlags = scams.reduce((s, m) => s + m.segs.filter(x => x.f).length, 0);

const G = { i: 0, sel: new Set(), checked: false, results: [] };

function setGProgress(count) {
  $("#gBar").style.width = (count / scams.length * 100) + "%";
  $("#gProgress").setAttribute("aria-valuenow", count);
}

function renderScam() {
  const m = scams[G.i];
  G.sel = new Set(); G.checked = false;
  $("#gCount").textContent = `MESSAGE ${G.i + 1} OF ${scams.length} · ${m.ch.toUpperCase()}`;
  $("#gMsg").setAttribute("aria-label", `Message ${G.i + 1} of ${scams.length}, ${m.ch}. Tap the suspicious parts.`);
  $("#gMsg").innerHTML = m.segs.map((s, k) =>
    `<button type="button" class="seg" data-k="${k}" aria-pressed="false"><span class="ico" aria-hidden="true"></span><span>${s.t}</span></button>`
  ).join(" ");
  $("#gStatus").textContent = "";
  $("#gResult").hidden = true;
  $("#gResult").innerHTML = "";
  $("#gCheck").hidden = false;
  $("#gNext").hidden = true;
  setGProgress(G.i);
}

function toggleSeg(btn) {
  if (G.checked) return;
  const k = Number(btn.dataset.k);
  const on = !G.sel.has(k);
  on ? G.sel.add(k) : G.sel.delete(k);
  btn.setAttribute("aria-pressed", on);
  btn.querySelector(".ico").textContent = on ? "⚑" : "";
  const n = G.sel.size;
  $("#gStatus").textContent = n ? `${n} ${n === 1 ? "part" : "parts"} marked as suspicious.` : "";
}

function checkScam() {
  if (G.checked) return;
  G.checked = true;
  const m = scams[G.i];
  let found = 0, total = 0, wrong = [];
  const flags = [];

  document.querySelectorAll("#gMsg .seg").forEach((b, k) => {
    const s = m.segs[k], sel = G.sel.has(k), ico = b.querySelector(".ico");
    b.classList.add("locked");
    let state = "";
    if (s.f && sel) { state = "spotted"; ico.textContent = "✓"; found++; }
    else if (s.f) { state = "missed"; ico.textContent = "!"; }
    else if (sel) { state = "wrong"; ico.textContent = "x"; wrong.push(s.t); }
    if (s.f) { total++; flags.push({ s, hit: sel }); }
    if (state) {
      b.classList.add(state);
      const sr = document.createElement("span");
      sr.className = "sr-only";
      sr.textContent = state === "spotted" ? " (red flag, you spotted it)"
        : state === "missed" ? " (red flag, you missed it)" : " (harmless, you marked it)";
      b.appendChild(sr);
    }
  });

  const perfect = found === total && wrong.length === 0;
  G.results[G.i] = { perfect, found, total, wrong: wrong.length };

  let html = "";
  if (m.safe) {
    html += `<p class="status ${wrong.length ? "bad" : "good"}">${wrong.length ? "This one is actually safe" : "Correct: this message looks safe"}</p>`;
    html += `<p>${m.why}</p>`;
    if (wrong.length) html += `<p class="stat">You marked ${wrong.length} ${wrong.length === 1 ? "part" : "parts"} that ${wrong.length === 1 ? "is" : "are"} ordinary (✕). Look for pressure, money, codes, passwords and links.</p>`;
  } else {
    html += `<p class="status ${perfect ? "good" : "bad"}">${perfect ? "perfect" : ""}You found ${found} of ${total} red flags.</p>`;
    html += `<p>This message is a scam.</p>`;
    html += `<ul class="flag-list">` + flags.map(x =>
      `<li><span class="flag-state ${x.hit ? "ok" : "no"}">${x.hit ? "SPOTTED" : "! MISSED"}</span>` +
      `“${x.s.t}”<br><em>${x.s.f.n}.</em> ${x.s.f.w}</li>`).join("") + `</ul>`;
    if (wrong.length) html += `<p class="stat" style="margin-top:12px">You also marked ${wrong.length} ordinary ${wrong.length === 1 ? "part" : "parts"} (✕). On their own these are harmless; the red flags are the pressure, the requests and the links.</p>`;
  }
  const res = $("#gResult");
  res.className = "feedback " + (perfect ? "good" : "bad");
  res.innerHTML = html;
  res.hidden = false;

  $("#gCheck").hidden = true;
  const last = G.i === scams.length - 1;
  $("#gNext").textContent = last ? "See my score" : "Next message";
  $("#gNext").hidden = false;
  $("#gStatus").textContent = "";
  setGProgress(G.i + 1);
  $("#gNext").focus();
}

function showScamEnd() {
  const score = G.results.filter(r => r && r.perfect).length;
  const flagsFound = G.results.reduce((s, r) => s + (r ? r.found : 0), 0);
  $("#gScore").innerHTML = `${score}<small> / ${scams.length}</small>`;
  const lv = score >= 5 ? { cls: "l2", name: "Sharp eyes" } : score >= 3 ? { cls: "l1", name: "Good start" } : { cls: "l0", name: "Keep practising" };
  const chip = $("#gLevel");
  chip.textContent = lv.name;
  chip.className = "level " + lv.cls;
  $("#gSummary").textContent =
    `You fully spotted ${score} of ${scams.length} messages (every red flag found, nothing harmless marked). ` +
    `Red flags found: ${flagsFound} of ${totalFlags}.`;
  $("#gPlay").hidden = true;
  $("#gEnd").hidden = false;
  $("#gEndHeading").focus();
}

function resetScam() {
  G.i = 0; G.results = [];
  $("#gEnd").hidden = true;
  $("#gPlay").hidden = false;
  renderScam();
  $("#gMsg").focus();
}

$("#gMsg").addEventListener("click", e => {
  const b = e.target.closest(".seg");
  if (b) toggleSeg(b);
});
$("#gCheck").addEventListener("click", checkScam);
$("#gNext").addEventListener("click", () => {
  if (G.i < scams.length - 1) { G.i++; renderScam(); $("#gMsg").focus(); }
  else showScamEnd();
});
$("#gAgain").addEventListener("click", resetScam);

/* ---------- Feature 3: Personal action plan ---------- */
function buildPlan() {
  const rows = quiz.map((d, i) => ({ i, level: d.o[Q.answers[i]][2], share: safeShare(d) }));
  // Weakest first: riskier answers rank higher; ties go to the question
  // where fewer survey respondents gave the safest answer.
  const weak = rows.filter(r => r.level > 0).sort((a, b) => b.level - a.level || a.share - b.share);
  const plan = weak.slice(0, 3).map(r => ({ i: r.i, keep: false }));
  if (plan.length < 3) {
    // Fewer than 3 gaps: fill with "keep it up" habits from the areas
    // where the fewest survey respondents gave the safest answer.
    rows.filter(r => r.level === 0).sort((a, b) => a.share - b.share).forEach(r => {
      if (plan.length < 3) plan.push({ i: r.i, keep: true });
    });
  }
  return plan;
}

function renderPlan() {
  const body = $("#planBody"), actions = $("#planActions");
  if (!Q.done) {
    actions.hidden = true;
    body.innerHTML = `<div class="tool-card plan-empty"><h3>Your plan appears here</h3>
      <p>Finish the Check Yourself quiz and we will pick your three weakest areas and turn them into three habits.</p>
      <a class="tbtn primary" href="#quiz">Take the quiz</a></div>`;
    return;
  }
  const score = quizScore(), lv = levelFor(score);
  const items = buildPlan().map((p, n) => {
    const d = quiz[p.i], o = d.o[Q.answers[p.i]];
    return `<li class="plan-item"><span class="plan-num" aria-hidden="true">${n + 1}</span><div>
      <h3><span class="print-box" aria-hidden="true">☐ </span>${d.habit}</h3>
      <p><strong>Survey finding:</strong> ${d.finding}</p>
      <p class="plan-you ${p.keep ? "good" : "bad"}">${p.keep ? "YOU ALREADY DO THIS: KEEP IT UP" : "YOU ANSWERED: " + o[0].toUpperCase()}</p></div></li>`;
  }).join("");
  body.innerHTML =
    `<div class="plan-meta"><span class="level ${lv.cls}">${lv.name}</span>
      <span class="hint" style="margin:0">Safety score: <strong>${score} / ${quiz.length}</strong></span></div>
     <ol class="plan-list">${items}</ol>`;
  actions.hidden = false;
}

function planAsText() {
  const score = quizScore(), lv = levelFor(score);
  const lines = [
    "My digital safety checklist",
    "Digital Trace · Social Media Safety & Digital Footprint Awareness (CEP 2026–27)",
    `Safety score: ${score}/${quiz.length} (${lv.name})`,
    ""
  ];
  buildPlan().forEach((p, n) => {
    const d = quiz[p.i], o = d.o[Q.answers[p.i]];
    lines.push(`[ ] ${n + 1}. ${d.habit}`);
    lines.push(`    Why: ${d.finding}`);
    lines.push(p.keep ? "    I already do this: keep it up." : `    I answered: ${o[0]}`);
    lines.push("");
  });
  lines.push("Based on a survey of 38 people. My answers were not saved.");
  lines.push($("#helpText").textContent.trim());
  return lines.join("\n");
}

let statusTimer;
function planStatus(msg) {
  $("#planStatus").textContent = msg;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => { $("#planStatus").textContent = ""; }, 4000);
}

$("#printBtn").addEventListener("click", () => window.print());
$("#copyBtn").addEventListener("click", async () => {
  const text = planAsText();
  try {
    await navigator.clipboard.writeText(text);
    planStatus("Checklist copied.");
  } catch (err) {
    // Fallback for browsers or contexts without the Clipboard API
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e2) { ok = false; }
    document.body.removeChild(ta);
    planStatus(ok ? "Checklist copied." : "Copy did not work. Select the plan text and copy it manually.");
  }
});

renderPlan();
renderScam();
