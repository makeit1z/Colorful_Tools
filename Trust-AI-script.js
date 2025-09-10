import {loadAndPlayAnimation} from "./script/Think_Status.js"
import {RandomTime} from "./script/Random_Time.js"

document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');


    async function sendMessage() {
        checkVideoExist()

        await loadAndPlayAnimation("chat-messages","./Resource/thonking.json", RandomTime()*1000)

        if (isThursday()){
            insertText()
            insertVideoToChat()
            const response = getAIResponse('Secret DAY!')
            console.log(response)
            addMessage(response, 'bot')
        }

        const message = userInput.value.trim();
        if (message) {
            // 添加用户消息
            addMessage(message, 'user');

            // 清空输入框
            userInput.value = '';

            // 模拟AI回复
            setTimeout(() => {
                const response = getAIResponse(message);
                addMessage(response, 'bot');
            }, 1000);
        }
    }
    
    function addMessage(content, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        messageElement.textContent = content;
        chatMessages.appendChild(messageElement);
        
        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 简单的AI回复逻辑
    function getAIResponse(message) {
        const lowerMsg = message.toLowerCase();
        if (lowerMsg.includes('你好') || lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
            return "你好！很高兴和你聊天。";
        } else if (lowerMsg.includes('帮助') || lowerMsg.includes('help')) {
            return "我可以回答你的问题或提供建议。你想了解什么？";
        } else if (lowerMsg.includes('谢谢') || lowerMsg.includes('感谢')) {
            return "不客气！随时为你服务。";
        } else if(message.includes("Secret DAY!")){
            return ">>再次点击跳发送过广告<<"
        } else {
            return "我明白了。关于\"" + message + "\"，我帮你问问DeepSeek！";
        }
    }

    function checkVideoExist(){
        const videoElement = document.getElementsByClassName("video_container")
        const leftContainer = document.getElementsByClassName("left_container")
        const rightContainer = document.getElementsByClassName("right_container")

        if (leftContainer.length >= 2){
            leftContainer[0].remove()
        }

        if (rightContainer.length >= 2){
            rightContainer[0].remove()
        }

        if (videoElement.length > 0) {
            videoElement[0].remove();
        }
    }

    function insertText(){
        //左边,获取中间的div用于在前面插入
        const chatContainer = document.getElementsByClassName('chat-container');

        const left_container = document.createElement('div');
        left_container.className = 'left_container';

        const left_content = document.createElement('div');
        left_content.className = 'left_content';

        ['疯','狂','星', '期'].forEach(function(text, index){
            const span = document.createElement('span');
            span.className = `slogan slogan${index + 1}`;
            span.textContent = text;
            left_content.appendChild(span);
        })

        left_container.appendChild(left_content);
        document.body.insertBefore(left_container, chatContainer[0]);


        //右边
        const right_container = document.createElement('div');
        right_container.className = 'right_container';

        const right_content = document.createElement('div');
        right_content.className = 'right_content';

        ['四','微','五','十'].forEach(function(text, index){
            const span = document.createElement('span');
            span.className = `slogan slogan${index + 1}`;
            span.textContent = text;
            right_content.appendChild(span);
        })
        right_container.appendChild(right_content);
        document.body.appendChild(right_container)
    }

    function insertVideoToChat() {
        const chatMessages = document.getElementById('chat-messages');

        // 计算合适的视频尺寸
        const maxVideoWidth = chatMessages.clientWidth;
        const maxVideoHeight = window.innerHeight;

        const videoContainer = document.createElement('div');
        videoContainer.className = 'video_container';

        const video = document.createElement('video');
        video.className = 'video_player';
        //video.controls = true; 关闭视频控件
        video.autoplay = true;
        video.style.maxWidth = `${maxVideoWidth}px`;
        video.style.maxHeight = `${maxVideoHeight}px`;

        // 添加加载事件处理
        video.addEventListener('loadedmetadata', function() {
            // 确保视频不会超出最大尺寸
            if (this.videoHeight > maxVideoHeight) {
                const ratio = maxVideoHeight / this.videoHeight;
                this.style.width = `${this.videoWidth * ratio}px`;
            }

            // 滚动到视频底部
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        });

        const source = document.createElement('source');
        source.src = "./Resource/FinalPart.mp4";
        source.type = 'video/mp4';

        video.appendChild(source);
        videoContainer.appendChild(video);
        chatMessages.appendChild(videoContainer);

        // 预加载第一帧
        video.preload = 'metadata';

        return video;
    }

    function isThursday(){
        return new Date().getDay() === 4; //判断是否是周四
    }
    
    // 发送按钮点击事件
    sendButton.addEventListener('click', sendMessage);
    
    // 输入框回车事件
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
