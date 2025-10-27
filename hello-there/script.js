document.addEventListener('DOMContentLoaded', function() {
    const firstCard = document.getElementById('first-card');
    const secondCard = document.getElementById('second-card');
    const messageContainer = document.getElementById('message-container');
    const greetButton = document.getElementById('greet-button');
    const nextMessageButton = document.getElementById('next-message-button');
    const messageText = document.getElementById('message-text');
    const langToggle = document.getElementById('lang-toggle');
    const messages = [
        "Hey cutie, you're amazing! Keep it up! 🔥",
        "Remember, your smile brightens the day! 💖",
        "You're much greater than you think! 🌺",
        "Just a reminder that you're doing great, gorgeous! ✨",
        "You deserve all the happiness in the world! 🎀",
        "Your effort's worth more than you can imagine! 🌟",
        "Never forget how special and unique you are! 💕",
        "Be proud of yourself! You're doing amazing! 💗",
        "No gem shines brighter than you! 💎",
        "Keep shining bright like the star you are! ⭐",
        "I believe in you, even when you don't believe in yourself! 🤗",
        "Take a moment to appreciate how far you've come! 💓",
        "Never give up, gorgeous! You're stronger than you think! 💪",
    ];
    
    // Vietnamese translations with softer, more natural phrasing
    const messagesVi = [
        "Bạn thật tuyệt — giữ vững nhé! 🔥",
        "Nụ cười của bạn làm sáng cả ngày này! 💖",
        "Bạn còn tuyệt hơn bạn tưởng đấy! 🌺",
        "Nhắc nhẹ rằng bạn đang làm rất tốt, nhé? ✨",
        "Bạn xứng đáng với mọi điều tốt đẹp! 🎀",
        "Nỗ lực của bạn thật đáng quý! 🌟",
        "Đừng quên bạn thật đặc biệt và duy nhất! 💕",
        "Tự hào về bản thân nhé — bạn đang làm tốt! 💗",
        "Không ai tỏa sáng hơn bạn! 💎",
        "Tỏa sáng theo cách của riêng bạn! ⭐",
        "Mình tin bạn, kể cả khi bạn còn hoài nghi! 🤗",
        "Dành chút để nhìn lại và thấy mình đã tiến bộ nhé! 💓",
        "Đừng bỏ cuộc — bạn mạnh mẽ hơn bạn nghĩ! 💪",
    ];
    
    let currentLang = 'en'; // 'en' or 'vi'

    const firstMessage = () => (currentLang === 'en' ? messages[0] : messagesVi[0]);

    let remainingMessages = () => {
        return currentLang === 'en' ? [...messages.slice(1)] : [...messagesVi.slice(1)];
    };
    let remaining = remainingMessages();
    shuffleArray(remaining);
    
    let isFirstClick = true;
    
    const titleEl = document.querySelector('.title');

    // Ensure the language toggle shows the available target language on load
    if (langToggle) langToggle.textContent = 'VI';

    // When greet button is clicked, switch to second card
    greetButton.addEventListener('click', () => {
        firstCard.classList.remove('active');
        secondCard.classList.add('active');
        
        // Show first message (not random)
        messageText.textContent = firstMessage();
        messageContainer.classList.add('message-pop');
        
        // Reset animation
        setTimeout(() => {
            messageContainer.classList.remove('message-pop');
        }, 500);
        
        isFirstClick = false;
    });
    
    // When next message button is clicked, show next random message
    nextMessageButton.addEventListener('click', () => {
        displayNextMessage();
    });
    
    // Function to display the next message with animation
    function displayNextMessage() {
        // If we've used all messages, reshuffle and start again
        if (remaining.length === 0) {
            // Recreate remaining from the currently selected language
            remaining = currentLang === 'en' ? [...messages] : [...messagesVi];
            shuffleArray(remaining);
        }
        
        // Get and remove the first message from the shuffled array
        const message = remaining.shift();
        
        // Display the message with animation
    messageText.textContent = message;
        messageContainer.classList.add('message-pop');
        
        // Reset animation
        setTimeout(() => {
            messageContainer.classList.remove('message-pop');
        }, 500);
    }
    
    // Fisher-Yates shuffle algorithm to randomize array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Language toggle behavior
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            // Switch language
            currentLang = currentLang === 'en' ? 'vi' : 'en';

            // Update toggle label (show what will switch to)
            langToggle.textContent = currentLang === 'en' ? 'VI' : 'EN';

            // Update static UI text
            titleEl.textContent = currentLang === 'en' ? 'Hello?' : 'Chào bạn?';
            // Use a font that supports Vietnamese diacritics when in Vietnamese
            titleEl.classList.toggle('vi', currentLang === 'vi');

            greetButton.textContent = currentLang === 'en' ? 'Click for a surprise! ♥' : 'Nhấn để nhận bất ngờ! ♥';
            nextMessageButton.textContent = currentLang === 'en' ? 'Another! ♥' : 'Thêm nữa! ♥';
            const dateBtn = document.querySelector('.date-button');
            if (dateBtn) dateBtn.textContent = currentLang === 'en' ? "Uhhh... I have a question 👉👈" : "Ừm... Mình muốn hỏi bạn một điều 👉👈";

            // Reset messages for the selected language
            remaining = currentLang === 'en' ? [...messages.slice(1)] : [...messagesVi.slice(1)];
            shuffleArray(remaining);

            // If second card is active, show the language-specific first message
            if (secondCard.classList.contains('active')) {
                messageText.textContent = currentLang === 'en' ? messages[0] : messagesVi[0];
                messageContainer.classList.add('message-pop');
                setTimeout(() => messageContainer.classList.remove('message-pop'), 500);
            }
        });
    }
});