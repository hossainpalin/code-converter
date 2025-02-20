declare module "svg-to-jsx" {
  function svg2jsx(svg: string): Promise<string>;

  export = svg2jsx;
}
