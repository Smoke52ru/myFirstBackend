import {JSDOM} from "jsdom";

export const parseByUrl = async (url: string) => {
  const counts: any = {};

  await JSDOM.fromURL(url).then((dom) => {
    const {body} = dom.window.document;

    const parseNode = (element: any) => {
      const {children, textContent} = element;
      if (dom.window.getComputedStyle(element).display !== 'none'
        && element.children.length === 0
        && element.textContent
      ) {
        textContent.split(/\P{L}+/u).forEach((word: string) => {
          if (word.length <= 4) return;
          const count = counts[word] || 0
          counts[word] = count + 1
        })
      }
      for (const child of children) {
        parseNode(child);
      }
    }

    parseNode(body);
  })

  const sorted = Object.entries<number>(counts)
    .sort((pair1: [string, number], pair2: [string, number]) => pair2[1] - pair1[1])

  return [sorted[0][0], sorted[1][0], sorted[2][0]]
}