function play() {
  const audio = document.createElement('audio')
  audio.id = 'audio'
  audio.crossOrigin = 'anonymous'
  audio.src = './samples/beat_guitar.mp3'
  document.body.appendChild(audio)

  const logo = document.getElementById('logo')
  const context = new AudioContext() // AudioContext содержит в себе методы, позволяющие контролировать и изменять аудиодорожку
  const analyser = context.createAnalyser()
  const src = context.createMediaElementSource(audio)
  const array = new Uint8Array(analyser.frequencyBinCount) // массив длинной, указанной в скобках

  src.connect(analyser)
  analyser.connect(context.destination)

  function loop() {
    window.requestAnimationFrame(loop)
    analyser.getByteFrequencyData(array)
    const value = array[40]
    console.log(value)
    logo.style = `width: ${value}px; height: ${value}px`
  }

  audio.play()
  loop()
}
