export class Toast {
  /**
   * @param {string} message 
   * @param {"success" | "warn" | "error"} type
   */
  static dispatch(message, type = "success") {
    const div = document.createElement("div");
    const color = {
      success: "#31C33C",
      warn: "#C3B42D",
      error: "#BF3F36"
    };

    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.width = "100%";
    div.style.height = "48px";
    div.style.background = color[type];
    div.style.color = "white";
    div.style.fontWeight = "600";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.marginTop = "81px";
    div.innerHTML = message;
    document.body.appendChild(div);

    setTimeout(() => document.body.removeChild(div), 5_000);
  }
}