export default class AutoplayHelper {
  static CheckChromium(): boolean {
    const context = new AudioContext();
    return context.state === 'suspended';
  }

  static Prompt(): void {
    const context = new AudioContext();
    const button = document.createElement('button');
    button.innerText = 'Click to enable audio';
    button.classList.add('autoplay-helper-button');
    button.onclick = function() {
        context.resume();
    };
    context.onstatechange = function () {
        button.remove();
      }
    document.body.appendChild(button);
  }

  static CheckAndPrompt(): void {
    if (AutoplayHelper.CheckChromium())
      AutoplayHelper.Prompt();
  }
}
