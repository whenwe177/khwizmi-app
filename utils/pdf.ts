import { pdfjs } from "react-pdf";

export async function parsePdf(url: string, selectedPages: Array<number>) {
    const loadingTask = pdfjs.getDocument(url);
    const pdf = await loadingTask.promise;
    let resultStr = '';
    for (let pageNum of selectedPages) {
        const page = await pdf.getPage(pageNum);
        const result = await page.getTextContent();
        resultStr += " " + result.items.map((item: any) => item.str.trim()).join(" ");
    }
    return resultStr;
}