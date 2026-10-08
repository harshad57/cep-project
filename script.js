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

const savedTheme=localStorage.getItem("digital-trace-theme");
if(savedTheme) document.documentElement.dataset.theme=savedTheme;
$("#themeBtn").addEventListener("click",()=>{
  const next=document.documentElement.dataset.theme==="dark"?"light":"dark";
  document.documentElement.dataset.theme=next;
  localStorage.setItem("digital-trace-theme",next);
});

buildQuestionList();
buildHabits();
renderChart();
