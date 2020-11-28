// Changing different devices font size for better adapting.

export default () => {
  let deviceScreenWidth = screen.availWidth;
  let defaultWidth = 1920;
  if (deviceScreenWidth < 600) {
    return `${defaultWidth / deviceScreenWidth * 0.6}rem`;
  } else {
    return `${defaultWidth / deviceScreenWidth * 0.8}rem`;
  }
}
