let mainInitialized = false;

function theMain() {

    log('theMain()');

    document.getElementById('chkcnf').checked = true;

    log(mainInitialized)

    if (mainInitialized) return;
    mainInitialized = true;

    log(mainInitialized)

    addNewStyle(`:root {--num-color: red;}#ContentPlaceHolder1_txt_MobileNumber+i {border-bottom-color: var(--num-color) !important;}#ContentPlaceHolder1_txt_MobileNumber+i::before {background: var(--num-color) !important;}`);

    addNewStyle(`body {background: #edf0f0;}`);

    if (!document.getElementById('body')) {

        log('DOM not Exist.');

        insertDom()
    }

    let dbArray = [];

    let filteredArray = [];
    let activeIndex = -1;
    let timeoutId;

    let storedData = localStorage.getItem('DB');
    if (storedData) {
        try {
            const jsonData = JSON.parse(storedData); // Expected: array of arrays
            dbArray = jsonData;
            filteredArray = [...dbArray];
            renderList(filteredArray);


            dateObj = new Date
            today = dateObj.getDate()
            let storedDate = window.localStorage.getItem("dateStored") || 0;
            log("dateStored  " + storedDate);
            if (storedDate != today) {
                window.localStorage.setItem("dateStored", today)
                downloadLocalStorageDB()
            }

        } catch (err) {
            log('Failed to parse localStorage DB:', err);
        }
    } else {
        log('No DB data found in localStorage.');
    }


    function insertDom() {

        log('insertDom()');
        const pDiv = document.createElement('div');
        pDiv.id = 'body'
        pDiv.innerHTML =
            `<style>
       
        .hidden {
            width: 0% !important;
            overflow: hidden;
        }

        .active{            
            background:#c0ddff !important;
        }
       
        #body {
            margin-top: 100px;            
            width: 100%;            
            cursor: default;
            transition: width 500ms;
            background: #edf0f0;
            overflow: hidden;
            overflow-y: scroll;
            height: 685px;            
        }

        #nav {
            z-index: 9;
            position: sticky;
            top: 0;
            width: 100%;            
            box-sizing: border-box;
            background: #edf0f0;

            padding: 10px;            
        }

        #spn-hold{       
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
        }
        
        .spn{
            padding: 4px;
            margin: 8px;
            border-radius: 4px;
            width: 80px;
            text-align: center;
            background: #325fa4;
            color: white;
            transition:background 500ms;
        }
        
        .spn:hover{
            background:#4498fe;
        }

        .spn>img{
            width: 25px;
            filter: invert(1);    
        }

        #nav>input {
            box-sizing: border-box;
            width: 100%;
            padding: 8px;
            font-size: 16px;
            border-radius: 4px;
            border: 2px solid #ccc;
            outline: none;
            text-transform: uppercase;
        }
            
        #nav>input:active,
        #nav>input:focus {
            border: 2px solid #4498fe;            
        }

        #main {
            margin-top: 2px;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            align-items: stretch;
            padding: 10px;            
        }




        .box {
            position: relative;
            margin: 4px;

            box-sizing: border-box;
            width: 100%;            
            font-size: 12px;
            border-radius: 4px;            

            display: flex;
            flex-direction: row;
            cursor: pointer;
            transition: all 0.5s;
            background: white;
            align-items: center;
        }

        .box:hover {
            z-index: 1;            
            background:#c0ddff;
        }


        .box>div {
            width: 100%;
            text-align: center;
            overflow: hidden;
        }

        .box>div:nth-child(2) {
            border-left: 1px solid gainsboro;
            border-right: 1px solid gainsboro;
        }

        .name>h4, .fname>h4 {
            text-transform: uppercase;
        }

        .num {}

        .num h4 {
            margin: 0px 2px;
        }

        .del-div{            
            width:100px !important;
            border-left: 1px solid gainsboro;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            transition:background 500ms;
            font-size: 20px;
            color:white;
            background:#325fa4;
        }

        .del-div:hover{
            background:#4498fe;            
        }

        .x{}       
      
    </style>

    <div id='nav'>

        <h4 id='spn-hold'>

        <span id='load' class='spn'>
        <img src='${chrome.runtime.getURL('up.png')}' >
        </span>

        <span id='add' class='spn'>
        <img src= '${chrome.runtime.getURL('add.png')}' >       
        </span>

        <span id='download' class='spn'>
        <img src= '${chrome.runtime.getURL('down.png')}' >       
        </span>

        </h4>

        <input type='text' id='searchInput' placeholder='Search...'>

    </div>

    <div id='main'></div>  
`

        document.body.style.display = 'flex';
        document.body.appendChild(pDiv);

    };

    function addNewStyle(newStyle) {

        log('addNewStyle()');

        var styleElement = document.getElementById('styles_js');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = 'styles_js';
            document.getElementsByTagName('head')[0].appendChild(styleElement);
        }
        styleElement.appendChild(document.createTextNode(newStyle));
    };

    function fillForm(arr) {
        if (!document.getElementById('loadingdiv').classList.contains('loadingdivcls')) {

            log('fillForm()');

            document.getElementById('ContentPlaceHolder1_txt_Name').value = `${arr[0]}`;
            document.getElementById('ContentPlaceHolder1_txt_Name').parentElement.classList.add('has-value');

            document.getElementById('ContentPlaceHolder1_txt_FatherHusbandName').value = `${arr[1]}`;
            document.getElementById('ContentPlaceHolder1_txt_FatherHusbandName').parentElement.classList.add('has-value');

            window.localStorage.setItem('fName', arr[1])

            document.getElementById('ContentPlaceHolder1_txt_MobileNumber').value = `${arr[2]}`;
            document.getElementById('ContentPlaceHolder1_txt_MobileNumber').parentElement.classList.add('has-value');

            window.localStorage.setItem('numb', arr[2])

            document.getElementById('ContentPlaceHolder1_capcnf_txtCaptcha').focus();

        }
    };

    function waitForLoad(waitTime) {

        log('waitForLoad()')

        log('I AM WAIT FOR LOAD');

        let waitTimes = 0;

        let waitForLoadInterval = setInterval(() => {

            if (waitTimes > waitTime) {

                if (document.getElementById('loadingdiv').classList.contains('loadingdivcls')) {

                    log('Condition : LOADING');

                } else if (!document.getElementById('spnimg').classList.contains('d-none')) {

                    log('Condition : NOT OK');
                    reCapPhoto(20, 800);
                    clearInterval(waitForLoadInterval);

                } else {

                    log('Condition : OK');
                    clearInterval(waitForLoadInterval);

                }
                waitTimes++;
                log('WAIT FOR LOAD COUNT :=> ' + waitTimes);

            } else {

                log('waitTimes Complete.');
                clearInterval(waitForLoadInterval);

            }

        }, 2000);
    };

    function reCapPhoto(reCapCount, reCapTimeGape) {

        log('reCapPhoto()');

        log('I AM RE CAP PHOTO');

        let reCapPhotoCount = 0;

        let reCapPhotoInterval = setInterval(() => {

            if (reCapPhotoCount < reCapCount) {

                if (!document.getElementById('spnimg').classList.contains('d-none')) {
                    capPhoto(100);

                } else if (document.getElementById('loadingdiv').classList.contains('loadingdivcls')) {

                    log('Condition : LOADING');
                    waitForLoad(10);
                    clearInterval(reCapPhotoInterval);

                } else {
                    log('Condition : OK');
                    clearInterval(reCapPhotoInterval);
                }
                reCapPhotoCount++;
                log('RE CAP COUNT :=> ' + reCapPhotoCount);

            } else {

                log('reCapPhotoCount Complete.');
                clearInterval(reCapPhotoInterval);

            }

        }, reCapTimeGape);

    };

    function capPhoto(beepTime) {

        log('capPhoto()');

        log('I AM CAP PHOTO');

        // Create an AudioContext instance
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.type = 'sine'; // Set oscillator type
        oscillator.frequency.value = 1000; // Set frequency for beep sound
        gainNode.gain.value = 1.0; // Set volume

        oscillator.start();
        oscillator.stop(audioContext.currentTime + beepTime / 1000);

        setTimeout(() => { document.getElementById('btnCapture').click() }, beepTime);

    };

    function capPlus() {

        log('capPlus()');

        capPhoto(100);

        setTimeout(() => {

            if (document.getElementById('spnimg').classList.contains('d-none') && !document.getElementById('loadingdiv').classList.contains('loadingdivcls')) {

                log('Condition : OK');

            } else if (!document.getElementById('spnimg').classList.contains('d-none')) {

                log('Condition : NO FACE');
                reCapPhoto(20, 800)

            } else if (document.getElementById('loadingdiv').classList.contains('loadingdivcls')) {

                log('Condition : LOADING');
                waitForLoad(10)

            } else {

                log('Condition : UNKNOWN');
            }

        }, 500);

    };

    function boxClick(e, data) {

        log('boxClick()');

        // Handle selected box
        log('Selected:', data);
        fillForm(data)
    };

    function delIndex(index) {

        log('Del Index Function.')
        log('Index : ' + index)

        const existingData = localStorage.getItem('DB');
        if (!existingData) return;

        let dbArray = JSON.parse(existingData);
        if (index < 0 || index >= dbArray.length) return;

        if (!confirm(`Are you sure you want to delete ?\nName : ${dbArray[index][0].toUpperCase()}\nCareOf : ${dbArray[index][1].toUpperCase()}\nMob. : ${dbArray[index][2]}`)) {
            return;
        }

        dbArray.splice(index, 1);
        localStorage.setItem('DB', JSON.stringify(dbArray));
        reloadDbArray()
        log(`Entry at index ${index} deleted.`);

    };

    function reloadDbArray() {

        log('Reload DB Array.')

        dbArray = [];

        activeIndex = -1;

        storedData = localStorage.getItem('DB');

        if (storedData) {
            try {
                const jsonData = JSON.parse(storedData); // Expected: array of arrays
                dbArray = jsonData;
                filteredArray = [...dbArray];
                renderList(filteredArray);
                document.getElementById("searchInput").value = '';
                document.getElementById("searchInput").focus();
            } catch (err) {
                log('Failed to parse localStorage DB:', err);
            }
        } else {
            log('No DB data found in localStorage.');
        }
    };

    function downloadLocalStorageDB() {
        const rawData = localStorage.getItem('DB');

        if (!rawData) {
            log('No data found under key "DB" in localStorage.');
            return;
        }

        try {
            // Parse and re-stringify for pretty formatting
            const parsedData = JSON.parse(rawData);
            const prettyData = JSON.stringify(parsedData, null, 2); // 2-space indentation

            const blob = new Blob([prettyData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            const now = new Date();

            const day = now.getDate().toString().padStart(2, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // months are 0-indexed
            const year = now.getFullYear().toString().slice(-2); // last 2 digits of year

            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');

            const timestamp = `${day}-${month}-${year} ${hours}:${minutes}`;

            a.href = url;
            a.download = `DB-${timestamp}.json`;

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            URL.revokeObjectURL(url);

        } catch (e) {
            log('Stored data under "DB" is not valid JSON.');
            log('Invalid JSON:', e);
        }
    };

    function renderList(data) {

        log('renderList Func');

        document.getElementById('main').innerHTML = '';
        data.forEach((entry, index) => {
            const box = document.createElement('div');
            box.classList.add('box');
            if (index === activeIndex) box.classList.add('active');

            box.innerHTML = `
          <div class='name'><h4>${entry[0]}</h4></div>
          <div class='fname'><h4>${entry[1]}</h4></div>
          <div class='num'><h4>${entry[2] || ''}</h4></div>
          <div class='del-div'><h4 class='x'>X</h4></div>
          `;

            box.dataset.arr = JSON.stringify(entry);
            box.dataset.index = (data.length === dbArray.length) ? index : entry[3];

            document.getElementById('main').appendChild(box);
        });
    };



    document.addEventListener('keydown', event => {

        // Golbal Key Setup

        if (event.key === '-' && !document.querySelector('#couponbox').classList.contains('d-block') && !document.getElementById('loadingdiv').classList.contains('loadingdivcls')) {
            event.preventDefault()

            log('- Button Clicked.')

            log('Search Input is Cleared.')

            document.getElementById('searchInput').value = '';
            filteredArray = [...dbArray]; // reset to full list
            activeIndex = -1;
            renderList(filteredArray);

            document.getElementById('body').classList.toggle("hidden");

            if (!document.getElementById('body').classList.contains('hidden')) {

                document.getElementById('searchInput').focus()

            }



        }

        if (event.key === '`' && !document.querySelector('#couponbox').classList.contains('d-block') && !document.getElementById('loadingdiv').classList.contains('loadingdivcls')) {
            event.preventDefault()

            log('` Button Clicked.')

            capPlus()
        }

        if (event.key === '1' && event.target.matches('#ContentPlaceHolder1_txt_Name, #ContentPlaceHolder1_txt_FatherHusbandName') && !document.getElementById('body').classList.contains('hidden') && !document.querySelector('#couponbox').classList.contains('d-block') && !document.getElementById('loadingdiv').classList.contains('loadingdivcls')) {
            event.preventDefault()
            log('1 Button Clicked.')
            log('Search Input is Cleared.')
            document.getElementById('searchInput').value = '';
            filteredArray = [...dbArray]; // reset to full list
            activeIndex = -1;
            renderList(filteredArray);
            log('Search Input in Focus.')
            document.getElementById('searchInput').focus()
        }

        if (event.key === 'Tab') {
            event.preventDefault();
            log('TAB Button Clicked.');
            const fields = [
                !document.getElementById('body').classList.contains('hidden') ? document.getElementById('searchInput') : null,
                document.getElementById('ContentPlaceHolder1_txt_Name'),
                document.getElementById('ContentPlaceHolder1_txt_FatherHusbandName'),
                document.getElementById('ContentPlaceHolder1_txt_MobileNumber'),
                document.getElementById('ContentPlaceHolder1_capcnf_txtCaptcha'),
            ].filter(Boolean); // remove null if searchInput is hidden

            const currentIndex = fields.findIndex(field => field === document.activeElement);

            let nextIndex;
            if (event.shiftKey) {
                // Shift + Tab: move backward
                nextIndex = (currentIndex - 1 + fields.length) % fields.length;
            } else {
                // Tab: move forward
                nextIndex = (currentIndex + 1) % fields.length;
            }

            fields[nextIndex].focus();
            fields[nextIndex].select();

            log(`Next Index ${nextIndex}`)

            if (nextIndex === 0) {

                log('Search Input is Cleared.')

                document.getElementById('searchInput').value = '';
                filteredArray = [...dbArray]; // reset to full list
                activeIndex = -1;
                renderList(filteredArray);

            }
        }

        // Special Area Key Setup

        if (event.key === 'Enter' && document.querySelector('#couponbox').classList.contains('d-block')) {
            event.preventDefault()
            log('Enter and Print Button Clicked');
            document.querySelector('#couponbox > div > div.container_100.text-center.d-inline-block.py-2 > input.btn.theme_blue.text-center.bounce.animated.delay-1s.printbtn').click();
        } else if (event.key === 'Enter' && event.target.matches('#ContentPlaceHolder1_capcnf_txtCaptcha') && event.target.value.length != 4) {
            event.preventDefault()
            log('Captcha Length must be 4 characters')
        }

        if (event.key === 'Escape' && document.querySelector('#couponbox').classList.contains('d-block')) {
            event.preventDefault()
            log('ESC and CLOSE Button Clicked');
            document.querySelector('#couponbox > div > div.container_100.text-center.d-inline-block.py-2 > input.btn.theme_blue.text-center.bounce.animated.delay-1s.close_printpopup').click();
            log('Name in Focus');
            document.querySelector('#ContentPlaceHolder1_txt_Name').focus();
        } else if (event.key === 'Escape') {
            event.preventDefault()
            log('ESC Button Pressed');
            log('Name in Focus');
            document.querySelector('#ContentPlaceHolder1_txt_Name').focus();
        }

        if (event.key === 'ArrowUp' && event.target.matches('#ContentPlaceHolder1_txt_FatherHusbandName, #ContentPlaceHolder1_txt_MobileNumber')) {
            event.preventDefault()
            log('Arrow Up Key')

            if (event.target.matches('#ContentPlaceHolder1_txt_FatherHusbandName')) {

                fName = window.localStorage.getItem('fName') || '';

                event.target.value = fName;
                event.target.parentElement.classList.add('has-value');

            }

            if (event.target.matches('#ContentPlaceHolder1_txt_MobileNumber')) {

                numb = window.localStorage.getItem('numb') || '';

                event.target.value = numb;
                event.target.parentElement.classList.add('has-value');

            }

        }

        // Side Panel Key Setup

        if ((event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter') && (filteredArray.length === 0) && ((event.target.matches('#searchInput')) || (event.target.matches('#ContentPlaceHolder1_txt_Name') && !document.getElementById('body').classList.contains('hidden') && !document.querySelector('#couponbox').classList.contains('d-block') && !document.getElementById('loadingdiv').classList.contains('loadingdivcls')))) {
            event.preventDefault()
            log('Return None.')
            return
        }

        if (event.key === 'ArrowDown' && ((event.target.matches('#searchInput')) || (event.target.matches('#ContentPlaceHolder1_txt_Name') && !document.getElementById('body').classList.contains('hidden') && !document.querySelector('#couponbox').classList.contains('d-block') && !document.getElementById('loadingdiv').classList.contains('loadingdivcls')))) {
            event.preventDefault();
            log('ArrowDown key')
            activeIndex = (activeIndex + 1) % filteredArray.length;
            renderList(filteredArray);
        }

        if (event.key === 'ArrowUp' && ((event.target.matches('#searchInput')) || (event.target.matches('#ContentPlaceHolder1_txt_Name') && !document.getElementById('body').classList.contains('hidden') && !document.querySelector('#couponbox').classList.contains('d-block') && !document.getElementById('loadingdiv').classList.contains('loadingdivcls')))) {
            event.preventDefault();
            log('ArrowUp key')
            activeIndex = (activeIndex - 1 + filteredArray.length) % filteredArray.length;
            renderList(filteredArray);
        }

        if (event.key === 'Enter' && ((event.target.matches('#searchInput')) || (event.target.matches('#ContentPlaceHolder1_txt_Name') && !document.getElementById('body').classList.contains('hidden') && !document.querySelector('#couponbox').classList.contains('d-block') && !document.getElementById('loadingdiv').classList.contains('loadingdivcls')))) {
            event.preventDefault();
            log('Enter key')
            if (activeIndex >= 0 && activeIndex < filteredArray.length) {
                boxClick(null, filteredArray[activeIndex]);
            }
        }

        // Extra Data Validation

        const isCtrl = event.ctrlKey || event.metaKey;

        const allowedKeys = [
            'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
            'Tab', 'Home', 'End', 'Shift', 'Enter'
        ];

        const allowedCtrlCombos = ['a', 'c', 'v', 'x'];

        const allowThisKey = allowedKeys.includes(event.key) || (isCtrl && allowedCtrlCombos.includes(event.key.toLowerCase()));

        // 🔢 Digits only for mobile number & captcha
        if (event.target.matches('#ContentPlaceHolder1_txt_MobileNumber, #ContentPlaceHolder1_capcnf_txtCaptcha') && !/^[0-9]$/.test(event.key) && !allowThisKey) {
            event.preventDefault();
            log('Key Filter - Number - from keydown');
        }

        // 🔤 Alphabets & spaces only for Name and Father/Husband Name
        if (event.target.matches('#ContentPlaceHolder1_txt_Name, #ContentPlaceHolder1_txt_FatherHusbandName') && !/^[a-zA-Z ]$/.test(event.key) && !allowThisKey) {
            event.preventDefault();
            log('Key Filter - a-Z - from keydown');
        }



    });

    document.addEventListener('input', event => {

        // Extra Data Validation
        if (event.target.matches('#ContentPlaceHolder1_txt_FatherHusbandName')) {

            fName = event.target.value;

            if (fName.length > 3) {

                window.localStorage.setItem('fName', fName)

                event.target.nextElementSibling.style.borderColor = 'green';

            }
        }

        if (event.target.matches('#ContentPlaceHolder1_txt_MobileNumber')) {

            const textContent = event.target.value.trim();

            const isNumber = /^\d{10}$/.test(textContent);

            if (isNumber) {

                window.localStorage.setItem('numb', textContent)

                document.querySelector(':root').style.setProperty('--num-color', 'green');

            } else {

                log('Element does not contain a valid 10-digit number.');
                document.querySelector(':root').style.setProperty('--num-color', 'red');
            }

        }

        if (event.target.matches('#searchInput')) {

            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {

                const query = event.target.value.toLowerCase();
                activeIndex = -1;

                filteredArray = []

                for (let i = 0; i < dbArray.length; i++) {
                    const row = dbArray[i];
                    if (row.some(cell => cell.toLowerCase().includes(query))) {
                        filteredArray.push([...row, i]); // Append original index
                    }
                }

                renderList(filteredArray);

            }, 200);

        }

        if (event.target.matches('#ContentPlaceHolder1_txt_Name') && !document.getElementById('body').classList.contains('hidden') && !document.querySelector('#couponbox').classList.contains('d-block') && !document.getElementById('loadingdiv').classList.contains('loadingdivcls')) {

            log('Keys in Name Input')

            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {

                const query = event.target.value.toLowerCase();
                document.getElementById('searchInput').value = query;
                activeIndex = -1;

                filteredArray = []

                for (let i = 0; i < dbArray.length; i++) {
                    const row = dbArray[i];
                    if (row.some(cell => cell.toLowerCase().includes(query))) {
                        filteredArray.push([...row, i]); // Append original index
                    }
                }

                renderList(filteredArray);

            }, 200);

        }

        // Numbers only (for Mobile Number and Captcha)
        if (event.target.matches('#ContentPlaceHolder1_txt_MobileNumber, #ContentPlaceHolder1_capcnf_txtCaptcha')) {
            event.target.value = event.target.value.replace(/[^0-9]/g, '');
            log('Key Filter - Number')


        }

        // Alphabets and space only (for Name and Father/Husband Name)
        if (event.target.matches('#ContentPlaceHolder1_txt_Name, #ContentPlaceHolder1_txt_FatherHusbandName')) {
            event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, '');
            log('Key Filter - a-Z')

        }

    });

    document.addEventListener('click', event => {

        if (event.target.matches('#searchInput')) {
            event.preventDefault();

            log('Search Input is Cleared.')

            document.getElementById('searchInput').value = '';
            filteredArray = [...dbArray]; // reset to full list
            activeIndex = -1;
            renderList(filteredArray);

        }

        if (event.target.matches('#load, .spn#load>img')) {
            event.preventDefault();
            log('Load Button Pressed.')

            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json,application/json';

            input.onchange = event => {
                const file = event.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = e => {
                    try {
                        const jsonData = JSON.parse(e.target.result); // Validate it's valid JSON
                        localStorage.setItem('DB', JSON.stringify(jsonData)); // Save to localStorage
                        log('JSON data successfully saved to localStorage under "DB" key.');
                        reloadDbArray()
                    } catch (err) {
                        log('Invalid JSON file.');
                        log(err);
                    }
                };
                reader.readAsText(file);
            };

            input.click(); // Trigger file selector

        }

        if (event.target.matches('#add, .spn#add>img')) {
            event.preventDefault();
            log('Add Button Pressed.')

            const name = document.getElementById('ContentPlaceHolder1_txt_Name')?.value.trim();
            const fatherName = document.getElementById('ContentPlaceHolder1_txt_FatherHusbandName')?.value.trim();
            const mobileInput = document.getElementById('ContentPlaceHolder1_txt_MobileNumber')?.value.trim();

            // Clean and validate mobile number
            const mobileNumber = mobileInput.replace(/\D/g, ''); // Remove non-digits
            const isValidMobile = /^\d{10}$/.test(mobileNumber);

            if (!name || !fatherName || !mobileNumber) {
                log('One or more fields are empty.');
                log('Please fill in Name, Father Name, and Mobile Number.');
                return;
            }

            if (!isValidMobile) {
                log('Invalid mobile number:', mobileInput);
                log('Mobile number must be exactly 10 digits.');
                return;
            }

            const newEntry = [name.toUpperCase(), fatherName.toUpperCase(), mobileNumber];

            // Fetch existing DB
            let localDbArray = [];
            try {
                const existingData = localStorage.getItem('DB');
                if (existingData) {
                    localDbArray = JSON.parse(existingData);
                    if (!Array.isArray(localDbArray)) throw new Error('Invalid DB format.');
                }
            } catch (err) {
                log('Error reading localStorage DB:', err);
                localDbArray = [];
            }

            // Append new data
            localDbArray.push(newEntry);

            // Store back
            try {
                localStorage.setItem('DB', JSON.stringify(localDbArray));
                log('New entry added and DB updated:', newEntry);
                log('Data saved successfully.');
                reloadDbArray()
            } catch (err) {
                log('Failed to update localStorage DB:', err);
                log('Failed to save data.');
            }

        }

        if (event.target.matches('#download, .spn#download>img')) {
            event.preventDefault();
            log('Download Button Pressed.')

            downloadLocalStorageDB()

        }

        const box = event.target.closest(".box");

        if (box) {

            boxArr = JSON.parse(box.dataset.arr)
            boxIndex = box.dataset.index

            log('box is Clicked by Mouse.')


            // Check for .del-div and .del-div>h4.x
            if (event.target.matches('.del-div, .del-div>h4.x')) {
                console.log("Delete button clicked for box ID:", boxIndex);
                delIndex(Number(boxIndex))

                return; // Optional: stop here if delete was clicked
            }

            boxClick(null, boxArr)

        }

    });
};

function log(data) {
    console.log(data)
}

console.log('Welcome to Rasoi Plus Fast Entry.');

let observerTarget = document.body;

// Debounce utility
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Define debounced version of your handler
const debouncedHandleDOMChanges = debounce(() => {
    // Temporarily stop observing to prevent infinite loops
    observer.disconnect();

    theMain();

    // Restart observer after changes
    observer.observe(observerTarget, {
        childList: true,
        subtree: true,
        attributes: true
    });
}, 1200); // Adjust debounce delay as needed

// Set up MutationObserver
const observer = new MutationObserver(debouncedHandleDOMChanges);

observer.observe(observerTarget, {
    childList: true,
    subtree: true,
    attributes: true
});