// ==========================================
// 1. 初始化與數據載入
// ==========================================
let db = [];
let sessionQueue = [];
let currentWord = null;
let timerInterval = null;
let synth = window.speechSynthesis;
let availableVoices = [];

// 👇 新增這些變數來追蹤進度
let sessTotal = 0;      // 本次總題數
let sessDone = 0;       // 目前完成題數
let sessNewTotal = 0;   // 本次新詞總數
let sessNewDone = 0;    // 本次新詞已完成數
let sessRevTotal = 0;   // 本次複習總數
let sessRevDone = 0;    // 本次複習已完成數

window.onload = function() {
    loadData();
    initVoices();
    
    // 確保語音列表載入
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = initVoices;
    }
};

function loadData() {
    const saved = localStorage.getItem('ielts_master_v3_db');
    if (saved) {
        db = JSON.parse(saved);
        console.log("Loaded from Storage: " + db.length);
    } else {
        // 從 words.js 中的 fullRawString 解析數據
        // 這會自動將你的純文字列表轉換為資料庫
        if (typeof fullRawString !== 'undefined') {
            const lines = fullRawString.trim().split('\n');
            const uniqueMap = new Map();
            
            lines.forEach(line => {
                const parts = line.split('|');
                if (parts.length >= 3) {
                    const w = parts[0].trim();
                    if (!uniqueMap.has(w)) { // 去重
                        uniqueMap.set(w, {
                            word: w,
                            phonetic: parts[1].trim(),
                            meaning: parts[2].trim(),
                            status: 0,      // 0:New, 1:Learning, 2:Mastered
                            streak: 0,
                            wrongCount: 0
                        });
                    }
                }
            });
            db = Array.from(uniqueMap.values());
            saveData();
        } else {
            console.error("No word list found!");
        }
    }
    updateHomeStats();
}

// ==========================================
// 新增功能：重置進度
// ==========================================
function resetAllProgress() {
    // 1. 跳出確認視窗，避免誤觸
    if (confirm("⚠️ 警告：這將會清除所有學習紀錄！\n\n・所有「已掌握」單字將變回「未學」\n・連對次數與錯誤次數將歸零\n・此操作無法復原\n\n確定要重新開始嗎？")) {
        
        // 2. 清除 LocalStorage 中的資料庫
        localStorage.removeItem('ielts_master_v3_db');
        
        // 3. 重新載入頁面 (這會觸發 window.onload，自動從 words.js 重新建立乾淨的資料庫)
        location.reload(); 
    }
}

// ==========================================
// 新增功能：匯入與匯出 (資料同步)
// ==========================================

// 1. 匯出進度 (下載 JSON 檔)
function exportProgress() {
    // 從 LocalStorage 抓取目前的資料庫
    const dataStr = localStorage.getItem('ielts_master_v3_db');
    
    if (!dataStr) {
        alert("目前沒有學習進度可供匯出！");
        return;
    }

    // 建立檔案 Blob 物件
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    // 產生下載連結並自動點擊
    const a = document.createElement('a');
    a.href = url;
    
    // 檔名加上日期，方便辨識版本 (例如: ielts_backup_2025-02-04.json)
    const date = new Date().toISOString().slice(0, 10);
    a.download = `ielts_backup_${date}.json`;
    
    document.body.appendChild(a);
    a.click();
    
    // 清理
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 2. 匯入進度 (讀取 JSON 檔並覆蓋)
function importProgress(input) {
    const file = input.files[0];
    if (!file) return;

    // 建立檔案讀取器
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const jsonContent = e.target.result;
            const parsedData = JSON.parse(jsonContent);

            // 簡單驗證檔案格式是否正確 (檢查是否為陣列)
            if (!Array.isArray(parsedData)) {
                throw new Error("檔案格式不正確 (不是陣列)");
            }

            // 二次確認，防止誤操作
            if (confirm(`⚠️ 確定要匯入此檔案嗎？\n\n這將會「覆蓋」目前的學習進度！\n(建議先匯出目前的進度作為備份)`)) {
                
                // 1. 更新記憶體中的資料庫
                db = parsedData;
                
                // 2. 寫入 LocalStorage
                saveData();
                
                // 3. 重新整理頁面以套用新數據
                alert("✅ 匯入成功！頁面將重新整理。");
                location.reload();
            }

        } catch (err) {
            alert("❌ 匯入失敗：檔案格式錯誤或損毀。\n請確保您匯入的是正確的 .json 備份檔。");
            console.error(err);
        }
    };

    // 開始讀取文字內容
    reader.readAsText(file);
    
    // 清空 input，確保下次選同一個檔案也能觸發 onchange
    input.value = '';
}

function saveData() {
    localStorage.setItem('ielts_master_v3_db', JSON.stringify(db));
}

function updateHomeStats() {
    const total = db.length;
    const mastered = db.filter(x => x.status === 2).length;
    const learning = db.filter(x => x.status === 1).length;
    const fresh = db.filter(x => x.status === 0).length;

    document.getElementById('stat-mastered').innerText = `${mastered} / ${total}`;
    document.getElementById('stat-learning').innerText = learning;
    document.getElementById('stat-new').innerText = fresh;
}

// ==========================================
// 2. 語音處理
// ==========================================
function initVoices() {
    availableVoices = synth.getVoices();
    const select = document.getElementById('voice-select');
    select.innerHTML = '<option value="">-- 使用系統預設 --</option>';
    
    // 優先排序：Daniel > Siri > Google UK > Others
    availableVoices.sort((a, b) => {
        const priority = name => {
            if (name.includes('Google UK English Male')) return 3;
            if (name.includes('Siri') && name.includes('United Kingdom')) return 2;
            if (name.includes('Daniel')) return 1;
            return 0;
        };
        return priority(b.name) - priority(a.name);
    });

    availableVoices.forEach((voice, index) => {
        if (!voice.lang.startsWith('en')) return; // 只留英文
        const option = document.createElement('option');
        option.value = index; 
        option.textContent = `${voice.name} (${voice.lang})`;
        
        if (voice.name.includes('Google UK English Male')) option.selected = true;
        select.appendChild(option);
    });
}

function getSelectedVoice() {
    const select = document.getElementById('voice-select');
    const index = select.value;
    if (index !== "" && availableVoices[index]) {
        return availableVoices[index];
    }
    return null; 
}

function testVoice() {
    const voice = getSelectedVoice();
    if (voice) {
        const u = new SpeechSynthesisUtterance("Hello, I am ready.");
        u.voice = voice;
        synth.speak(u);
    }
}

// ==========================================
// 3. 練習流程 (含錯誤訂正與間隔重複)
// ==========================================

// 新增變數：紀錄當前這個單字是否已經錯過
let hasFailedCurrentWord = false;
let errorTimerInterval = null;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ==========================================
// 修改後的 startSession (包含 6 種模式)
// ==========================================
function startSession() {
    // 取得設定值
    const limitInput = parseInt(document.getElementById('session-limit').value) || 20;
    const mode = document.getElementById('quiz-mode').value;
    
    let finalQueue = [];
    
    // 準備各種狀態的單字池
    const poolNew = db.filter(x => x.status === 0);      // 未學 (灰色)
    const poolLearning = db.filter(x => x.status === 1); // 學習中 (黃色)
    const poolMastered = db.filter(x => x.status === 2); // 已掌握 (綠色)
    const poolOld = [...poolLearning, ...poolMastered];  // 舊單字
    const poolHard = db.filter(x => x.wrongCount >= 3);  // 易錯字
    
    if (mode === 'standard') {
        // 1. 標準模式 (原本的邏輯)
        shuffle(poolNew);
        const selectedNew = poolNew.slice(0, limitInput);
        shuffle(poolLearning);
        finalQueue = [...selectedNew, ...poolLearning];
        if (finalQueue.length === 0) { alert("標準模式下，目前沒有「新單字」且沒有「學習中」的單字！"); return; }
        
    } else if (mode === 'mixed') {
        // 2. 綜合模式 (70% 新, 30% 舊)
        let countNew = Math.round(limitInput * 0.7);
        let countOld = limitInput - countNew;
        if (poolNew.length < countNew) { countNew = poolNew.length; countOld = limitInput - countNew; }
        if (poolOld.length < countOld) { countOld = poolOld.length; countNew = limitInput - countOld; if (poolNew.length < countNew) countNew = poolNew.length; }
        shuffle(poolNew); shuffle(poolOld);
        finalQueue = [...poolNew.slice(0, countNew), ...poolOld.slice(0, countOld)];
        if (finalQueue.length === 0) { alert("單字庫全空！"); return; }

    } else if (mode === 'only_new') {
        // 3. (新增) 新詞模式：只考未學單字
        if (poolNew.length === 0) {
            alert("太棒了！所有單字都已經學過了 (沒有未學新詞)。\n請切換到其他模式複習。");
            return;
        }
        shuffle(poolNew);
        finalQueue = poolNew.slice(0, limitInput);

    } else if (mode === 'only_learning') {
        // 4. (新增) 特訓模式：只考學習中單字
        if (poolLearning.length === 0) {
            alert("目前沒有「學習中」的單字。\n去挑戰一些新單字吧！");
            return;
        }
        shuffle(poolLearning);
        finalQueue = poolLearning.slice(0, limitInput);

    } else if (mode === 'mastered') {
        // 5. 複習模式
        if (poolMastered.length === 0) { alert("沒有已掌握單字"); return; }
        shuffle(poolMastered);
        finalQueue = poolMastered.slice(0, limitInput);

    } else if (mode === 'hard') {
        // 6. 易錯模式
        if (poolHard.length === 0) { alert("沒有易錯字"); return; }
        shuffle(poolHard);
        finalQueue = poolHard.slice(0, limitInput);
    }

    // 初始化統計數據
    sessTotal = finalQueue.length;
    sessDone = 0;
    sessNewTotal = 0;
    sessNewDone = 0;
    sessRevTotal = 0;
    sessRevDone = 0;

    // 標記新舊詞狀態
    finalQueue.forEach(item => {
        if (item.status === 0) {
            item._isNew = true;
            sessNewTotal++;
        } else {
            item._isNew = false;
            sessRevTotal++;
        }
    });

    sessionQueue = shuffle(finalQueue);
    
    updateSessionStatsUI();
    showPage('quiz-page');
    nextWord();
}

function nextWord(manual = false) {
    if (manual) {
        clearInterval(timerInterval);
        clearInterval(errorTimerInterval);
    }

    // 確保隱藏所有遮罩
    document.getElementById('result-overlay').style.display = 'none';
    document.getElementById('error-overlay').style.display = 'none';
    
    document.getElementById('btn-check').style.display = 'flex';
    document.getElementById('btn-next').style.display = 'none';
    
    const masterBtn = document.getElementById('btn-master-toggle');
    masterBtn.classList.remove('active');
    masterBtn.innerHTML = '<i class="far fa-square"></i> 我已掌握 (不再出現)';

    if (sessionQueue.length === 0) {
        alert("本日練習結束！");
        goHome();
        return;
    }

    currentWord = sessionQueue.shift();
    
    // 重置單字錯誤狀態 (新單字開始時，預設沒錯過)
    hasFailedCurrentWord = false;

    document.getElementById('mask-hint').innerText = "_".repeat(currentWord.word.length);
    document.getElementById('user-input').value = "";
    document.getElementById('user-input').focus();
    document.getElementById('msg-hint').innerText = "";
    updateStreakUI(currentWord.streak);

    setTimeout(playAudio, 500);
}

function checkAnswer() {
    const input = document.getElementById('user-input');
    const userText = input.value.trim().toLowerCase();
    const correctText = currentWord.word.toLowerCase();

    if (userText === correctText) handleCorrect();
    else handleWrong();
}

function handleCorrect() {
    // 1. 如果是「訂正後答對」(hasFailedCurrentWord 為 true)，不增加進度
    if (hasFailedCurrentWord) {
        saveSync();
        showResult(); 
    } else {
        // 2. 一次答對 (標準流程) -> 增加進度！
        currentWord.streak++;
        if (currentWord.streak >= 5) currentWord.status = 2; 
        else if (currentWord.status === 0) currentWord.status = 1; 
        
        // 👇 更新統計數據
        sessDone++;
        if (currentWord._isNew) {
            sessNewDone++;
        } else {
            sessRevDone++;
        }
        updateSessionStatsUI(); // 刷新顯示

        saveSync();
        showResult();
    }
}

// 👇 新增：刷新底部統計條的函式
function updateSessionStatsUI() {
    // 總量：顯示剩餘/總數，或是單純總數
    document.getElementById('sess-total-display').innerText = `${sessTotal} 詞`;
    
    // 複習進度：已完成 / 總複習量 (換算百分比)
    const revPercent = sessRevTotal === 0 ? 0 : Math.round((sessRevDone / sessRevTotal) * 100);
    document.getElementById('sess-review-display').innerText = `${sessRevDone}/${sessRevTotal} (${revPercent}%)`;
    
    // 新詞進度
    const newPercent = sessNewTotal === 0 ? 0 : Math.round((sessNewDone / sessNewTotal) * 100);
    document.getElementById('sess-new-display').innerText = `${sessNewDone}/${sessNewTotal} (${newPercent}%)`;
}

function handleWrong() {
    currentWord.streak = 0;
    currentWord.wrongCount++;
    currentWord.status = 1; 
    
    // 只有在「第一次」答錯時，才執行插入隊列
    if (!hasFailedCurrentWord) {
        hasFailedCurrentWord = true;
        // 插入到 20 題之後 (或隊列末尾)
        const insertIndex = Math.min(sessionQueue.length, 20);
        sessionQueue.splice(insertIndex, 0, currentWord);
        console.log(`錯題重練：已插入至第 ${insertIndex} 順位`);
    }
    
    saveSync();
    
    // 顯示紅色錯誤遮罩
    showErrorOverlay();
}

// 新增：顯示錯誤遮罩
// 修改：顯示錯誤遮罩 (含使用者輸入比對)
function showErrorOverlay() {
    const overlay = document.getElementById('error-overlay');
    overlay.style.display = 'flex';
    
    // 1. 填入正確答案資訊
    document.getElementById('err-word').innerText = currentWord.word;
    document.getElementById('err-phonetic').innerText = currentWord.phonetic;
    document.getElementById('err-meaning').innerText = currentWord.meaning;
    document.getElementById('err-big-word').innerText = currentWord.word;
    
    // 2. 👇 新增：抓取使用者剛剛輸入的錯誤答案
    const userInput = document.getElementById('user-input').value;
    const userErrDisplay = document.getElementById('err-user-input');
    
    if (userInput.trim() === "") {
        userErrDisplay.innerText = "(未輸入)";
    } else {
        userErrDisplay.innerText = userInput;
    }

    playAudio(); // 播放正確讀音

    let sec = 10;
    const timerEl = document.getElementById('err-timer');
    timerEl.innerText = sec + "s";
    
    if (errorTimerInterval) clearInterval(errorTimerInterval);

    errorTimerInterval = setInterval(() => {
        sec--;
        timerEl.innerText = sec + "s";
        if (sec <= 0) {
            dismissErrorOverlay();
        }
    }, 1000);
    
    // 點擊也可關閉
    overlay.onclick = dismissErrorOverlay;
}

// 新增：關閉錯誤遮罩並重試
function dismissErrorOverlay() {
    clearInterval(errorTimerInterval);
    document.getElementById('error-overlay').style.display = 'none';
    
    // 清空輸入框，讓使用者重試
    const input = document.getElementById('user-input');
    input.value = "";
    input.focus();
    
    document.getElementById('msg-hint').innerText = "請重新輸入正確單字";
    document.getElementById('msg-hint').style.color = "#e74c3c";
}

function toggleMastery() {
    const btn = document.getElementById('btn-master-toggle');
    if (currentWord.status === 2) {
        currentWord.status = 1;
        currentWord.streak = 4;
        btn.classList.remove('active');
        btn.innerHTML = '<i class="far fa-square"></i> 我已掌握 (不再出現)';
    } else {
        currentWord.status = 2;
        currentWord.streak = 5;
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-check-square"></i> 已標記掌握！';
    }
    saveSync();
}

function saveSync() {
    const idx = db.findIndex(x => x.word === currentWord.word);
    if (idx !== -1) db[idx] = currentWord;
    saveData();
}

function showResult() {
    const overlay = document.getElementById('result-overlay');
    overlay.style.display = 'flex';
    
    document.getElementById('res-word').innerText = currentWord.word;
    document.getElementById('res-phonetic').innerText = currentWord.phonetic;
    document.getElementById('res-meaning').innerText = currentWord.meaning;
    document.getElementById('res-big-word').innerText = currentWord.word;
    
    const masterBtn = document.getElementById('btn-master-toggle');
    if (currentWord.status === 2) {
        masterBtn.classList.add('active');
        masterBtn.innerHTML = '<i class="fas fa-check-square"></i> 已標記掌握！';
    }

    document.getElementById('btn-check').style.display = 'none';
    document.getElementById('btn-next').style.display = 'flex';

    let sec = 10;
    const timer = document.getElementById('auto-timer');
    timer.innerText = sec + "s";
    timerInterval = setInterval(() => {
        sec--;
        timer.innerText = sec + "s";
        if (sec <= 0) {
            clearInterval(timerInterval);
            nextWord();
        }
    }, 1000);
}

function playAudio() {
    if (!currentWord) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(currentWord.word);
    const chosenVoice = getSelectedVoice();
    if (chosenVoice) u.voice = chosenVoice;
    u.rate = 0.85;
    synth.speak(u);
    
    // 只有在沒有遮罩擋住時，才自動 focus 輸入框
    if (document.getElementById('result-overlay').style.display === 'none' && 
        document.getElementById('error-overlay').style.display === 'none') {
        document.getElementById('user-input').focus();
    }
}

function updateStreakUI(n) {
    document.getElementById('streak-counter').innerText = n;
    document.getElementById('streak-bar').style.width = (n/5)*100 + "%";
}

// ==========================================
// 4. 頁面與列表
// ==========================================
let currentFilter = 'all';

function setFilter(type, btn) {
    currentFilter = type;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    goList();
}

// ==========================================
// 修改：列表頁渲染 (新增勾選框)
// ==========================================
function goList() {
    showPage('list-page');
    const tbody = document.getElementById('list-body');
    tbody.innerHTML = "";
    
    // 排序邏輯：錯次多的在上面 > 狀態 (未學/學習中/已掌握)
    const sorted = [...db].sort((a,b) => {
        if (b.wrongCount !== a.wrongCount) return b.wrongCount - a.wrongCount;
        return a.status - b.status;
    });

    const filtered = sorted.filter(item => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'mastered') return item.status === 2;
        if (currentFilter === 'learning') return item.status === 1;
        if (currentFilter === 'new') return item.status === 0;
        return true;
    });

    // 渲染列表 (限制顯示前 200 筆以優化效能)
    filtered.slice(0, 200).forEach(item => {
        let badge = "";
        if (item.status === 0) badge = '<span class="tag" style="background:#bdc3c7">未學</span>';
        if (item.status === 1) badge = '<span class="tag" style="background:#f39c12">學習中</span>';
        if (item.status === 2) badge = '<span class="tag" style="background:#2ecc71">已掌握</span>';

        // 判斷是否要打勾
        const isChecked = item.status === 2 ? 'checked' : '';

        // ⚠️ 注意：下面的 input checkbox 綁定了 onchange 事件
        tbody.innerHTML += `
            <tr>
                <td style="text-align:center;">
                    <input type="checkbox" style="width:20px; height:20px; cursor:pointer; accent-color:#2ecc71;" 
                           onchange="toggleListMastery('${item.word}')" ${isChecked}>
                </td>
                <td>
                    <div style="font-weight:bold; color:#333;">${item.word}</div>
                    <div style="font-size:0.8rem; color:#888;">${item.meaning}</div>
                </td>
                <td>${badge}</td>
                <td>${item.streak}/5</td>
                <td style="color:${item.wrongCount>0?'#e74c3c':'#ccc'}">${item.wrongCount}</td>
            </tr>
        `;
    });
}

// ==========================================
// 新增：列表頁直接切換掌握狀態
// ==========================================
function toggleListMastery(word) {
    const target = db.find(x => x.word === word);
    if (!target) return;

    if (target.status === 2) {
        // 情況 A：原本是已掌握 -> 使用者取消勾選
        // 動作：變回「學習中」，並將連對次數設為 4 (讓他很快就能再複習到)
        target.status = 1;
        target.streak = 4;
        console.log(`已取消掌握: ${word}`);
    } else {
        // 情況 B：原本是未學/學習中 -> 使用者勾選
        // 動作：變為「已掌握」，連對次數設為 5
        target.status = 2;
        target.streak = 5;
        console.log(`已手動掌握: ${word}`);
    }

    // 1. 存檔
    saveData();
    
    // 2. 更新首頁的統計數據 (雖然現在看不到，但為了資料一致性)
    updateHomeStats();
    
    // 3. 重新渲染列表 (這樣該行的 "狀態" 標籤顏色才會立刻改變)
    // 為了使用者體驗，雖然這會重刷列表，但在幾百個單字內通常很快
    goList();
}

function goHome() {
    showPage('home-page');
    updateHomeStats();
}

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// 請放在 script.js 的最下面，替換原本的 keydown 監聽器
document.addEventListener('keydown', (e) => {
    if (document.getElementById('quiz-page').classList.contains('active')) {
        
        // 1. 如果紅色錯誤遮罩正開著 -> 按 Enter 關閉遮罩 (重試)
        if (document.getElementById('error-overlay').style.display === 'flex') {
            if (e.key === 'Enter') {
                e.preventDefault();
                dismissErrorOverlay();
            }
            return;
        }

        // 2. 一般情況 -> 按 Enter 送出答案 或 跳下一題
        if (e.key === 'Enter') {
            if (document.getElementById('result-overlay').style.display === 'flex') {
                nextWord(true);
            } else {
                checkAnswer();
            }
        }
        
        // 3. 按 Tab 重播聲音
        if (e.key === 'Tab') {
            e.preventDefault();
            playAudio();
        }
    }
});