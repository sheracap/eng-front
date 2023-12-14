import { Node, Text } from "slate";
import escapeHtml from "escape-html";
import React from "react";

export const serialize = (node) => {

  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    // @ts-ignore
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }
    // @ts-ignore
    if (node.italic) {
      string = `<em>${string}</em>`
    }
    // @ts-ignore
    if (node.underline) {
      string = `<u>${string}</u>`
    }
    // @ts-ignore
    if (node.strikethrough) {
      string = `<s>${string}</s>`
    }
    // @ts-ignore
    if (node.code) {
      string = `<code>${string}</code>`
    }
    return string
  }

  const children = node.children.map(n => serialize(n)).join('');

  switch (node.type) {
    case "quote":
      return `<blockquote>{children}</blockquote>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    case "code":
      return (
        <pre>
          <code>{children}</code>
        </pre>
      );
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "heading-three":
      return `<h3>${children}</h3>`;
    case "heading-four":
      return `<h4>${children}</h4>`;
    case "heading-five":
      return `<h5>${children}</h5>`;
    case "heading-six":
      return `<h6>${children}</h6>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    case "link": {
      const { data } = node;
      const href = data.get("href");
      return (
        `<a href="${href}">
          {children}
        </a>`
      );
    }
    case "image": {
      const src = node.data.get("src");
      return `<img src="${src}" />`;
    }
    default:
      return children
  }
};

export const serializeVacancyItemDescription = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    // @ts-ignore
    if (node.bold) {
      string = "";
    }
    return string
  }

  const children = node.children.map(n => serializeVacancyItemDescription(n)).join(" ");

  switch (node.type) {
    case "bulleted-list":
      return `<div class="vacancyItemDescItem">${children}</div>`;
    default:
      return children
  }
};

