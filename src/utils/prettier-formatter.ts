import prettier from "prettier";
import parserBabel from "prettier/plugins/babel";
import parserTypeScript from "prettier/plugins/typescript";
import parserHtml from "prettier/plugins/html";
import parserCss from "prettier/plugins/postcss";
import parserEstree from "prettier/plugins/estree";

interface IPrettierWorkerData {
  code: string;
  language: string;
}

export const prettierFormatter = async ({
  code,
  language
}: IPrettierWorkerData) => {
  try {
    const formattedCode = await prettier.format(code, {
      parser: language === "javascript" ? "babel" : language,
      plugins: [
        parserBabel,
        parserTypeScript,
        parserHtml,
        parserCss,
        parserEstree,
        "@prettier/plugin-pug"
      ]
    });

    return { success: true, formattedCode };
  } catch (error) {
    return { success: false, error };
  }
};
