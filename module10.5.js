const btn = document.querySelector(".btn")

btn.addEventListener("click", () => {
  const screenWidth = window.screen.width
  const screenHeight = window.screen.height
  alert(`Ширина экрана равна ${screenWidth}, высота экрана равна ${screenHeight}`)
})