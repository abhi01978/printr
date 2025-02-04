// const socket = io();

// // Handle user connection
// const username = prompt('Enter your username:');
// socket.emit('new-user', username);

// // Update online users
// socket.on('update-users', (users) => {
//     const userList = document.getElementById('user-list');
//     userList.innerHTML = '';
//     users.forEach((user) => {
//         const li = document.createElement('li');
//         li.textContent = user.username;
//         userList.appendChild(li);

//          // Play notification sound when a user comes online
//          const onlineSound = new Audio('path/to/notification.mp3');  // Path to the sound file
//          onlineSound.play();
//     });
// });

// // Typing indicator
// const messageInput = document.getElementById('message-input');
// const typingIndicator = document.querySelector('.typing-indicator');
// messageInput.addEventListener('input', () => {
//     socket.emit('typing', `${username} is typing...`);
// });

// socket.on('typing', (message) => {
//     typingIndicator.textContent = message;
//     setTimeout(() => (typingIndicator.textContent = ''), 1000);
// });

// // Handle messages
// const messages = document.getElementById('messages');
// const sendBtn = document.getElementById('send-btn');
// sendBtn.addEventListener('click', sendMessage);
// messageInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') sendMessage();
// });



// function sendMessage() {
//     const message = messageInput.value.trim();
//     if (message) {
//         const data = { username, message };
//         socket.emit('send-message', data); // Emit message to server
//         // appendMessage(data, true); // Locally append sender's message
//         messageInput.value = ''; // Clear input field
//     }
// }

// function appendMessage(data, isSender) {
//     const div = document.createElement('div');
//     div.className = `p-2 rounded-lg mb-2 max-w-xs ${isSender ? 'bg-red-500 text-white ml-auto' : 'bg-blue-500 text-white mr-auto'}`;
//     div.textContent = `${data.username}: ${data.message}`;
//     messages.appendChild(div);
//     messages.scrollTo = messages.scrollHeight;
// }



// ////emoji 


// const emojiPicker = document.getElementById('emoji-picker');
// const emojiBtn = document.getElementById('emoji-btn');

// // Toggle emoji picker
// emojiBtn.addEventListener('click', () => {
//     if (emojiPicker.classList.contains('hidden')) {
//         emojiPicker.classList.remove('hidden');
//         emojiPicker.innerHTML = ''; // Clear previous emojis
//         loadEmojiPicker();
//     } else {
//         emojiPicker.classList.add('hidden');
//     }
// });

// // Load Emoji Picker
// function loadEmojiPicker() {
//     const emojis = [
//         "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "☺️", "🙂", "🤗",
//         "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "🥱", "😴", "😌", "😛", "😜",
//         "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨",
//         "😩", "🤯", "😬", "😰", "😱", "🥵", "🥶", "😳", "🤪", "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "😇",
//         "🥳", "🥺", "🤠", "🤡", "🤥", "🤫", "🤭", "🧐", "🤓", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "👾", "🤖", "🎃", "😺"
//     ];

//     emojis.forEach((emoji) => {
//         const button = document.createElement('button');
//         button.textContent = emoji;
//         button.className = 'p-1 text-xl';
//         button.addEventListener('click', () => {
//             messageInput.value += emoji; // Add emoji to the input field
//             emojiPicker.classList.add('hidden'); // Hide emoji picker
//         });
//         emojiPicker.appendChild(button);
//     });
// }





// //////file send

// const fileInput = document.getElementById('file-input');
// const fileBtn = document.getElementById('file-btn');

// // Open file selector when button is clicked
// fileBtn.addEventListener('click', () => {
//     fileInput.click();
// });

// // Handle file upload
// fileInput.addEventListener('change', async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await fetch('/upload', {
//                 method: 'POST',
//                 body: formData,
//             });
//             const data = await response.json();
//             if (data.fileUrl) {
//                 // Send file URL as a message
//                 socket.emit('send-message', { fileUrl: data.fileUrl, fileName: file.name });
//             }
//         } catch (error) {
//             console.error('File upload failed:', error);
//         }
//     }
//     event.target.value = ''; // Reset the file input
// });

// // // Handle received messages (including files)
// socket.on('receive-message', (data) => {
//     console.log('Received message data:', data); // Debugging: Log the received data
    
//      // Play notification sound when a new message arrives
//      const messageSound = new Audio('path/to/notification.mp3');  // Path to the sound file
//      messageSound.play();
     
//     const messageElement = document.createElement('div');

//     // Style messages based on sender or receiver
//     if (data.sender === socket.id) {
//         messageElement.className = 'p-2 rounded-lg mb-2 text-right bg-red-200';
//     } else {
//         messageElement.className = 'p-2 rounded-lg mb-2 text-left bg-blue-200';
//     }

//     if (data.fileUrl) {
//         // Check if the file is an image
//         if (['.jpeg', '.jpg', '.png', '.gif'].some(ext => data.fileUrl.toLowerCase().endsWith(ext))) {
//             messageElement.innerHTML = `
//                 <img src="${data.fileUrl}" alt="Image" class="max-w-xs rounded-lg border">
//             `;
//         }
        
//     } else if (data.message) {
//         messageElement.textContent = data.message;
//     }
    

//     // Append message and scroll
//     messages.appendChild(messageElement);
//     scrollToBottom(); // Scroll chat box to the latest message
// });

// //Function to scroll chat box to the bottom
// //Ensure chat box auto-scrolls when new messages or images are added
// function scrollToBottom() {
//     messages.scrollTop = messages.scrollHeight;
// }


// //Handle received messages (including GIFs and files)

// // socket.on('receive-message', (data) => {
// //     const messageElement = document.createElement('div');
// //     if (data.gifUrl) {
// //         messageElement.innerHTML = `<img src="${data.gifUrl}" alt="GIF" class="max-w-xs rounded-lg border">`;
// //     } else if (data.fileUrl) {
// //         if (['.jpeg', '.jpg', '.png', '.gif'].some(ext => data.fileUrl.toLowerCase().endsWith(ext))) {
// //             messageElement.innerHTML = `<img src="${data.fileUrl}" alt="Sticker" class="max-w-xs rounded-lg border">`;
// //         }
// //     } else if (data.message) {
// //         messageElement.textContent = `${data.username}: ${data.message}`;
// //     }

// //     messages.appendChild(messageElement);
// //     messages.scrollTop = messages.scrollHeight;
// // });



//  // GIF Search
//  const gifSearchBtn = document.getElementById('gif-search-btn');
//  const gifSearchContainer = document.getElementById('gif-search-container');
//  const gifSearchInput = document.getElementById('gif-search-input');
//  const gifResults = document.getElementById('gif-results');

//  gifSearchBtn.addEventListener('click', () => {
//      gifSearchContainer.classList.toggle('hidden');
//  });
//  async function searchGifs(query) {
//     if (!query) return;

//     const apiKey = 'JHbC9cDPANFSBTjyAV0LqfYr3o2qQH7S';
//     const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=10`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         gifResults.innerHTML = '';
//         data.data.forEach(gif => {
//             const img = document.createElement('img');
//             img.src = gif.images.fixed_height.url;
//             img.classList.add('gif');
//             img.addEventListener('click', () => sendGif(gif.images.fixed_height.url));
//             gifResults.appendChild(img);
//         });
//     } catch (error) {
//         console.error('Error fetching GIFs:', error);
//     }
// }

// gifSearchInput.addEventListener('input', (e) => {
//     searchGifs(e.target.value);
// });

// // function sendGif(gifUrl) {
// //     socket.emit('send-message', { gifUrl });
// //     gifSearchContainer.classList.add('hidden');
// // }
// // Function to send the selected GIF URL

// function sendGif(gifUrl) {
//     const data = { gifUrl, username }; // Include username to identify the sender
//     socket.emit('send-message', data); // Emit the data to the server
//     gifSearchContainer.classList.add('hidden'); // Hide the GIF search container
// }

// // Append messages or files
// function appendMessage(data, isSender) {
//     const messageElement = document.createElement('div');
//     messageElement.className = `p-2 rounded-lg mb-2 max-w-xs ${isSender ? 'bg-red-500 text-white ml-auto' : 'bg-blue-500 text-white mr-auto'}`;

//     // Check for file or text message
//     if (data.fileUrl) {
//         if (['.jpeg', '.jpg', '.png', '.gif'].some((ext) => data.fileUrl.toLowerCase().endsWith(ext))) {
//             messageElement.innerHTML = `<img src="${data.fileUrl}" alt="Image" class="max-w-xs rounded-lg border">`;
//         } else {
//             messageElement.innerHTML = `<a href="${data.fileUrl}" target="_blank" class="text-blue-500 underline">${data.fileName || 'Download File'}</a>`;
//         }
//     } else if (data.message) {
//         messageElement.textContent = `${data.username}: ${data.message}`;
//     }

//     // Append to chat box and scroll
//     messages.appendChild(messageElement);
//     scrollToBottom(); // Scroll to the latest message
// }




///////////////////////////////////RIGHT CODE
// const socket = io();

// // Handle user connection
// const username = prompt('Enter your username:');
// socket.emit('new-user', username);

// // Update online users
// socket.on('update-users', (users) => {
//     const userList = document.getElementById('user-list');
//     userList.innerHTML = '';
//     users.forEach((user) => {
//         const li = document.createElement('li');
//         li.textContent = user.username;
//         userList.appendChild(li);

//         // Play notification sound when a user comes online
//         const onlineSound = new Audio('path/to/notification.mp3'); // Path to the sound file
//         onlineSound.play();
//     });
// });

// // Typing indicator
// const messageInput = document.getElementById('message-input');
// const typingIndicator = document.querySelector('.typing-indicator');
// messageInput.addEventListener('input', () => {
//     socket.emit('typing', `${username} is typing...`);
// });

// socket.on('typing', (message) => {
//     typingIndicator.textContent = message;
//     setTimeout(() => (typingIndicator.textContent = ''), 1000);
// });

// // Handle messages
// const messages = document.getElementById('messages');
// const sendBtn = document.getElementById('send-btn');
// sendBtn.addEventListener('click', sendMessage);
// messageInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') sendMessage();
// });

// function sendMessage() {
//     const message = messageInput.value.trim();
//     if (message) {
//         const data = { username, message };
//         socket.emit('send-message', data); // Emit message to server
//         messageInput.value = ''; // Clear input field
//     }
// }

// // function appendMessage(data, isSender) {
// //     const div = document.createElement('div');
// //     div.className = `p-2 rounded-lg mb-2 max-w-xs ${isSender ? 'bg-red-500 text-white ml-auto' : 'bg-blue-500 text-white mr-auto'}`;
// //     div.textContent = `${data.username}: ${data.message}`;
// //     messages.appendChild(div);
// //     messages.scrollTo = messages.scrollHeight;
// // }

// // Emoji picker functionality
// const emojiPicker = document.getElementById('emoji-picker');
// const emojiBtn = document.getElementById('emoji-btn');

// emojiBtn.addEventListener('click', () => {
//     if (emojiPicker.classList.contains('hidden')) {
//         emojiPicker.classList.remove('hidden');
//         emojiPicker.innerHTML = ''; // Clear previous emojis
//         loadEmojiPicker();
//     } else {
//         emojiPicker.classList.add('hidden');
//     }
// });

// function loadEmojiPicker() {
//     const emojis = [
//         "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "☺️", "🙂", "🤗",
//         "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "🥱", "😴", "😌", "😛", "😜",
//         "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨",
//         "😩", "🤯", "😬", "😰", "😱", "🥵", "🥶", "😳", "🤪", "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "😇",
//         "🥳", "🥺", "🤠", "🤡", "🤥", "🤫", "🤭", "🧐", "🤓", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "👾", "🤖", "🎃", "😺"
//     ];

//     emojis.forEach((emoji) => {
//         const button = document.createElement('button');
//         button.textContent = emoji;
//         button.className = 'p-1 text-xl';
//         button.addEventListener('click', () => {
//             messageInput.value += emoji; // Add emoji to the input field
//             emojiPicker.classList.add('hidden'); // Hide emoji picker
//         });
//         emojiPicker.appendChild(button);
//     });
// }

// // File upload functionality
// const fileInput = document.getElementById('file-input');
// const fileBtn = document.getElementById('file-btn');

// // Open file selector when button is clicked
// fileBtn.addEventListener('click', () => {
//     fileInput.click();
// });

// // Handle file upload
// fileInput.addEventListener('change', async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await fetch('/upload', {
//                 method: 'POST',
//                 body: formData,
//             });
//             const data = await response.json();
//             if (data.fileUrl) {
//                 // Send file URL as a message
//                 socket.emit('send-message', { fileUrl: data.fileUrl, fileName: file.name });
//             }
//         } catch (error) {
//             console.error('File upload failed:', error);
//         }
//     }
//     event.target.value = ''; // Reset the file input
// });

// // Handle received messages (including GIFs and files)
// socket.on('receive-message', (data) => {
//     const messageElement = document.createElement('div');
//     if (data.gifUrl) {
//         messageElement.innerHTML = `<img src="${data.gifUrl}" alt="GIF" class="max-w-xs rounded-lg border">`;
//     } else if (data.fileUrl) {
//         if (['.jpeg', '.jpg', '.png', '.gif'].some(ext => data.fileUrl.toLowerCase().endsWith(ext))) {
//             messageElement.innerHTML = `<img src="${data.fileUrl}" alt="Sticker" class="max-w-xs rounded-lg border">`;
//         } else {
//             messageElement.innerHTML = `<a href="${data.fileUrl}" target="_blank" class="text-blue-500 underline">${data.fileName || 'Download File'}</a>`;
//         }
//     } else if (data.message) {
//         messageElement.textContent = `${data.username}: ${data.message}`;
//     }

//     messages.appendChild(messageElement);
//     messages.scrollTop = messages.scrollHeight;
// });

// // GIF Search functionality
// const gifSearchBtn = document.getElementById('gif-search-btn');
// const gifSearchContainer = document.getElementById('gif-search-container');
// const gifSearchInput = document.getElementById('gif-search-input');
// const gifResults = document.getElementById('gif-results');

// gifSearchBtn.addEventListener('click', () => {
//     gifSearchContainer.classList.toggle('hidden');
// });

// async function searchGifs(query) {
//     if (!query) return;

//     const apiKey = 'JHbC9cDPANFSBTjyAV0LqfYr3o2qQH7S'; // Use your Giphy API Key
//     const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=10`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         gifResults.innerHTML = '';
//         data.data.forEach(gif => {
//             const img = document.createElement('img');
//             img.src = gif.images.fixed_height.url;
//             img.classList.add('gif');
//             img.addEventListener('click', () => sendGif(gif.images.fixed_height.url));
//             gifResults.appendChild(img);
//         });
//     } catch (error) {
//         console.error('Error fetching GIFs:', error);
//     }
// }

// gifSearchInput.addEventListener('input', (e) => {
//     searchGifs(e.target.value);
// });

// function sendGif(gifUrl) {
//     const data = { gifUrl, username }; // Include username to identify the sender
//     socket.emit('send-message', data); // Emit the GIF URL to the server
//     gifSearchContainer.classList.add('hidden'); // Hide the GIF search container
// }

// // Append messages or files
// function appendMessage(data, isSender) {
//     const messageElement = document.createElement('div');
//     messageElement.className = `p-2 rounded-lg mb-2 max-w-xs ${isSender ? 'bg-red-500 text-white ml-auto' : 'bg-blue-500 text-white mr-auto'}`;

//     // Check for file or text message
//     if (data.fileUrl) {
//         if (['.jpeg', '.jpg', '.png', '.gif'].some((ext) => data.fileUrl.toLowerCase().endsWith(ext))) {
//             messageElement.innerHTML = `<img src="${data.fileUrl}" alt="Image" class="max-w-xs rounded-lg border">`;
//         } else {
//             messageElement.innerHTML = `<a href="${data.fileUrl}" target="_blank" class="text-blue-500 underline">${data.fileName || 'Download File'}</a>`;
//         }
//     } else if (data.message) {
//         messageElement.textContent = `${data.username}: ${data.message}`;
//     }

//     // Append to chat box and scroll
//     messages.appendChild(messageElement);
//     scrollToBottom(); // Scroll to the latest message
// }

// function scrollToBottom() {
//     messages.scrollTop = messages.scrollHeight;
// }

// ////////////////////RIGHT CODE END


// ////////222////////////////



// const socket = io();

// // Handle user connection
// const username = prompt('Enter your username:');
// socket.emit('new-user', username);

// // Update online users
// socket.on('update-users', (users) => {
//     const userList = document.getElementById('user-list');
//     userList.innerHTML = '';
//     users.forEach((user) => {
//         const li = document.createElement('li');
//         li.textContent = user.username;
//         userList.appendChild(li);

//         // Play notification sound when a user comes online
//         const onlineSound = new Audio('path/to/notification.mp3'); // Path to the sound file
//         onlineSound.play();
//     });
// });

// // Typing indicator
// const messageInput = document.getElementById('message-input');
// const typingIndicator = document.querySelector('.typing-indicator');
// messageInput.addEventListener('input', () => {
//     socket.emit('typing', `${username} is typing...`);
// });

// socket.on('typing', (message) => {
//     typingIndicator.textContent = message;
//     setTimeout(() => (typingIndicator.textContent = ''), 1000);
// });

// // Handle messages
// const messages = document.getElementById('messages');
// const sendBtn = document.getElementById('send-btn');
// sendBtn.addEventListener('click', sendMessage);
// messageInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') sendMessage();
// });

// function sendMessage() {
//     const message = messageInput.value.trim();
//     if (message) {
//         const data = { username, message };
//         socket.emit('send-message', data); // Emit message to server
//         messageInput.value = ''; // Clear input field
//     }
// }

// function appendMessage(data) {
//     const div = document.createElement('div');
//     const isSender = data.username === username;  // Check if the message is from the current user

//     // Apply styles based on sender/receiver
//     div.className = `p-2 rounded-lg mb-2 max-w-xs ${isSender ? 'bg-blue-500 text-white ml-auto' : 'bg-red-500 text-white mr-auto'}`;

//     // Check for file or text message
//     if (data.fileUrl) {
//         if (['.jpeg', '.jpg', '.png', '.gif'].some(ext => data.fileUrl.toLowerCase().endsWith(ext))) {
//             div.innerHTML = `<img src="${data.fileUrl}" alt="Image" class="max-w-xs rounded-lg border">`;
//         } else {
//             div.innerHTML = `<a href="${data.fileUrl}" target="_blank" class="text-blue-500 underline">${data.fileName || 'Download File'}</a>`;
//         }
//     } else if (data.message) {
//         div.textContent = `${data.username}: ${data.message}`;
//     }

//     // Append message to the chat and scroll to the bottom
//     messages.appendChild(div);
//     messages.scrollTop = messages.scrollHeight;
// }

// // Emoji picker functionality
// const emojiPicker = document.getElementById('emoji-picker');
// const emojiBtn = document.getElementById('emoji-btn');

// emojiBtn.addEventListener('click', () => {
//     if (emojiPicker.classList.contains('hidden')) {
//         emojiPicker.classList.remove('hidden');
//         emojiPicker.innerHTML = ''; // Clear previous emojis
//         loadEmojiPicker();
//     } else {
//         emojiPicker.classList.add('hidden');
//     }
// });

// function loadEmojiPicker() {
//     const emojis = [
//         "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "☺️", "🙂", "🤗",
//         "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "🥱", "😴", "😌", "😛", "😜",
//         "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨",
//         "😩", "🤯", "😬", "😰", "😱", "🥵", "🥶", "😳", "🤪", "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "😇",
//         "🥳", "🥺", "🤠", "🤡", "🤥", "🤫", "🤭", "🧐", "🤓", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "👾", "🤖", "🎃", "😺"
//     ];

//     emojis.forEach((emoji) => {
//         const button = document.createElement('button');
//         button.textContent = emoji;
//         button.className = 'p-1 text-xl';
//         button.addEventListener('click', () => {
//             messageInput.value += emoji; // Add emoji to the input field
//             emojiPicker.classList.add('hidden'); // Hide emoji picker
//         });
//         emojiPicker.appendChild(button);
//     });
// }

// // File upload functionality
// const fileInput = document.getElementById('file-input');
// const fileBtn = document.getElementById('file-btn');

// // Open file selector when button is clicked
// fileBtn.addEventListener('click', () => {
//     fileInput.click();
// });

// // Handle file upload
// fileInput.addEventListener('change', async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await fetch('/upload', {
//                 method: 'POST',
//                 body: formData,
//             });
//             const data = await response.json();
//             if (data.fileUrl) {
//                 // Send file URL as a message
//                 socket.emit('send-message', { fileUrl: data.fileUrl, fileName: file.name });
//             }
//         } catch (error) {
//             console.error('File upload failed:', error);
//         }
//     }
//     event.target.value = ''; // Reset the file input
// });

// // Handle received messages (including GIFs and files)
// socket.on('receive-message', (data) => {
//     const messageElement = document.createElement('div');
//     const isSender = data.username === username;

//     if (data.gifUrl) {
//         messageElement.innerHTML = `<img src="${data.gifUrl}" alt="GIF" class="max-w-xs rounded-lg border">`;
//     } else if (data.fileUrl) {
//         if (['.jpeg', '.jpg', '.png', '.gif'].some(ext => data.fileUrl.toLowerCase().endsWith(ext))) {
//             messageElement.innerHTML = `<img src="${data.fileUrl}" alt="Sticker" class="max-w-xs rounded-lg border">`;
//         } else {
//             messageElement.innerHTML = `<a href="${data.fileUrl}" target="_blank" class="text-blue-500 underline">${data.fileName || 'Download File'}</a>`;
//         }
//     } else if (data.message) {
//         messageElement.textContent = `${data.username}: ${data.message}`;
//     }

//     // Apply styles based on sender/receiver
//     messageElement.className = `p-2 rounded-lg mb-2 max-w-xs ${isSender ? 'bg-blue-500 text-white ml-auto' : 'bg-red-500 text-white mr-auto'}`;

//     messages.appendChild(messageElement);
//     messages.scrollTop = messages.scrollHeight;
// });

// // GIF Search functionality
// const gifSearchBtn = document.getElementById('gif-search-btn');
// const gifSearchContainer = document.getElementById('gif-search-container');
// const gifSearchInput = document.getElementById('gif-search-input');
// const gifResults = document.getElementById('gif-results');

// gifSearchBtn.addEventListener('click', () => {
//     gifSearchContainer.classList.toggle('hidden');
// });

// async function searchGifs(query) {
//     if (!query) return;

//     const apiKey = 'JHbC9cDPANFSBTjyAV0LqfYr3o2qQH7S'; // Your Giphy API Key
//     const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=10`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         gifResults.innerHTML = '';
//         data.data.forEach(gif => {
//             const img = document.createElement('img');
//             img.src = gif.images.fixed_height.url;
//             img.classList.add('gif');
//             img.addEventListener('click', () => sendGif(gif.images.fixed_height.url));
//             gifResults.appendChild(img);
//         });
//     } catch (error) {
//         console.error('Error fetching GIFs:', error);
//     }
// }

// gifSearchInput.addEventListener('input', (e) => {
//     searchGifs(e.target.value);
// });

// function sendGif(gifUrl) {
//     const data = { gifUrl, username }; // Include username to identify the sender
//     socket.emit('send-message', data); // Emit the GIF URL to the server
//     gifSearchContainer.classList.add('hidden'); // Hide the GIF search container
// }

// ///////22 end /////



// document.getElementById("uploadForm").addEventListener("submit", async (e) => {
//     e.preventDefault();
  
//     const formData = new FormData(document.getElementById("uploadForm"));
  
//     try {
//       const response = await fetch('/register', {
//         method: 'POST',
//         body: formData
//       });
  
//       // ✅ Check if the response is valid JSON
//       const contentType = response.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         throw new Error("Server returned an invalid response");
//       }
  
//       const data = await response.json();
//       console.log("Success:", data);
//     } catch (error) {
//       console.error("File upload failed:", error);
//     }
//   });

const socket = io();

// Handle user connection
const username = prompt('Enter your username:');
socket.emit('new-user', username);

// Update online users
// socket.on('update-users', (users) => {
//     const userList = document.getElementById('user-list');
//     userList.innerHTML = '';
//     users.forEach((user) => {
//         const li = document.createElement('li');
//         li.textContent = user.username;
//         userList.appendChild(li);

//         // Play notification sound when a user comes online
//         const onlineSound = new Audio('path/to/notification.mp3'); // Path to the sound file
//         onlineSound.play();
//     });
// });
socket.on('update-users', (userList) => {
    const userListElement = document.getElementById('user-list');
    userListElement.innerHTML = ''; // ✅ Clear existing list

    userList.forEach((username) => {
        const li = document.createElement('li');
        li.textContent = username;
        li.className = "p-2 bg-gray-200 rounded-lg mb-2"; // ✅ Styling
        userListElement.appendChild(li);
    });
});


// Typing indicator
const messageInput = document.getElementById('message-input');
const typingIndicator = document.querySelector('.typing-indicator');
messageInput.addEventListener('input', () => {
    socket.emit('typing', `${username} is typing...`);
});

socket.on('typing', (message) => {
    typingIndicator.textContent = message;
    setTimeout(() => (typingIndicator.textContent = ''), 1000);
});

// Handle messages
const messages = document.getElementById('messages');
const sendBtn = document.getElementById('send-btn');
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('send-message', { username, message });
        messageInput.value = '';
    }
}

// Append message to chat
// function appendMessage(data) {
//     const div = document.createElement('div');
//     const isSender = data.username === username;
//     div.className = `p-2 rounded-lg mb-2 max-w-xs ${isSender ? 'bg-blue-500 text-white ml-auto' : 'bg-red-500 text-white mr-auto'}`;

//     if (data.fileUrl) {
//         div.innerHTML = `<a href="${data.fileUrl}" target="_blank" class="text-blue-500 underline">${data.fileName || 'Download File'}</a>`;
//     } else {
//         div.textContent = `${data.username}: ${data.message}`;
//     }
//     messages.appendChild(div);
//     messages.scrollTop = messages.scrollHeight;
// }

function appendMessage(data) {
    const div = document.createElement('div');
    const isSender = data.username === username;
    div.className = `p-2 rounded-lg mb-2 max-w-xs ${isSender ? 'bg-blue-500 text-white ml-auto' : 'bg-red-500 text-white mr-auto'}`;

    if (data.gifUrl) {
        // ✅ Display GIF properly
        div.innerHTML = `<img src="${data.gifUrl}" class="w-40 h-auto rounded-lg shadow-md" alt="GIF">`;
    } else if (data.fileUrl) {
        const fileExtension = data.fileUrl.split('.').pop().toLowerCase();

        if (['png', 'jpg', 'jpeg', 'webp'].includes(fileExtension)) {
            div.innerHTML = `<img src="${data.fileUrl}" class="w-40 h-auto rounded-lg shadow-md" alt="Image">`;
        } else if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
            div.innerHTML = `<video controls class="w-40 h-auto rounded-lg shadow-md">
                                <source src="${data.fileUrl}" type="video/${fileExtension}">
                             </video>`;
        } else {
            div.innerHTML = `<a href="${data.fileUrl}" target="_blank" class="text-blue-500 underline">${data.fileName || 'Download File'}</a>`;
        }
    } else {
        div.textContent = `${data.username}: ${data.message}`;
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

// Emoji picker functionality
const emojiPicker = document.getElementById('emoji-picker');
const emojiBtn = document.getElementById('emoji-btn');
emojiBtn.addEventListener('click', () => {
    emojiPicker.classList.toggle('hidden');
    if (!emojiPicker.classList.contains('hidden')) {
        loadEmojiPicker();
    }
});

function loadEmojiPicker() {
    const emojis = ["😊", "😂", "❤️", "😎", "😍", "🥺", "😜", "😢", "😭", "😇", "😈", "🤔", "🤩", "😋", "🤭", "🙄", "😳", "😅", "😬", "😏", "😌", "🥳", "😜", "😝", "😋", "🧐", "😇", "🥺", "😉", "😆", "🤗", "🤪", "🤤", "🥵", "🥶", "🤐", "😐", "🙃", "🥴", "🤢", "🤮", "🤧", "🥱", "🤒", "🤑", "🤠", "😺", "🐶", "🐱", "🐰", "🐻", "🐼", "🦁", "🐮", "🐷", "🐸", "🦋", "🐞", "🐌", "🦄", "🐙", "🦑", "🦐", "🦢", "🦚", "🦜", "🦓", "🦛", "🐯", "🦈", "🐡", "🐠", "🐟", "🐬", "🦦", "🐅", "🐆", "🐘", "🦏", "🐘", "🦢", "🐫", "🦘", "🦒", "🦦", "🐒", "🦍", "🐕", "🐩", "🐈", "🐇", "🐈", "🐖", "🦉", "🐦", "🐧", "🐜", "🐾"];
    emojiPicker.innerHTML = '';
    emojis.forEach((emoji) => {
        const button = document.createElement('button');
        button.textContent = emoji;
        button.className = 'p-1 text-xl';
        button.addEventListener('click', () => {
            messageInput.value += emoji;
            emojiPicker.classList.add('hidden');
        });
        emojiPicker.appendChild(button);
    });
}

// File upload functionality
const fileInput = document.getElementById('file-input');
const fileBtn = document.getElementById('file-btn');
fileBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/upload', { method: 'POST', body: formData });
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Invalid response from server');
        }
        
        const data = await response.json();
        if (data.fileUrl) {
            socket.emit('send-message', { fileUrl: data.fileUrl, fileName: file.name });
        }
    } catch (error) {
        console.error('File upload failed:', error);
    }
    event.target.value = '';
});

// Handle received messages
socket.on('receive-message', appendMessage);

// GIF Search functionality
const gifSearchBtn = document.getElementById('gif-search-btn');
const gifSearchContainer = document.getElementById('gif-search-container');
const gifSearchInput = document.getElementById('gif-search-input');
const gifResults = document.getElementById('gif-results');

gifSearchBtn.addEventListener('click', () => {
    gifSearchContainer.classList.toggle('hidden');
});

gifSearchInput.addEventListener('input', async (e) => {
    const query = e.target.value;
    if (!query) return;
    const apiKey = 'JHbC9cDPANFSBTjyAV0LqfYr3o2qQH7S';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        gifResults.innerHTML = '';
        data.data.forEach(gif => {
            const img = document.createElement('img');
            img.src = gif.images.fixed_height.url;
            img.classList.add('gif');
            img.addEventListener('click', () => sendGif(gif.images.fixed_height.url));
            gifResults.appendChild(img);
        });
    } catch (error) {
        console.error('Error fetching GIFs:', error);
    }
});

function sendGif(gifUrl) {
    socket.emit('send-message', { gifUrl, username });
    gifSearchContainer.classList.add('hidden');
}

// Form submission for user registration
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById('uploadForm'));

    try {
        const response = await fetch('/register', { method: 'POST', body: formData });
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Invalid response from server');
        }
        const data = await response.json();
        console.log('Success:', data);
    } catch (error) {
        console.error('File upload failed:', error);
    }
});
