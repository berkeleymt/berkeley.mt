+++
title = "Proctors — BmMT 2026 Volunteer Guide"
date = 2026-04-12
path = "events/bmmt-2026/volunteer-guide/proctors"
template = "standalone.html"
+++

<a href="/events/bmmt-2026/volunteer-guide/" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black no-underline mb-4">&larr; Back to Volunteer Guide</a>

<div class="not-prose grid grid-cols-3 gap-4 my-6">
  <button onclick="toggleScript('morning')" class="group rounded-xl overflow-hidden text-black shadow-lg transition-all hover:-translate-y-1 cursor-pointer p-6 flex flex-col gap-2 text-left" style="background-color: #c5e0d8;">
    <h3 class="font-bold text-lg flex items-center gap-2">
      <span>Morning Script</span>
      <i class="bi bi-chevron-down text-sm transition-transform" id="icon-morning"></i>
    </h3>
    <p class="text-sm opacity-75">Puzzle Round & Individual Round</p>
  </button>
  <button onclick="toggleScript('afternoon')" class="group rounded-xl overflow-hidden text-black shadow-lg transition-all hover:-translate-y-1 cursor-pointer p-6 flex flex-col gap-2 text-left" style="background-color: #8ec6d6;">
    <h3 class="font-bold text-lg flex items-center gap-2">
      <span>Afternoon Script</span>
      <i class="bi bi-chevron-down text-sm transition-transform" id="icon-afternoon"></i>
    </h3>
    <p class="text-sm opacity-75">Team Round & Relay Round</p>
  </button>
  <button onclick="toggleScript('pauley')" class="group rounded-xl overflow-hidden text-white shadow-lg transition-all hover:-translate-y-1 cursor-pointer p-6 flex flex-col gap-2 text-left" style="background-color: #2d5a73;">
    <h3 class="font-bold text-lg flex items-center gap-2">
      <span>Pauley Script</span>
      <i class="bi bi-chevron-down text-sm transition-transform" id="icon-pauley"></i>
    </h3>
    <p class="text-sm opacity-90">Pauley Ballroom — all rounds</p>
  </button>
</div>

<!-- ==================== MORNING SCRIPT ==================== -->
<div id="panel-morning" class="hidden prose max-w-none my-4 border border-gray-200 rounded-xl p-6">
<h2 class="mt-0">Morning Proctor Script</h2>

<p>Hello, and welcome to BmMT 2026! As a proctor, you are responsible for monitoring contestants, reading out instructions for each exam, responding to problem clarification requests, and answering any other student questions for the same room of contestants across multiple rounds.</p>

<h3>Contacts for Questions</h3>
<p>If you’re unsure about who to ask, please contact Ty (ly49nkallo) in Dwinelle 211!</p>

<table>
<thead><tr><th>Building (Room)</th><th>Role</th><th>Person (Discord)</th></tr></thead>
<tbody>
<tr><td>Dwinelle (Dwinelle 211)</td><td>Dispatcher</td><td>Junehee (wnsgml)</td></tr>
<tr><td></td><td>Volunteer Manager</td><td>Ty (ly49nkallo)</td></tr>
<tr><td></td><td>Satellite Manager</td><td>Naomi (naomilojo)</td></tr>
<tr><td></td><td>Proctor Managers</td><td>Kaden (lightning_mcqueen6107), Janak (janakbhuta)</td></tr>
<tr><td>Wheeler (Wheeler 106)</td><td>Satellite Manager</td><td>Clara (yeetingmeselfintosun)</td></tr>
<tr><td></td><td>Proctor Managers</td><td>Hannah (hannah_y7), Eyun (eyungyo)</td></tr>
<tr><td>VLSB (VLSB 2050)</td><td>Satellite Manager</td><td>Nathan (nathanhatesphysics)</td></tr>
<tr><td></td><td>Proctor Manager</td><td>Tej (tejnadkarni)</td></tr>
<tr><td></td><td>Crisis Managers</td><td>Viraj (iamviraj05), Jeslyn (breadt), Aedan (crispsahoy), Benji (zinn024), Timothe (asriel2137)</td></tr>
</tbody>
</table>

<h3>Swire</h3>
<p>Swire is a website we will use to coordinate test times and make problem clarifications/general announcements. Please keep this window open the entire time, and project it for your students. We’ll help you log in to Swire when you show up at the start of your shift!</p>
<p>To login:</p>
<ol>
<li>Go to <a href="https://swire.berkeley.mt/">https://swire.berkeley.mt/</a></li>
<li>Navigate to the Proctor login
<ul>
<li>Room Name: based on room (“dwinXXX”, “whlrXXX”, “vlsbXXXX”)</li>
<li>Password: <strong>benjimt26</strong></li>
</ul>
</li>
<li>Click on the Fullscreen button</li>
</ol>
<p>If you are unable to project for any reason, please write every announcement/clarification made on Swire on the board in your room.</p>

<h3>After arriving at your assigned room</h3>
<p>We will have handed you a box containing all papers and materials needed for your first round. In this proctor script, you will find instructions for how each round should be run.</p>

<h3>Proctor FAQs</h3>

<p><strong>What if I need to leave the room? (restroom, etc.)</strong></p>
<p>Ask in your appropriate proctor channel (#dwinelle-proctors, #wheeler-proctors, or #vlsb-proctors) for someone to cover for you. Please don’t leave the room until another proctor or runner is there!</p>

<p><strong>What if I need something delivered? (e.g. water, scrap paper, etc.)</strong></p>
<p>Ask in your proctor channel, and a runner will come deliver it to you!</p>

<p><strong>[IMPORTANT] What if a student asks me a question not in the Student FAQs?</strong></p>
<p>Please do not answer the student’s question. Tell them:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“I will ask the test organizers. If I get a response, I will let you know.”</div>
<ul>
<li>If the question is <strong>NOT</strong> related to the exam content:
<ul><li>Report the question exactly as the student asked in the proctor channel (#dwinelle-proctors, #wheeler-proctors, or #vlsb-proctors). Relay the response you receive on Discord to the student if necessary.</li></ul>
</li>
<li>If the question <strong>is</strong> related to exam content:
<ul>
<li>Report the question exactly as the student asked in the “Puzzle Test Clarifications” or “Individual Test Clarifications” thread (under #problem-clarifications channel).</li>
<li>If the decision is “no clarification”, do not tell them anything.</li>
<li>If clarifications are made, you will see the clarifications updated in Swire. If you are not projecting, please write clarifications exactly as it appears in Swire on the white/blackboard. Please notify all students whether or not you are projecting Swire, announcing:
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“A clarification has been made. Please check the board for the clarification.”</div>
</li>
</ul>
</li>
</ul>

<p><strong>What if a parent/coach asks me where they can go during testing?</strong></p>
<p>Tell them morning rounds end at 12:00 PM, and they can head to the info desk inside Dwinelle Hall for more information about the Parent/Coach Lounge and Parent Activities. Coaches can pick up lunch for teams between 11:30 AM – 12:15 PM in Kerr Lobby.</p>

<h3>Student FAQs</h3>
<p>These are questions students might ask you. For questions other than these, please ask on Discord before answering students!</p>

<p><strong>Can we move desks together?</strong> — Only during team-based rounds.</p>
<p><strong>Can I go to the restroom?</strong> — Yes, if there’s not someone already going to the restroom. Please enter the student’s ID number into the restroom break field on Swire, and then click Start. Once the student has come back from the restroom, click on End. As a proctor, please be aware of where the nearest toilet is.</p>
<p><strong>Can we leave the room (during breaks)?</strong> — Yes, but only to go to the restroom.</p>
<p><strong>Can we eat during the test?</strong> — No, unless you have accommodations.</p>
<p><strong>Can we use a protractor/ruler?</strong> — Yes, but we won’t provide one.</p>
<p><strong>How do we express (insert mathematical constant here)?</strong> — Use the symbol for precision (π rather than 3.14, etc.).</p>
<p><strong>Do we have to simplify fractions?</strong> — Yes.</p>
<p><strong>Do we have to rationalize the denominator?</strong> — No.</p>
<p><strong>What is our Student ID/Team ID?</strong> — All students should have a sticker with their name and a unique alpha-numerical ID on it. The Student ID is the full ID (e.g. 001A), and the Team ID is the numerical part of the ID (e.g. 001).</p>

<hr>

<h3>Puzzle Round Script</h3>
<p><strong>Start Time:</strong> ~9:15 AM — begin only after the official start announcement on Discord (#proctor-announcements).</p>
<p><strong>Length:</strong> 15 minutes for reading the rules + 60 minutes for writing/answering questions</p>
<p><strong>Team-based:</strong> Yes. They can move tables and chairs together.</p>
<p><strong>Materials:</strong> Only pen, paper, pencil, erasers. If anyone asks, students can use a ruler, protractor, or compass, though it will not be needed.</p>
<p>You should have a box labeled Puzzle Round containing envelopes, Puzzle Round Rules, Puzzle Round Problems, scratch paper, and other miscellaneous materials. Separate all materials into separate piles.</p>
<p>If you are not projecting Swire for any reason, please periodically update times on the board, e.g. “60 minutes left”. Also, be sure to watch for clarifications, and write them on the board as soon as they are announced (and tell the students too).</p>

<h4>Procedures</h4>
<p><em>For the instructions below, please only read the text that is boxed and in italics. Everything else is instructions/information for you. Make sure you understand all the instructions.</em></p>
<p>A Proctor Manager will set a 15 minute timer, which you should see on Swire. Ensure this timer is set, but do not start it. If you cannot see the timer, please message your Proctor Managers.</p>
<p>When students come in, have them leave their bags at the front of the room. They are allowed to bring their team sticker sheet, pens, pencils, erasers, rulers, protractors, compasses, and water to their seats with them (pencil cases are okay).</p>
<p>Eating is not allowed. However, if the student claims that they have an accommodation, believe them without further questioning.</p>
<div class="not-prose my-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm font-semibold text-red-800">⚠️ Do NOT continue past this point until instructed to do so. Wait until you receive a Discord ping in #proctor-announcements to begin the round.</div>

<p>Read only the text in the box. When instructed to begin, get the students’ attention, then announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“As a reminder, any attempt to cheat on the tests is not allowed. If you are caught trying to cheat, you and your team will be disqualified, and you will be banned from future BMT-affiliated events.<br><br>The Puzzle Round is a team based round. You will have a 15 minute reading period to read the rules of the puzzle and strategize, and then 60 minutes to work. If you have any questions about the round, please ask them now.<br><br>If you have questions during the test, please raise your hand and I will come to you. If this is a question we can answer without being unfair, it will be shown on the screen for everyone to see. Otherwise, please assume that the question can be solved with the test packet you have.”</div>
<p>Wait for and answer any questions. If there are any questions you do not have an answer for, please ask in the appropriate Discord channel (#dwinelle-proctors, #wheeler-proctors, or #vlsb-proctors).</p>

<p>Next, pass out the Puzzle Round Rules (and nothing else), one copy per student. Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“The 15 minute reading period will now begin. You may choose to write on the rules. When there are 5 minutes left, I will pass out the test booklets and envelopes. You are not allowed to open the test booklet or envelope until the work period begins. If you cannot read something in the rules because of a misprint and would like another copy, please let me know.”</div>
<p>Click Start on Swire to start the 15 minute timer. While the timer is running, pass out scratch paper (~one sheet/person). If a student asks for a new copy of the rules because of a misprint, give them one. If you don’t have extra copies, message the proctor managers.</p>

<p>When there are <strong>5 minutes left</strong> in the reading period, announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“There are five minutes left in the reading period. I will now pass out the test booklets and submission envelopes. Do not open them until the working period begins.”</div>
<p>Pass out the Puzzle Problem booklet, one copy per student, with the cover sheet facing up. Pass out envelopes, one copy per team, counting and recording how many you give out. Your materials box should have a plastic sleeve on the top. Remove the paper in the sleeve and write down this number in the # Teams blank.</p>

<p>When the timer runs out (and resets to 60 minutes), announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“The reading period is now over. Please write your team ID, team name, and organization name in the designated fields at the top of your envelope. Stick the QR code sticker you were provided at check-in on the envelope cover. If you do not have a QR code sticker, write your team ID instead.”</div>
<p>Ensure a 60 minute timer has been set, but not started on your Swire page. Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“You will now have 60 minutes to work on the test. The answer sheets are inside your envelope. If your answer sheets are stapled together, feel free to separate them. When your time is up, please drop your pens and raise your test paper and answer sheets up. You can ask for more scratch paper at any point during the test and I will hand some to you. You may begin.”</div>
<p>Click Start on Swire to start the 60 minute timer. Make announcements when there are <strong>30 minutes, 15 minutes, 5 minutes, and 1 minute</strong> remaining in the test.</p>
<p>If you cannot use the projector, write the time remaining on the board. Also, be sure to watch for clarifications on Swire, and write them on the board as soon as they are announced (and tell the students too).</p>
<p>While students are taking the test, put any extra envelopes back into the box that you emptied, then place any extra rules and tests on top of the envelopes.</p>
<p>If any student needs to leave the room for any reason, enter the student’s ID number into the restroom field on Swire, and then click Start. Once the student has come back from the restroom, click End.</p>

<p>When timer runs out, please read the following:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“The Puzzle round is now over. You are not allowed to continue working. Make sure to put your answer sheets in the envelope in order. Make sure your team ID, team name, and organization name are written at the top of your envelope. If you received a QR code sticker at check-in, make sure it is on the sheet on the envelope. If not, make sure your team ID is written.<br><br>I will now come around to collect your envelopes, rules, test booklets, and scratch paper. Please hold up your envelopes first. Do not leave yet.”</div>
<p>Collect the envelopes from the students, which should contain only their answer sheets. Count the number of envelopes you received. If this matches the number in the # Teams blank you recorded earlier, write down that number in the # Envelopes blank.</p>
<p>If the number does not match, recount the envelopes. If it still doesn’t match, then ask the students if anyone has not submitted their envelope. If everyone has submitted and the number still doesn’t match, then message the Proctor Managers.</p>
<p><strong>Make sure the numbers match and all the envelopes are collected. Do NOT let the students leave until the numbers match.</strong></p>

<p>Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“I will now come around to collect your rules, test booklets, and scratch paper.”</div>
<p>Collect all remaining paper from the students. Make sure to collect the rules and test booklet from every student.</p>
<p>Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“This is a final reminder that you cannot have any testing-related materials with you, including scratch paper, rules, problems, or answer sheets from the Puzzle round. If you have any such materials with you, please turn them in to avoid disqualification.”</div>
<p>Make sure to collect all their scratch paper. Students are NOT allowed to take any material when they leave the classroom, only their personal belongings.</p>
<p>Once everyone has turned in any testing materials they have, announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“Remember that the next round is the Individual Round, where you will not be allowed to work in teams. Please return the tables to their original places.”</div>
<p>Once the students have moved back their desks, announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“You will now get a short break — please stay in the room unless you need to use the restroom. If you are not back when the next round starts, we will not wait for you.”</div>
<p><strong>Please make absolutely sure that no exam materials leave the room with them — this includes any scratch paper, tests, and answer sheets.</strong></p>

<p>Place the papers into three piles:</p>
<ul>
<li>All non-blank paper (exams, scratch paper, etc.) → Into the box</li>
<li>Submission envelopes → Into the box on top of the non-blank paper</li>
<li>Blank paper → Leave out, reuse for next round</li>
</ul>
<p>Do not put your Volunteer Guide or the blank paper in the box. Close the box, and a runner will come collect it. Keep the blank paper so it can be reused in subsequent rounds.</p>

<div class="not-prose my-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm font-semibold text-red-800">⚠️ Do NOT start the next round until we tell you. Note that the Individual round starts when you are pinged in #proctor-announcements.</div>

<hr>

<h3>Individual Test Script</h3>
<p><strong>Start Time:</strong> Shortly after Puzzle Round, around 10:45 — we will tell you when to start on Discord!</p>
<p><strong>Length:</strong> 60 minutes</p>
<p><strong>Team-based:</strong> No. Remember to have students move their desks back if they were moved.</p>
<p><strong>Materials:</strong> Only pen, paper, pencil, erasers. If anyone asks, students can use a ruler, protractor, or compass, though it will not be needed.</p>
<p>You should have a box labeled Individual Round containing Answer Sheets, Individual Round Booklets, scratch paper, and other miscellaneous materials. Separate these materials into separate piles.</p>

<h4>Procedures</h4>
<p>A Proctor Manager will set a 60 minute timer, which you should see on Swire. Ensure this timer is set, but do not start it. Make sure their bags are still at the front of the room.</p>

<div class="not-prose my-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm font-semibold text-red-800">⚠️ Do NOT continue past this point until instructed to do so. You will receive a Discord ping to start in #proctor-announcements.</div>

<p>When instructed to begin, get the students’ attention, then announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“As a reminder, any attempt to cheat on the tests is not allowed. If you are caught trying to cheat, you and your team will be disqualified, and you will be banned from future BMT-affiliated events.<br><br>The Individual Round is not a team-based event. You will have 60 minutes to work, including filling out your answers in the provided answer sheet. If you need to leave the room for any reason, please check with me first. When your time is up, please drop your pens and raise your test paper and answer sheets up, one in each hand. If you have any questions about the test, please ask them now.<br><br>If you have questions during the test, please raise your hand and I will come to you. If this is a question we can answer without being unfair, it will be shown on the screen for everyone to see. Otherwise, please assume that the question can be solved with the test packet you have.”</div>
<p>Wait for and answer any questions.</p>

<p>Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“I will now pass out the tests and answer sheets. Do not open the test booklets until I tell you to do so.”</div>
<p>Pass out Individual Answer Sheets and Individual Round packets with the cover sheet facing up, one copy per student. Pass out scratch paper (~one sheet per person).</p>

<p>After materials have been distributed, announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“Please write your ID, that is team number and letter, name, and team name at the top of your answer sheet.”</div>

<p>Ensure a 60 minute timer has been set, but not started on your Swire page. Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“You will now have 60 minutes to work on the test. When your time is up, please drop your pens and raise your test paper and answer sheets up. You can ask for more scratch paper at any point during the test and I will hand some to you. You may begin.”</div>
<p>Click start on Swire to start the 60 minute timer. Make announcements when there are <strong>30 minutes, 15 minutes, 5 minutes, and 1 minute</strong> remaining in the test.</p>
<p>After the timer starts, please do a count of your students. Write down this number in the # Students blank.</p>
<p>While students are taking the test, place any extra answer sheets and test booklets into the box.</p>
<p>If any student needs to leave the room, enter the student’s ID number into the restroom field on Swire, click Start. Once the student has come back, click End.</p>

<p>When the timer runs out, please read the following:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“The Individual round is now over. You are not allowed to continue working. Make sure your answer sheets are fully filled out with your ID (team number + letter), name, and team name.<br><br>I will now collect your answer sheets, test booklets, and scratch paper. Please hold up your answer sheets in the air first. Do not leave yet.”</div>
<p>Collect the answer sheets. Count and verify against # Students blank. Put answer sheets into the provided envelope.</p>
<p><strong>Make sure the numbers match and all answer sheets are collected. Do NOT let students leave until the numbers match.</strong></p>

<p>Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“I will now come around to collect your test booklets and scratch paper.”</div>
<p>Collect all remaining paper from the students.</p>
<p>Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“This is a final reminder that you cannot have any testing-related materials with you, including scratch paper, rules, problems, or answer sheets from the Individual round. If you have any such materials with you, please turn them in to avoid disqualification.”</div>

<p>Once everyone has turned in testing materials, announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“We will clean up the room now. Pick up and throw away any remaining paper and trash on the floor.”</div>
<p>Once the room looks clean, announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“Problem Disputes for the Puzzle and Individual rounds will be held in Dwinelle 234. Any form of photography or recording answers is strictly prohibited. Disputes will occur until 12:30.<br><br>Remember to come back at 1:15 for the Team Round. Some of our sponsors are giving all participants free branded merchandise in the MLK Student Union in Kerr Lobby. You are now free to go.”</div>
<p><strong>Please make absolutely sure that no exam materials leave the room with them.</strong></p>
<p>Make three piles:</p>
<ul>
<li>All non-blank paper (exams, scratch paper, etc.) → into the box</li>
<li>Answer sheets → put in envelope, place on top of non-blank paper</li>
<li>Blank paper → do not put it in the box! Collect and bring to ops room</li>
</ul>
<p>Wait for a runner to collect your box before leaving. While waiting, help clean up: projector off, desks/chairs reset, board clean, floor clean.</p>
<p>Please go to your respective ops room (Dwinelle 211, Wheeler 106, or VLSB 2050). If you are volunteering in the afternoon, you will eat lunch there; otherwise, go back to Dwinelle.</p>
<p><strong>Thank you again so much for your help!</strong></p>
</div>

<!-- ==================== AFTERNOON SCRIPT ==================== -->
<div id="panel-afternoon" class="hidden prose max-w-none my-4 border border-gray-200 rounded-xl p-6">
<h2 class="mt-0">Afternoon Proctor Script</h2>

<p>Welcome back! As a proctor, you are responsible for monitoring contestants, reading out instructions for each exam, responding to problem clarification requests, and answering any other student questions for the same room of contestants across multiple rounds.</p>

<h3>Contacts for Questions</h3>
<p>If you’re unsure about who to ask, please contact Ty (ly49nkallo) in Dwinelle 211!</p>

<table>
<thead><tr><th>Building (Room)</th><th>Role</th><th>Person (Discord)</th></tr></thead>
<tbody>
<tr><td>Dwinelle (Dwinelle 211)</td><td>Dispatcher</td><td>Junehee (wnsgml)</td></tr>
<tr><td></td><td>Volunteer Manager</td><td>Ty (ly49nkallo)</td></tr>
<tr><td></td><td>Satellite Manager</td><td>Naomi (naomilojo)</td></tr>
<tr><td></td><td>Proctor Managers</td><td>Kaden (lightning_mcqueen6107), Janak (janakbhuta)</td></tr>
<tr><td>Wheeler (Wheeler 106)</td><td>Satellite Manager</td><td>Clara (yeetingmeselfintosun)</td></tr>
<tr><td></td><td>Proctor Managers</td><td>Hannah (hannah_y7), Eyun (eyungyo)</td></tr>
<tr><td>VLSB (VLSB 2050)</td><td>Satellite Manager</td><td>Nathan (nathanhatesphysics)</td></tr>
<tr><td></td><td>Proctor Manager</td><td>Tej (tejnadkarni)</td></tr>
<tr><td></td><td>Crisis Managers</td><td>Viraj (iamviraj05), Jeslyn (breadt), Aedan (crispsahoy), Benji (zinn024), Timothe (asriel2137)</td></tr>
</tbody>
</table>

<h3>Swire</h3>
<p>Swire is a website we will use to coordinate test times and make problem clarifications/general announcements. Please keep this window open the entire time, and project it for your students. We’ll help you log in to Swire when you show up at the start of your shift!</p>
<p>To login:</p>
<ol>
<li>Go to <a href="https://swire.berkeley.mt/">https://swire.berkeley.mt/</a></li>
<li>Navigate to the Proctor login
<ul>
<li>Room Name: based on room (“dwinXXX”, “whlrXXX”, “vlsbXXXX”)</li>
<li>Password: <strong>benjimt26</strong></li>
</ul>
</li>
<li>Click on the Fullscreen button</li>
</ol>
<p>If you are unable to project for any reason, please write every announcement/clarification made on Swire on the board in your room.</p>

<h3>After arriving at your assigned room</h3>
<p>We will have handed you a box containing all papers and materials needed for your first round. In this proctor script, you will find instructions for how each round should be run.</p>

<h3>Proctor FAQs</h3>

<p><strong>What if I need to leave the room? (restroom, etc.)</strong></p>
<p>Ask in your appropriate proctor channel (#dwinelle-proctors, #wheeler-proctors, or #vlsb-proctors) for someone to cover for you. Please don’t leave the room until another proctor or runner is there!</p>

<p><strong>What if I need something delivered? (e.g. water, scrap paper, etc.)</strong></p>
<p>Ask in your proctor channel, and a runner will come deliver it to you!</p>

<p><strong>[IMPORTANT] What if a student asks me a question not in the Student FAQs?</strong></p>
<p>Please do not answer the student’s question. Tell them:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“I will ask the test organizers. If I get a response, I will let you know.”</div>
<ul>
<li>If the question is <strong>NOT</strong> related to the exam content:
<ul><li>Report the question exactly as the student asked in the proctor channel (#dwinelle-proctors, #wheeler-proctors, or #vlsb-proctors). Relay the response you receive on Discord to the student if necessary.</li></ul>
</li>
<li>If the question <strong>is</strong> related to exam content:
<ul>
<li>Report the question exactly as the student asked in the “Team Test Clarifications” or “Relay Clarifications” thread (under #problem-clarifications channel).</li>
<li>If the decision is “no clarification”, do not tell them anything.</li>
<li>If clarifications are made, you will see the clarifications updated in Swire. If you are not projecting, please write clarifications exactly as it appears in Swire on the white/blackboard. Please notify all students whether or not you are projecting Swire, announcing:
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“A clarification has been made. Please check the board for the clarification.”</div>
</li>
</ul>
</li>
</ul>

<p><strong>What if a parent/coach asks me where they can go during testing?</strong></p>
<p>Tell them afternoon rounds end at 3:30 PM, activities run from 3:30 – 5:00 PM, and awards are from 5:00 – 6:00 PM. They can head to the info desk inside Dwinelle Hall for more information about the Parent/Coach Lounge and Parent Activities.</p>

<h3>Student FAQs</h3>
<p>These are questions students might ask you. For questions other than these, please ask on Discord before answering students!</p>

<p><strong>Can we move desks together?</strong> — Only during team-based rounds.</p>
<p><strong>Can I go to the restroom?</strong> — Yes, if there’s not someone already going to the restroom. Please enter the student’s ID number into the restroom break field on Swire, and then click Start. Once the student has come back from the restroom, click on End.</p>
<p><strong>Can we leave the room (during breaks)?</strong> — Yes, but only to go to the restroom.</p>
<p><strong>Can we eat during the test?</strong> — No, unless you have accommodations.</p>
<p><strong>Can we use a protractor/ruler?</strong> — Yes, but we won’t provide one.</p>
<p><strong>How do we express (insert mathematical constant here)?</strong> — Use the symbol for precision (π rather than 3.14, etc.).</p>
<p><strong>Do we have to simplify fractions?</strong> — Yes.</p>
<p><strong>Do we have to rationalize the denominator?</strong> — No.</p>
<p><strong>What is our Student ID/Team ID?</strong> — All students should have a sticker with their name and a unique alpha-numerical ID on it. The Student ID is the full ID (e.g. 001A), and the Team ID is the numerical part of the ID (e.g. 001).</p>

<hr>

<h3>Team Round Script</h3>
<p><strong>Start Time:</strong> ~1:15 PM — begin only after the official start announcement on Discord (#proctor-announcements).</p>
<p><strong>Length:</strong> 60 minutes</p>
<p><strong>Team-based:</strong> Yes. They can move tables and chairs together.</p>
<p><strong>Materials:</strong> Only pen, paper, pencil, erasers. If anyone asks, students can use a ruler, protractor, or compass, though it will not be needed.</p>
<p>You should have a box labeled Team Round containing Team Round Answer Sheets, Team Round Booklets, scratch paper, and other miscellaneous materials. Separate these materials into separate piles.</p>

<h4>Procedures</h4>
<p><em>For the instructions below, please only read the text that is boxed and in italics. Everything else is instructions/information for you. Make sure you understand all the instructions.</em></p>
<p>A Proctor Manager will set a 60 minute timer, which you should see on Swire. Ensure this timer is set, but do not start it.</p>
<p>When students come in, have them leave their bags at the front of the room. They are allowed to bring their team sticker sheet, pens, pencils, erasers, rulers, protractors, compasses, and water to their seats with them (pencil cases are okay).</p>
<p>Eating is not allowed. However, if the student claims that they have an accommodation, believe them without further questioning.</p>

<div class="not-prose my-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm font-semibold text-red-800">⚠️ Do NOT continue past this point until instructed to do so. Wait until you receive a Discord ping in #proctor-announcements to begin the round.</div>

<p>When instructed to begin, get the students’ attention, then announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“As a reminder, any attempt to cheat on the tests is not allowed. If you are caught trying to cheat, you and your team will be disqualified, and you will be banned from future BMT-affiliated events.<br><br>The Team Round is a team-based event. You will have 60 minutes to work as a team, including filling out your answers in the provided answer sheet. If you need to leave the room for any reason, please check with me first. When your time is up, please drop your pens and raise your test paper and answer sheets up. If you have any questions about the test, please ask them now.<br><br>If you have questions during the test, please raise your hand and I will come to you. If this is a question we can answer without being unfair, it will be shown on the screen for everyone to see. Otherwise, please assume that the question can be solved with the test packet you have.”</div>
<p>Wait for and answer any questions.</p>

<p>Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“I will now pass out the tests and answer sheets. Do not open the test booklets until I tell you to do so.”</div>
<p>Pass out Team Answer Sheets (one per team) and Team Round packets with the cover sheet facing up (one per student). Pass out scratch paper (~one sheet per person). Count the number of teams and record on the paper in the plastic sleeve (# Teams blank).</p>

<p>After materials have been distributed, announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“Please write your team ID, team name, and organization name at the top of your answer sheet. Stick the QR code sticker you were provided at check-in on the answer sheet. If you do not have a QR code sticker, write your team ID instead.”</div>

<p>Ensure a 60 minute timer has been set, but not started on your Swire page. Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“You will now have 60 minutes to work on the test. When your time is up, please drop your pens and raise your test paper and answer sheets up. You can ask for more scratch paper at any point during the test and I will hand some to you. You may begin.”</div>
<p>Click Start on Swire to start the 60 minute timer. Make announcements when there are <strong>30 minutes, 15 minutes, 5 minutes, and 1 minute</strong> remaining in the test.</p>
<p>While students are taking the test, place any extra answer sheets and test booklets into the box.</p>
<p>If any student needs to leave the room, enter the student’s ID number into the restroom field on Swire, click Start. Once the student has come back, click End.</p>

<p>When the timer runs out, please read the following:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“The Team round is now over. You are not allowed to continue working. Make sure your answer sheets are fully filled out with your team ID, team name, and organization name.<br><br>I will now collect your answer sheets, test booklets, and scratch paper. Please hold up your answer sheets in the air first. Do not leave yet.”</div>
<p>Collect the answer sheets. Count and verify against # Teams blank. Put answer sheets into the provided envelope.</p>
<p><strong>Make sure the numbers match. Do NOT let students leave until the numbers match.</strong></p>

<p>Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“I will now come around to collect your test booklets and scratch paper.”</div>
<p>Collect all remaining paper from the students.</p>
<p>Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“This is a final reminder that you cannot have any testing-related materials with you, including scratch paper, problems, or answer sheets from the Team round. If you have any such materials with you, please turn them in to avoid disqualification.<br><br>Remember that the next round is the Relay Round. Please return the tables to their original places.”</div>

<p>Once the students have moved back their desks, announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“You will now get a short break — please stay in the room unless you need to use the restroom. If you are not back when the next round starts, we will not wait for you.”</div>
<p><strong>Please make absolutely sure that no exam materials leave the room with them.</strong></p>

<p>Place the papers into three piles:</p>
<ul>
<li>All non-blank paper (exams, scratch paper, etc.) → Into the box</li>
<li>Answer sheet envelope → Into the box on top of the non-blank paper</li>
<li>Blank paper → Leave out, reuse for next round</li>
</ul>
<p>Close the box, and a runner will come collect it. Keep the blank paper for the next round.</p>

<div class="not-prose my-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm font-semibold text-red-800">⚠️ Do NOT start the next round until we tell you. Note that the Relay round starts when you are pinged in #proctor-announcements.</div>

<hr>

<h3>Relay Round Script</h3>
<p><strong>Start Time:</strong> Shortly after Team Round, around 2:45 PM — we will tell you when to start on Discord!</p>
<p><strong>Length:</strong> 3 sets of 10 minutes each (30 minutes total). There is a 2–3 min break between each set.</p>
<p><strong>Team-based:</strong> No. Individuals work on problems independently, but each student’s answer builds on the previous student’s answer within their team.</p>
<p><strong>Materials:</strong> Only pen, paper, pencil, erasers.</p>
<p>You should have a box labeled Relay Round containing Relay Problem Sets (3 sets), Relay Answer Sheets, scratch paper, and other miscellaneous materials.</p>

<h4>How the Relay Works</h4>
<p>Students sit in a line (or arranged so they can pass papers). Student 1 gets Problem 1 and works on it. When Student 1 finishes, they pass their answer to Student 2, who uses that answer to solve Problem 2 (which depends on Student 1’s answer). This continues through all team members. Each set has 4 problems for teams of 4.</p>

<h4>Procedures</h4>
<p>A Proctor Manager will set a 10 minute timer, which you should see on Swire. Ensure this timer is set, but do not start it.</p>
<p>Have students sit in a line or arrangement where they can pass papers to the next person. Each student should have their own workspace. Make sure their bags are still at the front of the room.</p>

<div class="not-prose my-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm font-semibold text-red-800">⚠️ Do NOT continue past this point until instructed to do so. You will receive a Discord ping to start in #proctor-announcements.</div>

<p>When instructed to begin, get the students’ attention, then announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“As a reminder, any attempt to cheat on the tests is not allowed. If you are caught trying to cheat, you and your team will be disqualified, and you will be banned from future BMT-affiliated events.<br><br>The Relay Round consists of 3 relay sets. In each set, students within a team are arranged in a line and given one problem each. Problems must be solved in order — each problem’s answer depends on the previous one. The first student solves their problem and passes their answer to the next student, and so on. You have 10 minutes per set. Are there any questions?”</div>
<p>Wait for and answer any questions.</p>

<p>Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“I will now hand out the answer sheets. Please fill in your team ID, team name, and organization name at the top. Stick the QR code sticker you were provided at check-in on the answer sheet.”</div>
<p>Pass out Relay Answer Sheets, one per team.</p>

<p>Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“I will now pass out the first relay set, face down. Student 1 gets Problem 1, Student 2 gets Problem 2, and so on. Do not flip the problem over until I tell you to begin.”</div>
<p>Pass out Set 1 problems face-down to each student in the correct order within each team.</p>

<p>Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“You have 10 minutes for this relay set. Student 1 will flip over their problem and begin working. When you finish, write your answer on the answer sheet, then pass the answer sheet and your problem to the next student. The next student can then flip over their problem and begin. You may begin.”</div>
<p>Click Start on Swire to start the 10 minute timer. Make announcements when there are <strong>5 minutes and 1 minute</strong> remaining.</p>

<p>When the timer runs out:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“Time is up for Set 1. Please put down your pens. I will now collect the Set 1 problems. Please hold on to your answer sheets.”</div>
<p>Collect Set 1 problems only. Students keep their answer sheets.</p>

<p>Repeat the same process for <strong>Set 2</strong> and <strong>Set 3</strong>. Between each set, give students a 2–3 minute break.</p>

<p>After Set 3 is complete, announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“The Relay Round is now over. I will now collect your answer sheets and all remaining materials. Please hold up your answer sheets. Do not leave yet.”</div>
<p>Collect the answer sheets. Count and verify against # Teams blank. Put answer sheets into the provided envelope.</p>
<p><strong>Make sure the numbers match. Do NOT let students leave until the numbers match.</strong></p>

<p>Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“I will now come around to collect any remaining problems and scratch paper.”</div>
<p>Collect all remaining paper.</p>
<p>Announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“This is a final reminder that you cannot have any testing-related materials with you. If you have any such materials, please turn them in to avoid disqualification.<br><br>We will clean up the room now. Pick up and throw away any remaining paper and trash on the floor.”</div>

<p>Once the room looks clean, announce:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“Problem Disputes for the Team and Relay rounds will be held in Dwinelle 234. Any form of photography or recording answers is strictly prohibited. Disputes will occur until 4:00.<br><br>Activities run from 3:30 – 5:00 PM, and Awards start at 5:00 PM. You are now free to go.”</div>
<p><strong>Please make absolutely sure that no exam materials leave the room with them.</strong></p>
<p>Make three piles:</p>
<ul>
<li>All non-blank paper (problems, scratch paper, etc.) → into the box</li>
<li>Answer sheets → put in envelope, place on top of non-blank paper</li>
<li>Blank paper → do not put it in the box! Collect and bring to ops room</li>
</ul>
<p>Wait for a runner to collect your box before leaving. While waiting, help clean up: projector off, desks/chairs reset, board clean, floor clean.</p>
<p>This concludes your role as a proctor! Please go to your respective ops room (Dwinelle 211, Wheeler 106, or VLSB 2050) for further instructions.</p>
<p><strong>Thank you again so much for your help!</strong></p>
</div>

<!-- ==================== PAULEY AUDITORIUM SCRIPT ==================== -->
<div id="panel-pauley" class="hidden prose max-w-none my-4 border border-gray-200 rounded-xl p-6">
<h2 class="mt-0">Pauley Ballroom Proctor Script</h2>

<p>Welcome to Pauley Ballroom! As a proctor here, your role is a bit different from classroom proctors. The Pauley Ballroom hosts a large number of students, and you will work alongside other proctors and a Head Proctor to coordinate all rounds.</p>

<h3>Contacts for Questions</h3>
<p>If you’re unsure about who to ask, please contact Crystal or Andrew K. in Pauley!</p>

<table>
<thead><tr><th>Building (Room)</th><th>Role</th><th>Person (Discord)</th></tr></thead>
<tbody>
<tr><td>Pauley Ballroom</td><td>Satellite Manager</td><td>Crystal (crystalwang1)</td></tr>
<tr><td></td><td>Proctor Manager</td><td>Andrew K. (ak24_07)</td></tr>
<tr><td></td><td>Crisis Managers</td><td>Viraj (iamviraj05), Jeslyn (breadt), Aedan (crispsahoy), Benji (zinn024), Timothe (asriel2137)</td></tr>
</tbody>
</table>

<h3>Swire</h3>
<p>Swire is a website we will use to coordinate test times and make problem clarifications/general announcements. We will project Swire on the main screen in Pauley. You don’t need to log in yourself, but please keep an eye on the projected screen for announcements and clarifications.</p>

<h3>After arriving at Pauley</h3>
<p>You will be assigned a section of the room to monitor. The Head Proctor will give you instructions on your specific section and responsibilities. You will receive materials for your section from the Head Proctor.</p>

<h3>Proctor FAQs</h3>

<p><strong>What if I need to leave the room? (restroom, etc.)</strong></p>
<p>Let the Head Proctor know and ask another proctor to cover your section.</p>

<p><strong>What if I need something delivered? (e.g. water, scrap paper, etc.)</strong></p>
<p>Ask the Head Proctor or message in the #pauley-proctors channel on Discord.</p>

<p><strong>[IMPORTANT] What if a student asks me a question not in the Student FAQs?</strong></p>
<p>Please do not answer the student’s question. Tell them:</p>
<div class="not-prose my-2 border-l-4 border-blue-300 bg-blue-50 rounded-r-lg px-4 py-3 text-base italic">“I will ask the test organizers. If I get a response, I will let you know.”</div>
<p>Report the question to the Head Proctor or in the #pauley-proctors Discord channel. If related to exam content, post in the appropriate clarifications thread under #problem-clarifications.</p>

<p><strong>What if a parent/coach asks me where they can go during testing?</strong></p>
<p>Tell them morning rounds end at 12:00 PM. Afternoon rounds end at 3:30 PM, activities run from 3:30 – 5:00 PM, and awards are from 5:00 – 6:00 PM. They can head to the info desk inside Dwinelle Hall for more information about the Parent/Coach Lounge and Parent Activities.</p>

<h3>Student FAQs</h3>
<p>These are questions students might ask you. For questions other than these, please ask the Head Proctor or on Discord before answering students!</p>

<p><strong>Can we move desks together?</strong> — Only during team-based rounds, and only within your assigned section.</p>
<p><strong>Can I go to the restroom?</strong> — Yes. Let your section proctor know. Please be aware of where the nearest restroom is.</p>
<p><strong>Can we leave the room (during breaks)?</strong> — Yes, but only to go to the restroom.</p>
<p><strong>Can we eat during the test?</strong> — No, unless you have accommodations.</p>
<p><strong>Can we use a protractor/ruler?</strong> — Yes, but we won’t provide one.</p>
<p><strong>How do we express (insert mathematical constant here)?</strong> — Use the symbol for precision (π rather than 3.14, etc.).</p>
<p><strong>Do we have to simplify fractions?</strong> — Yes.</p>
<p><strong>Do we have to rationalize the denominator?</strong> — No.</p>
<p><strong>What is our Student ID/Team ID?</strong> — All students should have a sticker with their name and a unique alpha-numerical ID on it. The Student ID is the full ID (e.g. 001A), and the Team ID is the numerical part of the ID (e.g. 001).</p>

<hr>

<h3>Puzzle Round Script (Pauley)</h3>
<p><strong>Start Time:</strong> ~9:15 AM — the Head Proctor will coordinate the start.</p>
<p><strong>Length:</strong> 15 minutes for reading the rules + 60 minutes for working</p>
<p><strong>Team-based:</strong> Yes.</p>
<p><strong>Materials:</strong> Only pen, paper, pencil, erasers.</p>
<p>The Head Proctor will read announcements to the room. Your job is to:</p>
<ul>
<li>Help distribute materials to your assigned section</li>
<li>Monitor your section during the reading period and test</li>
<li>Answer student questions (or escalate to Head Proctor)</li>
<li>Monitor for restroom breaks</li>
<li>Help collect materials at the end</li>
</ul>
<p>Follow the Head Proctor’s cues for timing. Help distribute Puzzle Round Rules during the reading period, and test booklets + envelopes when the Head Proctor signals (5 minutes left in reading period). Help collect envelopes and materials at the end of the round.</p>
<p>Count the envelopes from your section and report the number to the Head Proctor. Make sure no materials leave the room.</p>

<div class="not-prose my-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm font-semibold text-red-800">⚠️ Wait for the Head Proctor’s signal between rounds. Do NOT distribute next-round materials until told to do so.</div>

<hr>

<h3>Individual Test Script (Pauley)</h3>
<p><strong>Start Time:</strong> Shortly after Puzzle Round, around 10:45.</p>
<p><strong>Length:</strong> 60 minutes</p>
<p><strong>Team-based:</strong> No.</p>
<p><strong>Materials:</strong> Only pen, paper, pencil, erasers.</p>
<p>The Head Proctor will read announcements to the room. Your job is to:</p>
<ul>
<li>Help distribute Individual Answer Sheets and test booklets to your section</li>
<li>Ensure students fill in their ID, name, and team name</li>
<li>Monitor your section during the test</li>
<li>Help collect answer sheets and materials at the end</li>
</ul>
<p>Count the answer sheets from your section and report the number to the Head Proctor. Make sure no materials leave the room.</p>
<p>After the Individual Round, the Head Proctor will dismiss students for lunch. Help clean up your section.</p>

<hr>

<h3>Team Round Script (Pauley)</h3>
<p><strong>Start Time:</strong> ~1:15 PM — the Head Proctor will coordinate the start.</p>
<p><strong>Length:</strong> 60 minutes</p>
<p><strong>Team-based:</strong> Yes.</p>
<p><strong>Materials:</strong> Only pen, paper, pencil, erasers.</p>
<p>The Head Proctor will read announcements. Your job is to:</p>
<ul>
<li>Help distribute Team Answer Sheets (one per team) and test booklets</li>
<li>Ensure students fill in team ID, team name, and organization name</li>
<li>Monitor your section during the test</li>
<li>Help collect answer sheets and materials at the end</li>
</ul>
<p>Count the answer sheets from your section and report the number to the Head Proctor.</p>

<hr>

<h3>Relay Round Script (Pauley)</h3>
<p><strong>Start Time:</strong> Shortly after Team Round, around 2:45 PM.</p>
<p><strong>Length:</strong> 3 sets of 10 minutes each (30 minutes total)</p>
<p><strong>Team-based:</strong> Relay-style (students pass answers within their team).</p>
<p>The Head Proctor will explain the relay format to students. Your job is to:</p>
<ul>
<li>Help arrange students in relay order within teams in your section</li>
<li>Help distribute relay problem sets face-down in correct order</li>
<li>Monitor your section — ensure students only flip their problem when it’s their turn</li>
<li>Help collect problems between sets and distribute the next set</li>
<li>Help collect all materials (answer sheets, problems, scratch paper) after Set 3</li>
</ul>
<p>Count the answer sheets from your section and report the number to the Head Proctor.</p>

<p>After the Relay Round, the Head Proctor will dismiss students. Help clean up your section and the room. Make sure no exam materials leave the room.</p>
<p>Once cleanup is done, check with the Head Proctor for further instructions.</p>
<p><strong>Thank you again so much for your help!</strong></p>
</div>

<script>
function toggleScript(name) {
  const panel = document.getElementById('panel-' + name);
  const icon = document.getElementById('icon-' + name);
  const allPanels = ['morning', 'afternoon', 'pauley'];
  allPanels.forEach(function(n) {
    if (n !== name) {
      document.getElementById('panel-' + n).classList.add('hidden');
      document.getElementById('icon-' + n).style.transform = '';
    }
  });
  if (panel.classList.contains('hidden')) {
    panel.classList.remove('hidden');
    icon.style.transform = 'rotate(180deg)';
  } else {
    panel.classList.add('hidden');
    icon.style.transform = '';
  }
}
</script>
