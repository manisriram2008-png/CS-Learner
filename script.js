const languages = [
  {name:"C",short:"C",desc:"Master the foundations of programming and memory.",level:"Beginner → Advanced",lessons:"24 lessons",color:"#79a9ff",bg:"#243553"},
  {name:"C++",short:"C+",desc:"Learn object-oriented code, STL, and performance.",level:"Beginner → Advanced",lessons:"28 lessons",color:"#8fb8ff",bg:"#253454"},
  {name:"Java",short:"☕",desc:"Build strong OOP skills and cross-platform apps.",level:"Beginner → Advanced",lessons:"30 lessons",color:"#ffb67e",bg:"#4a3028"},
  {name:"JavaScript",short:"JS",desc:"Bring websites to life with interactive logic.",level:"Beginner → Advanced",lessons:"32 lessons",color:"#f4dc79",bg:"#494326"},
  {name:"Python",short:"Py",desc:"Start simple, then explore automation and AI.",level:"Beginner → Advanced",lessons:"30 lessons",color:"#80c5ff",bg:"#203c4c"},
  {name:"HTML & CSS",short:"5 / 3",desc:"Design beautiful, responsive websites from scratch.",level:"Beginner → Advanced",lessons:"26 lessons",color:"#ff9b91",bg:"#492b36"},
  {name:"SQL",short:"SQL",desc:"Query, organize, and understand structured data.",level:"Beginner → Advanced",lessons:"18 lessons",color:"#b5a0ff",bg:"#382d51"},
  {name:"Data Structures",short:"DS",desc:"Think clearly with algorithms and core data structures.",level:"Intermediate → Advanced",lessons:"22 lessons",color:"#73e1b6",bg:"#1d4038"}
];
const grid = document.querySelector("#languageGrid");
languages.forEach((lang,i)=>{
  const card=document.createElement("a");card.href="#playground";card.className="language-card";
  card.innerHTML=`<div class="lang-top"><span class="lang-logo" style="color:${lang.color};background:${lang.bg}">${lang.short}</span><span class="lang-arrow">↗</span></div><h3>${lang.name}</h3><p>${lang.desc}</p><div class="lang-meta"><span>${lang.lessons}</span><span class="level">${lang.level}</span></div>`;
  card.addEventListener("click",()=>{document.querySelector("#editorLanguage").value=lang.name==="Python"?"python":lang.name==="C"?"c":"javascript";document.querySelector("#editorFilename").textContent=lang.name==="Python"?"main.py":lang.name==="C"?"main.c":"main.js";});
  grid.appendChild(card);
});

const codeInput=document.querySelector("#codeInput"), output=document.querySelector("#output"), lineNumbers=document.querySelector("#lineNumbers");
function updateLines(){lineNumbers.innerHTML=codeInput.value.split("\n").map((_,i)=>i+1).join("<br>");}
codeInput.addEventListener("input",updateLines);
codeInput.addEventListener("keydown",e=>{if(e.key==="Tab"){e.preventDefault();const start=codeInput.selectionStart,end=codeInput.selectionEnd;codeInput.setRangeText("  ",start,end,"end");updateLines();}});
document.querySelector("#runBtn").addEventListener("click",()=>{
 const lang=document.querySelector("#editorLanguage").value; const code=codeInput.value;
 output.innerHTML="";
 const add=(txt,cls="")=>{const d=document.createElement("div");d.className=cls;d.textContent=txt;output.appendChild(d);};
 if(lang==="javascript"){
   const logs=[];const safeConsole={log:(...args)=>logs.push(args.map(x=>typeof x==="object"?JSON.stringify(x):String(x)).join(" "))};
   try { const run=new Function("console",`"use strict";\n${code}`);run(safeConsole); if(logs.length)logs.forEach(x=>add(x));else add("Code ran successfully (no console output).","muted"); document.querySelector("#learningTip").textContent="console.log() displays values in the output console. Try changing a variable and run it again."; }
   catch(err){add(err.name+": "+err.message);add("Tip: check brackets, quotes, spelling, and variable names.","muted");}
 }else{
   add(lang==="python"?"Python demo mode":"C demo mode","muted");
   add("This page previews guided examples; it does not compile "+(lang==="python"?"Python":"C")+" code.");
   const match=code.match(/print\s*\(\s*["']([^"']*)["']\s*\)|printf\s*\(\s*["']([^"']*)["']/);
   if(match)add(match[1]||match[2]||"");
   else add("Try a simple print/printf statement to see the demo output.");
   document.querySelector("#learningTip").textContent="Real Python/C execution needs a trusted compiler or backend. Never run untrusted code directly on your server.";
 }
});
document.querySelector("#clearOutput").addEventListener("click",()=>{output.innerHTML='<span class="muted">// Console cleared.</span>';});
document.querySelector("#themeBtn").addEventListener("click",()=>document.body.classList.toggle("glow-off"));
document.querySelector("#menuBtn").addEventListener("click",()=>document.querySelector("#sidebar").classList.toggle("open"));
document.querySelectorAll(".nav-item").forEach(a=>a.addEventListener("click",()=>document.querySelector("#sidebar").classList.remove("open")));

const knowledge=[
 {keys:["variable","variables"],answer:"A variable is a named place to keep a value.\n\nStep 1: Create it — let age = 18;\nStep 2: The name is age.\nStep 3: The stored value is 18.\nStep 4: Use it later — console.log(age);\n\nThink of a variable like a labelled box. The syntax changes between languages."},
 {keys:["for loop","loop","loops"],answer:"A loop repeats code, so you don't have to write it many times.\n\nExample (JavaScript):\nfor (let i = 1; i <= 3; i++) {\n  console.log(i);\n}\n\nStep 1: let i = 1 starts the counter.\nStep 2: i <= 3 checks whether to continue.\nStep 3: console.log(i) prints the counter.\nStep 4: i++ adds 1 each round.\nOutput: 1, then 2, then 3."},
 {keys:["c vs java","difference between c and java","difference between c and"],answer:"C is a procedural language that gives you more direct control over memory. Java is class-based and runs on the Java Virtual Machine (JVM).\n\n• C: commonly compiled to native machine code; pointers are used directly.\n• Java: bytecode runs on a JVM; memory is managed by garbage collection.\n• Both: support conditions, loops, functions/methods, and structured problem-solving.\n\nChoose based on your goal: C for fundamentals, Java for OOP and many application types."},
 {keys:["pointer"],answer:"A pointer is a variable that stores a memory address (in C).\n\nExample:\nint x = 10;\nint *p = &x;\n\nStep 1: x stores 10.\nStep 2: &x means “address of x”.\nStep 3: p stores that address.\nStep 4: *p accesses the value at that address — 10.\n\nPointers are a C/C++ topic; Java does not expose raw pointers in the same way."},
 {keys:["function","functions"],answer:"A function is a reusable block of code that does a particular task.\n\nExample:\nfunction add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3));\n\nStep 1: add is the function name.\nStep 2: a and b are parameters.\nStep 3: return sends back the result.\nStep 4: add(2, 3) calls the function.\nOutput: 5."},
 {keys:["syntax error","error"],answer:"To debug an error:\n1. Read the exact error message.\n2. Check the line number it mentions.\n3. Look for missing brackets, quotes, semicolons (where required), or misspelled names.\n4. Test a tiny version of the code.\n5. Fix one issue at a time.\n\nPaste your code and the full error message for a more specific walkthrough."},
 {keys:["html","css"],answer:"HTML describes the page structure; CSS controls how it looks.\n\nHTML: <h1>Hello</h1>\nCSS: h1 { color: purple; }\n\nStep 1: HTML creates a heading.\nStep 2: CSS selects all h1 elements.\nStep 3: color changes the text colour.\n\nHTML and CSS are markup/style languages, not general-purpose programming languages."},
 {keys:["python","print"],answer:"In Python, print() displays information.\n\nExample:\nname = \"Learner\"\nprint(\"Hello\", name)\n\nStep 1: name stores text.\nStep 2: print() sends the values to the output.\nStep 3: the comma separates the values with a space.\nOutput: Hello Learner."}
];
function tutorReply(question){
 const q=question.toLowerCase();const hit=knowledge.find(item=>item.keys.some(k=>q.includes(k)));
 return hit?hit.answer:"Let's break your question down clearly.\n\n1. Identify the goal: what should the program do?\n2. Find the relevant concept: variables, conditions, loops, functions, or data structures.\n3. Write the smallest example that demonstrates it.\n4. Trace the code line by line and predict the output.\n5. Run it and compare your prediction.\n\nThis is a limited offline demo, so it may not know every question. Connect a trusted AI API through a backend to support open-ended questions and code-specific explanations.";
}
const chatMessages=document.querySelector("#chatMessages");
function sendQuestion(q){
 if(!q.trim())return;
 const suggestions=chatMessages.querySelector(".suggestions");if(suggestions)suggestions.remove();
 const user=document.createElement("div");user.className="message user";user.textContent=q;chatMessages.appendChild(user);
 const bot=document.createElement("div");bot.className="message bot";bot.textContent=tutorReply(q);chatMessages.appendChild(bot);chatMessages.scrollTop=chatMessages.scrollHeight;
}
document.querySelector("#chatForm").addEventListener("submit",e=>{e.preventDefault();const input=document.querySelector("#chatInput");sendQuestion(input.value);input.value="";});
document.querySelectorAll(".suggestions button").forEach(b=>b.addEventListener("click",()=>sendQuestion(b.dataset.question)));

document.querySelectorAll("#challengeOptions button").forEach(b=>b.addEventListener("click",()=>{
 document.querySelectorAll("#challengeOptions button").forEach(x=>x.classList.remove("correct","wrong"));
 const correct=b.dataset.answer==="8";b.classList.add(correct?"correct":"wrong");
 document.querySelector("#challengeFeedback").textContent=correct?"Correct! score starts at 5, then += 3 adds 3. The result is 8.":"Not quite. score += 3 means add 3 to the current value (5), so the result is 8.";
}));
updateLines();
