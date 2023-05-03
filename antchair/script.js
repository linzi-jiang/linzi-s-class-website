const images = [
  { src: './images/animal/动物 (1).jpg', type: 'animal' },
  { src: './images/animal/动物 (2).jpg', type: 'animal' },
  { src: './images/animal/动物 (3).jpg', type: 'animal' },
  { src: './images/animal/动物 (4).jpg', type: 'animal' },
  { src: './images/animal/动物 (5).jpg', type: 'animal' },
  { src: './images/animal/动物 (6).jpg', type: 'animal' },
  { src: './images/animal/动物 (7).jpg', type: 'animal' },
  { src: './images/animal/动物 (8).jpg', type: 'animal' },
  { src: './images/animal/动物 (9).jpg', type: 'animal' },
  { src: './images/animal/动物 (10).jpg', type: 'animal' },
  { src: './images/animal/动物 (11).jpg', type: 'animal' },
  // ...其他动物图片
  { src: './images/chair/椅子1 (1).jpg', type: 'chair' },
  { src: './images/chair/椅子1 (2).jpg', type: 'chair' },
  { src: './images/chair/椅子1 (3).jpg', type: 'chair' },
  { src: './images/chair/椅子1 (4).jpg', type: 'chair' },
  { src: './images/chair/椅子1 (5).jpg', type: 'chair' },
  { src: './images/chair/椅子1 (6).jpg', type: 'chair' },
  { src: './images/chair/椅子1 (7).jpg', type: 'chair' },
  { src: './images/chair/椅子1 (8).jpg', type: 'chair' },
  { src: './images/chair/椅子1 (9).jpg', type: 'chair' },
  { src: './images/chair/椅子1 (10).jpg', type: 'chair' },
  { src: './images/chair/椅子1 (11).jpg', type: 'chair' },
  { src: './images/chair/椅子1 (12).jpg', type: 'chair' },
  { src: './images/chair/椅子1 (13).jpg', type: 'chair' },
  { src: './images/chair/椅子1 (14).jpg', type: 'chair' },
  { src: './images/chair/椅子1 (15).jpg', type: 'chair' }
  // ...其他椅子图片
]

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function generateImageContainer() {
  shuffle(images)
  const selectedImages = images.slice(0, 16)

  let containerHtml = ''
  for (let i = 0; i < 16; i++) {
    const image = selectedImages[i]
    containerHtml += `
            <div class="imageWrapper">
                <img src="${image.src}" data-type="${image.type}" onclick="selectImage(this)">
            </div>
        `
  }

  document.getElementById('imageContainer').innerHTML = containerHtml
}

generateImageContainer()

function selectImage(img) {
  img.classList.toggle('selected')
}

function validate() {
  const selectedImages = document.querySelectorAll('.selected')

  // 检查是否有选中的图片
  if (selectedImages.length === 0) {
    showMessage('请选择至少一个图片。', false)
    return
  }

  let isHuman = true
  for (const img of selectedImages) {
    if (img.dataset.type !== 'chair') {
      isHuman = false
      break
    }
  }

  if (isHuman) {
    showMessage('成功！你不是机器人。', true)
  } else {
    showMessage('对不起，你是机器人。', false)
  }
}

function showMessage(message, isSuccess) {
  const overlayElement = document.getElementById('overlay')
  const messageElement = document.getElementById('message')

  // 根据验证结果添加相应的图标
  const iconElement = document.createElement('span')
  iconElement.className = isSuccess ? 'success-icon' : 'fail-icon'
  messageElement.innerHTML = ''
  messageElement.appendChild(iconElement)
  messageElement.appendChild(document.createTextNode(message))

  overlayElement.classList.remove('hidden')
  setTimeout(() => {
    overlayElement.classList.add('hidden')
    generateImageContainer() // 重新生成图片容器
  }, 2000) // 3秒后隐藏提示语和遮罩，并重新生成图片容器
}
