import getContactHref from "./get-contact-href";

test("getContactHref", () => {
  expect(getContactHref("rss", "#")).toBe("#");
  expect(getContactHref("email", "#")).toBe("mailto:#");
  expect(getContactHref("line", "#")).toBe("line://ti/p/#");
  expect(getContactHref("telegram", "#")).toBe("https://t.me/#");
  expect(getContactHref("vkontakte", "#")).toBe("https://vk.com/#");
  expect(getContactHref("medium", "#")).toBe("https://medium.com/#");
  expect(getContactHref("github", "#")).toBe("https://github.com/#");
  expect(getContactHref("weibo", "#")).toBe("https://www.weibo.com/#");
  expect(getContactHref("gitlab", "#")).toBe("https://www.gitlab.com/#");
  expect(getContactHref("codepen", "#")).toBe("https://www.codepen.io/#");
  expect(getContactHref("twitter", "#")).toBe("https://www.twitter.com/#");
  expect(getContactHref("facebook", "#")).toBe("https://www.facebook.com/#");
  expect(getContactHref("soundcloud", "#")).toBe("https://soundcloud.com/#");
  expect(getContactHref("instagram", "#")).toBe("https://www.instagram.com/#");
  expect(getContactHref("linkedin", "#")).toBe("https://www.linkedin.com/in/#");
  expect(getContactHref("phone", "+123")).toBe("tel:+123");
});
