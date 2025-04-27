const ELEMENT_CLASS_NAME = "col-xs-12 result-item enhanced   priority-qa listing-redesign-dt";

class AutoTraderHighlighter {
    constructor() {
        this.elArray = [];
        this.usrSettingHideHi = null;
        this.REVIEW_DELAY = 600000; // 10 minutes in milliseconds
        this.CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/autotraderca-hide-sponsor/bjlfpfclblolnooaiaiejdfpenlkmaba?hl=en';
        this.init();
    }

    async init() {
        try {
            const result = await chrome.storage.sync.get({
                ath_setting_hide_highlight: "hide",
                lastReviewPrompt: null,
                hasReviewed: false
            });
            this.usrSettingHideHi = result.ath_setting_hide_highlight;
            this.updateElements();
            this.setupEventListeners();
            this.logic();
            
            // Check for review prompt
            if (!result.hasReviewed && (!result.lastReviewPrompt || Date.now() - result.lastReviewPrompt > this.REVIEW_DELAY)) {
                setTimeout(() => this.showReviewPrompt(), this.REVIEW_DELAY);
                // Update last prompt time
                chrome.storage.sync.set({ lastReviewPrompt: Date.now() });
            }
        } catch (error) {
            console.error("Failed to initialize:", error);
        }
    }

    setupEventListeners() {
        if (typeof navigation !== 'undefined') {
            navigation.addEventListener("navigate", () => {
                this.updateElements();
                this.logic();
            });
        }
    }

    updateElements() {
        this.elArray = document.getElementsByClassName(ELEMENT_CLASS_NAME) || this.findElements();
    }

    findElements() {
        const elements = [];
        const tmp = document.getElementsByClassName(ELEMENT_CLASS_NAME);
        
        for (const element of tmp) {
            if (element.className === ELEMENT_CLASS_NAME) {
                elements.push(element);
            }
        }
        return elements;
    }

    logic() {
        if (!this.usrSettingHideHi) return;

        switch (this.usrSettingHideHi) {
            case "highlight":
                this.pinkify();
                break;
            case "hide":
                this.hideify();
                break;
            default:
                console.error("Invalid setting:", this.usrSettingHideHi);
        }
    }

    pinkify() {
        this.modifyElements(element => {
            if (element.children[1]) {
                // Set main background color
                element.children[1].style.background = "#fff1f5";
                
                // Find and style all child elements that have a white background
                const childElements = element.children[1].getElementsByTagName('*');
                Array.from(childElements).forEach(child => {
                    const computedStyle = window.getComputedStyle(child);
                    if (computedStyle.backgroundColor === 'rgb(255, 255, 255)' || 
                        computedStyle.backgroundColor === 'white' || 
                        computedStyle.backgroundColor === '') {
                        child.style.backgroundColor = "#ffe4e9"; // Slightly darker pink for child elements
                    }
                });
            }
        });
    }

    hideify() {
        this.modifyElements(element => {
            if (element.children[1]) {
                const banner = document.createElement('div');
                banner.style.cssText = `
                    background: #f8f9fa;
                    border: 1px solid #dee2e6;
                    border-radius: 4px;
                    padding: 1rem;
                    margin: 0.5rem;
                    text-align: center;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
                    color: #6c757d;
                    font-size: 14px;
                `;
                banner.textContent = "Sponsored ad, hidden by AutoTrader.CA Highlighter";
                element.innerHTML = '';
                element.appendChild(banner);
            }
        });
    }

    modifyElements(callback) {
        Array.from(this.elArray).forEach(element => {
            try {
                callback(element);
            } catch (error) {
                console.error("Error modifying element:", error);
            }
        });
    }

    showReviewPrompt() {
        const promptBox = document.createElement('div');
        promptBox.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 10000;
            max-width: 300px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        `;
        
        promptBox.innerHTML = `
            <div style="margin-bottom: 15px; color: #333;">
                Enjoying AutoTrader.CA Highlighter? Please consider leaving a review!
            </div>
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button id="ath-review-later" style="padding: 8px 12px; border: 1px solid #ddd; background: #f8f9fa; border-radius: 4px; cursor: pointer;">Maybe Later</button>
                <button id="ath-review-now" style="padding: 8px 12px; background: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer;">Review Now</button>
            </div>
        `;
        
        document.body.appendChild(promptBox);
        
        document.getElementById('ath-review-now').addEventListener('click', () => {
            chrome.storage.sync.set({ hasReviewed: true });
            window.open(this.CHROME_STORE_URL, '_blank');
            promptBox.remove();
        });
        
        document.getElementById('ath-review-later').addEventListener('click', () => {
            promptBox.remove();
        });
    }
}

// Initialize the highlighter
new AutoTraderHighlighter();