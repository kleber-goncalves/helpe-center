const baseUrl = "https://www.ilovepdf.com/img/tools/small";

// O SvgIcon aceita URLs (src) ou SVGs colados diretamente no código (svg).
// Exemplo: "juntar-pdf": { svg: String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">...</svg>` },
export const ilovePdfIcons = Object.freeze({
    "juntar-pdf": { src: `${baseUrl}/merge.svg` },
    "dividir-pdf": { src: `${baseUrl}/split.svg` },
    "comprimir-pdf": { src: `${baseUrl}/compress.svg` },
    "pdf-para-jpg": { src: `${baseUrl}/pdfjpg.svg` },
    "pdf-para-word": { src: `${baseUrl}/pdfword.svg` },
    "pdf-para-excel": { src: `${baseUrl}/pdfexcel.svg` },
    "word-para-pdf": { src: `${baseUrl}/wordpdf.svg` },
    "powerpoint-para-pdf": { src: `${baseUrl}/powerpointpdf.svg` },
    "excel-para-pdf": { src: `${baseUrl}/excelpdf.svg` },
    "jpg-para-pdf": { src: `${baseUrl}/imagepdf.svg` },
    "editar-pdf": { src: `${baseUrl}/edit.svg` },
    "assinar-pdf": { src: `${baseUrl}/sign.svg` },
    "rodar-pdf": { src: `${baseUrl}/rotate.svg` },
    "desbloquear-pdf": { src: `${baseUrl}/unlock.svg` },
});
