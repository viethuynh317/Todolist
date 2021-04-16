const stringToSlug = (str) => {
  let newStr = str.replace(/^\s+|\s+$/g, "").toLowerCase(); // trim

  // remove accents, swap ñ for n, etc
  const from =
    "ẫẩậầấặẳẵằắăãảạàáäâèẽéẹẻëêểềếệìíịỉĩïîòọóỏõöôộôốổỗơớờợởỡùúụủưứừựửữũüûñçđýỳỷỵỹ·/_,:;QWERTYUIOPASDFGHJKLZXCVBNM";
  const to =
    "aaaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiiioooooooooooooooooouuuuuuuuuuuuuncdyyyỵy------qwertyuiopasdfghjklzxcvbnm";
  for (let i = 0; i < from.length; i += 1) {
    newStr = newStr.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  newStr = newStr
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return newStr;
};

export default stringToSlug;
