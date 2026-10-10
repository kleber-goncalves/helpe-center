const baseUrl = "https://www.iloveimg.com/img/tools/small";

// O SvgIcon aceita URLs (src) ou SVGs colados diretamente no código (svg).
// Exemplo: "comprimir-imagem": { svg: String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">...</svg>` },
export const iloveImgIcons = Object.freeze({
    "comprimir-imagem": { src: `${baseUrl}/compressimage.svg` },
    "redimensionar-imagem": { src: `${baseUrl}/resizeimage.svg` },
    "recortar-imagem": { src: `${baseUrl}/cropimage.svg` },
    "converter-para-jpg": { src: `${baseUrl}/converttojpg.svg` },
    "girar-imagem": { src: `${baseUrl}/rotateimage.svg` },
    "remover-fundo": { src: `${baseUrl}/removebackground.svg` },
    "marcar-imagem": { src: `${baseUrl}/watermarkimage.svg` },
    "melhorar-imagem": { src: `${baseUrl}/upscaleimage.svg` },
    "desfocar-cara": { src: `${baseUrl}/blurface.svg` },
});
