+++
title = "BmMT 2026 Volunteer Guide"
date = 2026-04-12
path = "events/bmmt-2026/volunteer-guide"
aliases = ["/volunteer-guide"]
template = "standalone.html"
+++

Welcome, and thanks for volunteering for BmMT 2026! We'll have over 2000
middle schoolers on campus today, and we couldn't do it without your help.

You will be assigned to one of various roles, including proctoring, running
materials between rooms, helping with activities, or grading puzzle tests. In
this guide you will find important information including schedules, role
descriptions, role responsibilities, and emergency procedures.

<!-- more -->

<nav class="not-prose flex flex-wrap justify-center gap-x-4 gap-y-2 my-2 mb-4">
  <button onclick="switchTab('roles')" id="tab-btn-roles" class="tab-btn font-semibold text-black">General</button>
  <span class="text-gray-300">⁄</span>
  <button onclick="switchTab('general')" id="tab-btn-general" class="tab-btn text-gray-500">Check-In</button>
  <span class="text-gray-300">⁄</span>
  <button onclick="switchTab('schedule')" id="tab-btn-schedule" class="tab-btn text-gray-500">Schedule</button>
  <span class="text-gray-300">⁄</span>
  <button onclick="switchTab('disqualifications')" id="tab-btn-disqualifications" class="tab-btn text-gray-500">Disqualifications</button>
  <span class="text-gray-300">⁄</span>
  <button onclick="switchTab('emergency')" id="tab-btn-emergency" class="tab-btn text-gray-500">Emergency Procedures</button>
  <span class="text-gray-300">⁄</span>
  <button onclick="switchTab('directory')" id="tab-btn-directory" class="tab-btn text-gray-500">Directory</button>
</nav>

<hr class="not-prose mb-6">

<div id="tab-general" class="tab-panel hidden">

### Check-In

**Shift 1:** Check-in at Dwinelle 215 or 283 at **7:30 AM**

**Shift 2:** Check-in at Dwinelle 215 or 283 at **12:00 PM**

Please navigate to the check-in room specified in your email.
- Last names A–L will go to **DWIN 215**
- Last names M–Z will go to **DWIN 283**

**This is not on Berkeley Time, please arrive as early as you can! Please bring fully charged computers — outlet access is not guaranteed.**

{% details(title="Where to Go After Role Assignment") %}
| Role | Location |
| --- | --- |
| **Dwinelle Proctors** | Go to Dwinelle 219 for volunteer training. Then, go to the room on your script assigned by your Proctor Manager. |
| **Wheeler Proctors** | Go to Wheeler 102 for volunteer training. Then, go to the room on your script assigned by your Proctor Manager. |
| **VLSB Proctors** | Go to VLSB 2050 for volunteer training. Then, go to the room on your script assigned by your Proctor Manager. |
| **Pauley Proctors** | Go to Pauley Ballroom for volunteer training. |
| **Runners** | Go to Dwinelle 211. |
| **Puzzle Graders** | Go to Dwinelle 211 for now; Puzzle grading will only start at around 11:00 AM. |
| **Activities** | We'll send a ping in the #vol-announcements channel on Discord before Relay ends around 3:30 PM with location details. |
{% end %}

### Key Contacts & Discord Handles

If you're unsure about what category your question falls into, please contact **Ty (ly49nkallo)**!

| Building (Room) | Role | Person (Discord) |
| --- | --- | --- |
| Dwinelle (Dwinelle 211) | Dispatcher | Junehee (wnsgml) |
| | Volunteer Manager | Ty (ly49nkallo) |
| | Satellite Manager | Naomi (naomilojo) |
| | Proctor Managers | Kaden (lightning\_mcqueen6107), Janak (janakbhuta) |
| Wheeler (Wheeler 106) | Satellite Manager | Clara (yeetingmeselfintosun) |
| | Proctor Managers | Hannah (hannah\_y7), Eyun (eyungyo) |
| VLSB (VLSB 2050) | Satellite Manager | Nathan (nathanhatesphysics) |
| | Proctor Manager | Tej (tejnadkarni) |
| Pauley Ballroom | Satellite Manager | Andrew K. (naomilojo) |
| | Proctor Manager | Crystal (\_crsytal\_) |

</div>
<div id="tab-roles" class="tab-panel">

<div class="not-prose grid grid-cols-3 gap-4 my-6">
  <button onclick="toggleRoleCard('proctors')" class="group rounded-xl overflow-hidden text-black shadow-lg transition-all hover:-translate-y-1 cursor-pointer p-6 flex flex-col gap-2 text-left" style="background-color: #c5e0d8;">
    <h3 class="font-bold text-lg flex items-center gap-2">
      <span>Proctors</span>
      <i class="bi bi-chevron-right text-sm transition-transform" id="icon-proctors"></i>
    </h3>
    <p class="text-sm opacity-75">Monitoring, scripts & responsibilities</p>
  </button>
  <button onclick="toggleRoleCard('graders')" class="group rounded-xl overflow-hidden text-black shadow-lg transition-all hover:-translate-y-1 cursor-pointer p-6 flex flex-col gap-2 text-left" style="background-color: #8ec6d6;">
    <h3 class="font-bold text-lg flex items-center gap-2">
      <span>Graders</span>
      <i class="bi bi-chevron-right text-sm transition-transform" id="icon-graders"></i>
    </h3>
    <p class="text-sm opacity-75">Puzzle & Atomic Grader info</p>
  </button>
  <button onclick="toggleRoleCard('runners')" class="group rounded-xl overflow-hidden text-white shadow-lg transition-all hover:-translate-y-1 cursor-pointer p-6 flex flex-col gap-2 text-left" style="background-color: #2d5a73;">
    <h3 class="font-bold text-lg flex items-center gap-2">
      <span>Runners</span>
      <i class="bi bi-chevron-right text-sm transition-transform" id="icon-runners"></i>
    </h3>
    <p class="text-sm opacity-90">Material transport & substitution</p>
  </button>
</div>

<div class="not-prose grid grid-cols-3 gap-4 mb-6">
  <button onclick="toggleRoleCard('activities')" class="group rounded-xl overflow-hidden text-black shadow-lg transition-all hover:-translate-y-1 cursor-pointer p-6 flex flex-col gap-2 text-left" style="background-color: #d6e0f0;">
    <h3 class="font-bold text-lg flex items-center gap-2">
      <span>Activities</span>
      <i class="bi bi-chevron-right text-sm transition-transform" id="icon-activities"></i>
    </h3>
    <p class="text-sm opacity-75">Post-competition events & games</p>
  </button>
  <button onclick="toggleRoleCard('teardown')" class="group rounded-xl overflow-hidden text-black shadow-lg transition-all hover:-translate-y-1 cursor-pointer p-6 flex flex-col gap-2 text-left" style="background-color: #7badc4;">
    <h3 class="font-bold text-lg flex items-center gap-2">
      <span>Teardown</span>
      <i class="bi bi-chevron-right text-sm transition-transform" id="icon-teardown"></i>
    </h3>
    <p class="text-sm opacity-75">End-of-day cleanup & wrap-up</p>
  </button>
  <div></div>
</div>

<div id="role-proctors" class="hidden prose my-4 border border-gray-200 rounded-xl p-6">
<h3 class="mt-0">Proctors</h3>
<p>You are responsible for monitoring contestants, reading out exam instructions, responding to requests for problems, and answering any other student questions in the same room of 20–40 contestants across multiple rounds.</p>
<p>You will be given a box containing all testing papers and materials needed for your first round, along with a proctor script. In the proctor script, you will find instructions for running each round.</p>
<p>In case of a campus-wide / building emergency, you will be responsible for your students! We'll give instructions on Discord if something like this happens (see the Emergency Procedures tab).</p>
<h4>Frequently Asked Questions</h4>
<p>Here are some questions students and coaches/parents might ask you:</p>
<p><strong>1. (Student) What is our Student ID/Team ID?</strong></p>
<p>All students should have a sticker with their name and a unique alpha-numerical ID on it. Their Student ID is the full thing, a team's Team ID is the Student ID with the leading letter removed (i.e., just a team number).</p>
<p><strong>2. (Student) What room do I go to?</strong></p>
<p>All students have the room they are assigned to printed on the Student ID sticker they were given during check-in. If they do not have a sticker, direct the student to the Info Desk at Sather Road between Dwinelle and Wheeler.</p>
<p><strong>3. (Parent/Coach) Where can I go to wait for/pick up my child?</strong></p>
<p>Morning rounds end at 12:00 PM. Afternoon rounds end at 3:30 PM, activities run from 3:30 – 5:00 PM, and awards are from 5:00 – 6:00 PM, after which the tournament concludes.</p>
<p>They can head to the Info Desk at Sather Road between Dwinelle and Wheeler for more information about the Parent/Coach Lounge and Parent Activities. Coaches can pick up lunch for teams between 11:30 AM – 12:15 PM at Dwinelle Plaza.</p>
<p><em>For proctoring-related questions, see the Proctor Script.</em></p>
</div>

<div id="role-graders" class="hidden prose my-4 border border-gray-200 rounded-xl p-6">
<h3 class="mt-0">Graders</h3>
<p>The Puzzle Round will be graded on paper in <strong>Dwinelle 205/209</strong>.</p>
<p>The other tests will be graded using a platform called <strong>Atomic Grader</strong>. The links to grade these tests will be posted on Discord. Since these tests have objective answers, there is no such training to check them, but you should read the instructions on Discord.</p>
<p>You can be a grader for other tests regardless of your role.</p>
</div>

<div id="role-runners" class="hidden prose my-4 border border-gray-200 rounded-xl p-6">
<h3 class="mt-0">Runners</h3>
<p>Runners work alongside Proctor Managers, Satellite Managers, and the Dispatcher, assisting in transportation of test materials and other items between rooms or substitution for proctors.</p>
<p>When coming for your shift, either in the morning or afternoon, report to <strong>Dwinelle 215</strong> where you will be assigned a room to report to for the rest of your shift. You will help the Proctor Managers, Satellite Manager, or Dispatcher in the room.</p>
</div>

<div id="role-activities" class="hidden prose my-4 border border-gray-200 rounded-xl p-6">
<h3 class="mt-0">Activities</h3>
<p>We will run the following activities starting at <strong>3:30 PM</strong> and will need volunteers to help with them. Look out for a Discord announcement.</p>
<p><strong>Estimathon (DWIN 155)</strong> — Got wit and strategy? Come to our Estimathon®, a contest combining trivia, strategic planning, and sharp mathematical thinking. Teams of up to 3 will race against the clock to tackle a challenging set of 13 Fermi-style problems, testing their ability to think fast and outsmart the competition.</p>
<p><strong>Mathematician Mash (DWIN 145)</strong> — Test your math intuition in this fast-paced game inspired by the classic game show Family Feud! Teams will try to guess the most popular answers to math-themed questions.</p>
<p><strong>Plank Countdown (DWIN 182, 183, 187, 189)</strong> — Miss the excitement of the MATHCOUNTS® Countdown Round? Want to show off mental math in a countdown match… while planking? Come join us for our Plank Countdown tournament!</p>
<p><strong>Float Your Boat: The Archimedes Challenge (DWIN 105, 106, 109)</strong> — Can you use the principle of buoyancy to keep heavy boats afloat? Come learn from the Society of Physical Sciences and experiment with the physics that keeps everything from toy rafts to cargo ships above water.</p>
<p><strong>Time Mix-up Puzzle Hunt</strong> — A puzzle hunt activity for students.</p>
<p><strong>Origami Dragon</strong> — Learn to fold an origami dragon with Cal Origami.</p>
<p><strong>Games Lounge</strong> — A chill space for board games and relaxation.</p>
</div>

<div id="role-teardown" class="hidden prose my-4 border border-gray-200 rounded-xl p-6">
<h3 class="mt-0">Teardown</h3>
<p>After Awards (~6:30 PM), we need help tearing down the event. This includes:</p>
<ul>
<li>Clearing all testing rooms of leftover materials, scratch paper, and signage</li>
<li>Returning supplies (boxes, markers, tape, etc.) to Dwinelle 211</li>
<li>Taking down directional signs around campus</li>
<li>Helping break down the Info Desk and any activity stations</li>
</ul>
<p>Please check <strong>#vol-announcements</strong> on Discord for specific teardown assignments and meeting points.</p>
</div>

</div>
<div id="tab-schedule" class="tab-panel hidden">

<div class="prose">
<p>The internal schedule is the one we follow, and the external schedule is advertised to students. Please monitor Discord or <a href="https://live.berkeley.mt">live.berkeley.mt</a> for announcements.</p>
</div>

| Event | Internal | External |
| --- | --- | --- |
| Check-in | 7:30 – 9:00 AM | 7:45 – 9:00 AM |
| Puzzle Round | 9:15 – 10:30 AM | 9:00 AM – 12:00 PM |
| Individual Round | 10:45 – 11:45 AM | |
| Lunch | 12:00 – 1:15 PM | 12:00 – 1:15 PM |
| Team Round | 1:30 – 2:30 PM | 1:15 – 3:30 PM |
| Relay Round | 2:40 – 3:20 PM | |
| Activities | 3:30 – 4:45 PM | 3:30 – 5:00 PM |
| Awards | 5:00 – 6:30 PM | 5:00 – 6:00 PM |

</div>
<div id="tab-disqualifications" class="tab-panel hidden">

<div class="prose mb-6">
<p><strong>People with DQ Power</strong> (in priority order of who should be physically sent out first if available):</p>
<ul>
<li>Crisis Managers</li>
<li>Proctor Managers</li>
<li>Satellite Managers</li>
<li>Dispatcher</li>
</ul>
</div>

<details class="group border border-gray-200 rounded-xl overflow-hidden my-2" open>
<summary class="cursor-pointer select-none px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors font-medium flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden">
<i class="bi bi-chevron-right text-sm transition-transform group-open:rotate-90"></i>
For Proctors
</summary>
<div class="px-4 py-3 prose">
<ol>
<li>If a contestant's behavior falls under <strong>Immediate DQs</strong>, proctors should inform Proctor Managers in their building Discord channel.
<ul>
<li>Immediate DQs for the following:
<ul>
<li>Cheating (looking at another student's paper, phone use, etc.)</li>
<li>Using slurs</li>
<li>Causing physical harm to others</li>
</ul>
</li>
</ul>
</li>
<li>If the contestant's behavior is <strong>not</strong> under Immediate DQs, proctors in rooms should give <strong>1 warning</strong> (2nd warning is a DQ) for the following:
<ul>
<li>Rowdy or disruptive behavior across teams or that disrupts entire room from testing
<ul><li>Includes: students that are talking to each other loudly/disturbing others around them while not aiming to</li></ul>
</li>
<li>Eating paper or throwing paper</li>
<li>Entering other teams' space (e.g., crawling on the floor)</li>
</ul>
</li>
<li>If you're unsure if behavior warrants a warning, <strong>send a message in your building's proctor channel, NOT #warnings-dqs</strong>. A proctor manager, satellite manager, or crisis manager will respond and let you know.</li>
<li>For warnings, please go to the person and/or team directly, <strong>do not announce this from the desk in the front</strong> as it might disturb other students' testing:
<ul>
<li>First warning:
<div class="not-prose my-2 ml-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-lg italic">"Please stop with [insert behavior], you are disrupting the testing environment for other teams. This is your first warning. If you need to be warned again, you/your team will be disqualified from the tournament and your/your team's test scores will be invalidated for the whole tournament."</div>
</li>
<li>Send the following into the thread (<strong>CRUCIAL</strong>):</li>
</ul>
</li>
</ol>
<div class="not-prose my-3 ml-8">
  <div class="flex items-center justify-between bg-gray-100 border border-gray-200 rounded-t-lg px-4 py-2">
    <span class="font-medium text-sm">Warning Template</span>
    <button onclick="navigator.clipboard.writeText(document.getElementById('copyable-warning').innerText).then(() => { this.innerHTML = '<i class=\'bi bi-check-lg text-green-600\'></i> Copied!'; setTimeout(() => { this.innerHTML = '<i class=\'bi bi-clipboard\'></i> Copy'; }, 2000); });" class="inline-flex items-center gap-1.5 text-sm px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"><i class="bi bi-clipboard"></i> Copy</button>
  </div>
  <pre id="copyable-warning" class="bg-white border border-t-0 border-gray-200 rounded-b-lg px-4 py-3 text-sm whitespace-pre-wrap font-mono">Building + Room #:
Student ID(s):
Team ID(s):
Reason for Warning:</pre>
</div>
<ol start="5">
<li>If the behavior continues after the first warning and is still ruining the test environment for other students, proctors should inform Proctor Managers via the Discord channel for their building.</li>
</ol>
</div>
</details>

<details class="group border border-gray-200 rounded-xl overflow-hidden my-2">
<summary class="cursor-pointer select-none px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors font-medium flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden">
<i class="bi bi-chevron-right text-sm transition-transform group-open:rotate-90"></i>
For Crisis Managers, Proctor Managers, Satellite Managers, Dispatcher
</summary>
<div class="px-4 py-3 prose">
<ol start="6">
<li>All behavior will be reported by proctors in their building channels.</li>
<li>Proctor Managers should immediately alert Satellite Managers, who should then escalate this issue to a Dispatcher. The Dispatcher will then dispatch a Crisis Manager.
<ul>
<li>There might be a Crisis Manager in the Satellite Operations room, be listening on-call, or so they may dispatch themselves.</li>
<li>If the original "chain of command" is cut short, the important thing is that the DQ Info Text is sent in the Discord thread so all parties learn about the DQ.</li>
</ul>
</li>
<li>Crisis Managers will be sent to the room (either from reading the Discord channel or being deployed by the Dispatcher).
<ul>
<li>Prior to going to the room, the Crisis Managers or Satellite Managers should get the student's coach's contact information.</li>
</ul>
</li>
<li>If the warning/DQ is for <strong>cheating</strong>:
<ul>
<li>Go to the room, speak with the proctor about what happened.</li>
<li><strong>Do NOT</strong> talk to the student(s), inform them of their disqualification, or bring them to Info Desk.</li>
</ul>
</li>
<li>If the warning/DQ falls under <strong>slurs, physical harm, or disruptive behavior</strong>:
<ul>
<li>Go up to the desks of the contestant/team that needs to be DQed:
<div class="not-prose my-2 ml-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-lg italic">"You/your team are now disqualified from the tournament and your test scores will be invalidated. Please hand over your test(s) and quietly pack up your things and come with me. Your coach will be contacted."</div>
</li>
<li>Collect their tests and hand them to the proctor. You will be bringing them to the Info Desk. Their coach will be contacted by the Satellite Managers to pick up their students here.</li>
</ul>
</li>
<li>Send the following into the thread (<strong>CRUCIAL</strong>):</li>
</ol>
<div class="not-prose my-3 ml-8">
  <div class="flex items-center justify-between bg-gray-100 border border-gray-200 rounded-t-lg px-4 py-2">
    <span class="font-medium text-sm">DQ Template</span>
    <button onclick="navigator.clipboard.writeText(document.getElementById('copyable-dq').innerText).then(() => { this.innerHTML = '<i class=\'bi bi-check-lg text-green-600\'></i> Copied!'; setTimeout(() => { this.innerHTML = '<i class=\'bi bi-clipboard\'></i> Copy'; }, 2000); });" class="inline-flex items-center gap-1.5 text-sm px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"><i class="bi bi-clipboard"></i> Copy</button>
  </div>
  <pre id="copyable-dq" class="bg-white border border-t-0 border-gray-200 rounded-b-lg px-4 py-3 text-sm whitespace-pre-wrap font-mono">Building + Room #:
Student ID(s):
Team ID:
Coach Contact Info:
Reason for DQ:
Person DQing:</pre>
</div>
<ol start="12">
<li>After all testing concludes, an email will be sent out to the coaches of all DQed teams.</li>
</ol>
</div>
</details>

<details class="group border border-gray-200 rounded-xl overflow-hidden my-2">
<summary class="cursor-pointer select-none px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors font-medium flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden">
<i class="bi bi-chevron-right text-sm transition-transform group-open:rotate-90"></i>
For Scanning Room
</summary>
<div class="px-4 py-3 prose">
<table>
<thead><tr><th>DQ Reason</th><th>Includes</th><th>Score Consequence</th></tr></thead>
<tbody>
<tr><td><strong>Cheating</strong></td><td>Using a phone, collaborating on individual rounds, looking at another student's paper</td><td>Student will receive 0</td></tr>
<tr><td><strong>Physical Harm</strong></td><td>Punching, biting, etc.</td><td>Student will be deleted from team</td></tr>
<tr><td><strong>Disruption</strong></td><td>Rowdy, disruptive behavior, eating paper, throwing paper, entering or crawling into other teams' space</td><td>Student(s) will be deleted from team</td></tr>
</tbody>
</table>
</div>
</details>

</div>
<div id="tab-emergency" class="tab-panel hidden">

<p class="prose mb-4">All proctors are responsible for their room of students in case of an emergency. We'll give instructions on Discord if something like this happens.</p>

<details class="group border border-gray-200 rounded-xl overflow-hidden my-2" open>
<summary class="cursor-pointer select-none px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors font-medium flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden">
<i class="bi bi-chevron-right text-sm transition-transform group-open:rotate-90"></i>
Fire
</summary>
<div class="px-4 py-3 prose">
<ul>
<li>Pull the fire alarm.</li>
<li>Proctors need to guide students to a designated meeting point.
<ul>
<li><strong>VLSB and Wheeler</strong> meet at <strong>Memorial Glade</strong>. If access is denied, go to Lower Sproul.</li>
<li><strong>Dwinelle and Pauley</strong> meet at <strong>Lower Sproul</strong>. If access is denied, go to Memorial Glade.</li>
</ul>
</li>
<li>Proctors, as soon as you reach a safe point, do a head count to ensure all your students are present. Once you've verified the number of students present, let the nearest Proctor Manager know, alongside your room number. Immediately notify Proctor Managers of any missing students.</li>
<li>Runners and graders, please evacuate to your respective locations. Stay in contact with your respective building's Satellite Manager.</li>
</ul>
</div>
</details>

<details class="group border border-gray-200 rounded-xl overflow-hidden my-2">
<summary class="cursor-pointer select-none px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors font-medium flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden">
<i class="bi bi-chevron-right text-sm transition-transform group-open:rotate-90"></i>
Earthquake
</summary>
<div class="px-4 py-3 prose">
<ul>
<li>Instruct your students to <strong>take cover under desks</strong>.</li>
<li>Proctors are responsible for students. If the building alarm goes off, or if the Satellite Manager or Dispatcher tells proctors to evacuate, proctors should guide students to a designated meeting point.
<ul>
<li><strong>VLSB and Wheeler</strong> meet at <strong>Memorial Glade</strong>. If access is denied, go to Lower Sproul.</li>
<li><strong>Dwinelle and Pauley</strong> meet at <strong>Lower Sproul</strong>. If access is denied, go to Memorial Glade.</li>
</ul>
</li>
<li>Proctors, as soon as you are safe, do a head count to ensure all your students are present. Once you've verified the number of students present, let the nearest Proctor Manager know, alongside your room number. Immediately notify Proctor Managers of any missing students.</li>
<li>Runners and graders, please take cover under a desk. Stay in contact with your respective building's Satellite Manager. If the building alarm goes off, or if the Satellite Manager or Dispatcher tells your building to evacuate, please evacuate your location.</li>
</ul>
</div>
</details>

<details class="group border border-gray-200 rounded-xl overflow-hidden my-2">
<summary class="cursor-pointer select-none px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors font-medium flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden">
<i class="bi bi-chevron-right text-sm transition-transform group-open:rotate-90"></i>
Active Shooter
</summary>
<div class="px-4 py-3 prose">
<ul>
<li><strong>Lock the doors</strong> and close the blinds/windows. Turn the lights off. Barricade the doors. Ensure your students' phones are <strong>OFF and SILENT</strong>, and that yours is <strong>SILENT</strong>. Ensure everyone is out of possible line of sight from the shooter. Use your best judgement.</li>
<li>If safe, call <strong>UCPD/911</strong>.</li>
<li>If a student is missing, notify a Proctor Manager <strong>IMMEDIATELY</strong>.</li>
</ul>
</div>
</details>

<details class="group border border-gray-200 rounded-xl overflow-hidden my-2">
<summary class="cursor-pointer select-none px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors font-medium flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden">
<i class="bi bi-chevron-right text-sm transition-transform group-open:rotate-90"></i>
Discord / Power / Internet Outage
</summary>
<div class="px-4 py-3 prose">
<ul>
<li>Continue testing and wait for in-person contact from BmMT staff.</li>
</ul>
</div>
</details>

<details class="group border border-gray-200 rounded-xl overflow-hidden my-2">
<summary class="cursor-pointer select-none px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors font-medium flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden">
<i class="bi bi-chevron-right text-sm transition-transform group-open:rotate-90"></i>
Medical Emergency
</summary>
<div class="px-4 py-3 prose">
<ul>
<li>Call <strong>911</strong> and inform a Proctor Manager with your location and severity of the emergency.</li>
</ul>
</div>
</details>

<details class="group border border-gray-200 rounded-xl overflow-hidden my-2">
<summary class="cursor-pointer select-none px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors font-medium flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden">
<i class="bi bi-chevron-right text-sm transition-transform group-open:rotate-90"></i>
Missing Participant
</summary>
<div class="px-4 py-3 prose">
<ul>
<li>Notify the <strong>Dispatcher</strong> immediately.</li>
</ul>
</div>
</details>

</div>
<div id="tab-directory" class="tab-panel hidden">
<p class="text-gray-500 italic">Directory information coming soon.</p>
</div>

<script>
function switchTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.add('hidden'); });
  document.querySelectorAll('.tab-btn').forEach(function(b) {
    b.classList.remove('font-semibold', 'text-black');
    b.classList.add('text-gray-500');
  });
  document.getElementById('tab-' + tabId).classList.remove('hidden');
  var btn = document.getElementById('tab-btn-' + tabId);
  btn.classList.add('font-semibold', 'text-black');
  btn.classList.remove('text-gray-500');
}
function toggleRoleCard(role) {
  var panel = document.getElementById('role-' + role);
  var icon = document.getElementById('icon-' + role);
  var allPanels = ['proctors', 'graders', 'runners', 'activities', 'teardown'];
  allPanels.forEach(function(r) {
    if (r !== role) {
      document.getElementById('role-' + r).classList.add('hidden');
      document.getElementById('icon-' + r).style.transform = '';
    }
  });
  if (panel.classList.contains('hidden')) {
    panel.classList.remove('hidden');
    icon.style.transform = 'rotate(90deg)';
  } else {
    panel.classList.add('hidden');
    icon.style.transform = '';
  }
}
</script>
