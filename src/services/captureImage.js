export class ImageCapture {
  constructor(videoElement) {
    this.videoElement = videoElement;
    this.stream = null;
  }

  async initializeCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.srcObject = this.stream;
    } catch (error) {
      throw new Error('Camera access denied');
    }
  }

  captureFrame() {
    const canvas = document.createElement('canvas');
    canvas.width = this.videoElement.videoWidth;
    canvas.height = this.videoElement.videoHeight;
    canvas.getContext('2d').drawImage(this.videoElement, 0, 0);
    return canvas.toDataURL('image/jpeg');
  }

  stopCamera() {
    this.stream?.getTracks().forEach(track => track.stop());
  }
}