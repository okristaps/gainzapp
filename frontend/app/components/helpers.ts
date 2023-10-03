const shortenText = (text: string, titleLength: number) => {
  if (text.length > titleLength) {
    return text.slice(0, titleLength) + "...";
  }
  return text;
};

export { shortenText };
