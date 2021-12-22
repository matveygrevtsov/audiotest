function play() {
  const audio = document.createElement('audio')
  audio.id = 'audio'
  audio.crossOrigin = 'anonymous'
  audio.src = './samples/beat_guitar.mp3'
  document.body.appendChild(audio)

  const logo = document.getElementById('logo').style
  const context = new AudioContext() // AudioContext содержит в себе методы, позволяющие контролировать и изменять аудиодорожку
  const analyser = context.createAnalyser()
  const src = context.createMediaElementSource(audio)
  const array = new Float32Array(analyser.frequencyBinCount) // массив длинной, указанной в скобках

  src.connect(analyser)
  analyser.connect(context.destination)

  function loop() {
    window.requestAnimationFrame(loop)
    analyser.getFloatFrequencyData(array)
    const value = Math.min(Math.abs(array[40]), 1000)
    console.log(value)
    logo.minHeight = logo.minWidth = `${value}px`
  }

  audio.play()
  loop()
}
