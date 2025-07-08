<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title data-translate-key="gameDnaTitle">Your Game DNA</title>
    
    <!-- Google Fonts Import -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Press+Start+2P&display=swap" rel="stylesheet">
    
    <!-- Link to your external CSS file -->
    <link rel="stylesheet" href="Game-DNA.css">
    
    <script src="translation.js" defer></script>
</head>
<body>
    <div class="nebula-background"></div>
    <div class="stars-background"></div>
    <div class="main-container">
        <div class="content-box">
            <header class="header-nav">
                <a href="javascript:history.back()" class="back-button" data-translate-key="userIntentionBack"> < Back </a>
                <a href="langs-pers.html" class="skip-button" data-translate-key="userIntentionSkip"> Skip </a>
            </header>

            <h1><span data-translate-key="gameDnaTitle">Your Game DNA</span><span class="blinking-cursor">_</span></h1>
            <p class="subtitle" data-translate-key="gameDnaSubtitle">"Let’s get to know how, what, and when you play."</p>

            <form id="game-dna-form">
                <!-- Question 1: Games -->
                <section class="question-group" data-group="games">
                    <h3 data-translate-key="gameDnaQ_Games">What games do you play?</h3>
                    <div class="options-grid">
                         <label class="option-card"><input type="checkbox" name="games"><span class="emoji">🪂</span> PUBG</label>
                        <label class="option-card"><input type="checkbox" name="games"><span class="emoji">🔫</span> VALO</label>
                        <label class="option-card"><input type="checkbox" name="games"><span class="emoji">🌳</span> ROV</label>
                    </div>
                    <p class="error-message" data-error-for="games"></p>
                </section>
                
               <!-- Question 2: Genres -->
                <section class="question-group" data-group="genre">
                    <h3 data-translate-key="gameDnaQ_Genres">Genres/Categories?</h3>
                    <p class="question-tip">Tip: Selecting a genre may reveal new options below. If you select all roles for a genre, the system will automatically choose "All-rounder" for you.</p>
                    <div class="options-grid">
                        <label class="option-card"><input type="checkbox" name="genre" id="genre-moba"><span class="emoji">🌳</span><span data-translate-key="traitTagMoba">MOBA</span></label>
                        <label class="option-card"><input type="checkbox" name="genre" id="genre-fps"><span class="emoji">🎯</span><span data-translate-key="traitTagFps">FPS</span></label>
                        <label class="option-card"><input type="checkbox" name="genre"><span class="emoji">👽</span><span data-translate-key="optionOther">Other</span></label>
                    </div>
                    <p class="error-message" data-error-for="genre"></p>
                </section>
                
                <!-- Hidden by default: MOBA Roles -->
                <section class="question-group hidden" id="roles-moba" data-group="moba-roles">
                    <h3 data-translate-key="gameDnaQ_MobaRoles">What's your preferred role in MOBA?</h3>
                    <div class="options-grid" style="grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));">
                        <label class="option-card"><input type="checkbox" name="moba-roles"><span>Top</span></label>
                        <label class="option-card"><input type="checkbox" name="moba-roles"><span>Mid</span></label>
                        <label class="option-card"><input type="checkbox" name="moba-roles"><span>ADC</span></label>
                        <label class="option-card"><input type="checkbox" name="moba-roles"><span>Support</span></label>
                        <label class="option-card"><input type="checkbox" name="moba-roles"><span>Jungle</span></label>
                        <label class="option-card"><input type="checkbox" name="moba-roles" id="moba-all-rounder"><span>All-rounder</span></label>
                        <label class="option-card"><input type="checkbox" name="moba-roles" id="moba-not-sure"><span>Not sure</span></label>
                    </div>
                    <p class="error-message" data-error-for="moba-roles"></p>
                </section>
                
                 <!-- Hidden by default: FPS Roles -->
                <section class="question-group hidden" id="roles-fps" data-group="fps-roles">
                    <h3 data-translate-key="gameDnaQ_FpsRoles">What's your preferred role in FPS?</h3>
                    <div class="options-grid" style="grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));">
                        <label class="option-card"><input type="checkbox" name="fps-roles"><span>Entry Fragger</span></label>
                        <label class="option-card"><input type="checkbox" name="fps-roles"><span>Support</span></label>
                        <label class="option-card"><input type="checkbox" name="fps-roles"><span>Sniper</span></label>
                        <label class="option-card"><input type="checkbox" name="fps-roles"><span>IGL</span></label>
                        <label class="option-card"><input type="checkbox" name="fps-roles"><span>Lurker</span></label>
                        <label class="option-card"><input type="checkbox" name="fps-roles" id="fps-all-rounder"><span>All-rounder</span></label>
                        <label class="option-card"><input type="checkbox" name="fps-roles" id="fps-not-sure"><span>Not sure</span></label>
                    </div>
                    <p class="error-message" data-error-for="fps-roles"></p>
                </section>



                <!-- Question 3: Platforms -->
                <section class="question-group" data-group="platform">
                    <h3 data-translate-key="gameDnaQ_Platform">What platform(s) do you play on?</h3>
                    <p class="question-tip" data-translate-key="platformTip">Tip: Pick more than one if you're cross-platform</p>
                    <div class="options-grid">
                        <label class="option-card"><input type="checkbox" name="platform"><span class="emoji">🖥️</span><span>PC</span></label>
                        <label class="option-card"><input type="checkbox" name="platform"><span class="emoji">📱</span><span>Mobile</span></label>
                        <label class="option-card"><input type="checkbox" name="platform"><span class="emoji">🎮</span><span>PlayStation</span></label>
                        <label class="option-card"><input type="checkbox" name="platform"><span class="emoji">❎</span><span>Xbox</span></label>
                        <label class="option-card"><input type="checkbox" name="platform"><span class="emoji">🌐</span><span data-translate-key="optionOther">Others</span></label>
                    </div>
                    <p class="error-message" data-error-for="platform"></p>
                </section>

                <!-- Question 4: Play Time -->
                <section class="question-group" data-group="active-time">
                    <h3 data-translate-key="gameDnaQ_When">When do you usually play?</h3>
                    <div class="options-grid" style="grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));">
                        <label class="option-card"><input type="checkbox" name="active-time"><span class="emoji">☀️</span><span data-translate-key="gameDnaTimeMorning">Morning</span></label>
                        <label class="option-card"><input type="checkbox" name="active-time"><span class="emoji">🏙️</span><span data-translate-key="gameDnaTimeAfternoon">Afternoon</span></label>
                        <label class="option-card"><input type="checkbox" name="active-time"><span class="emoji">🌆</span><span data-translate-key="gameDnaTimeEvening">Evening</span></label>
                        <label class="option-card"><input type="checkbox" name="active-time"><span class="emoji">🌙</span><span data-translate-key="traitTagLateNight">Late night</span></label>
                        <label class="option-card"><input type="checkbox" name="active-time"><span class="emoji">👔</span><span data-translate-key="gameDnaActivityAfterWork">After work</span></label>
                        <label class="option-card"><input type="checkbox" name="active-time"><span class="emoji">🏢</span><span data-translate-key="traitTagWeekdays">Weekday</span></label>
                        <label class="option-card"><input type="checkbox" name="active-time"><span class="emoji">🏖️</span><span data-translate-key="traitTagWeekends">Weekend</span></label>
                        <label class="option-card"><input type="checkbox" name="active-time"><span class="emoji">🤷</span><span data-translate-key="gameDnaTimeNoFixed">No fixed time</span></label>
                        <label class="option-card"><input type="checkbox" name="active-time"><span class="emoji">😎</span><span data-translate-key="gameDnaTime247">24/7 Gamer</span></label>
                    </div>
                    <p class="error-message" data-error-for="active-time"></p>
                </section>

                <div class="navigation">
                     <span class="pagination">1 / 4</span>
                     <a href="langs-pers.html" id="next-button" class="btn-8bit" data-translate-key="userIntentionNext">Next</a>
                </div>
            </form>
        </div>
    </div>
    
    <!-- Link to your external JavaScript file -->
    <script src="Game-DNA.js"></script>
</body>
</html>
